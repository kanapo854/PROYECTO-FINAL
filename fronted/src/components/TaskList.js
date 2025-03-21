import React, { useEffect, useState } from "react";
import "./TaskList.css";
import Header from "./Header";
import { useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {Link} from "react-router-dom";
  const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [estadoFilter, setEstadoFilter] = useState("");
  const [tituloFilter, setTituloFilter] = useState("");
  const [descripcionFilter, setDescripcionFilter] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const {user} = location.state || {};
  
  //console.log(user);
  useEffect(() => {
    //verificamos si el usuario esta autenticado
    if(user){
      //hacer la solicitud Get para obtener las tareas
      const fetchTask = async () => {
        try {
          const response = await axios.get(`http://localhost:3005/api/tareas/${user.IDUsuario}`);
          setTasks(response.data);
          setLoading(false);   
        }catch (error){
          setError("Error al obtener las tareas");
          setLoading(false);
        }
      };
      fetchTask();
    }else {
      setError("No se ha encontrado el usuario");
      setLoading(false);
    }
  },
  [user]);
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

    setFilteredTasks(filtered);
  }, [estadoFilter, tituloFilter, descripcionFilter, tasks]);

  if(loading){
    return <p>Cargando tareas...</p>
  }

  if(error){
    return <p>{error}</p>
  }
  const handleUpdateClick = (taskId) => {
    console.log(taskId);
    // Redirigir a la página de actualización y pasar tanto taskId como user
    navigate(`/update-task/${taskId}`, { state: { taskId, user } });
  };
  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3005/api/tareas/${taskId}`);
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
      navigate("/tasklist", { state: { user } });
    } catch (error) {
      console.error('Error eliminando la tarea:', error);
    }
  };
  const handleCreateTask = () => {
    navigate("/create-task", { state: { user } }); // Enviamos los datos del usuario en el estado
  };
  return (
    <div>
      <Header user = {user}/>
      <div className="tasks-container">
        <h2>Mis Tareas</h2>
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
                <h3>{task.titulo}</h3>
                <p>{task.descripcion}</p>
                <span className={`status ${task.estado.toLowerCase().replace(" ", "-")}`}>
                {task.estado}
                </span>
                <div className="task-button">
                  {task.estado.toLowerCase() !== "completada" && (<button className="no-underline" onClick={()=> handleUpdateClick(task.IDTarea)}>Actualizar tarea</button>)}
                  {task.estado.toLowerCase() !== "completada" && (<button className="no-underline" onClick={()=> handleDelete(task.IDTarea)}>Eliminar tarea</button>)}
                </div>
              </li>
            ))}
          </ul>
          <div>
            <button onClick={handleCreateTask}>Crear Tarea</button>
          </div>
      </div>
    </div>
    
  );
};

export default Tasks;