const express = require('express');
const router = express.Router();
const {obtenerUsuarios, crearUsuario, obtenerUsuarioPorId, actualizarUsuario, eliminarUsuario}=require('../controllers/usuario.Controller');

router.get('/usuarios', obtenerUsuarios);
router.post('/usuarios', crearUsuario);
router.get('/usuarios/:id', obtenerUsuarioPorId);
router.put('/usuarios/:id', actualizarUsuario);
router.delete('usuarios/:id', eliminarUsuario);

module.exports = router;