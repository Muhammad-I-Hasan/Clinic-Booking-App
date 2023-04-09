const express= require('express');
const app = express();
const cors = require('cors')
const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "crudapp"
})

db.connect();

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