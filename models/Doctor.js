const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true },
    fees: { type: Number, required: true },
    availableDays: { type: String, required: true },
    image: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/387/387561.png"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);