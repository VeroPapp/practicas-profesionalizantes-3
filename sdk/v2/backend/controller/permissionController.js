import {assignPermission, getPermissions, deletePermission} from '../services/permissionService.js';


export async function assign_permission_handler(request, response, config_data, db) {
    
    if (request.method === 'POST') {
        let body = '';

        request.on('data', chunk => {
            body += chunk.toString();
        });

        request.on('end', () => {
            try {
                const params = new URLSearchParams(body);
                const input = Object.fromEntries(params);
                const output = assignPermission(db, input.role_id, input.endpoint_id);

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


export function get_permissions_handler(request, response, db) {
   
    try {
        const output = getPermissions(db);

        response.writeHead(200,{
            'Content-Type':
                'application/json'
        });

        response.end(JSON.stringify(output));

    } catch (err){
        response.writeHead(500);
        response.end(JSON.stringify({error: err.message}));
    }
}


export async function delete_permission_handler(request, response, config_data, db) {
   
    if (request.method === 'POST') {
        let body = '';

        request.on('data', chunk => {
            body += chunk.toString();
        });

        request.on('end', () => {
            try {
                const params = new URLSearchParams(body);
                const input = Object.fromEntries(params);
                const output = deletePermission(db, input.role_id, input.endpoint_id);

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