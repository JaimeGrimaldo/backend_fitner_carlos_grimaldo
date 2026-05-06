const express = require("express");
const cors = require("cors");
const coachRoutes = require("./routes/coachRoutes");
const asesoradoRoutes = require("./routes/asesoradoRoutes");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`Petición recibida: ${req.method} ${req.url}`);
    next();
});
// Usamos las rutas de coaches
app.use("/api/coaches", coachRoutes);
app.use("/api/asesorados", asesoradoRoutes);

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
