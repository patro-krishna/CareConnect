const axios = require("axios");

const searchMedicine = async (medicineName) => {
  const url = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${medicineName}&limit=5`;

  const response = await axios.get(url);
  return response.data.results;
};

module.exports = { searchMedicine };