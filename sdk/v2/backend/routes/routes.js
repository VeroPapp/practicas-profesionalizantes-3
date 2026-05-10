import { default_handler } from '../controller/viewController.js';
import { login_handler, register_handler } from '../controller/authController.js';
import { get_users_handler, delete_user_handler, update_user_handler } from '../controller/userController.js';
import { create_role_handler, get_roles_handler, delete_role_handler, update_role_handler  } from '../controller/roleController.js';
import { get_permissions_handler, delete_permission_handler, assign_permission_handler } from '../controller/permissionController.js';
import { get_user_roles_handler, delete_user_role_handler, assign_user_role_handler } from '../controller/userRoleController.js';

// Ruteo - relaciona rutas con funciones que las manejan (handlers) 
export function createRouter(config_data, db) {
    let router = new Map();

    router.set('/', (req, res) => default_handler(req, res, config_data));

    router.set('/login', (req, res) => login_handler(req, res, config_data, db));
    router.set('/register', (req, res) => register_handler(req, res, config_data, db));

    //gestion de usuarios
    router.set('/deleteUser', (req, res) => delete_user_handler(req, res, config_data, db));
    router.set('/updateUser', (req, res) => update_user_handler(req, res, config_data, db));
    router.set('/listUsers', (req, res) => get_users_handler(req, res, db));

    //gestion de roles
    router.set('/createRole', (req, res) => create_role_handler(req, res, config_data, db));
    router.set('/deleteRole', (req, res) => delete_role_handler(req, res, config_data, db));
    router.set('/updateRole', (req, res) => update_role_handler(req, res, config_data, db));
    router.set('/listRoles', (req, res) => get_roles_handler(req, res, db));

    //gestion de permisos
    router.set('/assignPermission', (req, res) => assign_permission_handler(req, res, config_data, db));
    router.set('/deletePermission', (req, res) => delete_permission_handler(req, res, config_data, db));
    router.set('/listPermissions', (req, res) => get_permissions_handler(req, res, db));

    //gestion de relaciones user-role
    router.set('/assignUserRole', (req, res) => assign_user_role_handler(req, res, config_data, db));
    router.set('/deleteUserRole', (req, res) => delete_user_role_handler(req, res, config_data, db));
    router.set('/listUserRoles', (req, res) => get_user_roles_handler(req, res, db));

    return router;
}