require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const fronted_url = process.env.URL_FRONTED;
app.use(cors({origin: fronted_url, credentials: true,}));

const usuarioRoutes = require('./routes/usuario.routes');
const tareaRoutes = require('./routes/tarea.routes');
const authRoutes = require('./routes/auth.routes');

app.use(express.json());

app.use('/api', usuarioRoutes);
app.use('/api', tareaRoutes);
app.use('/api', authRoutes);

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

module.exports = app;