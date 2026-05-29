import { assign_permission, get_permissions, delete_permission } from '../services/permissionService.js';

export async function assign_permission_handler(request, response) {
    
    if (request.method === 'POST') {
        let body = '';

        request.on('data', chunk => {
            body += chunk.toString();
        });

        request.on('end', () => {
            try {
                const params = new URLSearchParams(body);
                const input = Object.fromEntries(params);
                const output = assign_permission(input.role_id, input.endpoint_id);

                response.writeHead(200, {'Content-Type':'application/json'});
                response.end(JSON.stringify(output));

            } catch (err) {
                response.writeHead(500);
                response.end(JSON.stringify({error: err.message}));
            }
        });
    }
}


export function get_permissions_handler(request, response) {
   
    try {
        const output = get_permissions();

        response.writeHead(200,{'Content-Type':'application/json'});
        response.end(JSON.stringify(output));

    } catch (err){
        response.writeHead(500);
        response.end(JSON.stringify({error: err.message}));
    }
}


export async function delete_permission_handler(request, response) {
   
    if (request.method === 'POST') {
        let body = '';

        request.on('data', chunk => {
            body += chunk.toString();
        });

        request.on('end', () => {
            try {
                const params = new URLSearchParams(body);
                const input = Object.fromEntries(params);
                const output = delete_permission(input.role_id, input.endpoint_id);

                response.writeHead(200, {'Content-Type':'application/json'});
                response.end(JSON.stringify(output));

            } catch (err) {
                response.writeHead(500);
                response.end(JSON.stringify({error: err.message}));
            }
        });
    }
}