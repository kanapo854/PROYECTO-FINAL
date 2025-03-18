const bcrypt = require('bcrypt');
const { Usuario } = require('../models');

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// Obtener un usuario por ID
exports.obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuario);
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
      
      res.status(201).json(usuario);
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

// Actualizar un usuario por ID
exports.actualizarUsuario = async (req, res) => {
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      // Verificar si la contraseña está siendo actualizada
      if (req.body.contrasena && req.body.contrasena !== usuario.contrasena) {
        req.body.contrasena = await bcrypt.hash(req.body.contrasena, 10);
      }
  
      await usuario.update(req.body);
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};
/*exports.actualizarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    await usuario.update(req.body);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};*/

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