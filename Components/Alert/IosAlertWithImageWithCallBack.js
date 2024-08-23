import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const IosAlertWithImageWithCallBack = ({
  visible,
  message,
  onClose,
  isSuccess,
  countdownTime = 5,
  onRedirect,
}) => {
  const [countdown, setCountdown] = useState(countdownTime);

  useEffect(() => {
    if (visible) {
      let timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onRedirect(); // Trigger redirect after countdown ends
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setCountdown(countdownTime);
    }
  }, [visible]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.modalContent}>
          {isSuccess ? (
            <FontAwesome name="check-circle" color="green" size={50} />
          ) : (
            <FontAwesome name="times-circle" color="red" size={50} />
          )}
          <Text style={styles.message}>{message}</Text>
          <Text style={styles.countdown}>
            Redirecting in {countdown} seconds...
          </Text>
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loader}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  message: {
    fontSize: 18,
    marginVertical: 10,
  },
  countdown: {
    fontSize: 16,
    marginVertical: 10,
    color: "grey",
  },
  loader: {
    marginTop: 20,
  },
});

export default IosAlertWithImageWithCallBack;
