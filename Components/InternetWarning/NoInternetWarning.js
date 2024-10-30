import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, StatusBar } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color } from "../../GlobalStyles";

const NoInternetWarning = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // if (isConnected) {
  //   return null; // Don't render if there's an internet connection
  // }

  return (
    <>
      {!isConnected && (
        <SafeAreaView
          style={[styles.container, { backgroundColor: Color.colorBlack }]}
        >
          <StatusBar backgroundColor={"black"}></StatusBar>
          <View
            style={[styles.subContainer, { backgroundColor: Color.colorBlack }]}
          >
            <Icon name="wifi-off" size={200} color={Color.primaryColor} />
            <View>
              <Text style={styles.text}>
                Connection lost? Reconnect and keep conquering! 🌟🔥
              </Text>
            </View>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    // top: 0,
    bottom: 0,
    width: "100%",
    zIndex: 9999,
    alignSelf: "center",
    paddingHorizontal: 5,
    flexWrap: "wrap",
    height: "100%",
    justifyContent: "center",
  },
  subContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    // flexDirection: "row",
    width: "100%",
  },
  text: { color: Color.colorWhite, fontSize: 24, textAlign: "center" },
});

export default NoInternetWarning;
