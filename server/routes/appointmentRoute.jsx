const express = require("express");

const {
  getBookedAppts,
  newAppt,
} = require("../controllers/appointmentController");

const router = express.Router();

router.get("/bookedAppts/:id/:date", getBookedAppts);

router.post("/newAppt", newAppt);

module.exports = router;