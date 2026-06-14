const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");

const getBookAppointmentPage = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId);

    if (!doctor) {
      return res.redirect("/doctors");
    }

    res.render("book-appointment", {
      doctor,
      error: null
    });
  } catch (error) {
    res.redirect("/doctors");
  }
};

const bookAppointment = async (req, res) => {
  try {
    const { doctorId, appointmentDate, appointmentTime, reason } = req.body;

    if (!doctorId || !appointmentDate || !appointmentTime || !reason) {
      const doctor = await Doctor.findById(doctorId);
      return res.render("book-appointment", {
        doctor,
        error: "All fields are required"
      });
    }

    await Appointment.create({
      patientId: req.user._id,
      doctorId,
      appointmentDate,
      appointmentTime,
      reason
    });

    res.redirect("/appointments");
  } catch (error) {
    res.redirect("/doctors");
  }
};

const getAppointmentHistory = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientId: req.user._id })
      .populate("doctorId")
      .sort({ createdAt: -1 });

    res.render("appointments", { appointments });
  } catch (error) {
    res.render("appointments", { appointments: [] });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    await Appointment.findOneAndUpdate(
      { _id: req.params.id, patientId: req.user._id },
      { status: "Cancelled" }
    );

    res.redirect("/appointments");
  } catch (error) {
    res.redirect("/appointments");
  }
};

module.exports = {
  getBookAppointmentPage,
  bookAppointment,
  getAppointmentHistory,
  cancelAppointment
};