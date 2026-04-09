const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
const routes = require('./routes');
app.use('/', routes);

// Test
app.get('/', (req, res) => {
    res.send('Servidor funcionando 🚀');
});

// Levantar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});