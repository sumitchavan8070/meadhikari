import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const Subscription = () => {
  const subscriptions = [
    {
      title: "Silver Plan",
      duration: "3 Months",
      price: "₹ 110",
      features: [
        "- Solve Unlimited PYQ",
        "- Solve Unlimited Test",
        "- Create Unlimited Test",
        "- Share Unlimited Test",
      ],
      colors: ["#DDE1E2", "#A0A0BA"],
      borderColor: "#A0A0BA",
      stripColor: "#A0A0BA",
      backgroundColor: "#E4E9E8",
      id: "silver",
    },
    {
      title: "Gold Plan",
      duration: "6 Months",
      price: "₹ 149",
      features: [
        "- Solve Unlimited PYQ",
        "- Solve Unlimited Test",
        "- Create Unlimited Test",
        "- Share Unlimited Test",
      ],
      colors: ["#FFD700", "#FFA500"],
      borderColor: "#FFA500",
      stripColor: "#FFA500",
      backgroundColor: "#FFD700",
      id: "gold",
    },
    {
      title: "Diamond Plan",
      duration: "1 Year",
      price: "₹ 249",
      features: [
        "- Solve Unlimited PYQ",
        "- Solve Unlimited Test",
        "- Create Unlimited Test",
        "- Share Unlimited Test",
      ],
      colors: ["#020024", "#090979", "#00D4FF"],
      borderColor: "#00D4FF",
      stripColor: "#090979",
      backgroundColor: "#c7cae6",
      id: "diamond",
    },
  ];

  const handleBuySubscription = (tier) => {
    console.log(`Buying ${tier} subscription`);
  };

  return (
    <ScrollView
      horizontal={true}
      style={{ marginVertical: 10 }}
      showsHorizontalScrollIndicator={false}
    >
      {subscriptions.map((sub) => (
        <View
          key={sub.id}
          style={[styles.subCard, { borderColor: sub.borderColor }]}
        >
          <View
            style={[
              styles.headerStrip,
              { backgroundColor: sub.backgroundColor },
            ]}
          >
            <View
              style={[styles.strip, { backgroundColor: sub.stripColor }]}
            ></View>
            <View style={styles.stripContent}>
              <Text style={styles.planTitle}>{sub.title}</Text>
              <Text style={styles.planDuration}>{sub.duration}</Text>
            </View>
          </View>
          <Text style={styles.priceText}>{sub.price}</Text>
          {sub.features.map((feature, index) => (
            <Text key={index}>{feature}</Text>
          ))}
          <TouchableOpacity
            style={styles.buyButton}
            onPress={() => handleBuySubscription(sub.id)}
          >
            <LinearGradient
              colors={sub.colors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[StyleSheet.absoluteFill, styles.buyButton]}
            >
              <Text style={styles.buttonText}>Buy</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  priceText: {
    fontSize: 32,
    alignSelf: "center",
    marginTop: 20,
    fontWeight: "bold",
  },
  headerStrip: {
    height: 40,
    flexDirection: "row",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: 10,
  },
  strip: {
    height: 40,
    width: 6,
  },
  stripContent: {
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  planTitle: {
    fontWeight: "bold",
    fontSize: 15,
  },
  planDuration: { fontSize: 12 },
  subCard: {
    width: 200,
    height: 300,
    borderWidth: 1,
    borderRadius: 30,
    marginRight: 10,
    padding: 10,
    justifyContent: "space-between",
  },
  buyButton: {
    width: "100%",
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    flexDirection: "row",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Subscription;

// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import Carousel from "react-native-x-carousel";
// const { width } = Dimensions.get("window");

// const Subscription = () => {
//   const subscriptions = [
//     {
//       title: "Silver Plan",
//       duration: "3 Months",
//       price: "₹ 110",
//       features: [
//         "- Solve Unlimited PYQ",
//         "- Solve Unlimited Test",
//         "- Create Unlimited Test",
//         "- Share Unlimited Test",
//       ],
//       colors: ["#DDE1E2", "#A0A0BA"],
//       borderColor: "#A0A0BA",
//       stripColor: "#A0A0BA",
//       backgroundColor: "#E4E9E8",
//       id: "silver",
//     },
//     {
//       title: "Gold Plan",
//       duration: "6 Months",
//       price: "₹ 149",
//       features: [
//         "- Solve Unlimited PYQ",
//         "- Solve Unlimited Test",
//         "- Create Unlimited Test",
//         "- Share Unlimited Test",
//       ],
//       colors: ["#FFD700", "#FFA500"],
//       borderColor: "#FFA500",
//       stripColor: "#FFA500",
//       backgroundColor: "#FFD700",
//       id: "gold",
//     },
//     {
//       title: "Diamond Plan",
//       duration: "1 Year",
//       price: "₹ 249",
//       features: [
//         "- Solve Unlimited PYQ",
//         "- Solve Unlimited Test",
//         "- Create Unlimited Test",
//         "- Share Unlimited Test",
//       ],
//       colors: ["#020024", "#090979", "#00D4FF"],
//       borderColor: "#00D4FF",
//       stripColor: "#090979",
//       backgroundColor: "#c7cae6",
//       id: "diamond",
//     },
//   ];

//   const handleBuySubscription = (tier) => {
//     console.log(`Buying ${tier} subscription`);
//   };

//   const renderItem = (sub) => (
//     <View
//       key={sub.id}
//       style={[styles.subCard, { borderColor: sub.borderColor }]}
//     >
//       <View
//         style={[styles.headerStrip, { backgroundColor: sub.backgroundColor }]}
//       >
//         <View
//           style={[styles.strip, { backgroundColor: sub.stripColor }]}
//         ></View>
//         <View style={styles.stripContent}>
//           <Text style={styles.planTitle}>{sub.title}</Text>
//           <Text style={styles.planDuration}>{sub.duration}</Text>
//         </View>
//       </View>
//       <Text style={styles.priceText}>{sub.price}</Text>
//       {sub.features.map((feature, index) => (
//         <Text key={index}>{feature}</Text>
//       ))}
//       <TouchableOpacity
//         style={styles.buyButton}
//         onPress={() => handleBuySubscription(sub.id)}
//       >
//         <LinearGradient
//           colors={sub.colors}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 0 }}
//           style={styles.gradientStyle}
//         >
//           <Text style={styles.buttonText}>Buy</Text>
//         </LinearGradient>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View style={styles.car}>
//       <Carousel
//         // pagination
//         renderItem={renderItem}
//         data={subscriptions}
//         loop
//         autoplay
//         autoplayInterval={3000}
//         sliderWidth={width}
//         itemWidth={width * 0.8}
//         inactiveSlideScale={0.8} // Scales down the non-active slides
//         inactiveSlideOpacity={0.4} // Lo
//         activeSlideAlignment="center" // Centers the active slide
//         containerCustomStyle={styles.carouselContainer}
//         contentContainerCustomStyle={styles.carouselContentContainer}
//         enableMomentum
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   carouselContainer: {
//     overflow: "visible", // Ensures neighboring cards are visible
//   },
//   carouselContentContainer: {
//     paddingLeft: 20, // Adjust to show part of the previous card
//     paddingRight: 20, // Adjust to show part of the next card
//   },
//   car: {
//     width: width,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   priceText: {
//     fontSize: 32,
//     alignSelf: "center",
//     marginTop: 20,
//     fontWeight: "bold",
//   },
//   headerStrip: {
//     height: 40,
//     flexDirection: "row",
//     borderTopRightRadius: 10,
//     borderBottomRightRadius: 10,
//     marginTop: 10,
//   },
//   strip: {
//     height: 40,
//     width: 6,
//   },
//   stripContent: {
//     paddingHorizontal: 10,
//     justifyContent: "center",
//   },
//   planTitle: {
//     fontWeight: "bold",
//     fontSize: 15,
//   },
//   planDuration: { fontSize: 12 },
//   subCard: {
//     width: 200,
//     height: 300,
//     borderWidth: 1,
//     borderRadius: 30,
//     marginRight: 10,
//     padding: 10,
//     justifyContent: "space-between",
//   },
//   buyButton: {
//     width: "100%",
//     height: 40,
//     borderRadius: 20,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 10,
//     flexDirection: "row",
//     marginBottom: 10,
//   },
//   gradientStyle: {
//     width: "100%",
//     height: "100%",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 20,
//   },
//   buttonText: {
//     color: "white",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
// });

// export default Subscription;
