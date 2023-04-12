const db = require("../database/main")

//request a single group element from group collection



const getPatient = async (req, res) => {
  const { HCN } = req.params;
  const query = "SELECT * FROM patient WHERE HCN = ? ;";
  
  db.query(query,[HCN], (err, result) => {
      if (err) { 
          console.log(err);
      } else {
        // console.log("poggers")
          res.send(result);
      }
  });
}

const getPatients = async (req, res) => {
  const query = "SELECT * FROM patient";
  db.query(query, (err, result) => {
      if (err) { 
          console.log(err);
      } else {
          res.send(result);
      }
  });
}

const createPatient = async (req, res) => {
  const HCN = req.body.HCN;
  const Name = req.body.Name;
  const Phone = req.body.Phone;
  const Address = req.body.Address;
  // console.log(`${HCN} ${Name} ${Phone} ${Address}`)
  const query = "INSERT INTO patient (HCN, Name, Phone, Address) VALUES (?,?,?,?)";

  db.query(query, [HCN, Name, Phone, Address], (err, result) => {
            // console.log("poggers")

    if (err) {
      console.log(err);
    } else {
      // console.log(result);
      const query = "SELECT * FROM patient WHERE HCN = ? ;";
      db.query(query,[HCN], (err, result) => {
          if (err) { 
              console.log(err);
          } else {
            // console.log("poggers")
              res.send(result);
          }
      });

      // res.send(result);
    }
  });

}

const getPatientApptsWDR = (req, res) => {
  const { HCN } = req.params;
  const query = "SELECT * FROM appointment, doctor WHERE HCN = ? AND appointment.Prac_ID = doctor.ID;";
  db.query(query, [HCN], (err, result) => {
      if (err) { 
          console.log(err);
      } else {
          console.log(result);
          res.send(result);
      }
  });
}

const getPatientApptsWNR = (req, res) => {
  const { HCN } = req.params;
  const query = "SELECT * FROM appointment, nurse WHERE HCN = ? AND appointment.Prac_ID = nurse.ID;";
  db.query(query, [HCN], (err, result) => {
      if (err) { 
          console.log(err);
      } else {
          console.log(result);
          res.send(result);
      }
  });
}

const loginPatient = async (req,res) =>{


  const { HCN } = req.body;

  const query = "SELECT * FROM patient WHERE HCN = ? ;";
  db.query(query,[HCN], (err, result) => {


  })
}

const deletePatient = (req, res) =>{ 

}

const updatePatient = (req, res) =>{

}

module.exports = { getPatient, getPatients, createPatient, loginPatient, getPatientApptsWDR, getPatientApptsWNR }