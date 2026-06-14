const express = require("express");
const {
  getMedicineSearchPage,
  searchMedicineInfo
} = require("../controllers/medicineController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/medicine-search", protect, getMedicineSearchPage);
router.post("/medicine-search", protect, searchMedicineInfo);

module.exports = router;