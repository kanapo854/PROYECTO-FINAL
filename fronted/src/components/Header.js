import React, { useState } from "react";
//import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate
import "./Header.css";


const Header = ({ user }) => {
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate(); // Inicializamos useNavigate
  if(!user || !user.email){
    return <p>Cargando datos...</p>
  }
  
  const handleLogout = () => {
    // Aquí puedes realizar cualquier lógica adicional de logout (como borrar el token o limpiar el estado)
    // Redirigimos al login
    navigate("/");
  };
  return (
    <header className="header">
      <div className="titulo">  
        <h1 className="app-name">KanapoTask</h1>
        <h1 className="user-name" onClick={() => setShowButton(!showButton)}>
          {user.email}
        </h1>
        {showButton && <button className="logout" onClick={handleLogout}>Log out</button>}
      </div>
       
      {/*<nav className="navbar">
        <ul>
          <li>Inicio</li>
          <li>Mis Tareas</li>
          <li>Perfil</li>
        </ul>
      </nav>*/}
    </header>
  );
};

export default Header;