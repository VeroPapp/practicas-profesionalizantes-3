import { createServer } from 'node:http';
import { URL } from 'node:url';
import { config_data } from './config/config.js';
import { database } from './database/db.js';
import { create_router } from './routes/routes.js';


database.initialize();

const router = create_router();

router.set('/', default_handler);

router.set('/login', login_handler);
router.set('/register', register_handler);

//gestion de usuarios
router.set('/deleteUser', delete_user_handler);
router.set('/updateUser', update_user_handler);
router.set('/listUsers', get_users_handler);

//gestion de roles
router.set('/createRole', create_role_handler);
router.set('/deleteRole', delete_role_handler);
router.set('/updateRole', update_role_handler);
router.set('/listRoles', get_roles_handler);

//gestion de permisos
router.set('/assignPermission', assign_permission_handler);
router.set('/deletePermission', delete_permission_handler);
router.set('/listPermissions', get_permissions_handler);

//gestion de relaciones user-role
router.set('/assignUserRole', assign_user_role_handler);
router.set('/deleteUserRole', delete_user_role_handler);
router.set('/listUserRoles', get_user_roles_handler);

// Dispatcher - recibe las peticiones, las procesa y las redirige al manejador correspondiente (decide qué handler usar)
// esta función se ejecuta cada vez que llega una petición
async function request_dispatcher(request, response) {
    const url = new URL(request.url, 'http://' + config_data.server.ip);
    const path = url.pathname;
    const handler = router.get(path);

    if (handler) {
        return await handler(request, response);
    } else {
        response.writeHead(404);
        response.end('Método no encontrado');
    }
}

//solo imprime un mensaje en la consola indicando que el servidor se está ejecutando y en qué dirección y puerto lo está haciendo
function start() {
    console.log('✅ Servidor ejecutándose en http://' + config_data.server.ip + ':' + config_data.server.port);
}

let server = createServer(request_dispatcher);
server.listen(config_data.server.port, config_data.server.ip, start);