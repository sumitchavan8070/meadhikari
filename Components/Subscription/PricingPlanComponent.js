import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useContext,
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import RazorpayCheckout from "react-native-razorpay";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, FontAwesome } from "@expo/vector-icons"; // Import FontAwesome for icons
import globalStrings from "../../utils/globalStrings";
import axios from "axios";
import Color from "../../GlobalStyles";
import { AuthContext } from "../../Context/authContext";
import { handlePaymentWithRazorPay } from "../Payments/PayWithRazorpayFunction";
import RazorpayPaymentAlert from "../Alert/RazorpayPaymentAlert";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import IosAlertWithImageWithCallBack from "../Alert/IosAlertWithImageWithCallBack";
import * as Animatable from "react-native-animatable";
import MobileNumberInputAlert from "../Alert/MobileNumberInputAlert";

const PricingPlanComponent = () => {
  const flatListRef = useRef(null);

  const [pricingPlans, setPricingPlans] = useState([]); // State for pricing plans
  const [loading, setLoading] = useState(true); // State for loading
  const [state, setState] = useContext(AuthContext);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const [selectedPackageAmount, setSelectedPackageAmount] = useState(null);
  const [paymentSuccess, setpaymentSuccess] = useState(false);
  const [alertVisibleWithCounter, setAlertVisibleWithCounter] = useState(false);

  // Access subscription status and plan ID from AuthContext
  const { subscriptionPlanID } = state.user;
  // console.log("subscriptionPlanID" + subscriptionPlanID);
  // console.log("isSubscriptionActive" + isSubscriptionActive);

  // const subscriptionPlanID = "66cae559267f0f6cedde1fff";
  // const isSubscriptionActive = true;

  // const subscriptionPlanID = null;
  // const isSubscriptionActive = false;

  const navigation = useNavigation();

  const moveArrow = {
    0: {
      transform: [{ translateX: 0 }],
    },
    0.5: {
      transform: [{ translateX: 5 }],
    },
    1: {
      transform: [{ translateX: 0 }],
    },
  };

  useLayoutEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(`/plans/get-all`);
        setPricingPlans(response.data);
        setLoading(false);

        // Scroll to the popular plan if available
        const popularPlanIndex = response.data.findIndex(
          (plan) => plan.popular
        );
        if (popularPlanIndex !== -1) {
          setTimeout(() => {
            flatListRef.current?.scrollToIndex({
              index: popularPlanIndex,
              animated: true,
              viewPosition: 0.5,
            });
          }, 500);
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handlePaymentSuccess = async (data, subscriptionPlanID) => {
    try {
      const response = await axios.put(
        `/update-subscription/${state.user._id}`,
        {
          newPlanId: subscriptionPlanID,
          purchasePaymentId: data.razorpay_payment_id, // Payment ID from Razorpay
        }
      );

      // Extract updated subscription details from the response
      const updatedSubscriptionDetails = response.data.user;
      let authData = await AsyncStorage.getItem("@auth");
      authData = JSON.parse(authData);

      // Prepare updated user data with the new subscription details
      const updatedUser = {
        ...authData.user,
        subscriptionPlanID: updatedSubscriptionDetails.subscriptionPlanID,
        isSubscriptionActive: updatedSubscriptionDetails.isSubscriptionActive,
        subscriptionStartDate: updatedSubscriptionDetails.subscriptionStartDate,
        subscriptionExpiryDate:
          updatedSubscriptionDetails.subscriptionExpiryDate,
        purchasePaymentId: updatedSubscriptionDetails.purchasePaymentId,
      };

      // Update AsyncStorage only if there's a change in subscription details
      if (
        authData.user.subscriptionPlanID !== updatedUser.subscriptionPlanID ||
        authData.user.isSubscriptionActive !== updatedUser.isSubscriptionActive
      ) {
        authData.user = updatedUser;
        await AsyncStorage.setItem("@auth", JSON.stringify(authData));
      }

      // Update global state with the new subscription details
      setState((prevState) => ({
        ...prevState,
        user: updatedUser,
      }));

      // setIsSuccess(true);
      // setAlertMessage("Congratulations 🎉! Your Subscription is now Active.");
      // setAlertVisible(true);

      setAlertMessage("Congratulations 🎉! Your Subscription is now Active.");
      setIsSuccess(true);
      setAlertVisibleWithCounter(true);
      setpaymentSuccess(true);

      // navigation.navigate("Home");
    } catch (error) {
      console.error("Error updating subscription:", error);
      setAlertMessage(
        "There was an error updating your subscription. Please try again."
      );
      setAlertVisible(true);
    }
  };

  const onCloseAlert = () => {
    setAlertVisible(false);
    setAlertVisibleWithCounter(false);
  };

  const onRedirect = () => {
    navigation.navigate("Home"); // Adjust the navigation target as needed
  };

  const handlePaymentFailure = (error) => {
    setIsSuccess(false);
    setAlertMessage("Oops ⚠️! Something went wrong. Please try again");
    setAlertVisible(true);
  };

  const handleCloseAlert = () => {
    setAlertVisible(false);
  };

  const [mobileNumberAvailable, setmobileNumberAvailable] = useState(false);

  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const updateMobileNumber = async (mobileNumber) => {
    const userId = state.user._id; // Replace with the actual user ID
    const url = `/${userId}/updateMobile`;

    try {
      const response = await axios.put(url, { mobileNumber });

      // if (response.data.success) {
      //   Alert.alert("Success", response.data.message);
      // } else {
      //   Alert.alert(
      //     "Error",
      //     response.data.message || "Failed to update mobile number"
      //   );
      // }
      const updatedUserDetails = response.data.data;

      // console.log("updatedUserDetails", updatedUserDetails);

      if (response.data.success) {
        // Retrieve existing auth data from AsyncStorage
        let authData = await AsyncStorage.getItem("@auth");
        authData = JSON.parse(authData);

        // Prepare updated user data with the new mobile number
        const updatedUser = {
          ...authData.user,
          mobileNumber: updatedUserDetails.mobileNumber,
        };

        // Update AsyncStorage only if there's a change in mobile number
        if (authData.user.mobileNumber !== updatedUser.mobileNumber) {
          authData.user = updatedUser;
          await AsyncStorage.setItem("@auth", JSON.stringify(authData));
        }

        // Update global state with the new mobile number
        setState((prevState) => ({
          ...prevState,
          user: updatedUser,
        }));

        Alert.alert(
          "Mobile number updated successfully🎉",
          "You’re all set! 🚀 Unlock exclusive content by choosing a subscription now and stay ahead! 🌟"
        );

        // handlePayment();
      } else {
        Alert.alert("Error", "Failed to update mobile number.");
        setIsAlertVisible(false); // Close the alert after proceeding
        setmobileNumberAvailable(false);
      }
    } catch (error) {
      console.error("Error updating mobile number:", error);
      Alert.alert(
        "Error",
        "An error occurred while updating the mobile number."
      );
    } finally {
      setIsAlertVisible(false); // Close the alert after proceeding
      setmobileNumberAvailable(false);
    }
  };
  const handleProceed = async (mobileNumber) => {
    // Handle the entered mobile number here
    // Alert.alert("Mobile Number Entered", `You entered: ${mobileNumber}`);
    await updateMobileNumber(mobileNumber);
    setIsAlertVisible(false); // Close the alert after proceeding
    setmobileNumberAvailable(false);
  };

  const handleCancel = () => {
    setIsAlertVisible(false); // Close the alert
    setmobileNumberAvailable(false);
  };

  const handlePayment = (amount) => {
    console.log("im here1");

    if (!state.user.mobileNumber) {
      setmobileNumberAvailable(true);
      setIsAlertVisible(true); // Close the alert
      return;
    }

    // console.log("Selected Package Amount: ₹" + amount);
    setSelectedPackageAmount(amount.price);
    handlePaymentWithRazorPay(
      state,
      amount.price,
      "Congratulations ! Subscription is added of ₹" + amount.price,
      "Subscription Page",
      handlePaymentSuccess,
      handlePaymentFailure,
      undefined,
      amount._id // Pass subscriptionPlanID if available, otherwise undefined
    );
  };

  const formatDuration = (durationInDays) => {
    switch (durationInDays) {
      case 0:
        return "Unlimited";
      case 30:
        return "1 Month";
      case 180:
        return "6 Months";
      case 365:
        return "1 Year";
      default:
        return `${durationInDays} Days`;
    }
  };

  const [isSubscriptionActive, setisSubscriptionActive] = useState(false);

  useEffect(() => {
    const updateUserDetails = async () => {
      const response = await axios.get(`/${state.user._id}`);
      setisSubscriptionActive(response.data.user.isSubscriptionActive);
    };

    updateUserDetails();
  }, []);

  const renderPlan = ({ item }) => {
    const isPurchased = isSubscriptionActive && item._id === subscriptionPlanID;
    const isFreePlan = item.name.toLowerCase() === "free"; // Check if the plan is "free"

    return (
      <>
        <LinearGradient
          colors={
            item.popular ? ["#2c2c2c", "#000000"] : ["#e0e0e0", "#ffffff"]
          }
          style={[styles.planContainer, item.popular && styles.popularPlan]}
        >
          {item.popular && (
            <View style={styles.bestsellerContainer}>
              <LinearGradient
                colors={["#ffd700", "#ffa500"]}
                style={styles.bestsellerLabel}
              >
                <Text style={styles.bestsellerText}>Bestseller</Text>
              </LinearGradient>
            </View>
          )}
          <Text
            style={[styles.planName, item.popular && styles.popularPlanName]}
          >
            {item.name}
          </Text>
          <Text
            style={[styles.planPrice, item.popular && styles.popularPlanPrice]}
          >
            ₹{item.price} - {formatDuration(item.durationInDays)}
          </Text>
          <View style={styles.featuresList}>
            {item.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <FontAwesome
                  name="check-circle"
                  size={16}
                  color={item.popular ? "#fff" : "#007bff"}
                  style={styles.featureIcon}
                />
                <Text
                  style={[
                    styles.feature,
                    item.popular && styles.popularFeature,
                  ]}
                >
                  {feature}
                </Text>
              </View>
            ))}
          </View>

          {!isFreePlan &&
            (isSubscriptionActive ? (
              <TouchableOpacity
                style={[
                  styles.choosePlanButton,
                  isPurchased && styles.purchasedButton,
                  item.popular && styles.popularButton,
                ]}
                onPress={() => handlePayment(item)} // Pass the actual price here
                disabled={isSubscriptionActive} // Disable button if any plan is purchased
                activeOpacity={0.8}
              >
                <View style={styles.buttonContent}>
                  <FontAwesome
                    name="lock"
                    size={16}
                    color="#fff"
                    style={styles.lockIcon}
                  />
                  <Text style={styles.choosePlanText}>
                    {isPurchased ? "Purchased" : "Choose Plan"}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : item.popular ? (
              <TouchableOpacity
                style={[
                  styles.choosePlanButton,
                  isPurchased && styles.purchasedButton,
                  item.popular && styles.popularButton,
                  { flexDirection: "row", justifyContent: "space-around" },
                ]}
                onPress={() => handlePayment(item)} // Pass the actual price here
                disabled={isSubscriptionActive} // Disable button if any plan is purchased
                activeOpacity={0.8}
              >
                <Animatable.View
                  animation={moveArrow}
                  iterationCount="infinite"
                  duration={1000} // Adjust the speed of the animation
                >
                  <AntDesign name="doubleright" color={"white"} size={20} />
                </Animatable.View>
                <Text style={styles.choosePlanText}>
                  {isPurchased ? "Purchased" : "Choose Plan"}
                </Text>
                <Animatable.View
                  animation={moveArrow}
                  iterationCount="infinite"
                  duration={1000} // Adjust the speed of the animation
                >
                  <AntDesign name="doubleleft" color={"white"} size={20} />
                </Animatable.View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  styles.choosePlanButton,
                  isPurchased && styles.purchasedButton,
                  item.popular && styles.popularButton,
                ]}
                onPress={() => handlePayment(item)} // Pass the actual price here
                disabled={isSubscriptionActive} // Disable button if any plan is purchased
                activeOpacity={0.8}
              >
                <Text style={styles.choosePlanText}>
                  {isPurchased ? "Purchased" : "Choose Plan"}
                </Text>
              </TouchableOpacity>
            ))}
        </LinearGradient>

        {paymentSuccess && (
          <IosAlertWithImageWithCallBack
            visible={alertVisibleWithCounter}
            message={alertMessage}
            onClose={onCloseAlert}
            isSuccess={isSuccess}
            countdownTime={5}
            onRedirect={onRedirect}
          />
        )}

        {mobileNumberAvailable && (
          <MobileNumberInputAlert
            visible={isAlertVisible}
            onProceed={handleProceed}
            onCancel={handleCancel}
          />
        )}
      </>
    );
  };

  return (
    <>
      <RazorpayPaymentAlert
        visible={alertVisible}
        message={alertMessage}
        onClose={handleCloseAlert}
        isSuccess={isSuccess}
      />
      <FlatList
        ref={flatListRef}
        data={pricingPlans}
        renderItem={renderPlan}
        keyExtractor={(item) => item._id}
        horizontal
        contentContainerStyle={styles.container}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

const styles = StyleSheet.create({
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  lockIcon: {
    marginRight: 10,
  },
  purchasedButtonBackground: { backgroundColor: "#69dbb4" },
  bestsellerContainer: {
    position: "absolute",
    top: -10,
    left: 10,
    zIndex: 1,
  },
  bestsellerLabel: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: "#ffd700", // Gold color for shine
    shadowColor: "#ffa500", // Slightly darker gold for shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  bestsellerText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
    textTransform: "uppercase",
  },
  container: {
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  planContainer: {
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 15,
    width: 260,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  popularPlan: {
    borderColor: "#333333", // Adjust border to match matte black finish
    borderWidth: 2,
  },
  planName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  popularPlanName: {
    color: "#fff",
  },
  planPrice: {
    fontSize: 18,
    color: "#666",
    marginVertical: 10,
    textAlign: "center",
  },
  popularPlanPrice: {
    color: "#ffde9c", // Adjust to contrast well with black
  },
  featuresList: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  featureIcon: {
    marginRight: 10,
  },
  feature: {
    fontSize: 14,
    color: "#666",
  },
  popularFeature: {
    color: "#fff",
  },
  choosePlanButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  popularButton: {
    backgroundColor: "#555555", // Adjust to a dark gray for subtle contrast
  },
  purchasedButton: {
    backgroundColor: "#999999", // A grayed-out color for purchased plans
  },
  choosePlanText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default PricingPlanComponent;
