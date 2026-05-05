const express = require("express");
const cors = require("cors");
const coachRoutes = require("./routes/coachRoutes");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Usamos las rutas de coaches
app.use("/api/coaches", coachRoutes);

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
