// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 
import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  // Maneja el cambio de los inputs
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleContrasenaChange = (e) => setContrasena(e.target.value);

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Realiza una petición POST al backend para autenticar al usuario
    try {
      const response = await axios.post('http://localhost:3005/api/login', {
        email,
        contrasena,
      });
      //console.log('Usuario autenticado:', response.data);

      //Guardar el token en localStorage o sesion Storage
      localStorage.setItem('token', response.data.token);
      //Datos del usuario que inicio sesion
      ///console.log(response.data.usuario);
      const userData = {
        email: response.data.usuario.email,
        IDUsuario: response.data.usuario.IDUsuario,
        nombre: response.data.usuario.nombre,
        apellido: response.data.usuario.apellido
      };
      const user = userData;
      //console.log(user);
      // Redirigir al usuario a la página de inicio o dashboard
      navigate('/tasklist', {state: {user}});
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
          <input
            type="password"
            id="contrasena"
            value={contrasena}
            onChange={handleContrasenaChange}
            required
          />
        </div>
        <div>
          <Link to="/reset-password">Restablecer contraseña</Link>
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;