import React, { useEffect, useState } from "react";
import "../styles/TaskList.css";
import Header from "./Header";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import showAlert from "./Alert";
//import Cookies from "js-cookie";
//import {jwtDecode} from "jwt-decode";


  const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [estadoFilter, setEstadoFilter] = useState("");
  const [tituloFilter, setTituloFilter] = useState("");
  const [descripcionFilter, setDescripcionFilter] = useState("");
  const [fechaFilter, setFechaFilter] = useState("");
  const navigate = useNavigate();
  axios.defaults.withCredentials =true;
  //const {user} = location.state || {};
  useEffect(() => {
    // Obtener el token de la cookie
    /*const token = Cookies.get('tokenc');*/
    const token = localStorage.getItem('token');
    //console.log(token);
    if (token) {
      try {
        // Decodificar el token para obtener el usuario
        /*const decodedToken = jwtDecode(token);*/
        const user = JSON.parse(localStorage.getItem('user'));
        /*const user = {
          IDUsuario: decodedToken.id,
          email: decodedToken.email,
        };*/

        // Hacer la solicitud GET para obtener las tareas
        const fetchTask = async () => {
          try {
            const response = await axios.get(`http://localhost:3005/api/tareas/${user.IDUsuario}`);
            setTasks(response.data);
            setLoading(false);   
          } catch (error) {
            showAlert("error", "Error al obtener las tareas", "var(--red-error)");
            //setError("Error al obtener las tareas");
            setLoading(false);
          }
        };
        fetchTask();
      } catch (error) {
        showAlert("error", "Error al decodificar el token", "var(--red-error)");
        //setError("Error al decodificar el token");
        setLoading(false);
      }
    } else {
      showAlert("error", "No se ha encontrado el token", "var(--red-error)");
      //setError("No se ha encontrado el token");
      setLoading(false);
    }
  }, []);
  
  useEffect(()=> {
    // Aplicar los filtros a las tareas
    let filtered = tasks;

    if (estadoFilter) {
      filtered = filtered.filter((task) => task.estado.toLowerCase() === estadoFilter.toLowerCase());
    }

    if (tituloFilter) {
      filtered = filtered.filter((task) =>
        task.titulo.toLowerCase().includes(tituloFilter.toLowerCase())
      );
    }

    if (descripcionFilter) {
      filtered = filtered.filter((task) =>
        task.descripcion.toLowerCase().includes(descripcionFilter.toLowerCase())
      );
    }
    if(fechaFilter){
      // Convertir fechaFilter de "dd/MM/yyyy" a "yyyy-MM-dd"
      const [day, month, year] = fechaFilter.split('/');
      const formattedFechaFilter = `${day}`;
      //console.log(formattedFechaFilter);
      filtered = filtered.filter((task) =>
        task.fecha.includes(formattedFechaFilter)
      );
    }

    setFilteredTasks(filtered);
  }, [estadoFilter, tituloFilter, descripcionFilter, fechaFilter, tasks]);

  if(loading){
    return <p>Cargando tareas...</p>
  }

  if(error){
    return <p>{error}</p>
  }
  const handleUpdateClick = (taskId) => {
    // Redirigir a la página de actualización y pasar tanto taskId como user
    navigate(`/update-task/${taskId}`, { state: { taskId} });
  };
  const handleDelete = async (taskId) => {
    const token = localStorage.getItem('token');
    if(token){
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/tareas/${taskId}`);
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
        showAlert("success", "Tarea eliminada correctamente", "var(--verde-success)");
        navigate("/tasklist");
        handleNavigateAndReload();
      } catch (error) {
        showAlert("error", "Error eliminando la tarea", "var(--red-error)");
      }
    }else {

    }
  };
  const handleCreateTask = () => {
    navigate("/create-task");
  };
  const handleNavigateAndReload = () => {
    navigate("/tasklist");  // Redirige a la página de la lista de tareas
    window.location.reload();  // Fuerza la recarga de la página
  };
  return (
    <div>
      <Header/>
      
      <div className="tasks-container">
        <h2 className="title">MIS TAREAS</h2>
        
          <div className="filters">
            <input
              type="text"
              placeholder="Filtrar por título"
              value={tituloFilter}
              onChange={(e) => setTituloFilter(e.target.value)}
            />
            <input
              type="text"
              placeholder="Filtrar por descripción"
              value={descripcionFilter}
              onChange={(e) => setDescripcionFilter(e.target.value)}
            />
            <input
              type="date"
              placeholder="Filtrar por fecha"
              value={fechaFilter}
              onChange={(e) => setFechaFilter(e.target.value)}
            />
            <select
              value={estadoFilter}
              onChange={(e) => setEstadoFilter(e.target.value)}>
              <option value="">Filtrar por estado</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Completada">Completada</option>
              <option value="En progreso">En progreso</option>
            </select>
            
          </div>
          
          <ul className="tasks-list">
            {filteredTasks.map((task) => (
              <li key={task.id} className="task-card">
                <h3>{task.titulo.toUpperCase()}</h3>
                <div className="task-dates">
                  <div className="task-texto">
                    <div className="task-des">
                      <p className="task-des-p">{task.descripcion}</p>
                    </div>
                    <div className="task-date">
                      <p className="task-date-p">Fecha: {task.fecha}</p>
                    </div>
                  </div>
                  <div className={`status ${task.estado.toLowerCase().replace(" ", "-")}`}>
                    <span className={`status-span ${task.estado.toLowerCase().replace(" ", "-")}`}>
                    {task.estado}
                  </span>
                  </div>
                </div>
                <div className="task-actions">
                  <div className="task-button">
                    {task.estado.toLowerCase() !== "completada" && (<button className="no-underline" onClick={()=> handleUpdateClick(task.IDTarea)}>Actualizar tarea</button>)}
                    {task.estado.toLowerCase() !== "completada" && (<button className="no-underline" onClick={()=> handleDelete(task.IDTarea)}>Eliminar tarea</button>)}
                  </div>
                </div>
               
              </li>
            ))}
          </ul>
          <div className="button-crear">
            <button onClick={handleCreateTask}>Crear Tarea</button>
          </div>
      </div>
    </div>
    
  );
};

export default Tasks;