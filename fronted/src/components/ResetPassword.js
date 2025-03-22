import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/ResetPassword.css";
import showAlert from './Alert';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Maneja el cambio de email
  const handleEmailChange = (e) => setEmail(e.target.value);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
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
        return;
      }
  
      try 
      {
        // Realizar la solicitud para actualizar la contraseña en el servidor
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/usuarios`, {
            email,
            contrasena: password,  // Enviamos la nueva contraseña
          });
  
        if (response.status === 200) {
          showAlert("success", "Contraseña actualizada con éxito", "var(--success-not)");
          // Redirigir a login o alguna otra página según sea necesario
          handleBack();
        }
      } catch (error) {
        showAlert("error", "Error al restablecer la contraseña", "var(--red-error)");
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
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Nueva Contraseña</label>
          <div className='password-container'>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="contrasena"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="password-toggle-icon"
            onClick={togglePasswordVisibility} // Llamar a la función para alternar
             >
            {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Mostrar ícono según el estado */}
            </span>
          </div>
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