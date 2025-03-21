const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({origin: 'http://localhost:3002'}));

const usuarioRoutes = require('./routes/usuario.routes');
const tareaRoutes = require('./routes/tarea.routes');
const authRoutes = require('./routes/auth.routes');

app.use(express.json());

app.use('/api', usuarioRoutes);
app.use('/api', tareaRoutes);
app.use('/api', authRoutes);
const PORT = process.env.PORT || 3009;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

module.exports = app;