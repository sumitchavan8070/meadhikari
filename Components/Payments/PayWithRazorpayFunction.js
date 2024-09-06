import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
} from "react-native";
import RazorpayCheckout from "react-native-razorpay";
import { AuthContext } from "../../Context/authContext";
import globalStrings from "../../utils/globalStrings";

// const [paymentSuccess, setPaymentSuccess] = useState(false);

export const handlePaymentWithRazorPay = (
  state,
  amount,
  description,
  pageName,
  onSuccess, // Callback for payment success
  onFailure, // Callback for payment failure
  image,
  subscriptionPlanID // Optional parameter for subscription plan ID
) => {
  // Default configuration values
  const defaultConfig = {
    currency: "INR",
    description: "Thank you for your purchase",
    image:
      "https://i0.wp.com/examtipsindia.com/wp-content/uploads/2022/05/logo.png", // Default image URL
    keyId: globalStrings.RAZOR_PAY_KEY, // Default Razorpay key ID
    companyName: "MeAdhikari",
    prefill: {
      email: state.user.email,
      contact: "9888626111",
      name: state.user.name,
    },
    themeColor: "#09518e",
  };

  console.log(`Payment started from ${pageName}`);
  console.log(`Payment started from ${defaultConfig.prefill.contact}`);
  //   let url = globalStrings.BASE_URL+"/homzzz

  const options = {
    description: description || defaultConfig.description,
    image: image || defaultConfig.image,
    currency: defaultConfig.currency,
    key: defaultConfig.keyId,
    amount: amount * 100, // Razorpay amount should be in paise
    name: defaultConfig.companyName,
    prefill: defaultConfig.prefill,
    theme: defaultConfig.themeColor,
    retry: {
      enabled: false,
    },
  };

  RazorpayCheckout.open(options)
    .then((data) => {
      console.log(`Payment successful: ${data.razorpay_payment_id}`);
      console.log(`Payment successful Data : ${JSON.stringify(data)}`);
      // if (onSuccess) onSuccess(data); // Call the success callback
      if (onSuccess) onSuccess(data, subscriptionPlanID, amount); // Pass subscriptionPlanID to the success callback
    })
    .catch((error) => {
      console.log("Payment error:", error.description, error.code);
      if (onFailure) onFailure(error); // Call the failure callback
    });
};
