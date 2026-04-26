import { DatabaseSync } from 'node:sqlite';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// hace la conexión a la base de datos y devuelve el objeto de la base de datos o lanza un error si no se pudo conectar
export function connect_db(path) {
    const currentDir = dirname(fileURLToPath(import.meta.url));
    const dbPath = resolve(currentDir, path);
    try {
        const db = new DatabaseSync(dbPath);
        return db;
    } catch (err) {
        throw new Error("Error al conectar a la base de datos: " + err.message);
    }
}

