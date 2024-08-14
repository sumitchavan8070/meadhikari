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

// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { FontAwesome5 } from "@expo/vector-icons";

// const BetaHomePageBanner = ({
//   username,
//   subscriptionPlan,
//   startDate,
//   expiryDate,
// }) => {
//   return (
//     <LinearGradient
//       colors={["#4e54c8", "#8f94fb"]}
//       start={{ x: 0, y: 0 }}
//       end={{ x: 1, y: 0 }}
//       style={styles.banner}
//     >
//       <Text style={styles.heading}>Hello, {username}!</Text>
//       <Text style={styles.text}>
//         Welcome to the beta version. Enjoy your current plan while we work on
//         exciting new features!
//       </Text>

//       <View style={styles.infoContainer}>
//         <View style={styles.infoRow}>
//           <FontAwesome5
//             name="crown"
//             size={16}
//             color="white"
//             style={styles.icon}
//           />
//           <Text style={styles.infoText}>
//             Plan: <Text style={styles.highlight}>Silver</Text>
//           </Text>
//         </View>
//         <View style={styles.infoRow}>
//           <FontAwesome5
//             name="calendar-alt"
//             size={16}
//             color="white"
//             style={styles.icon}
//           />
//           <Text style={styles.infoText}>
//             Start Date: <Text style={styles.highlight}>12/01/2022</Text>
//           </Text>
//         </View>
//         <View style={styles.infoRow}>
//           <FontAwesome5
//             name="clock"
//             size={16}
//             color="white"
//             style={styles.icon}
//           />
//           <Text style={styles.infoText}>
//             Expires On: <Text style={styles.highlight}>24/07/2024</Text>
//           </Text>
//         </View>
//       </View>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   banner: {
//     borderRadius: 12,
//     padding: 20,
//     margin: 16,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   heading: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "white",
//     marginBottom: 10,
//   },
//   text: {
//     fontSize: 16,
//     color: "white",
//     marginBottom: 16,
//     lineHeight: 22,
//   },
//   infoContainer: {
//     marginTop: 10,
//   },
//   infoRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   icon: {
//     marginRight: 10,
//   },
//   infoText: {
//     fontSize: 15,
//     color: "white",
//   },
//   highlight: {
//     fontWeight: "bold",
//     color: "#ffdd59",
//   },
// });

// export default BetaHomePageBanner;

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BetaHomePageBanner = ({
  username,
  subscriptionPlan,
  startDate,
  expiryDate,
}) => {
  const navigation = useNavigation();

  const handleNavigateToSubscription = () => {
    navigation.navigate("SubscriptionPage"); // Replace "SubscriptionPage" with the actual route name
  };

  // const subscriptionPlan = "silver";

  return (
    <LinearGradient
      colors={["#4e54c8", "#8f94fb"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.banner}
    >
      <Text style={styles.heading}>Hello, {username}!</Text>
      <Text style={styles.text}>
        Welcome to the beta version. Enjoy your current plan while we work on
        exciting new features!
      </Text>

      {subscriptionPlan ? (
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <FontAwesome5
              name="crown"
              size={16}
              color="white"
              style={styles.icon}
            />
            <Text style={styles.infoText}>
              Plan: <Text style={styles.highlight}>{subscriptionPlan}</Text>
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
              Start Date: <Text style={styles.highlight}>{startDate}</Text>
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
              Expires On: <Text style={styles.highlight}>{expiryDate}</Text>
            </Text>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.placeholderContainer}
          onPress={handleNavigateToSubscription}
        >
          <LinearGradient
            colors={["#ff6f61", "#ff9068"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientContainer}
          >
            <FontAwesome5 name="arrow-right" size={10} color="white" />
          </LinearGradient>
        </TouchableOpacity>
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
  placeholderContainer: {
    // alignSelf: "center",
    alignSelf: "flex-end",

    // marginTop: 20,
  },
  gradientContainer: {
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BetaHomePageBanner;
