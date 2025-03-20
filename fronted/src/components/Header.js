import React, { useState } from "react";
//import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [showButton, setShowButton] = useState(false);

  return (
    <header className="header">
      <div className="titulo">  
        <h1 className="app-name">KanapoTask</h1>
        <h1 className="user-name" onClick={() => setShowButton(!showButton)}>
          ESTE ES UN USUARIO LARGO
        </h1>
        {showButton && <button className="logout">Log out</button>}
      </div>

      <nav className="navbar">
        <ul>
          <li>Inicio</li>
          <li>Mis Tareas</li>
          <li>Perfil</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;