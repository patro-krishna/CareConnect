const express = require("express");
const {
  getDoctorsPage,
  addDoctor,
  deleteDoctor
} = require("../controllers/doctorController");

const router = express.Router();

router.get("/doctors", getDoctorsPage);
router.post("/admin/doctors/add", addDoctor);
router.post("/admin/doctors/delete/:id", deleteDoctor);

module.exports = router;