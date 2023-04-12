const express = require("express");

const {
  getPatient,
  getPatients,
  createPatient,
  loginPatient,
  getPatientApptsWDR,
  getPatientApptsWNR,
  cancelAppointment,

  
} = require("../controllers/patientController");

const router = express.Router();

//get all patients (for testing purposes to recieve all patients in database)
router.get("/", getPatients);

//get a single patient based on patient id
router.get("/:HCN", getPatient);

router.get("/appts/dr/:HCN", getPatientApptsWDR);
router.get("/appts/nr/:HCN", getPatientApptsWNR);
//create a new patient
router.post("/", createPatient);
router.post("/login", loginPatient);

router.delete("/appt", cancelAppointment)


module.exports = router;
