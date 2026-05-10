CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS roles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS user_roles (
    user_id INTEGER NOT NULL,
    role_id INTEGER NOT NULL,

    PRIMARY KEY(user_id, role_id), -- Evita duplicados

    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(role_id) REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS endpoints (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    path TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS role_endpoints (
    role_id INTEGER NOT NULL,
    endpoint_id INTEGER NOT NULL,

    PRIMARY KEY(role_id, endpoint_id), -- Evita duplicados

    FOREIGN KEY(role_id) REFERENCES roles(id),
    FOREIGN KEY(endpoint_id) REFERENCES endpoints(id)
);