import { database } from "../database/db.js";

const db = database.get_connection();


export function create_role(name) {

    const exists = db.prepare(`
        SELECT id FROM roles WHERE name = ?
    `).get(name);

    if (exists) {
        return {
            status: false,
            description: "ROLE_ALREADY_EXISTS"
        };
    }

    const sql = `
        INSERT INTO roles (name)
        VALUES (?)
        RETURNING id
    `;

    try {
        const stmt = db.prepare(sql);
        const row = stmt.get(name);

        return {
            status: true,
            description: "ROLE_CREATED",
            id: row.id,
            name
        };

    } catch (err) {
        throw err;
    }
}


export function delete_role(id) {

    const role = db.prepare(`
        SELECT id FROM roles WHERE id = ?
    `).get(id);

    if (!role) {
        return {
            status: false,
            description: "ROLE_NOT_FOUND"
        };
    }

    const sql = `
        DELETE FROM roles
        WHERE id = ?
    `;

    try {
        const stmt = db.prepare(sql);
        const result = stmt.run(id);

        if (result.changes === 0) {
            return {
                status: false,
                description: "ROLE_NOT_FOUND"
            };
        }

        return {
            status: true,
            description: "ROLE_DELETED"
        };

    } catch (err) {

        if (err.message.includes("FOREIGN KEY")) {
            return {
                status: false,
                description: "ROLE_HAS_USERS"
            };
        }

        throw err;
    }
}


export function update_role(id, name) {

    const role = db.prepare(`
        SELECT id FROM roles WHERE id = ?
    `).get(id);

    if (!role) {
        return {
            status: false,
            description: "ROLE_NOT_FOUND"
        };
    }

    const exists = db.prepare(`
        SELECT id FROM roles WHERE name = ?
    `).get(name);

    if (exists) {
        return {
            status: false,
            description: "ROLE_ALREADY_EXISTS"
        };
    }

    const sql = `
        UPDATE roles
        SET name = ?
        WHERE id = ?
    `;

    try {
        const stmt = db.prepare(sql);
        const result = stmt.run(name, id);

        if (result.changes === 0) {
            return {
                status: false,
                description: "ROLE_NOT_FOUND"
            };
        }

        return {
            status: true,
            description: "ROLE_UPDATED"
        };

    } catch (err) {
        throw err;
    }
}


export function get_roles() {
    const sql =
        `
        SELECT *
        FROM roles
        `;

    try {
        const stmt = db.prepare(sql);
        return stmt.all();

    } catch (err) {
        throw err;
    }
}
