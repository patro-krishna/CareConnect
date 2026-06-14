const Doctor = require("../models/Doctor");

const getDoctorsPage = async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    res.render("doctors", { doctors });
  } catch (error) {
    res.render("doctors", { doctors: [] });
  }
};

const addDoctor = async (req, res) => {
  try {
    const { name, specialization, experience, fees, availableDays, image } = req.body;

    if (!name || !specialization || !experience || !fees || !availableDays) {
      return res.redirect("/admin/dashboard");
    }

    await Doctor.create({
      name,
      specialization,
      experience,
      fees,
      availableDays,
      image: image || undefined
    });

    res.redirect("/admin/dashboard");
  } catch (error) {
    res.redirect("/admin/dashboard");
  }
};

const deleteDoctor = async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.redirect("/admin/dashboard");
  } catch (error) {
    res.redirect("/admin/dashboard");
  }
};

module.exports = {
  getDoctorsPage,
  addDoctor,
  deleteDoctor
};