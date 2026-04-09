const sqlite3 = require('sqlite3').verbose();

// Crear / conectar base de datos
const db = new sqlite3.Database('./database/reciclaje.db', (err) => {
    if (err) {
        console.error('Error al conectar DB', err);
    } else {
        console.log('Conectado a SQLite ✅');
    }
});

// Crear tabla si no existe
db.run(`
    CREATE TABLE IF NOT EXISTS movimientos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        material TEXT NOT NULL,
        tipo TEXT NOT NULL,
        cantidad REAL NOT NULL,
        fecha TEXT NOT NULL,
        observaciones TEXT
    )
`);

module.exports = db;