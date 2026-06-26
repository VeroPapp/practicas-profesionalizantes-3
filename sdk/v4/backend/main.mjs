import { createServer } from 'node:http';
import { URL } from 'node:url';
import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { resolve } from 'node:path';
import crypto from 'node:crypto';


function default_config() {
    const config = {
        server: {
            ip: '127.0.0.1',
            port: 8080,
        },

        database: {
            path: './database.db'
        }
    };
    
    return config;
}

function load_config() {
    let config = null;
    try {
        const data = readFileSync('./config.json', 'utf-8');
        config = JSON.parse(data);
        console.log("Configuración cargada correctamente.");
    } catch (error) {
        console.error("Error cargando config.json. Usando valores por defecto.");
        config = default_config();
    }
    
    return config;
}

const config = load_config();

function connect_db(path) {
    const dbPath = resolve(path);
    try {
        const db = new DatabaseSync(dbPath);
        return db;
    } catch (err) {
        throw new Error("Error al conectar a la base de datos: " + err.message);
    }
}

function hash_password(password) {
    return crypto
        .createHash('sha256')
        .update(password)
        .digest('hex');
}

const db = connect_db(config.database.path);

let user_sessions = new Map();

class UserSession {
    constructor(username) {
       this.status = 'enabled';
       this.name = username;
    }
}

function authenticate(username, password) {
    const sql = "SELECT count(*) as total FROM `user` WHERE username=? AND password_hash=?";

    const password_hash = hash_password(password);

    try {
        const stmt = db.prepare(sql);
        const row = stmt.get(username, password_hash);
            
        return (row.total === 1);
    } catch (err) {
        throw err;
    }
}


function authorize(username, endpoint_path) {
    const sql = `
        SELECT count(*) as total
        FROM access a
        JOIN members m ON a.id_group = m.id_group
        JOIN user u ON m.id_user = u.id
        JOIN endpoint e ON a.id_endpoint = e.id
        WHERE u.username = ? 
          AND e.path = ?
    `;

    try {
        const stmt = db.prepare(sql);
        // Pasamos los parámetros en el orden de los signos de interrogación
        const row = stmt.get(username, endpoint_path);

        // Si el conteo es mayor a 0, tiene permiso
        return row.total > 0;
    } catch (err) {
        console.error("Error consultando permisos:", err);
        throw err;
    }
}

function login(username, password) {
    console.log("Intentando login:", username);

    const is_authenticated = authenticate(username,password);

    if (!is_authenticated){
        console.log("Login incorrecto");

        return null;
    }

    let session = user_sessions.get(username);

    // =====================================
    // NO EXISTE SESION
    // =====================================

    if (session == undefined) {
        console.log("Creando nueva sesión");

        session = new UserSession(username);

        user_sessions.set(username, session);

    } else {
        console.log("Reutilizando sesión");
        session.status = 'enabled';
    }

    return session;
}

function logout(username, password) {
    let is_authenticated = authenticate(username, password);

    if (is_authenticated)
    {
        let currentSession = user_sessions.get(username);
        currentSession.status = 'disabled';
    }
}

function validate_session(username) {
    const session = user_sessions.get(username);

    return (
        session !== undefined &&
        session.status === 'enabled'
    );
}


async function create_user(db, username, password) {

    const password_hash = hash_password(password);

    const sql = `INSERT INTO user (username, password_hash) VALUES(?, ?)`;

    try {

        const stmt = db.prepare(sql);

        const result = stmt.run(username, password_hash);

        return {
            status: true,
            username: username
        };

    }
    catch (err) {

        throw err;
    }
}


async function login_handler(request, response) {
    if (request.method !== 'POST') {

        response.writeHead(405, { 'Content-Type': 'application/json' });

        response.end(JSON.stringify({error: 'Método no permitido. Usa POST.'}));

        return;
    }

    try {

        const username = request.headers['x-user-id'];

        const password = request.headers['x-api-key'];

        const output = login(username, password);

        response.writeHead(200, { 'Content-Type': 'application/json' });

        response.end(JSON.stringify(output));

    } catch (err) {

        response.writeHead(500, { 'Content-Type': 'application/json' });

        response.end(JSON.stringify({error: err.message}));

    }
}


async function register_handler(request, response) {

    if (request.method === 'POST') {

        let body = '';

        request.on('data', chunk => {
            body += chunk.toString();
        });

        request.on('end', async () => {

            try {

                const input = JSON.parse(body);

                const output =
                    await create_user(
                        db,
                        input.username,
                        input.password
                    );

                response.writeHead(200, {'Content-Type': 'application/json'});
                response.end(JSON.stringify(output));

            }
            catch (err) {

                response.writeHead(500,{'Content-Type':'application/json'});
                response.end(JSON.stringify({error: err.message}));
            }
        });
    }
}


function log_handler(request, response) {
    console.log("Endpoint /log ejecutado");

    response.writeHead(200, {'Content-Type':'application/json'});

    response.end(JSON.stringify({message:"LOG_OK"}));
}

function say_hello_handler(request, response) {
    console.log("Endpoint /sayHello ejecutado");

    response.writeHead(200, {'Content-Type':'application/json'});

    response.end(JSON.stringify({message:"HELLO_OK"}));
}

let router = new Map();
router.set('/login', login_handler);
router.set('/register', register_handler);

router.set('/log', log_handler);
router.set('/sayHello', say_hello_handler);

const public_endpoints = [
    '/login',
    '/register'
];


async function request_dispatcher(request, response) {
    response.setHeader(
        'Access-Control-Allow-Origin',
        '*'
    );

    response.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS'
    );

    response.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, x-user-id, x-api-key, x-api-version'
    );

    if (request.method === 'OPTIONS')
    {
        response.writeHead(204);
        response.end();
        return;
    }


    const url = new URL(request.url, 'http://' + config.server.ip);

    const path = url.pathname;

    console.log("Endpoint solicitado:", path);

    const handler = router.get(path);

    if (!handler) {
        response.writeHead(404);

        response.end(
            'Método no encontrado'
        );

        return;
    }

    // =====================================
    // DENEGADO POR DEFECTO
    // =====================================

    let access_granted = false;

    // =====================================
    // ENDPOINT PUBLICO
    // =====================================

    const is_public = public_endpoints.includes(path);

    if (is_public) {
        access_granted = true;
    }
    else {
        const username = request.headers['x-user-id'] || null;

        console.log("Usuario recibido:", username);

        const valid_session = validate_session(username);

        console.log("Sesión válida:", valid_session);

        if (valid_session) {

            const allowed = authorize(username, path);

            console.log("Autorizado:", allowed);

            if (allowed) {
                access_granted = true;
            }
        }
    }

    // =====================================
    // EJECUTAR O DENEGAR
    // =====================================

    if (access_granted) {
        return await handler(request,response);
    }

    response.writeHead(403, {'Content-Type': 'application/json'});
    response.end(JSON.stringify({error: "ACCESS_DENIED"})
    );
}

function start() {
    console.log('Servidor ejecutándose en http://' + config.server.ip + ':' + config.server.port);
}

let server = createServer(request_dispatcher);
server.listen(config.server.port, config.server.ip, start);