import { createServer } from 'node:http';
import { URL } from 'node:url';
import { load_config } from './config/config.js';
import { connect_db } from './database/db.js';
import { createRouter } from './routes/routes.js';

const config_data = load_config();
const db = connect_db(config_data.database.path);

const router = createRouter(config_data, db);

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