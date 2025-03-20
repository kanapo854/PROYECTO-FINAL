import React from "react";
import "./TaskList.css";

const tasks = [
  { id: 1, titulo: "Estudiar React", descripcion: "Revisar componentes y hooks", estado: "Pendiente" },
  { id: 2, titulo: "Hacer ejercicio", descripcion: "30 minutos de cardio", estado: "Completado" },
  { id: 3, titulo: "Leer un libro", descripcion: "Capítulo 3 de Clean Code", estado: "En progreso" }
];

const Tasks = () => {
  return (
    <div className="tasks-container">
      <h2>Mis Tareas</h2>
      <ul className="tasks-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-card">
            <h3>{task.titulo}</h3>
            <p>{task.descripcion}</p>
            <span className={`status ${task.estado.toLowerCase().replace(" ", "-")}`}>
              {task.estado}
            </span>
            <button>Cambiar estado</button>
            <button>Eliminar tarea</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;