import { default_handler } from '../controller/viewController.js';
import { login_handler, register_handler } from '../controller/authController.js';
import { get_users_handler, delete_user_handler, update_user_handler } from '../controller/userController.js';
import { create_role_handler, get_roles_handler, delete_role_handler, update_role_handler  } from '../controller/roleController.js';
import { get_permissions_handler, delete_permission_handler, assign_permission_handler } from '../controller/permissionController.js';
import { get_user_roles_handler, delete_user_role_handler, assign_user_role_handler } from '../controller/userRoleController.js';

// Ruteo - relaciona rutas con funciones que las manejan (handlers) 
export function create_router() {
    let router = new Map();

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

    return router;
}