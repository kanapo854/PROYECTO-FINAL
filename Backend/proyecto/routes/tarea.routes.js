const express = require('express');
const router = express.Router();
const {obtenerTareas, obtenerTareaPorUsuario, crearTarea, actualizarTarea, eliminarTarea}=require('../controllers/tarea.Controller');

router.get('/tareas', obtenerTareas);
router.post('/tareas', crearTarea);
router.get('/tareas/:id', obtenerTareaPorUsuario);
router.put('/tareas/:id', actualizarTarea);
router.delete('/tareas/:id', eliminarTarea);

module.exports = router;
