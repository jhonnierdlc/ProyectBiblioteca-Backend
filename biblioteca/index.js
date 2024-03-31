require ('dotenv').config();
const express = require ("express");
const app = express();
const cors = require ('cors')
const connection =require("./db")
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const cliente = require("./routes/client")
//database
connection()



//middlewares
app.use(express.json());
app.use(cors());
//router

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
//listenin on port

const port = process.env.port||8080;
app.listen(port, () => console.log('Listening on port ${port}...'));