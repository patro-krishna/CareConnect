const express = require("express");
const {
  getBookAppointmentPage,
  bookAppointment,
  getAppointmentHistory,
  cancelAppointment
} = require("../controllers/appointmentController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/book-appointment/:doctorId", protect, getBookAppointmentPage);
router.post("/book-appointment", protect, bookAppointment);

router.get("/appointments", protect, getAppointmentHistory);
router.post("/appointments/cancel/:id", protect, cancelAppointment);

module.exports = router;