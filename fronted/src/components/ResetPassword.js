import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./ResetPassword.css";


const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const { email } = location.state || {};
  //const [userId, setUserId] = useState("123"); 
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Expresión regular para validar la contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#\$%&]).{8,}$/;
    
    if (!passwordRegex.test(password)) {
        setError("La contraseña debe tener al menos una mayúscula, un número, una minúscula y uno de estos símbolos: #, $, %, &.");
        return;
      }
  
      try 
      {
        // Realizar la solicitud para actualizar la contraseña en el servidor
        const response = await axios.put(`http://localhost:3005/api/usuarios/${userId}`, {
            contrasena: password,  // Enviamos la nueva contraseña
          });
  
        if (response.status === 201) {
          alert("Contraseña actualizada con éxito");
          // Redirigir a login o alguna otra página según sea necesario
        }
      } catch (error) {
        setError("Error al restablecer la contraseña");
      }
  };

  return (
    <div className="reset-password-container">
      <h2>Restablecer Contraseña</h2>
      <div className="requisitos">
      <p><strong>Requisitos de la contraseña:</strong></p>
          <ul>
            <li>Debe tener al menos una letra mayúscula.</li>
            <li>Debe tener al menos una letra minúscula.</li>
            <li>Debe tener al menos un número.</li>
            <li>Debe incluir uno de los siguientes símbolos: #, $, %, &.</li>
            <li>Debe tener al menos 8 caracteres.</li>
          </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">Nueva Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Restablecer</button>
      </form>
      <div className="back-link">
        <a href="/">Volver al login</a>
      </div>
    </div>
  );
};

export default ResetPassword;