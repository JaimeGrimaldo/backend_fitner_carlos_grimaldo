const Coach = require("../models/coachModel");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const coach = await Coach.buscarPorEmail(email);

        if (!coach) {
            return res.status(404).json({ message: "El coach no existe" });
        }

        if (!req.body) {
            return res.status(500).json({ message: "No llegan los datos." });
        }

        // Por ahora comparamos texto plano (luego usaremos bcrypt)
        if (coach.password !== password) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign(
            { id: coach.id_coach, nombre: coach.nombre_completo },
            process.env.JWT_SECRET || "secret_alternativo",
            { expiresIn: "24h" }, // El token expira en un día
        );
        // Si todo está bien, respondemos con éxito
        res.status(200).json({
            message: "Login exitoso",
            user: { id: coach.id_coach, nombre: coach.nombre_completo },
            token: token,
        });
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
};

module.exports = { login };
