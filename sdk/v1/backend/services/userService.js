// Lógica de negocio - crear usuario
export function createUser(db, username, password) {
    const sql = "INSERT INTO user (username, password) VALUES (?, ?) RETURNING id";

    try {
        const stmt = db.prepare(sql);
        const row = stmt.get(username, password);

        return {
            id: row.id,
            username: username,
            password: password
        };
    } catch (err) {
        throw err;
    }
}

//simula un proceso de login, recibe un objeto con username y password, compara con los datos hardcodeados y devuelve un objeto con el resultado del proceso
export function login(input)
{
    const userdata =
    {
        username: 'admin',
        password: '1234'
    };

    let output =
    {
        status: false,
        result: null,
        description: 'INVALID_USER_PASS'
    };

    if (input.username === userdata.username && input.password === userdata.password)
    {
        output.status = true;
        output.result = input.username;
        output.description = null;
    }

    return output;
}
