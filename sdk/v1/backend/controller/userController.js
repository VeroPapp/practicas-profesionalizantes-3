import { URL } from 'node:url';
import { createUser, login } from '../services/userService.js';

export async function login_handler(request, response, config_data, db)
{
    const url = new URL(request.url, 'http://' + config_data.server.ip);
    const input = Object.fromEntries(url.searchParams);

    const output = login(input);

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(output));
}


export async function register_handler(request, response, config_data, db)
{
    //Caso GET
    const url = new URL(request.url, 'http://' + config_data.server.ip);
    const input = Object.fromEntries(url.searchParams);

    try 
    {
        const output = createUser(db, input.username, input.password);

        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(output));
    }
    catch (err)
    {
        response.writeHead(500);
        response.end(JSON.stringify({ error: err.message }));
    }
}