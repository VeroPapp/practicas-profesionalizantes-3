export function assignRoleToUser(db, user_id, role_id) {
    
    // validar usuario
    const user = db.prepare(`
        SELECT id FROM users WHERE id = ?
    `).get(user_id);

    if (!user) {
        return {
            status: false,
            description: "USER_NOT_FOUND"
        };
    }

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

    // validar si ya existe la relacion
    const exists = db.prepare(`
        SELECT 1 FROM user_roles
        WHERE user_id = ? AND role_id = ?
    `).get(user_id, role_id);

    if (exists) {
        return {
            status: false,
            description: "ROLE_ALREADY_ASSIGNED_TO_USER"
        };
    }

    //insertar relacion
    const sql =
        `
        INSERT INTO user_roles (user_id, role_id)
        VALUES (?, ?)
        `;

    try {
        const stmt = db.prepare(sql);

        stmt.run(user_id, role_id);

        return {
            status: true,
            description: "ROLE_ASSIGNED_TO_USER"
        };

    } catch (err) {
        throw err;
    }
}


export function deleteUserRole(db, user_id, role_id) {
        
    // validar usuario
    const user = db.prepare(`
        SELECT id FROM users WHERE id = ?
    `).get(user_id);

    if (!user) {
        return {
            status: false,
            description: "USER_NOT_FOUND"
        };
    }

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

    // eliminar relacion
    const sql =
        `
        DELETE FROM user_roles
        WHERE user_id = ? AND role_id = ?
        `
    ;

    try{ 
        const stmt = db.prepare(sql);
        const result = stmt.run(user_id, role_id);

        if (result.changes === 0) {
            return {
                status: false,
                description: "ROLE_NOT_FOUND_FOR_USER"
            };
        }

        return {
            status: true,
            description: "ROLE_REMOVED_FROM_USER"
        };

    } catch (err) {
        throw err;
    }
}


export function getUserRoles(db) {
    
    const sql =
        `
        SELECT
            users.id AS user_id,
            users.username,

            roles.id AS role_id,
            roles.name AS role_name

        FROM user_roles

        INNER JOIN users
            ON user_roles.user_id = users.id

        INNER JOIN roles
            ON user_roles.role_id = roles.id
        
        ORDER BY users.id
        `;

    try {
        const stmt = db.prepare(sql);
        return stmt.all();

    } catch (err) {
        throw err;
    }
}