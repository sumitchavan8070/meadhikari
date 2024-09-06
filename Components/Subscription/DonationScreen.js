import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { handlePaymentWithRazorPay } from "../Payments/PayWithRazorpayFunction";
import { AuthContext } from "../../Context/authContext";
import LottieView from "lottie-react-native";
import loadingAnimation from "../../assets/donationfile.json";
import RazorpayPaymentAlert from "../Alert/RazorpayPaymentAlert";
import axios from "axios";

const DonationScreen = () => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");

  const [state, setState] = useContext(AuthContext);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const [donationAmountFinal, setDonationAmountFinal] = useState(null);

  // const handlePaymentSuccess = (data) => {
  //   // setAlertMessage("Payment Successful! Thank you for your purchase." + data);
  //   setIsSuccess(true);

  //   setAlertMessage(
  //     "Your generosity helps us make a difference. Thank you for your support!"
  //   );

  //   setAlertVisible(true);
  // };

  // Ensure you have axios installed and imported

  const handlePaymentSuccess = async (data, subscriptionPlanID, amount) => {
    setIsSuccess(true);
    setAlertMessage(
      "Your generosity helps us make a difference. Thank you for your support!"
    );
    setAlertVisible(true);

    // console.log("---donation data " + JSON.stringify(amount));

    try {
      const response = await axios.post("donation/donate", {
        userId: state.user._id, // Get user ID from state
        donatePaymentId: data.razorpay_payment_id,
        amount: amount,
      });

      if (response.data.success) {
        console.log("Donation recorded successfully");
      } else {
        console.error("Failed to record donation");
      }
    } catch (error) {
      console.error("Error posting donation:", error);
    }
  };

  const handlePaymentFailure = (error) => {
    setIsSuccess(false);

    setAlertMessage(
      "Something went wrong, but your support means the world to us. Please try again."
    );
    setAlertVisible(true);
  };

  const handleCloseAlert = () => {
    setAlertVisible(false);
  };

  const handleDonate = (amount) => {
    setSelectedAmount(amount);
    // console.log(`Donating ₹${amount}`);
    setDonationAmountFinal(amount);
    handlePaymentWithRazorPay(
      state,
      amount,
      "Thanks for Donation",
      "Donation Page",
      handlePaymentSuccess,
      handlePaymentFailure
    );
  };

  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 2000,
    useNativeDriver: true,
  }).start();

  return (
    <LinearGradient colors={["#1c1c1c", "#333333"]} style={styles.container}>
      <RazorpayPaymentAlert
        visible={alertVisible}
        message={alertMessage}
        onClose={handleCloseAlert}
        isSuccess={isSuccess}
      />
      <Animated.View style={{ ...styles.imageContainer, opacity: fadeAnim }}>
        {/* <Image
          source={{
            uri: "https://png.pngtree.com/png-clipart/20230111/original/pngtree-donation-box-and-charity-concept-png-image_8902949.png",
          }}
          style={styles.image}
        /> */}
        <LottieView
          source={loadingAnimation} // Replace with your animation JSON file
          autoPlay
          loop={true}
          style={styles.image}
        />
      </Animated.View>

      <Text style={styles.heading}>Support Our Mission</Text>
      <Text style={styles.subheading}>
        Every contribution helps us bring you more value and better features.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardText}>Choose your donation amount:</Text>
        <View style={styles.buttonContainer}>
          {["₹10", "₹20", "₹50"].map((amount) => (
            <TouchableOpacity
              key={amount}
              style={[
                styles.button,
                selectedAmount === amount && styles.selectedButton,
              ]}
              onPress={() => {
                setCustomAmount("");
                handleDonate(amount.slice(1));
              }}
            >
              <LinearGradient
                colors={
                  selectedAmount === amount
                    ? ["#ff9900", "#ff3300"]
                    : ["#f0f0f0", "#d0d0d0"]
                }
                style={styles.gradientButton}
              >
                <Text style={styles.buttonText}>{amount}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={styles.customInput}
          placeholder="Enter custom amount (₹)"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={customAmount ? customAmount : selectedAmount}
          onChangeText={(value) => {
            setSelectedAmount("");
            setCustomAmount(value);
          }}
          onSubmitEditing={() => handleDonate(customAmount)}
        />
      </View>

      {selectedAmount && (
        <Text style={styles.confirmationText}>
          Thank you for choosing to donate {selectedAmount}!
        </Text>
      )}

      {/* {selectedAmount && ( */}
      <TouchableOpacity
        style={[styles.customAmountButton, styles.shadow]}
        onPress={() => handleDonate(customAmount)}
      >
        <LinearGradient
          colors={["#ff9900", "#ff3300"]}
          style={styles.gradientButton}
        >
          {/* <FontAwesome5 name="dollar-sign" size={18} color="white" /> */}
          {/* <Text style={styles.customAmountText}>Donate ₹{selectedAmount}</Text> */}
          <Text style={styles.customAmountText}>
            Donate
            {selectedAmount && selectedAmount !== 0
              ? ` ₹${selectedAmount}`
              : ""}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      {/* // )} */}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
  heading: {
    fontSize: 26,
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subheading: {
    fontSize: 16,
    color: "#cccccc",
    marginBottom: 30,
    textAlign: "center",
    lineHeight: 22,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  cardText: {
    fontSize: 18,
    color: "white",
    marginBottom: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    width: "30%",
    borderRadius: 12,
    overflow: "hidden",
  },
  selectedButton: {
    transform: [{ scale: 1.1 }],
  },
  gradientButton: {
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  customInput: {
    marginTop: 20,
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
    color: "#333",
    fontSize: 16,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  customAmountButton: {
    width: "80%",
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 20,
  },
  customAmountText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  confirmationText: {
    marginTop: 20,
    fontSize: 18,
    color: "#ffdd59",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default DonationScreen;
