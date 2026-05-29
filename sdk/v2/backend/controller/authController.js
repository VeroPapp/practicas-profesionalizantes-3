import { URL } from 'node:url';
import { login, register } from '../services/authService.js';

export async function login_handler(request, response) {
    if (request.method === 'POST') {
        let body = '';

        request.on('data', chunk => {
            body += chunk.toString();
        });

        request.on('end', async () => {
            try {
                const params = new URLSearchParams(body);
                const input = Object.fromEntries(params);
                const output = login(input.username, input.password);

                response.writeHead(200, {'Content-Type':'application/json'});
                response.end(JSON.stringify(output));

            } catch (err) {
                response.writeHead(500);
                response.end(JSON.stringify({error: err.message}));
            }
        });
    }
}


// Handler para el registro de usuario
// Solo acepta peticiones POST. Extrae los datos del cuerpo de la petición y llama al servicio de creación de usuario
export async function register_handler(request, response) {
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
                const output = await register(input.username, input.password);

                // Devuelve la respuesta exitosa en formato JSON
                response.writeHead(200, { 'Content-Type':'application/json' });
                response.end(JSON.stringify(output));

            } catch (err) {
                // Si ocurre un error, responde con código 500 y el mensaje de error
                response.writeHead(500);
                response.end(JSON.stringify({ error: err.message }));
            }
        });
    } else {
        // Si el método no es POST, responde con error 405 (Método no permitido)
        response.writeHead(405, { 'Content-Type':'application/json' });
        response.end(JSON.stringify({ error: 'Método no permitido. Use POST.' }));
    }
}