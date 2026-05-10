-- =========================
-- ROLES
-- =========================

INSERT OR IGNORE INTO roles (id, name)
VALUES
(1, 'admin'),
(2, 'developer'),
(3, 'finance'),
(4, 'operator'),
(5, 'supervisor'),
(6, 'auditor');



-- =========================
-- USERS
-- =========================

INSERT OR IGNORE INTO users (id, username, password)
VALUES
(1, 'admin', '1234'),
(2, 'vero', '1234'),
(3, 'juan', '1234'),
(4, 'maria', '1234'),
(5, 'lucas', '1234'),
(6, 'camila', '1234'),
(7, 'franco', '1234'),
(8, 'sofia', '1234'),
(9, 'martin', '1234'),
(10, 'valentina', '1234'),
(11, 'nicolas', '1234'),
(12, 'julieta', '1234'),
(13, 'gonzalo', '1234'),
(14, 'carla', '1234'),
(15, 'federico', '1234');



-- =========================
-- USER_ROLES
-- =========================

INSERT OR IGNORE INTO user_roles (user_id, role_id)
VALUES
(1, 1),   -- admin -> admin
(2, 2),   -- vero -> developer
(3, 3),   -- juan -> finance
(4, 4),   -- maria -> operator
(5, 5),   -- lucas -> supervisor
(6, 6),   -- camila -> auditor
(7, 2),
(8, 4),
(9, 3),
(10, 5),
(11, 6),
(12, 2),
(13, 4),
(14, 3),
(15, 5);



-- =========================
-- ENDPOINTS
-- =========================

INSERT OR IGNORE INTO endpoints (id, path)
VALUES
(1, '/login'),
(2, '/register'),
(3, '/users'),
(4, '/deleteUser'),
(5, '/updateUser'),
(6, '/materials'),
(7, '/materials/create'),
(8, '/materials/delete'),
(9, '/stock'),
(10, '/reports'),
(11, '/reports/finance'),
(12, '/reports/audit'),
(13, '/dashboard'),
(14, '/settings'),
(15, '/roles');



-- =========================
-- ROLE_ENDPOINTS
-- =========================

INSERT OR IGNORE INTO role_endpoints (role_id, endpoint_id)
VALUES

-- ADMIN
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10),
(1, 11),
(1, 12),
(1, 13),
(1, 14),
(1, 15),

-- DEVELOPER
(2, 1),
(2, 3),
(2, 6),
(2, 9),
(2, 13),
(2, 14),

-- FINANCE
(3, 1),
(3, 9),
(3, 10),
(3, 11),
(3, 13),

-- OPERATOR
(4, 1),
(4, 6),
(4, 7),
(4, 8),
(4, 9),
(4, 13),

-- SUPERVISOR
(5, 1),
(5, 3),
(5, 6),
(5, 9),
(5, 10),
(5, 13),

-- AUDITOR
(6, 1),
(6, 10),
(6, 12),
(6, 13);