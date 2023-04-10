const express = require("express");

const {
  getPatient,
  getPatients,
  createPatient,
  loginPatient,


  
} = require("../controllers/patientController");

const router = express.Router();

//get all patients (for testing purposes to recieve all patients in database)
router.get("/", getPatients);

//get a single patient based on patient id
router.get("/:HCN", getPatient);

//create a new patient
router.post("/", createPatient);
router.post("/login", loginPatient);




module.exports = router;
