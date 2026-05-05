const mysql = require("mysql2");

// Crea el grupo de conexiones (Pool)
const pool = mysql.createPool({
    host: "localhost",
    user: "root", // Tu usuario de MySQL
    password: "191214",
    database: "fitner_db",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

module.exports = pool.promise();
