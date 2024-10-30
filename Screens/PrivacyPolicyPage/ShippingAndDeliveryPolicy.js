import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const ShippingAndDeliveryPolicy = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Shipping & Delivery Policy</Text>
        <Text style={styles.date}>Last updated on Apr 24th 2024</Text>

        <Text style={styles.section}>
          Shipping is not applicable for business.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  date: {
    fontSize: 14,
    color: "#777",
    marginBottom: 20,
  },
  section: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
});

export default ShippingAndDeliveryPolicy;
