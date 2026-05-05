const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(403).json({ message: "No hay token" });
    }

    try {
        // El formato suele ser "Bearer <token>", aquí lo limpiamos si es necesario
        const tokenLimpio = token.split(" ")[1] || token;

        const decoded = jwt.verify(tokenLimpio, process.env.JWT_SECRET || "secret_alternativo");
        req.coachId = decoded.id; // Guardamos el ID del coach para usarlo en las siguientes funciones
        next(); // Continuar a la siguiente función
    } catch (error) {
        return res.status(401).json({ message: "Token inválido o expirado" });
    }
};

module.exports = verificarToken;
