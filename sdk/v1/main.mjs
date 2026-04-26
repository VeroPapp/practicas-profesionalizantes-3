import { createServer } from 'node:http';
import { URL } from 'node:url';
import { readFileSync } from 'node:fs';
import { load_config } from './config/config.js';
import { connect_db } from './database/db.js';
import { createUser, login } from './services/userService.js';
import { login_handler, register_handler } from './controllers/userController.js';
import { default_handler } from './controllers/viewController.js';
import { show_message_handler } from './controllers/testController.js';

const config_data = load_config();
const db = connect_db(config_data.database.path);


// Ruteo - relaciona rutas con funciones 
let router = new Map();
router.set('/', (req, res) => default_handler(req, res, config_data));
router.set('/login', (req, res) => login_handler(req, res, config_data));
router.set('/register', (req, res) => register_handler(req, res, config_data, db));
router.set('/showMessage', show_message_handler);
// router.set('/', default_handler);
// router.set('/login', login_handler);
// router.set('/register', register_handler);
// router.set('/showMessage', show_message_handler);

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