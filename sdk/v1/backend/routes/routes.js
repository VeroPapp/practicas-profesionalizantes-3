import { login_handler, register_handler } from '../controller/userController.js';
import { default_handler } from '../controller/viewController.js';
import { show_message_handler } from '../controller/testController.js';

// Ruteo - relaciona rutas con funciones que las manejan (handlers) 

export function createRouter(config_data, db) {
    let router = new Map();

    router.set('/', (req, res) => default_handler(req, res, config_data));
    router.set('/login', (req, res) => login_handler(req, res, config_data, db));
    router.set('/register', (req, res) => register_handler(req, res, config_data, db));
    router.set('/showMessage', show_message_handler);

    return router;
}