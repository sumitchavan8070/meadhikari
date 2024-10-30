import axios from "axios";

exports.checkSubscription = async (userId) => {
  try {
    // const userId = state.user._id; // Replace with the actual user ID
    const response = await axios.get(
      `/subscription/check-subscription/${userId}`
    );
    // console.log("Subscription check response:", response.data);
    return response.data.isSubscriptionActive;
  } catch (error) {
    console.error("Error checking subscription:", error);
  }
};
