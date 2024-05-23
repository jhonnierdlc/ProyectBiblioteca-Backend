require ('dotenv').config();
const express = require ("express");
const app = express();
const cors = require ('cors')
const connection =require("./db")
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const clientRoutes=require("./routes/client");
const rutalibro=require("./routes/libro");
const rutaprestamo=require("./routes/prestamo");
const rutaMulta=require("./routes/multa");
const rutaHistorialPrestamo = require("./routes/historialPrestamos");
//database
connection()



//middlewares
app.use(express.json());
app.use(cors());
//router

app.use("/api/client",clientRoutes)
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/libro', rutalibro);
app.use('/api/prestamo', rutaprestamo);
app.use('/api/multa', rutaMulta);
app.use('/api/historialPrestamos', rutaHistorialPrestamo);
//listenin on port

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));