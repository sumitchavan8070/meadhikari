import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const CancellationAndRefundPolicy = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Cancellation & Refund Policy</Text>
        <Text style={styles.date}>Last updated on Apr 24th 2024</Text>

        <Text style={styles.section}>
          MEADHIKARI believes in helping its customers as far as possible, and
          has therefore a liberal cancellation policy. However, please note that
          refunds or cancellations of subscription plans for test series are not
          entertained.
        </Text>

        <Text style={styles.section}>
          Cancellations will only be considered if the request is made within 3
          days of subscribing. However, cancellation requests may not be
          entertained if the subscription has been activated or accessed.
        </Text>

        <Text style={styles.section}>
          In case you experience any issues with the service, please report them
          to our Customer Service team within 3 days of subscribing. Our team
          will address your concerns accordingly.
        </Text>

        <Text style={styles.section}>
          MEADHIKARI reserves the right to change any terms of this policy at
          any time.
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

export default CancellationAndRefundPolicy;
