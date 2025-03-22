require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Usuario } = require('../models');

// Clave secreta para firmar el token 
const SECRET_KEY = process.env.JWT_SECRET;
//const SECRET_KEY = "tu_clave_secreta"; 

exports.iniciarSesion = async (req, res) => {
    try {
        const { email, contrasena } = req.body;

        // Verificar si el usuario existe en la base de datos
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Comparar la contraseña ingresada con la almacenada en la base de datos
        const esCorrecta = await bcrypt.compare(contrasena, usuario.contrasena);

        if (!esCorrecta) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        // Generar un token JWT
        const token = jwt.sign(
            { id: usuario.IDUsuario, email: usuario.email }, 
            SECRET_KEY, 
            { expiresIn: "2h" } // Expira en 2 horas
        );

        // Configurar la cookie HttpOnly para el token
        /*res.cookie("tokenc", token, {
            httpOnly: true, // No accesible desde JavaScript
            secure: false, // Solo en HTTPS en producción
            sameSite: "Lax", // Protege contra CSRF
            maxAge:  3600000 // 2 horas de expiración
        });*/
        
        res.json({
            mensaje: "Inicio de sesión exitoso",
            usuario: {
                IDUsuario: usuario.IDUsuario,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email
            }, token
        });

    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ error: "Error al iniciar sesión" });
    }
};