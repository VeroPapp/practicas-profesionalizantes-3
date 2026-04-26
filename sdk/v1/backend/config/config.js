import { readFileSync } from 'node:fs';

export function load_config() {
    try {
        const data = readFileSync('./config/config.json', 'utf-8');
        console.log("Configuración cargada correctamente.");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error cargando config.json.");
        throw error;
    }
}
