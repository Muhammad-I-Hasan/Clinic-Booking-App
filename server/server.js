const express= require('express');
const app = express();
const cors = require('cors')
const db = require("./database/main.js")

const patientRoutes = require("./routes/patientRoute.js")
const doctorRoutes = require("./routes/doctorRoute.js")


//  db

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




















//get all doctors
// app.get("/api/doctors", (req,res) => {
//     const query = "SELECT * FROM doctor";
//     db.query(query, (err, result) => {
//         if (err) { 
//             console.log(err);
//         } else {
//             res.send(result);
//         }
//     });
// })

//get all nurses
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

//returns booked appointments for that prac and date
//this can be used to subrtact from cosntant times and find available space
app.get("/api/bookedAppts", (req, res) => {
    const prac_ID = req.body.prac_id;
    const date = req.body.date;
    const query = "SELECT Time FROM appointment WHERE Prac_ID = ? AND Date = ?";
    db.query(query, [prac_ID, date], (err,result) => {
        if (err) { 
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
})

//create a new patient with given info if needed
// app.post("/api/newpatient", (req, res) => {
//     const HCN = req.body.HCN;
//     const Name = req.body.Name;
//     const Phone = req.body.Phone;
//     const Address = req.body.Address;
//     const query = "INSERT INTO patient (HCN, Name, Phone, Address) VALUES (?,?,?,?)";
//     db.query(query, [HCN, Name, Phone, Address], (err, result) => {
//         if (err) { 
//             console.log(err);
//         } else {
//             console.log(result);
//             res.send(result);
//         }
//     });
// })

//create a new appointment, requires HCN, Time, Date, Prac_id, Rnumber (no Record_ID)
app.post("/api/newAppt", (req, res) => {
    const HCN = req.body.HCN;
    const Time = req.body.Time;
    const Date = req.body.Date;
    const Prac_id = req.body.Prac_id;
    const Rnumber = req.body.Rnumber;
    const query = "INSERT INTO appointment (HCN, Time, Date, Prac_ID, RNumber) VALUES (?,?,?,?,?)";
    db.query(query, [HCN, Time, Date, Prac_id, Rnumber], (err, result) => {
        if (err) { 
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
})

//get patient info based off of a given HCN (can be used when they login?)
app.get("/api/patientinfo", (req, res) => {
    const HCN = req.body.HCN;
    const query = "SELECT * FROM patient WHERE HCN = ?";
    db.query(query, [HCN], (err, result) => {
        if (err) { 
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
})

//gets the appts associated with the HCN
app.get("/api/patientAppts", (req, res) => {
    const HCN = req.body.HCN;
    const query = "SELECT * FROM appointment WHERE HCN = ?";
    db.query(query, [HCN], (err, result) => {
        if (err) { 
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
})

//get appointments associated with a practitioner ID
app.get("/api/pracAppts", (req, res) => {
    const prac_id = req.body.prac_id;
    const query = "SELECT * FROM appointment WHERE Prac_ID = ?";
    db.query(query, [prac_id], (err, result) => {
        if (err) { 
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
})

//requires a date time pracid and HCN to delete an appointment
app.delete("/api/deleteAppt", (req, res) => {
    const Date = req.body.Date;
    const Time = req.body.Time;
    const Prac_id = req.body.Prac_id;
    const HCN = req.body.HCN;
    const query = "DELETE FROM appointment WHERE Date = ? AND Time = ? AND Prac_ID = ? AND HCN = ?"
    db.query(query, [Date, Time, Prac_id, HCN], (err, result) => {
        if (err) { 
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    })
})

app.get("/", (req,res) => { 
    res.send("hello");
})

app.listen(3001, () => {    
    console.log("running on port 3001")
})