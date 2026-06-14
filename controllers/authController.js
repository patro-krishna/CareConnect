const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
};

const getRegisterPage = (req, res) => {
  res.render("register", { error: null });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.render("register", { error: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.render("register", { error: "Passwords do not match" });
    }

    if (password.length < 6) {
      return res.render("register", { error: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.render("register", { error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "patient"
    });

    res.redirect("/login");
  } catch (error) {
    res.render("register", { error: "Registration failed" });
  }
};

const getLoginPage = (req, res) => {
  res.render("login", { error: null });
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.render("login", { error: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.render("login", { error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.render("login", { error: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.redirect("/dashboard");
  } catch (error) {
    res.render("login", { error: "Login failed" });
  }
};

const dashboard = (req, res) => {
  res.render("dashboard", { user: req.user });
};

const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};


const getAdminLoginPage = (req, res) => {
  res.render("admin-login", { error: null });
};

const adminLogin = (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@hospital.com" && password === "admin123") {
    res.cookie("adminToken", "admin_logged_in", {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    });

    return res.redirect("/admin/dashboard");
  }

  res.render("admin-login", { error: "Invalid admin credentials" });
};

const adminLogout = (req, res) => {
  res.clearCookie("adminToken");
  res.redirect("/admin/login");
};

module.exports = {
  getRegisterPage,
  registerUser,
  getLoginPage,
  loginUser,
  dashboard,
  logoutUser,
  getAdminLoginPage,
  adminLogin,
  adminLogout
};