import { createServer } from 'node:http';
import { URL } from 'node:url';
import { readFileSync } from 'node:fs';
import { load_config } from './config/config.js';
import { connect_db } from './database/db.js';
import { createUser, login } from './services/userService.js';

const config_data = load_config();
const db = connect_db(config_data.database.path);




// Manejadores
async function login_handler(request, response)
{
    const url = new URL(request.url, 'http://' + config_data.server.ip);
    const input = Object.fromEntries(url.searchParams);

    const output = login(input);

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(output));
}



function default_handler(request, response)
{
    try 
    {
        const html = readFileSync(config_data.server.default_path, 'utf-8');
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(html);
    } 
    catch (error) 
    {
        response.writeHead(500);
        response.end('Error interno: No se pudo cargar la vista principal.');
    }
}



async function register_handler(request, response)
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



//sirve para probar que el servidor responde
function show_message_handler(request, response)
{
    console.log("Petición recibida: Mostrando mensaje en el servidor!");
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ message: "Mensaje procesado" }));
}





// Ruteo - relaciona rutas con funciones 
let router = new Map();
router.set('/', default_handler);
router.set('/login', login_handler);
router.set('/register', register_handler);
router.set('/showMessage', show_message_handler);

// Dispatcher - recibe las peticiones, las procesa y las redirige al manejador correspondiente (decide qué handler usar)
async function request_dispatcher(request, response)
{
    const url = new URL(request.url, 'http://' + config_data.server.ip);
    const path = url.pathname;
    const handler = router.get(path);

    if (handler)
    {
        return await handler(request, response);
    }
    else
    {
        response.writeHead(404);
        response.end('Método no encontrado');
    }
}

//solo imprime un mensaje en la consola indicando que el servidor se está ejecutando y en qué dirección y puerto lo está haciendo
function start()
{
    console.log('Servidor ejecutándose en http://' + config_data.server.ip + ':' + config_data.server.port);
}

let server = createServer(request_dispatcher);
server.listen(config_data.server.port, config_data.server.ip, start);