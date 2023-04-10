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
  db.query(query,[id], (err, result) => {
      if (err) { 
          console.log(err);
      } else {
        console.log(result)
          res.send(result);
      }
  });
}


module.exports = {
  getDoctors,
  getDoctor
}
