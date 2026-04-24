const { readFileSync } = require('node:fs'); // Importa la función readFileSync del módulo fs para leer archivos de forma síncrona

export function load_config() {
    try {
        const data = readFileSync('./config.json', 'utf-8');
        console.log("Configuración cargada correctamente.");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error cargando config.json.");
        throw error;
    }
}
