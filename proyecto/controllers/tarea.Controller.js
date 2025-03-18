const { Tarea, Usuario } = require('../models');

// Obtener todas las tareas
exports.obtenerTareas = async (req, res) => {
  try {
    const tareas = await Tarea.findAll({ include: Usuario });
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las tareas' });
  }
};

// Obtener una tarea por ID
exports.obtenerTareaPorId = async (req, res) => {
  try {
    const tarea = await Tarea.findByPk(req.params.id, { include: Usuario });
    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la tarea' });
  }
};

// Crear una nueva tarea
exports.crearTarea = async (req, res) => {
  try {
    const { titulo, descripcion, estado, IDUsuario } = req.body;

    // Verificar si el usuario existe
    const usuario = await Usuario.findByPk(IDUsuario);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const tarea = await Tarea.create({ titulo, descripcion, estado, IDUsuario });
    res.status(201).json(tarea);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la tarea' });
  }
};

// Actualizar una tarea por ID
exports.actualizarTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findByPk(req.params.id);
    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    // Si se actualiza IDUsuario, verificar si el nuevo usuario existe
    if (req.body.IDUsuario) {
      const usuario = await Usuario.findByPk(req.body.IDUsuario);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
    }

    await tarea.update(req.body);
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la tarea' });
  }
};

// Eliminar una tarea por ID
exports.eliminarTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findByPk(req.params.id);
    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    await tarea.destroy();
    res.json({ mensaje: 'Tarea eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la tarea' });
  }
};