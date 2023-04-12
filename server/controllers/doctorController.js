const db = require("../database/main")


const getDoctors = async (req, res) => {
  const query = "SELECT * FROM doctor";
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result)
      res.send(result);
    }
  });
}

const getDoctor = async (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM doctor WHERE ID = ? ;";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result)
      res.send(result);
    }
  });
}
const getAppointments = async (req, res) => {
  const { id } = req.params;
  const query = "SELECT A.Time, A.Date, A.HCN, P.Name, A.RNumber, A.Prac_ID, A.Comments FROM appointment AS A, Patient AS P WHERE Prac_ID = ? AND A.HCN = P.HCN;";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result)
      res.send(result);
    }
  });
}

const updateAppointment = async (req, res) => {
  const { } = req.params;
  const { Prac_ID, HCN, RNumber, Comment } = req.body;
  // console.log(Comment)
  // console.log("poggies")
  query = "UPDATE appointment SET Comments = ? WHERE HCN = ? AND Prac_ID = ? AND RNumber = ? ;"

  db.query(query, [Comment, HCN, Prac_ID, RNumber], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result)
      res.send(result);
    }
  })

}

const removeAppointment = async (req, res) => {
  const { Prac_ID, HCN, RNumber } = req.body;
  query = "DELETE FROM appointment WHERE HCN = ? AND Prac_ID = ? AND RNumber = ? ;"
  db.query(query, [HCN, Prac_ID, RNumber], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result)
      res.send(result);
    }
  })

}


module.exports = {
  getDoctors,
  getDoctor,
  getAppointments,
  updateAppointment,
  removeAppointment,
}
