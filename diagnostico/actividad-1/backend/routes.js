const express = require('express');
const router = express.Router();
const db = require('./db');

// Registrar movimiento
router.post('/movimientos', (req, res) => {
    const { material, tipo, cantidad, fecha, observaciones } = req.body;

    if (!material || !tipo || !cantidad || cantidad <= 0) {
        return res.status(400).json({ error: 'Datos inválidos' });
    }

    const queryStock = `
        SELECT SUM(
            CASE 
                WHEN tipo = 'compra' THEN cantidad
                WHEN tipo = 'venta' THEN -cantidad
            END
        ) as stock
        FROM movimientos
        WHERE material = ?
    `;

    db.get(queryStock, [material], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Error al calcular stock' });
        }

        const stockActual = row.stock || 0;

        if (tipo === 'venta' && stockActual < cantidad) {
            return res.status(400).json({ error: 'Stock insuficiente' });
        }

        const insertQuery = `
            INSERT INTO movimientos (material, tipo, cantidad, fecha, observaciones)
            VALUES (?, ?, ?, ?, ?)
        `;

        db.run(insertQuery, [material, tipo, cantidad, fecha, observaciones], function(err) {
            if (err) {
                return res.status(500).json({ error: 'Error al guardar movimiento' });
            }

            res.json({ message: 'Movimiento registrado' });
        });
    });
});

// Obtener historial
router.get('/movimientos', (req, res) => {
    db.all('SELECT * FROM movimientos ORDER BY id DESC', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener movimientos' });
        }

        res.json(rows);
    });
});

// Obtener stock
router.get('/stock', (req, res) => {
    const query = `
        SELECT 
            material,
            SUM(
                CASE 
                    WHEN tipo = 'compra' THEN cantidad
                    WHEN tipo = 'venta' THEN -cantidad
                END
            ) as stock,
            MAX(fecha) as ultima_actualizacion
        FROM movimientos
        GROUP BY material
    `;

    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener stock' });
        }

        res.json(rows);
    });
});

module.exports = router;