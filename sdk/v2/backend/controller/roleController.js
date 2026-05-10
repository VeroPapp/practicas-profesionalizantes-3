import { getRoles, createRole, deleteRole, updateRole } from '../services/roleService.js';


export async function create_role_handler(request, response, config_data, db) {
    
    if (request.method === 'POST') {
        let body = '';

        request.on('data', chunk => {
            body += chunk.toString();
        });

        request.on('end', () => {
            try {
                const params = new URLSearchParams(body);
                const input = Object.fromEntries(params);
                const output =  createRole(db, input.name);

                response.writeHead(200, {
                    'Content-Type': 
                        'application/json'
                });

                response.end(JSON.stringify(output));

            } catch (err) {
                response.writeHead(500);
                response.end(JSON.stringify({error: err.message}));
            }
        });
    }
}


export function get_roles_handler(request, response, db) {
    
    try {
        const roles = getRoles(db);

        response.writeHead(200, {
            'Content-Type': 
                'application/json'
        });

        response.end(JSON.stringify(roles));

    } catch (err){
        response.writeHead(500);
        response.end(JSON.stringify({error: err.message}));
    }
}


export async function delete_role_handler(request, response, config_data, db) {
    
    if (request.method === 'POST') {
        let body = '';

        request.on('data', chunk => {
            body += chunk.toString();
        });

        request.on('end', () => {
            try {
                const params = new URLSearchParams(body);
                const input = Object.fromEntries(params);
                const output = deleteRole( db, input.id);

                response.writeHead(200, {
                    'Content-Type': 
                        'application/json'
                });

                response.end(JSON.stringify(output));

            } catch (err) {
                response.writeHead(500);
                response.end(JSON.stringify({error: err.message}));
            }
        });
    }
}


export async function update_role_handler(request, response, config_data, db){
    
    if (request.method === 'POST') {
        let body = '';

        request.on('data', chunk => {
            body += chunk.toString();
        });

        request.on('end', () => {
            try {
                const params = new URLSearchParams(body);
                const input = Object.fromEntries(params);
                const output = updateRole(db, input.id, input.name);

                response.writeHead(200, {
                    'Content-Type': 
                        'application/json'
                });

                response.end(JSON.stringify(output));

            } catch (err) {
                response.writeHead(500);
                response.end(JSON.stringify({error: err.message}));
            }
        });
    }
}