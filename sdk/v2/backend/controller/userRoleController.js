import { assign_role_to_user, get_user_roles, delete_user_role } from '../services/userRoleService.js';


export async function assign_user_role_handler(request, response) {
    
    if (request.method === 'POST') {
        let body = '';

        request.on('data', chunk => {
            body += chunk.toString();
        });

        request.on('end', () => {
            try {
                const params = new URLSearchParams(body);
                const input = Object.fromEntries(params);
                const output = assign_role_to_user(input.user_id, input.role_id);

                response.writeHead(200, {'Content-Type':'application/json'});
                response.end(JSON.stringify(output));

            } catch (err) {
                response.writeHead(500);
                response.end(JSON.stringify({error: err.message}));
            }
        });
    }
}


export function get_user_roles_handler(request, response){
    
    try {
        const output = get_user_roles();

        response.writeHead(200, {'Content-Type':'application/json'});
        response.end(JSON.stringify(output));

    } catch (err) {
        response.writeHead(500);
        response.end(JSON.stringify({error: err.message}));
    }
}


export async function delete_user_role_handler(request, response){

    if (request.method === 'POST') {
        let body = '';

        request.on('data', chunk => {
            body += chunk.toString();
        });

        request.on('end', () => {
            try {
                const params = new URLSearchParams(body);
                const input = Object.fromEntries(params);
                const output = delete_user_role(input.user_id, input.role_id);

                response.writeHead(200, {'Content-Type':'application/json'});
                response.end(JSON.stringify(output));

            } catch (err) {
                response.writeHead(500);
                response.end(JSON.stringify({error: err.message}));
            }
        });
    }
}