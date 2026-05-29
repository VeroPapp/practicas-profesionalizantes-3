import { readFileSync } from 'fs';
import { config_data } from '../config/config.js';

export function default_handler(request, response) {
    try {
        const html = readFileSync(config_data.server.default_path, 'utf-8');
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(html);
    } catch (error) {
        response.writeHead(500);
        response.end('Error interno: No se pudo cargar la vista principal.');
    }
}