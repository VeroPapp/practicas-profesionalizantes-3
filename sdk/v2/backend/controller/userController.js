import { get_users, delete_user, update_user } from '../services/userService.js';

export function get_users_handler(request, response) {
    try {
        const users = get_users();

        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(users));

    } catch (err) {
        response.writeHead(500);
        response.end(JSON.stringify({error: err.message}));
    }
}


export async function update_user_handler(request, response) {

    if (request.method === 'POST') {

        let body = '';

        request.on('data', chunk => {
            body += chunk.toString();
        });

        request.on('end', () => {

            try {

                // CONVERTIR BODY A OBJETO
                const params = new URLSearchParams(body);
                const input = Object.fromEntries(params);
                // ACTUALIZAR USUARIO
                const output = update_user(input.id, input.username, input.password);

                // RESPUESTA OK
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.end(JSON.stringify(output));

            } catch (err) {

                response.writeHead(500, {'Content-Type': 'application/json'});
                response.end(JSON.stringify({error: err.message}));
            }
        });

    } else {

        // MÉTODO NO PERMITIDO
        response.writeHead(405, {'Content-Type': 'application/json'});
        response.end(JSON.stringify({error: 'Método no permitido'}));
    }
}


export async function delete_user_handler(request, response) {
    if (request.method === 'POST') {
        let body = '';

        request.on('data', chunk => {
            body += chunk.toString();
        });

        request.on('end', () => {
            try {
                const params = new URLSearchParams(body);
                const input = Object.fromEntries(params);
                const output = delete_user(input.id);

                response.writeHead(200, {'Content-Type':'application/json'});
                response.end(JSON.stringify(output));

            } catch (err) {
                response.writeHead(500);
                response.end(JSON.stringify({error: err.message}));
            }
        });
    }
}