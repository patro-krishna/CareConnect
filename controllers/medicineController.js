const { searchMedicine } = require("../services/openfdaService");

const getMedicineSearchPage = (req, res) => {
  res.render("medicine-search", {
    medicines: null,
    error: null,
    query: ""
  });
};

const searchMedicineInfo = async (req, res) => {
  try {
    const { medicineName } = req.body;

    if (!medicineName) {
      return res.render("medicine-search", {
        medicines: null,
        error: "Please enter medicine name",
        query: ""
      });
    }

    const medicines = await searchMedicine(medicineName);

    res.render("medicine-search", {
      medicines,
      error: null,
      query: medicineName
    });
  } catch (error) {
    res.render("medicine-search", {
      medicines: null,
      error: "No medicine information found or API error",
      query: req.body.medicineName
    });
  }
};

module.exports = {
  getMedicineSearchPage,
  searchMedicineInfo
};