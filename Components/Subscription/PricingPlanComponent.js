import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import RazorpayCheckout from "react-native-razorpay";
import globalStrings from "../../utils/globalStrings";

const pricingPlans = [
  {
    id: "basic",
    name: "Basic",
    price: "€10 / user",
    features: [
      "Get started with messaging",
      "Flexible team meetings",
      "5 TB cloud storage",
    ],
    popular: false,
  },
  {
    id: "startup",
    name: "Startup",
    price: "€24 / user",
    features: [
      "All features in Basic",
      "Flexible call scheduling",
      "15 TB cloud storage",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "€35 / user",
    features: [
      "All features in Startup",
      "Growth oriented",
      "Unlimited cloud storage",
    ],
    popular: false,
  },
];

const PricingPlanComponent = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const amount = 1000;

  const handlePayment = () => {
    console.log("function started ");
    console.log("function started " + globalStrings.RAZOR_PAY_KEY);

    const options = {
      animation: false,
      description: "Thank you for your purchase",
      image: "",
      currency: "INR",
      key: globalStrings.RAZOR_PAY_KEY,
      amount: amount * 100,
      name: "MeAdhikari",
      prefill: {
        email: "support@maigha.com",
        contact: "9888626111",
        name: "Hrushikesh Vetagiri",
      },
      theme: { color: "#09518e" },
    };

    RazorpayCheckout.open(options)
      .then((data) => {
        console.log(`Payment successful: ${data.razorpay_payment_id}`);
        setPaymentSuccess(true); // Set payment success state to true
      })
      .catch((error) => {
        console.log("Payment error:", error.description, error.code);
      });
  };

  const renderPlan = ({ item }) => (
    <View style={[styles.planContainer, item.popular && styles.popularPlan]}>
      <Text style={styles.planName}>{item.name}</Text>
      <Text style={styles.planPrice}>{item.price}</Text>
      <View style={styles.featuresList}>
        {item.features.map((feature, index) => (
          <Text key={index} style={styles.feature}>
            ✓ {feature}
          </Text>
        ))}
      </View>
      <TouchableOpacity style={styles.choosePlanButton} onPress={handlePayment}>
        <Text style={styles.choosePlanText}>Choose Plan</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={pricingPlans}
      renderItem={renderPlan}
      keyExtractor={(item) => item.id}
      horizontal
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  planContainer: {
    backgroundColor: "#f8f8f8",
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 10,
    width: 250,
    justifyContent: "space-between",
  },
  popularPlan: {
    backgroundColor: "#1a1a1a",
  },
  planName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  planPrice: {
    fontSize: 16,
    color: "#666",
    marginVertical: 10,
  },
  featuresList: {
    marginBottom: 20,
  },
  feature: {
    fontSize: 14,
    color: "#666",
    marginVertical: 2,
  },
  choosePlanButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  choosePlanText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default PricingPlanComponent;
