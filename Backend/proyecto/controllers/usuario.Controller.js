const bcrypt = require('bcryptjs');
const { Usuario } = require('../models');

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attribute: ['nombre', 'apellido' ,'email']
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// Obtener un usuario por ID
exports.obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, {
      attribute: ['nombre', 'apellido' ,'email']
    });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(201).json({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

// Crear un nuevo usuario
exports.crearUsuario = async (req, res) => {
    try {
      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(req.body.contrasena, 10);
      
      // Crear el usuario con la contraseña encriptada
      const usuario = await Usuario.create({ ...req.body, contrasena: hashedPassword });
      
      res.status(201).json({
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el usuario' });
    }
  };
/*exports.crearUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};*/

//Actualizr usuario por email
exports.actualizarUsuario = async (req, res) => {
  try {
    const { email, contrasena } = req.body; // Desestructurar el email y la nueva contraseña desde el cuerpo de la solicitud

    // Buscar el usuario por el email
    const usuario = await Usuario.findOne({ where: { email } });
    
    // Si no se encuentra el usuario
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    // Verificar si se proporcionó una nueva contraseña
    if (contrasena) {
      // Hashear la nueva contraseña antes de actualizarla
      const hashedPassword = await bcrypt.hash(contrasena, 10);
      
      // Actualizar solo la contraseña
      await usuario.update({ contrasena: hashedPassword });
      
      return res.status(200).json({ mensaje: 'Contraseña actualizada exitosamente' });
    }

    // Si no se proporciona nueva contraseña, enviar un mensaje de error
    res.status(400).json({ error: 'No se ha proporcionado una nueva contraseña' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la contraseña' });
  }
};

// Eliminar un usuario por ID
exports.eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    await usuario.destroy();
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};
