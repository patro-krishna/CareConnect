const Prescription = require("../models/Prescription");

const getUploadPrescriptionPage = async (req, res) => {
  res.render("upload-prescription", {
    error: null,
    success: null
  });
};

const uploadPrescription = async (req, res) => {
  try {
    const { title, doctorName, notes } = req.body;

    if (!title || !doctorName) {
      return res.render("upload-prescription", {
        error: "Title and doctor name are required",
        success: null
      });
    }

    if (!req.file) {
      return res.render("upload-prescription", {
        error: "Please upload a prescription file",
        success: null
      });
    }

    await Prescription.create({
      patientId: req.user._id,
      title,
      doctorName,
      notes,
      fileName: req.file.filename,
      filePath: `/uploads/prescriptions/${req.file.filename}`
    });

    res.render("upload-prescription", {
      error: null,
      success: "Prescription uploaded successfully"
    });
  } catch (error) {
    res.render("upload-prescription", {
      error: "Prescription upload failed",
      success: null
    });
  }
};

const getMyPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ patientId: req.user._id }).sort({
      createdAt: -1
    });

    res.render("prescriptions", { prescriptions });
  } catch (error) {
    res.render("prescriptions", { prescriptions: [] });
  }
};

const deletePrescription = async (req, res) => {
  try {
    await Prescription.findOneAndDelete({
      _id: req.params.id,
      patientId: req.user._id
    });

    res.redirect("/prescriptions");
  } catch (error) {
    res.redirect("/prescriptions");
  }
};

module.exports = {
  getUploadPrescriptionPage,
  uploadPrescription,
  getMyPrescriptions,
  deletePrescription
};