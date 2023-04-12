const express= require('express');
const app = express();
const cors = require('cors')
const db = require("./database/main.js")

const patientRoutes = require("./routes/patientRoute.js")
const doctorRoutes = require("./routes/doctorRoute.js")
const apptRoutes = require("./routes/appointmentRoute.jsx")

/******************************************************IMPORTANT READ THIS******************************************************/
//if auth error then write following code in my sql terminal
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password' 

const corsOptions = {
  origin: '*', // Allow all origins (not recommended for production)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json())

app.use("/doctors", doctorRoutes)
app.use("/patients", patientRoutes)
app.use("/appt", apptRoutes)

app.get("/api/nurses", (req,res) => {
    const query = "SELECT * FROM nurse";
    db.query(query, (err, result) => {
        if (err) { 
            console.log(err);
        } else {
            res.send(result);
        }
    });
})
app.get("/", (req,res) => { 
    res.send("hello");
})
app.listen(3001, () => {    
    console.log("running on port 3001")
})