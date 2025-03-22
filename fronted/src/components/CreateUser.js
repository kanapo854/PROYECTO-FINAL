import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/CreateUser.css";
import showAlert from "./Alert";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

const CreateUser = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contrasena: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleBack = () => {
    navigate("/"); // Envía el usuario de vuelta
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Expresión regular para validar la contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$%&]).{8,}$/;
    if (!passwordRegex.test(formData.contrasena)) 
      {
        //alert("La contraeña no cumple con los requisitos");
        showAlert("error", "La contraseña no cumple los requisitos necesarios", "var(--red-error)");
        //setError("La contraseña debe tener al menos una mayúscula, un número, una minúscula y uno de estos símbolos: #, $, %, &.");
        return;
      }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/usuarios`, formData);
      setSuccess("Usuario creado con éxito.");
      showAlert("success", "Usuario creado con éxito", "var(--verde-success)");
      setTimeout(() => navigate("/"), 2000); // Redirigir al login después de 2 segundos
    } catch (error) {
      setError("Error al crear el usuario. Inténtalo de nuevo.");
    }
  };
  
  return (
    <div className="create-user-container">
      <h2>Crear Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Apellido</label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            name="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
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
            <button type="submit">Crear Cuenta</button>
            <button type="button" onClick={handleBack}>Volver</button>
        </div>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>
    </div>
  );
};

export default CreateUser;