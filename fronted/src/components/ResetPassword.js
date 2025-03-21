import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./ResetPassword.css";
import showAlert from './Alert';

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};
  //const [userId, setUserId] = useState("123"); 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Expresión regular para validar la contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$%&]).{8,}$/;
    console.log(password);
    console.log("Regex Test:", passwordRegex.test(password));
    if (!passwordRegex.test(password)) 
      {
        //alert("La contraeña no cumple con los requisitos");
        showAlert("error", "La contraseña no cumple los requisitos necesarios", "var(--red-error)");
        setError("La contraseña debe tener al menos una mayúscula, un número, una minúscula y uno de estos símbolos: #, $, %, &.");
        return;
      }
  
      try 
      {
        // Realizar la solicitud para actualizar la contraseña en el servidor
        const response = await axios.put(`http://localhost:3005/api/usuarios/1`, {
            contrasena: password,  // Enviamos la nueva contraseña
          });
  
        if (response.status === 201) {
          alert("Contraseña actualizada con éxito");
          showAlert("success", "Contraseña actualizada con éxito", "var(--ver-success)");
          // Redirigir a login o alguna otra página según sea necesario
        }
      } catch (error) {
        showAlert("error", "Error al restablecer la contraseña", "var(--red-error)");
        setError("Error al restablecer la contraseña");
      }
  };
  const handleBack = () => {
    navigate("/"); // Envía el usuario de vuelta
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
            name="contrasena"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="task-button">
        <button type="submit">Restablecer</button>
        <button type="button" onClick={handleBack}>Volver</button>
        </div>
        
      </form>
    </div>
  );
};

export default ResetPassword;