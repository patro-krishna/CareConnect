const adminProtect = (req, res, next) => {
  if (req.cookies && req.cookies.adminToken === "admin_logged_in") {
    next();
  } else {
    res.redirect("/admin/login");
  }
};

module.exports = { adminProtect };