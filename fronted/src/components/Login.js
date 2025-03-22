// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; 
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  // Maneja el cambio de los inputs
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleContrasenaChange = (e) => setContrasena(e.target.value);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Realiza una petición POST al backend para autenticar al usuario
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        email,
        contrasena,
      }
    );
      const userData = {
        email: response.data.usuario.email,
        IDUsuario: response.data.usuario.IDUsuario,
        nombre: response.data.usuario.nombre,
        apellido: response.data.usuario.apellido
      };
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(userData));

      // Redirigir al usuario a la página de inicio o dashboard
      navigate('/tasklist');
    } catch (error) {
      setError('Error al iniciar sesión. Verifique sus credenciales.');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="contrasena">Contraseña</label>
          <div className='password-container'>
            <input
              type={showPassword ? 'text' : 'password'}
              id="contrasena"
              value={contrasena}
              onChange={handleContrasenaChange}
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
        <div className='change-password'>
          <p>Olvidaste tu contraseña?  
            <Link to="/reset-password">Restablecer contraseña</Link>
          </p>
          <p>No tienes cuenta?  
            <Link to="/create-user" className="register-link"> Regístrate aquí</Link>
          </p>
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;