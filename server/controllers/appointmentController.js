const db = require("../database/main")

const getBookedAppts = (req, res) => {

    const prac_id = req.params.id;
    const date = req.params.date
    
    const query = "SELECT Time FROM appointment WHERE Prac_ID = ? AND Date = ?";
    db.query(query, [prac_id, date], (err,result) => {
        if (err) { 
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
}
const newAppt = (req, res) => {
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
}
module.exports = {
    getBookedAppts,
    newAppt,
  }