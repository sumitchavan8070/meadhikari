import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/authContext";
import axios from "axios";

const ExpiredSubscriptionSection = () => {
  const [state, setState] = useContext(AuthContext);
  const [isSubscriptionActive, setisSubscriptionActive] = useState(false);

  useEffect(() => {
    const updateUserDetails = async () => {
      const response = await axios.get(`/${state.user._id}`);
      setisSubscriptionActive(response.data.user.isSubscriptionActive);
    };

    updateUserDetails();
  }, []);

  return (
    !isSubscriptionActive && (
      <View style={styles.container}>
        <View style={{ padding: 30 }}>
          <Text
            style={{
              color: "red",
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 5,
            }}
          >
            No active plan
          </Text>
          <Text style={{ color: "gray" }}>
            Choose your subscription now for uninterrupted access and
            achievements ahead! 🚀✨
          </Text>
          <View style={styles.divider}></View>
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevation for Android
    elevation: 5,
  },

  divider: {
    height: 1,
    backgroundColor: "#FF8C00",
    marginVertical: 15,
  },
});

export default ExpiredSubscriptionSection;
