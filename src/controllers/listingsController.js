const axios = require('axios');

const getListings = async () => {
  try {
    const res = await axios({
      url: `https://tiny-car-list-api.herokuapp.com/listing`,
    });
    return res;
  } catch (error) {
    return error;
  }
};

export default getListings;
