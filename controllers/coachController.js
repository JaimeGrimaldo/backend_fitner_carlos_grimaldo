const Coach = require("../models/coachModel");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const coach = await Coach.buscarPorEmail(email);
        const primerCoach = coach[0];
        if (!primerCoach) {
            return res.status(404).json({ message: "El coach no existe" });
        }

        if (!req.body) {
            return res.status(500).json({ message: "No llegan los datos." });
        }

        // Por ahora comparamos texto plano (luego usaremos bcrypt)
        if (primerCoach.password !== password) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign(
            { id: primerCoach.id_coach, nombre: primerCoach.nombre_completo },
            process.env.JWT_SECRET || "secret_alternativo",
            { expiresIn: "24h" }, // El token expira en un día
        );
        // Si todo está bien, respondemos con éxito
        res.status(200).json({
            message: "Login exitoso",
            user: { id: primerCoach.id_coach, nombre: primerCoach.nombre_completo },
            token: token,
        });
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
};

const registrar = async (req, res) => {
    const { nombre_completo, email, password } = req.body;
    console.log("Datos recibidos: ", req.body);
    try {
        // 1. Verificar si el email ya existe
        const usuarios = await Coach.buscarPorEmail(email);

        // Si 'usuarios' es undefined por algún error en el modelo, esto fallará.
        // Agregamos una validación de seguridad:
        if (usuarios && usuarios.length > 0) {
            return res.status(400).json({ message: "El correo ya está registrado" });
        }

        if (!nombre_completo || !email || !password) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }
        // 3. Guardar en la DB
        await Coach.crear({
            nombre_completo,
            email,
            password,
        });

        res.status(201).json({ message: "Cuenta creada exitosamente" });
    } catch (error) {
        console.error("Error detallado: ", error);
        res.status(500).json({ error: "Error al registrar el coach" });
    }
};

module.exports = { login, registrar };
