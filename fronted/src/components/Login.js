// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

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
      console.log('Usuario autenticado:', response.data);
      // Redirigir al usuario a la página de inicio o dashboard
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
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;