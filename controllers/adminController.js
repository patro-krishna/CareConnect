const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const Prescription = require("../models/Prescription");

const getAdminDashboard = async (req, res) => {
  try {
    const totalPatients = await User.countDocuments({ role: "patient" });
    const totalDoctors = await Doctor.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    const totalPrescriptions = await Prescription.countDocuments();

    const doctors = await Doctor.find().sort({ createdAt: -1 });

    const appointments = await Appointment.find()
      .populate("patientId", "name email")
      .populate("doctorId", "name specialization")
      .sort({ createdAt: -1 })
      .limit(5);

    const prescriptions = await Prescription.find()
      .populate("patientId", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    res.render("admin-dashboard", {
      doctors,
      appointments,
      prescriptions,
      stats: {
        totalPatients,
        totalDoctors,
        totalAppointments,
        totalPrescriptions
      },
      message: null
    });
  } catch (error) {
    res.redirect("/");
  }
};

const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    await Appointment.findByIdAndUpdate(req.params.id, { status });

    res.redirect("/admin/dashboard");
  } catch (error) {
    res.redirect("/admin/dashboard");
  }
};

module.exports = {
  getAdminDashboard,
  updateAppointmentStatus
};

