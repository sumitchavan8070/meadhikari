import { View, Text, StyleSheet } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import loadingAnimation from "../../assets/yogaboy.json";
const SubjectFilter = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={loadingAnimation}
        autoPlay
        loop={true}
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
  },
  animation: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
});

export default SubjectFilter;
