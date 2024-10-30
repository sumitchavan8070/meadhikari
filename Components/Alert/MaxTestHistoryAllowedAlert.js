// MaxTestAllowedAlert.js
import React from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

const MaxTestHistoryAllowedAlert = ({
  visible,
  onProceed,
  onCancel,
  attemptsRemaining,
  maxTestAllowedCount,
}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.modalContainer}>
        <View style={styles.alertBox}>
          {/* Display alert icon */}
          <Image
            source={require("../../assets/warning.png")}
            style={styles.alertImage}
          />

          <Text style={styles.noActivePlanText}>No active plan</Text>

          {/* Attempt message */}
          <Text style={styles.alertMessage}>
            {attemptsRemaining}/{maxTestAllowedCount}
          </Text>

          <Text style={{ fontSize: 18 }}>
            ❤️ Your journey matters to us! 🌱
          </Text>
          <Text style={styles.alertTextSecondary}>
            Even without a subscription, you can view up to 3 taken test history
            to stay on track. 🚀
          </Text>

          {/* Button container */}
          {/* <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.proceedButton} onPress={onProceed}>
              <Text style={styles.proceedButtonText}>Proceed</Text>
            </TouchableOpacity>
          </View> */}
          <Text style={{ fontSize: 14, color: "grey" }}>
            Redirecting automatically...
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  alertBox: {
    width: 320,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  alertImage: {
    width: 60,
    height: 60,
    // marginBottom: 20,
  },
  alertMessage: {
    fontSize: 25,
    textAlign: "center",
    color: "green",
    marginBottom: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#d9534f",
    borderRadius: 5,
    alignItems: "center",
    marginRight: 10,
  },
  proceedButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#5cb85c",
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "white",
    fontSize: 16,
  },
  proceedButtonText: {
    color: "white",
    fontSize: 16,
  },

  alertTextSecondary: {
    marginTop: 20,
    marginBottom: 30,
    textAlign: "center",
    fontSize: 14,
    color: "grey",
  },
  noActivePlanText: {
    fontSize: 12,
    color: "red",
    fontWeight: "bold",
    marginBottom: 15,
  },
});

export default MaxTestHistoryAllowedAlert;
