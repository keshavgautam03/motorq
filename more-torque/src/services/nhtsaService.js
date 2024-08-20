const axios = require('axios');

const decodeVin = async (vin) => {
  // Example API call to decode VIN, replace with actual implementation
  const response = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`);
  return response.data;
};

module.exports = {
  decodeVin,
};
