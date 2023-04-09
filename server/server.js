const express= require('express');
const app = express();
const cors = require('cors')
const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "clinicapp"
})

db.connect();

/******************************************************IMPORTANT READ THIS******************************************************/
//if auth error then write following code in my sql terminal
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password' 


app.use(cors());
app.use(express.json())

// app.post("/api/insert", (req, res) => {

// })

app.get("/", (req,res) => {
    
    res.send("hello");
})

app.listen(3001, () => {    
    console.log("running on port 3001")
})