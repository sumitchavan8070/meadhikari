// ShimmerEffect.js
import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Shimmer from "react-native-shimmer";

const { width } = Dimensions.get("window");

const ShimmerEffect = ({
  width = width * 0.9,
  height = 200,
  borderRadius = 12,
}) => (
  <View style={[styles.container, { width, height, borderRadius }]}>
    <Shimmer>
      <View style={[styles.shimmerEffect, { width, height, borderRadius }]} />
    </Shimmer>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  shimmerEffect: {
    backgroundColor: "#e0e0e0",
  },
});

export default ShimmerEffect;
