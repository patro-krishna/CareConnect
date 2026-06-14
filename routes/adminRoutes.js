const express = require("express");
const {
  getAdminDashboard,
  updateAppointmentStatus
} = require("../controllers/adminController");

const { adminProtect } = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/admin/dashboard", adminProtect, getAdminDashboard);

router.post(
  "/admin/appointments/status/:id",
  adminProtect,
  updateAppointmentStatus
);

module.exports = router;