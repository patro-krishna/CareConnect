const express = require("express");
const {
  getRegisterPage,
  registerUser,
  getLoginPage,
  loginUser,
  dashboard,
  logoutUser,
  getAdminLoginPage,
  adminLogin,
  adminLogout
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/register", getRegisterPage);
router.post("/register", registerUser);

router.get("/login", getLoginPage);
router.post("/login", loginUser);

router.get("/dashboard", protect, dashboard);
router.get("/logout", logoutUser);

router.get("/admin/login", getAdminLoginPage);
router.post("/admin/login", adminLogin);
router.get("/admin/logout", adminLogout);

module.exports = router;