import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const UpdatePopup = ({
  appUpdate,
  visible,
  title,
  message,
  onUpdate,
  onClose,
  confirmText = "Update",
  cancelText = "Close",
  // forceUpdate,
}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={() => {}}
    >
      <View style={styles.container}>
        <View style={styles.alertBox}>
          <Text style={styles.title}>{title || "Update Available"}</Text>
          <Text style={styles.message}>
            {message || "A new version of the app is available."}
          </Text>

          <View style={styles.buttonContainer}>
            {appUpdate.forceUpdate === 0 && (
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>{cancelText}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.confirmButton} onPress={onUpdate}>
              <Text style={styles.confirmButtonText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  alertBox: {
    width: width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    marginRight: 5,
  },
  cancelButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
  confirmButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    marginLeft: 5,
  },
  confirmButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default UpdatePopup;
