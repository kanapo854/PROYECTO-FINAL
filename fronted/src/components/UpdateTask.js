import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import "./UpdateTask.css";

const UpdateTask = () => {
  //const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener el taskId de la URL y user de la location state
  const { taskId } = useParams();
  const location = useLocation();
  const { user } = location.state || {}; // Recuperamos los datos del usuario
  const navigate1 = useNavigate(); 
  //console.log(taskId);
  //console.log(user);
  const [task, setTask] = useState({
    titulo: "",
    descripcion: "",
    estado: "",
  });
  // Guardar el estado inicial
  /*const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);*/

  // Obtener la tarea con el ID
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/tareas/${user.IDUsuario}`);
        //console.log(response.data);
        //Buscar la tarea especificada por taskId
        const tareaEncontrada = response.data.find(t => t.IDTarea === Number(taskId));
        //console.log(tareaEncontrada);
        if(tareaEncontrada){
            setTask({
                titulo: tareaEncontrada.titulo,
                descripcion: tareaEncontrada.descripcion,
                estado: tareaEncontrada.estado
            });
            
            setLoading(false);
        }else {
            setLoading(false);
        }
        //setTask(response.data);
        
      } catch (error) {
        setError("Error al obtener la tarea");
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId, user]);

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
      const responseobject = await axios.get(`http://localhost:3005/api/tareas/${user.IDUsuario}`);  
      const tareainicial = responseobject.data.find(t => t.IDTarea === Number(taskId));
      const estadoinicial = tareainicial.estado;
      if(estadoinicial === 'Pendiente'){
        if(task.estado === 'En progreso' || task.estado === 'Pendiente'){
            task.estado_tarea = 'M';
            const response = await axios.put(`http://localhost:3005/api/tareas/${taskId}`, task);
            alert("Tarea actualizada con éxito");
            navigate1("/tasklist", { state: { user } });
        }else {
            alert("La tarea no puede cambiar al estado Completada");
        }
      } else if(estadoinicial === 'En progreso'){
        if(task.estado === 'Completada' || task.estado === 'En progreso'){
            task.estado_tarea = 'M';
            const response = await axios.put(`http://localhost:3005/api/tareas/${taskId}`, task);
            alert("Tarea actualizada con éxito");
            navigate1("/tasklist", { state: { user } });
        }else {
            alert("La tarea no puede cambiar al estado Pendiente");
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
    navigate1("/tasklist", { state: { user } }); // Envía el usuario de vuelta
  };
  return (
    <div className="update-task-container">
      <h2>Actualizar Tarea</h2>
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
        <button type="submit">Actualizar</button>
        <button type="button" onClick={handleBack}>Volver</button>
      </form>
    </div>
  );
};

export default UpdateTask;