import { getUsers, deleteUser, updateUser } from '../services/userService.js';

export function get_users_handler(request, response, db) {
    try {
        const users = getUsers(db);

        response.writeHead(200, {'Content-Type': 'application/json'});

        response.end(JSON.stringify(users));

    } catch (err) {
        response.writeHead(500);

        response.end(JSON.stringify({error: err.message}));
    }
}


export async function delete_user_handler(request, response, config_data, db) {
    if (request.method === 'POST') {
        let body = '';

        request.on('data', chunk => {
            body += chunk.toString();
        });

        request.on('end', () => {
            try {
                const params = new URLSearchParams(body);
                const input = Object.fromEntries(params);
                const output = deleteUser(db, input.id);

                response.writeHead(200, {'Content-Type': 'application/json'});

                response.end(JSON.stringify(output));

            } catch (err) {
                response.writeHead(500);
                response.end(JSON.stringify({error: err.message}));
            }
        });
    }
}


export async function update_user_handler(request, response, config_data, db) {

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
                const output = updateUser(db, input.id, input.username, input.password);

                // RESPUESTA OK
                response.writeHead(200, {
                    'Content-Type': 
                        'application/json'
                });

                response.end(JSON.stringify(output));

            } catch (err) {

                response.writeHead(500, {
                    'Content-Type': 
                        'application/json'
                });

                response.end(JSON.stringify({error: err.message}));
            }
        });

    } else {

        // MÉTODO NO PERMITIDO
        response.writeHead(405, {
            'Content-Type': 'application/json'
        });

        response.end(JSON.stringify({
            error: 'Método no permitido'
        }));
    }
}