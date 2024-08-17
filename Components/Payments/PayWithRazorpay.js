import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import RazorpayCheckout from "react-native-razorpay";
import { AuthContext } from "../../Context/authContext";
import globalStrings from "../../utils/globalStrings";

const [state, setState] = useContext(AuthContext);

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
    contact: state.user.mobileNumber,
    name: state.user.name,
  },
  themeColor: "#09518e",
};

const PayWithRazorpay = ({
  amount,
  pageName,
  description,
  image,
  keyId,
  companyName,
  prefill,
  themeColor,
  onSuccess,
  onFailure,
}) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = () => {
    console.log(`Payment started from ${pageName}`);

    const options = {
      description: description || defaultConfig.description,
      image: image || defaultConfig.image,
      currency: currency || defaultConfig.currency,
      key: keyId || defaultConfig.keyId,
      amount: amount * 100, // Razorpay amount should be in paise
      name: companyName || defaultConfig.companyName,
      prefill: prefill || defaultConfig.prefill,
      theme: { color: themeColor || defaultConfig.themeColor },
    };

    RazorpayCheckout.open(options)
      .then((data) => {
        console.log(`Payment successful: ${data.razorpay_payment_id}`);
        setPaymentSuccess(true);
        if (onSuccess) onSuccess(data); // Trigger onSuccess callback
      })
      .catch((error) => {
        console.log("Payment error:", error.description, error.code);
        if (onFailure) onFailure(error); // Trigger onFailure callback
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Pay ₹{amount}</Text>
      </TouchableOpacity>
      {paymentSuccess && (
        <Text style={styles.successText}>Payment Successful!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#09518e",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  successText: {
    color: "green",
    fontSize: 16,
    marginTop: 10,
  },
});

export default PayWithRazorpay;
