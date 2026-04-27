import { URL } from 'node:url';
import { createUser, login } from '../services/userService.js';

// Handler para el login de usuario
// Recibe la petición HTTP, extrae los parámetros de la URL y llama al servicio de login
export async function login_handler(request, response, config_data, db) {
    // Construye el objeto URL usando la URL de la petición y la IP del servidor
    const url = new URL(request.url, 'http://' + config_data.server.ip);
    // Convierte los parámetros de búsqueda de la URL en un objeto plano
    const input = Object.fromEntries(url.searchParams);

    // Llama a la función de login con los datos extraídos
    const output = login(input);

    // Devuelve la respuesta al cliente en formato JSON
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(output));
}


// Handler para el registro de usuario
// Solo acepta peticiones POST. Extrae los datos del cuerpo de la petición y llama al servicio de creación de usuario
export async function register_handler(request, response, config_data, db) {
    let input = {};

    // Verifica que el método HTTP sea POST
    if (request.method === 'POST') {
        let body = '';

        // Escucha los datos que llegan en el cuerpo de la petición
        request.on('data', chunk => {
            body += chunk.toString(); // Acumula los fragmentos de datos
        });

        // Cuando termina de recibir datos, procesa el registro
        request.on('end', async () => {
            try {
                // Parsea el cuerpo recibido como parámetros tipo formulario
                const params = new URLSearchParams(body);
                input = Object.fromEntries(params); // Convierte a objeto plano

                // Llama a la función para crear el usuario en la base de datos
                const output = await createUser(db, input.username, input.password);

                // Devuelve la respuesta exitosa en formato JSON
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(output));
            } catch (err) {
                // Si ocurre un error, responde con código 500 y el mensaje de error
                response.writeHead(500);
                response.end(JSON.stringify({ error: err.message }));
            }
        });
    } else {
        // Si el método no es POST, responde con error 405 (Método no permitido)
        response.writeHead(405, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: 'Método no permitido. Use POST.' }));
    }
}