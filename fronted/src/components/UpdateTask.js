import React, { useState, useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import "../styles/UpdateTask.css";
import Header from "./Header";
import showAlert from "./Alert";
import {jwtDecode} from "jwt-decode";
const UpdateTask = () => {
  //const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener el taskId de la URL y user de la location state
  const { taskId } = useParams();
  //const { user } = location.state || {}; // Recuperamos los datos del usuario
  const navigate1 = useNavigate(); 

  const [task, setTask] = useState({
    titulo: "",
    descripcion: "",
    estado: "",
    fecha: "",
  });

  // Obtener la tarea con el ID
  useEffect(() => {
    //const token = Cookies.get("tokenc");
    const token = localStorage.getItem('token');
    if(token){
      try{
        // Decodificar el token para obtener el usuario
        const user = JSON.parse(localStorage.getItem('user'));
        //hacer la solicitud get para obtener la tarea por IDUsuario
        const fetchTask = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/tareas/${user.IDUsuario}`);
            //Buscar la tarea especificada por taskId
            const tareaEncontrada = response.data.find(t => t.IDTarea === Number(taskId));
            //console.log(tareaEncontrada);
            if(tareaEncontrada){
                setTask({
                    titulo: tareaEncontrada.titulo,
                    descripcion: tareaEncontrada.descripcion,
                    estado: tareaEncontrada.estado,
                    fecha:tareaEncontrada.fecha
                });
                
                setLoading(false);
            }else {
                setLoading(false);
            }
            //setTask(response.data);
            
          } catch (error) {
            showAlert("error", "Error al obtener la tarea", "var(--red-error)");
            setError("Error al obtener la tarea");
            setLoading(false);
          }
        };
        fetchTask();
      }catch(error){
        showAlert("error", "Error al decodificar el token", "var(--red-error)");
        setError("Error al decodificar el token");
        setLoading(false);
      }
    }else {
      showAlert("error", "No se ha encontrado el token", "var(--red-error)");
      setError("No se ha encontrado el token");
      setLoading(false);
    }
  }, [taskId]);

  // Manejar los cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value, // Solo actualizamos el campo modificado
    }));
  };

  const handleEstadoChange = (event) => {
    const newEstado = event.target.value;
    setTask({ ...task, estado: newEstado });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Decodificar el token desde el localstorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        showAlert("error", "No se encontró el token. Usuario no autenticado.", "var(--red-error)");
        return;
      }
      
      const decodedToken = jwtDecode(token);
      const IDUsuario = decodedToken.id; 
      //Realizar la peticion Get
      const responseobject = await axios.get(`${process.env.REACT_APP_API_URL}/tareas/${IDUsuario}`);  
      const tareainicial = responseobject.data.find(t => t.IDTarea === Number(taskId));
      const estadoinicial = tareainicial.estado;
      if(estadoinicial === 'Pendiente'){
        if(task.estado === 'En progreso' || task.estado === 'Pendiente'){
            task.estado_tarea = 'M';
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/tareas/${taskId}`, task);
            //alert("Tarea actualizada con éxito");
            showAlert("success", "Tarea actualizada con éxito", "var(--success-not)");
            navigate1("/tasklist");
        }else {
          showAlert("info", "La tarea no puede cambiar al estado Completada", "var(--blue-progress)");
          //alert("La tarea no puede cambiar al estado Completada");
        }
      } else if(estadoinicial === 'En progreso'){
        if(task.estado === 'Completada' || task.estado === 'En progreso'){
            task.estado_tarea = 'M';
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/tareas/${taskId}`, task);
            //alert("Tarea actualizada con éxito");
            showAlert("success", "Tarea actualizada con éxito", "var(--success-not)");
            navigate1("/tasklist");
        }else {
          showAlert("info", "La tarea no puede cambiar al estado pendiente", "var(--blue-progress)");  
          //alert("La tarea no puede cambiar al estado Pendiente");
        }
      }
    } catch (error) {
      setError("Error al actualizar la tarea");
    }
  };

  if (loading) {
    return <p>Cargando tarea...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  const handleBack = () => {
    navigate1("/tasklist"); // Envía el usuario de vuelta
  };
  return (
    <div>
      <Header/>
      <div className="update-task-container">
        <h2 className="title">Actualizar Tarea</h2>
        <div className="update-card">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="titulo">Título</label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={task.titulo}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={task.descripcion}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="fecha">Fecha</label>
              <input
                type="date"
                name="fecha"
                value={task.fecha}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="estado">Estado</label>
              <select
                id="estado"
                name="estado"
                value={task.estado}
                onChange={handleEstadoChange}
                required>
                <option value="Pendiente">Pendiente</option>
                <option value="En progreso">En progreso</option>
                <option value="Completada">Completada</option>
              </select>
            </div>
            <div className="task-button">
              <button type="submit">Actualizar</button>
              <button type="button" onClick={handleBack}>Volver</button>
            </div>
          </form>
        </div>
        
      </div>
    </div>
    
  );
};

export default UpdateTask;