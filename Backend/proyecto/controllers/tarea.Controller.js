const { Tarea, Usuario } = require('../models');
const { Op } = require('sequelize'); // Asegúrate de importar Op
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
    const { titulo, descripcion, estado, IDUsuario,fecha} = req.body;

    // Verificar si el usuario existe
    const usuario = await Usuario.findByPk(IDUsuario);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    const estado_tarea = "A";

    const tarea = await Tarea.create({ titulo, descripcion, estado, IDUsuario, estado_tarea,fecha});
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

// Cambiar el estado de la tarea a "B" (en lugar de eliminarla)
exports.eliminarTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findByPk(req.params.id);
    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    // Actualizar el estado de la tarea a "B" (por ejemplo, estado de eliminada)
    tarea.estado_tarea = "B"; // Asumiendo que 'estado_tarea' es el campo que necesitas actualizar

    // Guardar los cambios en la base de datos
    await tarea.save();

    res.json({ mensaje: 'Estado de la tarea actualizado a "B" correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el estado de la tarea' });
  }
};
// Eliminar una tarea por ID
/*exports.eliminarTarea = async (req, res) => {
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
};*/

// Obtener tareas por el IDUsuario
exports.obtenerTareaPorUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const tareas = await Tarea.findAll({ where: { IDUsuario: usuario.IDUsuario, estado_tarea: {[Op.ne]: 'B'}} });
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las tareas por usuario' });
  }
};