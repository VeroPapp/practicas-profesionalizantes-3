import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export class Database {
    constructor(path) {

        const current_dir = dirname(fileURLToPath(import.meta.url));
        const db_path = resolve(current_dir, path);

        this.connection = new DatabaseSync(db_path);

    }

    initialize() {
        const current_dir = dirname(fileURLToPath(import.meta.url));

        // =========================
        // SCHEMA
        // =========================

        const schema_path = resolve(current_dir,'schema.sql');
        const schema = readFileSync(schema_path, 'utf-8');

        this.connection.exec(schema);

        // =========================
        // SEED
        // =========================

        const seed_path = resolve(current_dir, 'seed.sql');
        const seed = readFileSync(seed_path, 'utf-8');

        this.connection.exec(seed);

        console.log('✅ Base de datos inicializada');

    }

    get_connection() {
        return this.connection;

    };

}

export const database = new Database('../database/database.db');