const express = require('express');
const router = express.Router();
const {obtenerTareas, obtenerTareaPorId, crearTarea, actualizarTarea, eliminarTarea}=require('../controllers/tarea.Controller');

router.get('/tareas', obtenerTareas);
router.post('/tareas', crearTarea);
router.get('/tareas/:id', obtenerTareaPorId);
router.put('/tareas/:id', actualizarTarea);
router.delete('tareas/:id', eliminarTarea);

module.exports = router;
