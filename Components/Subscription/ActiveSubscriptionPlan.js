// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

// const ActiveSubscriptionPlan = ({ plan }) => {
//   const { name, price, features } = plan;

//   return (
//     <View style={styles.container}>
//       <LinearGradient
//         colors={["#FFDEE9", "#B5FFFC"]}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={styles.gradientBackground}
//       >
//         <View style={styles.activeLabelContainer}>
//           <Text style={styles.activeLabelText}>Active Plan</Text>
//         </View>
//         <View style={styles.header}>
//           <FontAwesome5
//             name="crown"
//             size={30}
//             color="#FF8C00"
//             style={styles.icon}
//           />
//           <Text style={styles.planName}>{name}</Text>
//         </View>
//         <Text style={styles.planPrice}>{price}</Text>
//         <View style={styles.divider}></View>
//         <View style={styles.featuresList}>
//           {features.map((feature, index) => (
//             <View key={index} style={styles.featureItem}>
//               <FontAwesome5
//                 name="check-circle"
//                 size={16}
//                 color="#FF8C00"
//                 style={styles.checkIcon}
//               />
//               <Text style={styles.featureText}>{feature}</Text>
//             </View>
//           ))}
//         </View>
//       </LinearGradient>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 5,
//     borderRadius: 15,
//     marginHorizontal: 20,
//     // marginTop: 5,
//     // shadowColor: "#000",
//     // shadowOffset: { width: 0, height: 10 },
//     // shadowOpacity: 0.1,
//     // shadowRadius: 20,
//     // elevation: 15,
//   },
//   gradientBackground: {
//     borderRadius: 15,
//     padding: 20,
//   },
//   activeLabelContainer: {
//     alignSelf: "flex-start",
//     backgroundColor: "#FF8C00",
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     marginBottom: 20,
//   },
//   activeLabelText: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#fff",
//     letterSpacing: 1,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   icon: {
//     marginRight: 10,
//   },
//   planName: {
//     fontSize: 24,
//     color: "#333",
//     fontWeight: "700",
//     textTransform: "uppercase",
//     letterSpacing: 1,
//   },
//   planPrice: {
//     fontSize: 20,
//     color: "#333",
//     fontWeight: "600",
//     marginVertical: 10,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: "#FF8C00",
//     marginVertical: 15,
//   },
//   featuresList: {
//     marginTop: 10,
//   },
//   featureItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   checkIcon: {
//     marginRight: 10,
//   },
//   featureText: {
//     fontSize: 16,
//     color: "#333",
//     fontWeight: "500",
//   },
// });

// export default ActiveSubscriptionPlan;

import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Fontisto from "react-native-vector-icons/Fontisto";

import axios from "axios"; // Ensure axios is installed and imported
import { AuthContext } from "../../Context/authContext";
import { Color } from "../../GlobalStyles";

