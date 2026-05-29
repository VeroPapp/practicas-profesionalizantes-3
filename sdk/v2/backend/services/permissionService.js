import { database } from '../database/db.js';

const db = database.get_connection();

export function assign_permission(role_id, endpoint_id) {

    // validar rol
    const role = db.prepare(`
        SELECT id FROM roles WHERE id = ?
    `).get(role_id);

    if (!role) {
        return {
            status: false,
            description: "ROLE_NOT_FOUND"
        };
    }

    // validar endpoint
    const endpoint = db.prepare(`
        SELECT id FROM endpoints WHERE id = ?
    `).get(endpoint_id);

    if (!endpoint) {
        return {
            status: false,
            description: "ENDPOINT_NOT_FOUND"
        };
    }

    // validar si ya existe el permiso
    const exists = db.prepare(`
        SELECT 1 FROM role_endpoints
        WHERE role_id = ? AND endpoint_id = ?
    `).get(role_id, endpoint_id);

    if (exists) {
        return {
            status: false,
            description: "PERMISSION_ALREADY_EXISTS"
        };
    }

    // insertar permiso
    const sql =
        `
        INSERT INTO role_endpoints (role_id, endpoint_id)
        VALUES (?, ?)
        `;

        try {
            const stmt = db.prepare(sql);

            stmt.run(role_id, endpoint_id);

            return {
                status: true,
                description: "PERMISSION_ASSIGNED"
            };
        } catch (err) {
            throw err;
        }   
}


export function delete_permission(role_id, endpoint_id) {

    // validar rol
    const role = db.prepare(`
        SELECT id FROM roles WHERE id = ?
    `).get(role_id);

    if (!role) {
        return {
            status: false,
            description: "ROLE_NOT_FOUND"
        };
    }

    // validar endpoint
    const endpoint = db.prepare(`
        SELECT id FROM endpoints WHERE id = ?
    `).get(endpoint_id);

    if (!endpoint) {
        return {
            status: false,
            description: "ENDPOINT_NOT_FOUND"
        };
    }

    // eliminar permiso
    const sql =
        `
        DELETE FROM role_endpoints
        WHERE role_id = ? AND endpoint_id = ?
        `
    ;
    
    try {
        const stmt = db.prepare(sql);
        const result = stmt.run(role_id, endpoint_id);

        if (result.changes === 0) {
            return {
                status: false,
                description: "PERMISSION_NOT_FOUND"
            };
        }

        return {
            status: true,
            description: "PERMISSION_DELETED"
        };
        
    } catch (err) {
        throw err;
    }
}


export function get_permissions() {
    const sql =
        `
        SELECT
            roles.id AS role_id,
            roles.name AS role_name,

            endpoints.id AS endpoint_id,
            endpoints.path

        FROM role_endpoints

        INNER JOIN roles
            ON role_endpoints.role_id = roles.id

        INNER JOIN endpoints
            ON role_endpoints.endpoint_id = endpoints.id
        `;

    try {
        const stmt = db.prepare(sql);
        return stmt.all();

    } catch (err){
        throw err;
    }
}
