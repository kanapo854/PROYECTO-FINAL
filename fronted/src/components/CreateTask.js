import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreateTask.css";
import Header from "./Header";
import showAlert from './Alert';

const CreateTask = () => {
  const [task, setTask] = useState({
    titulo: "",
    descripcion: "",
    estado: "Pendiente", // Estado fijo y no editable
  });

  const location = useLocation();
  const { user } = location.state || {}; // Recuperamos los datos del usuario
  const navigate = useNavigate();

  // Manejar cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  // Manejar el envío del formulario para crear la tarea
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      showAlert("error", "Usuario no encontrado", "var(--red-error)");
      return;
    }

    try {
      // Hacer la solicitud para crear la tarea, sin necesidad de pasar el estado
      await axios.post("http://localhost:3005/api/tareas", {
        ...task,
        IDUsuario: user.IDUsuario, // Asociamos la tarea con el ID del usuario
        estado: "Pendiente",
        estado_tarea: "A" // El estado siempre será "Pendiente"
      });

      //alert("Tarea creada con éxito");
      showAlert("success", "Tarea creada con éxito", "var(--verde-success)");
      // Redirigir a la lista de tareas
      navigate("/tasklist", { state: { user } });
    } catch (error) {
      //alert("Error al crear la tarea");
      showAlert("error", "Error al crear la tarea", "var(--red-error)");
    }
  };

  return (
    <div>
      <Header user = {user}/>
      <div className="create-task-container">
        <h2>Crear Nueva Tarea</h2>
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
            <textarea
              id="estado"
              name="estado"
              value="Pendiente"
              required
            />
          </div>
          {/* Aquí se omite el campo de selección de estado porque es siempre "Pendiente" */}
          
          <div>
            <button type="submit">Crear Tarea</button>
          </div>
        </form>
      </div>
    </div>
    
  );
};

export default CreateTask;