const ActiveSubscriptionPlan = () => {
  const [state, setState] = useContext(AuthContext);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [duration, setDuration] = useState("");
  const [daysLeft, setDaysLeft] = useState(0);

  const {
    subscriptionPlanID,
    isSubscriptionActive,
    subscriptionStartDate,
    subscriptionExpiryDate,
  } = state.user;
  // const subscriptionPlanID = "66cae559267f0f6cedde1fff";
  // const isSubscriptionActive = true;

  // console.log("subscriptionExpiryDate" + JSON.stringify(state.user));

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        setLoading(true);
        if (subscriptionPlanID) {
          const response = await axios.get(`/plans/${subscriptionPlanID}`);
          setPlan(response.data);

          const calculateDuration = (days) => {
            switch (days) {
              case 0:
                return "Unlimited*";
              case 30:
                return "1 month";
              case 180:
                return "6 months";
              case 365:
                return "1 year";
              default:
                return `${days} days`; // Default case to handle other values
            }
          };

          const result = calculateDuration(response.data.durationInDays);
          setDuration(result);
        } else {
          setPlan(null);
        }
      } catch (err) {
        setError("Error fetching plan details");
      } finally {
        setLoading(false);
      }
    };

    if (isSubscriptionActive) {
      fetchPlan();
    } else {
      setPlan(null);
    }
  }, [subscriptionPlanID, isSubscriptionActive]);

  // if (loading) {
  //   return <Text>Loading...</Text>;
  // }

  // if (error) {
  //   return null;
  //   // <Text>{error}</Text>;
  // }

  // if (!isSubscriptionActive || !plan) {
  //   return null;
  //   // <Text>No plan available</Text>;
  // }

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!isSubscriptionActive || !plan) {
    return null;
    // <Text>No plan available</Text>;
  }

  const { name, price, features } = plan;

  // console.log("Plan Recived :" + JSON.stringify(plan));

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Utility function to calculate days left until expiry
  // const calculateDaysLeft = (expiryDateString) => {
  //   const today = new Date();
  //   const expiryDate = new Date(expiryDateString);
  //   const differenceInTime = expiryDate - today;
  //   const differenceInDays = Math.ceil(
  //     differenceInTime / (1000 * 60 * 60 * 24)
  //   );
  //   return differenceInDays;
  // };
  const calculateDaysLeft = (expiryDateString) => {
    // Get today's date and set the time to 12:00 AM
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to 12:00 AM
    // Get the expiry date and set the time to 12:00 AM
    const expiryDate = new Date(expiryDateString);
    expiryDate.setHours(0, 0, 0, 0); // Set time to 12:00 AM
    // Calculate the difference in time (milliseconds)
    const differenceInTime = expiryDate - today;
    // Convert the difference from milliseconds to days
    const differenceInDays = Math.ceil(
      differenceInTime / (1000 * 60 * 60 * 24)
    );

    return differenceInDays;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FFDEE9", "#B5FFFC"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.activeLabelContainer}>
            <Text style={styles.activeLabelText}>Active Plan</Text>
          </View>
          <View style={styles.expiryContainer}>
            <FontAwesome5 name="clock" size={16} style={styles.iconDate} />
            <Text style={styles.daysLeftText}>
              {calculateDaysLeft(subscriptionExpiryDate)} {"Days"}
            </Text>
          </View>
        </View>

        <View style={styles.header}>
          <FontAwesome5
            name="crown"
            size={30}
            color="#FF8C00"
            style={styles.icon}
          />
          <Text style={styles.planName}>{name}</Text>
        </View>
        <Text style={styles.planPrice}>
          ₹{price} - {duration}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 10,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Fontisto name="date" size={16} style={styles.iconDate} />
            <Text style={styles.expiryDateText}>
              {formatDate(subscriptionStartDate)}
            </Text>
          </View>
          <Text>To</Text>
          <View style={{ flexDirection: "row" }}>
            <Fontisto name="date" size={16} style={styles.iconDate} />
            <Text style={styles.expiryDateText}>
              {formatDate(subscriptionExpiryDate)}
            </Text>
          </View>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.featuresList}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <FontAwesome5
                name="check-circle"
                size={16}
                color="#FF8C00"
                style={styles.checkIcon}
              />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  activeLabelContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#FF8C00",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 20,
  },
  expiryContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    marginBottom: 20,
  },
  iconDate: {
    marginRight: 5,
    color: "#FF8C00",
  },
  expiryDateText: {
    fontSize: 16,
  },
  container: {
    padding: 5,
    borderRadius: 15,
    marginHorizontal: 20,
    // marginTop: 5,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 10 },
    // shadowOpacity: 0.1,
    // shadowRadius: 20,
    // elevation: 15,
  },
  gradientBackground: {
    borderRadius: 15,
    padding: 20,
  },

  activeLabelText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    letterSpacing: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  planName: {
    fontSize: 24,
    color: "#333",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  planPrice: {
    fontSize: 20,
    color: "#333",
    fontWeight: "600",
    marginVertical: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#FF8C00",
    marginVertical: 15,
  },
  featuresList: {
    marginTop: 10,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkIcon: {
    marginRight: 10,
  },
  featureText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
});

export default ActiveSubscriptionPlan;
