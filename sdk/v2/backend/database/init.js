import { readFileSync } from 'node:fs';

export function initialize_database(db) {
    // Crear tablas
    const schema = readFileSync('./database/schema.sql', 'utf-8');

    db.exec(schema);

    // Insertar datos iniciales
    const seed = readFileSync('./database/seed.sql', 'utf-8');

    db.exec(seed);

    console.log('✅ Base de datos inicializada.');
}