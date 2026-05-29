import { get_roles, create_role, delete_role, update_role } from '../services/roleService.js';


export async function create_role_handler(request, response) {
    
    if (request.method === 'POST') {
        let body = '';

        request.on('data', chunk => {
            body += chunk.toString();
        });

        request.on('end', () => {
            try {
                const params = new URLSearchParams(body);
                const input = Object.fromEntries(params);
                const output =  create_role(input.name);

                response.writeHead(200, {'Content-Type':'application/json'});
                response.end(JSON.stringify(output));

            } catch (err) {
                response.writeHead(500);
                response.end(JSON.stringify({error: err.message}));
            }
        });
    }
}


export function get_roles_handler(request, response) {
    
    try {
        const roles = get_roles();

        response.writeHead(200, {'Content-Type':'application/json'});
        response.end(JSON.stringify(roles));

    } catch (err){
        response.writeHead(500);
        response.end(JSON.stringify({error: err.message}));
    }
}


export async function update_role_handler(request, response){
    
    if (request.method === 'POST') {
        let body = '';

        request.on('data', chunk => {
            body += chunk.toString();
        });

        request.on('end', () => {
            try {
                const params = new URLSearchParams(body);
                const input = Object.fromEntries(params);
                const output = update_role(input.id, input.name);

                response.writeHead(200, {'Content-Type': 'application/json'});
                response.end(JSON.stringify(output));

            } catch (err) {
                response.writeHead(500);
                response.end(JSON.stringify({error: err.message}));
            }
        });
    }
}


export async function delete_role_handler(request, response) {
    
    if (request.method === 'POST') {
        let body = '';

        request.on('data', chunk => {
            body += chunk.toString();
        });

        request.on('end', () => {
            try {
                const params = new URLSearchParams(body);
                const input = Object.fromEntries(params);
                const output = delete_role(input.id);

                response.writeHead(200, {'Content-Type':'application/json'});
                response.end(JSON.stringify(output));

            } catch (err) {
                response.writeHead(500);
                response.end(JSON.stringify({error: err.message}));
            }
        });
    }
}