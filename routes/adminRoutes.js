const express = require("express");

const {
  getAdminDashboard,
  addDoctor,
  deleteDoctor,
  updateAppointmentStatus
} = require("../controllers/adminController");

const { adminProtect } = require("../middleware/adminMiddleware");

const router = express.Router();

// Admin Dashboard
router.get(
  "/admin/dashboard",
  adminProtect,
  getAdminDashboard
);

// Add Doctor
router.post(
  "/admin/doctors",
  adminProtect,
  addDoctor
);

// Update Appointment Status
router.post(
  "/admin/appointments/status/:id",
  adminProtect,
  updateAppointmentStatus
);


router.post(
  "/admin/doctors",
  adminProtect,
  addDoctor
);

router.post(
  "/admin/doctors/delete/:id",
  adminProtect,
  deleteDoctor
);

module.exports = router;