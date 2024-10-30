import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";

const MobileNumberInputAlert = ({ visible, onProceed, onCancel }) => {
  const [mobileNumber, setMobileNumber] = useState("");

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

          <Text style={{ fontSize: 18, marginVertical: 10 }}>
            Please enter mobile number
          </Text>

          {/* <TextInput style={[styles.inputBox, { width: "20%" }]}>+91</TextInput>

          <TextInput
            style={styles.inputBox}
            placeholder="Enter mobile number"
            keyboardType="numeric"
            value={mobileNumber}
            onChangeText={setMobileNumber}
            maxLength={10}
          /> */}

          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            {/* Disabled input for "+91" */}
            <TextInput
              style={[
                styles.inputBox,
                {
                  width: "20%",
                  color: "black",
                  paddingRight: 10,
                },
              ]}
              value="+91"
              editable={false}
            />

            {/* Input box for mobile number */}
            <TextInput
              style={[styles.inputBox, { width: "75%", paddingLeft: 15 }]}
              placeholder="Enter mobile number"
              keyboardType="numeric"
              value={mobileNumber}
              onChangeText={setMobileNumber}
              maxLength={10}
            />
          </View>

          {/* Button container */}
          <View style={styles.buttonContainer}>
            {/* <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.proceedButton}
              onPress={() => onProceed(mobileNumber)}
            >
              <Text style={styles.proceedButtonText}>Proceed</Text>
            </TouchableOpacity>
          </View>
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
  },
  inputBox: {
    height: 40,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 15,
    marginBottom: 20,
    fontSize: 16,
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
    fontSize: 18,
  },
});

export default MobileNumberInputAlert;
