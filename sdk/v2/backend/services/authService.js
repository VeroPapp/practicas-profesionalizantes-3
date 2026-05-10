// Lógica de negocio - crear usuario
export function register(db, username, password) {
    
    const exists = db.prepare(`
        SELECT id FROM users WHERE username = ?
        `).get(username);

    if (exists) {

        return {
            status: false,
            description: "USER_ALREADY_EXISTS"
        };
    }


    const sql = "INSERT INTO users (username, password) VALUES (?, ?) RETURNING id";

    try {
        const stmt = db.prepare(sql);
        const row = stmt.get(username, password);

        return {
            status: true,
            id: row.id,
            username: username,
            password: password
        };
    } catch (err) {

        throw err;
    }
}

export function login(db, username, password) {
    const sql = `
        SELECT *
        FROM users
        WHERE username = ?
    `;

    try {
        const stmt = db.prepare(sql);
        const user = stmt.get(username);

        // Usuario no encontrado
        if (!user) {
            return {
                status: false,
                description: 'USER_NOT_FOUND'
            };
        }

        // Contraseña incorrecta
        if (user.password !== password) {
            return {
                status: false,
                description: 'INVALID_PASSWORD'
            };
        }

        // Login correcto
        return {
            status: true,
            result: {
                id: user.id,
                username: user.username
            },
            description: null
        };
    } catch (err) {
        throw err;
    }
}