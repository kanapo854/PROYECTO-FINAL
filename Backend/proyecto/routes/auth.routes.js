const express = require('express');
const router = express.Router();
const {iniciarSesion}=require('../controllers/auth.Controller');

router.post('/login', iniciarSesion);

module.exports = router;