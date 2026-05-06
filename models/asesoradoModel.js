const db = require("../config/db");

const Asesorado = {
    crear: async (datos) => {
        const query = "INSERT INTO asesorados SET ?";
        // 'datos' será un objeto con: id_coach, nombre_completo, edad, sexo, actividad_fisica, altura_inicial, enfermedades_observaciones, meta_peso, peso_actual e id_plan_coach
        const [result] = await db.query(query, datos);
        return result;
    },

    listarPorCoach: async (id_coach) => {
        const query = `
            SELECT id_asesorado, nombre_completo, peso_actual, meta_peso, edad, sexo 
            FROM asesorados 
            WHERE id_coach = ? 
            ORDER BY nombre_completo ASC`;
        const [rows] = await db.query(query, [id_coach]);
        return rows;
    },
};

module.exports = Asesorado;
