// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";

// const BetaHomePageBanner = ({ username }) => {
//   return (
//     <LinearGradient
//       colors={["#4e54c8", "#8f94fb"]}
//       start={{ x: 0, y: 0 }}
//       end={{ x: 1, y: 0 }}
//       style={styles.banner}
//     >
//       <Text style={styles.heading}>Dear {username},</Text>
//       <Text style={styles.text}>
//         This is the beta version, which will upgrade to a subscription model in
//         the future.
//       </Text>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   banner: {
//     borderRadius: 10,
//     padding: 16,
//     margin: 16,
//   },
//   heading: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "white",
//     marginBottom: 8,
//   },
//   text: {
//     fontSize: 16,
//     color: "white",
//     marginBottom: 8,
//   },
// });

// export default BetaHomePageBanner;

import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { AuthContext } from "../../Context/authContext";
import axios from "axios";

const BetaHomePageBanner = ({
  username,
  subscriptionPlan,
  startDate,
  expiryDate,
}) => {
  const [state, setState] = useContext(AuthContext);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    subscriptionPlanID,
    isSubscriptionActive,
    subscriptionStartDate,
    subscriptionExpiryDate,
  } = state.user;
  // const subscriptionPlanID = "66cae559267f0f6cedde1fff";
  // const isSubscriptionActive = true;

  // console.log("subscriptionExpiryDate" + JSON.stringify(state.user));

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getPlanNameWithID = async (id) => {
    try {
      const response = await axios.get(`/plans/${id}`);
      setPlan(response.data);
      // console.log(response.data.name);
      // return response.data.name;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlanNameWithID(subscriptionPlanID);
  }, [subscriptionPlanID]);

  return (
    <LinearGradient
      colors={["#4e54c8", "#8f94fb"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.banner}
    >
      <Text style={styles.heading}>Hello, {username} ✌️</Text>
      <Text style={styles.text}>
        Enjoy your current plan while we work on exciting new features!
      </Text>

      {isSubscriptionActive && (
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <FontAwesome5
              name="crown"
              size={16}
              color="white"
              style={styles.icon}
            />
            <Text style={styles.infoText}>
              <Text style={styles.highlight}>{plan?.name}</Text>
            </Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesome5
              name="calendar-alt"
              size={16}
              color="white"
              style={styles.icon}
            />
            <Text style={styles.infoText}>
              <Text style={styles.highlight}>
                {formatDate(subscriptionStartDate)}
              </Text>
            </Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesome5
              name="clock"
              size={16}
              color="white"
              style={styles.icon}
            />
            <Text style={styles.infoText}>
              <Text style={styles.highlight}>
                {formatDate(subscriptionExpiryDate)}
              </Text>
            </Text>
          </View>
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  banner: {
    borderRadius: 12,
    padding: 20,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "white",
    marginBottom: 16,
    lineHeight: 22,
  },
  infoContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  icon: {
    marginRight: 10,
  },
  infoText: {
    fontSize: 15,
    color: "white",
  },
  highlight: {
    fontWeight: "bold",
    color: "#ffdd59",
  },
});

export default BetaHomePageBanner;
