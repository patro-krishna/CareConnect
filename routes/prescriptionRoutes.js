const express = require("express");
const {
  getUploadPrescriptionPage,
  uploadPrescription,
  getMyPrescriptions,
  deletePrescription
} = require("../controllers/prescriptionController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/upload-prescription", protect, getUploadPrescriptionPage);

router.post(
  "/upload-prescription",
  protect,
  upload.single("prescriptionFile"),
  uploadPrescription
);

router.get("/prescriptions", protect, getMyPrescriptions);
router.post("/prescriptions/delete/:id", protect, deletePrescription);

module.exports = router;