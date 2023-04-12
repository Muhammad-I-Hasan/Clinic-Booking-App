const express = require("express")

const {
  getDoctors,
  getDoctor,
  getAppointments,
  updateAppointment,
  removeAppointment
} = require("../controllers/doctorController.js")


const router = express.Router()

router.get("/:id/appointments", getAppointments)
router.get("/", getDoctors)
// http://localhost:3001/doctors/appointments/101/4842485/100
router.put("/appointments", updateAppointment)
router.delete("/appointments", removeAppointment)
router.get("/:id", getDoctor)


module.exports = router;