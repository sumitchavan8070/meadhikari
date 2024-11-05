// fetchConstants.js
import axios from "axios";
import constants from "../utils/constants";

const fetchConstants = async () => {
  //   console.log("im here");

  try {
    const response = await axios.get("/variable/constants");
    // console.log("response", response.data.data.MEADHIKARI_SOCKET_URL);

    if (response.data.success) {
      // Assign fetched values to constants
      constants.SOCKET_URL = response.data.data.MEADHIKARI_SOCKET_URL;
      constants.BASE_URL = response.data.data.MEADHIKARI_SERVER_URL;
      constants.RAZOR_PAY_KEY = response.data.data.RAZOR_PAY_KEY;
      constants.contactEmail = response.data.data.contactEmail;
    } else {
      throw new Error("Failed to fetch constants function");
    }
  } catch (error) {
    console.error("Error fetching constants function:", error);
    throw error; // Rethrow for further handling if needed
  }
};

export default fetchConstants;
