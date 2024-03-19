require ('dotenv').config();
const express = require ('express');
const app = express();
const cors = requiere ('cors')
const connection =require("./db")
const employees=require('./routes/employees')

//database
connection()



//middlewares
app.use(express.json());
app.use(cors());
//router
app.use("/api/employees", employees);
//listenin on port

const port = process.env.port||8080;
app.listen(port, () => console.log('Listening on port ${port}...'));