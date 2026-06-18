import { default_handler } from '../controller/viewController.js';
import { login_handler, register_handler } from '../controller/authController.js';
import { get_users_handler, delete_user_handler, update_user_handler } from '../controller/userController.js';
import { create_role_handler, get_roles_handler, delete_role_handler, update_role_handler  } from '../controller/roleController.js';
import { get_permissions_handler, delete_permission_handler, assign_permission_handler } from '../controller/permissionController.js';
import { get_user_roles_handler, delete_user_role_handler, assign_user_role_handler } from '../controller/userRoleController.js';

// Ruteo - relaciona rutas con funciones que las manejan (handlers) 
export function create_router() {
    return new Map();

}