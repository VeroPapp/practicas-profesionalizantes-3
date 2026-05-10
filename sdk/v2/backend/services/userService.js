export function deleteUser(db, id) {
    const user = db.prepare(`
        SELECT id FROM users WHERE id = ?
    `).get(id);

    if (!user) {
        return {
            status: false,
            description: "USER_NOT_FOUND"
        };
    }
    
    const sql = `
        DELETE FROM users
        WHERE id = ?
    `;

    try {

        const stmt = db.prepare(sql);
        const result = stmt.run(id);

        if (result.changes === 0) {

            return {
                status: false,
                description: "USER_NOT_FOUND"
            };
        }

        return {
            status: true,
            description: "USER_DELETED"
        };

    } catch (err) {
        throw err;
    }
}


export function updateUser(db, id, username, password) {

    const query = `
        UPDATE users
        SET username = ?, password = ?
        WHERE id = ?
    `;

    const statement = db.prepare(query);
    const result = statement.run(username, password, id);

    if (result.changes === 0) {

        return {
            status: false,
            description: "USER_NOT_FOUND"
        };
    }

    return {
        status: true,
        description: "USER_UPDATED"
    };
}


export function getUsers(db) {
    const sql = `
        SELECT id, username
        FROM users
        ORDER BY id
    `;

    try {
        const stmt = db.prepare(sql);
        return stmt.all();
    } catch (err) {
        throw err;
    }
}
