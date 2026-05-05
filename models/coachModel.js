const db = require("../config/db");

const Coach = {
    buscarPorEmail: async (email) => {
        const [rows] = await db.query("SELECT * FROM coaches WHERE email = ?", [email]);
        return rows[0]; // Retorna el primer coach encontrado o undefined
    },
};

module.exports = Coach;
