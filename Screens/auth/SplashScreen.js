// // import React from "react";
// // import {
// //   View,
// //   Text,
// //   TouchableOpacity,
// //   StyleSheet,
// //   Dimensions,
// //   StatusBar,
// // } from "react-native";
// // import * as Animatable from "react-native-animatable";
// // import { LinearGradient } from "expo-linear-gradient";
// // import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// // import { useTheme } from "@react-navigation/native";
// // import { Color } from "../../GlobalStyles";
// // import ProductSlider from "../../Components/SplashScreen/ProductSlider";
// // import AntDesign from "react-native-vector-icons/AntDesign";

// // const COLORS = {
// //   primary: Color.primaryColor,
// //   secondary: "#4e54c8",
// //   light: "#8f94fb",
// //   white: "#fff",
// //   textDark: "#05375a",
// //   grey: "grey",
// //   background: "#fff", // Default background color
// // };

// // const SplashScreen = ({ navigation }) => {
// //   const { colors } = useTheme();

// //   // Define the custom animation for the arrow
// //   const moveArrow = {
// //     0: {
// //       transform: [{ translateX: 0 }],
// //     },
// //     0.5: {
// //       transform: [{ translateX: 5 }],
// //     },
// //     1: {
// //       transform: [{ translateX: 0 }],
// //     },
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <StatusBar barStyle="light-content" />
// //       <View style={styles.header}>
// //         <ProductSlider />
// //       </View>
// //       <LinearGradient
// //         colors={["#08f", "#f03"]}
// //         start={{ x: 0, y: 0 }}
// //         end={{ x: 1, y: 1 }}
// //         style={styles.footerGradient}
// //       >
// //         <Animatable.View
// //           style={[
// //             styles.footer,
// //             {
// //               backgroundColor: colors.background || COLORS.background,
// //             },
// //           ]}
// //           animation="fadeInUpBig"
// //         >
// //           <Text
// //             style={[
// //               styles.title,
// //               {
// //                 color: colors.text || COLORS.textDark,
// //               },
// //             ]}
// //           >
// //             Excellence Awaits, Let’s Begin.
// //           </Text>
// //           <Text style={styles.text}>
// //             Empower your journey with the best resources at your fingertips.
// //             Start today and conquer tomorrow!
// //           </Text>
// //           <View style={styles.button}>
// //             <TouchableOpacity onPress={() => navigation.navigate("Login")}>
// //               <LinearGradient
// //                 colors={[COLORS.light, COLORS.secondary]}
// //                 style={styles.signIn}
// //               >
// //                 <Text style={[styles.textSign, { marginRight: 10 }]}>
// //                   Get Started
// //                 </Text>
// //                 <Animatable.View
// //                   animation={moveArrow}
// //                   iterationCount="infinite"
// //                   duration={1000} // Adjust the speed of the animation
// //                 >
// //                   <AntDesign
// //                     name="doubleright"
// //                     color={COLORS.white}
// //                     size={20}
// //                   />
// //                 </Animatable.View>
// //               </LinearGradient>
// //             </TouchableOpacity>
// //           </View>

// //           {/* <Animatable.Image
// //             source={require("../../assets/RazorpayBanner.png")}
// //             style={styles.footerImage}
// //             resizeMethod="resize"
// //           /> */}
// //           <Text style={styles.disclaimer}>
// //             Disclaimer - Meadhikari is an independent platform, not affiliated
// //             with any public authority.
// //           </Text>
// //           <Text style={styles.madeInMaharastra}>❤️ Made in Maharastra ❤️</Text>
// //         </Animatable.View>
// //       </LinearGradient>
// //     </View>
// //   );
// // };

// // export default SplashScreen;

// // const { height } = Dimensions.get("screen");
// // const height_logo = height * 0.15;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //   },
// //   header: {
// //     flex: 1,
// //   },
// //   footerGradient: {
// //     flex: 1,
// //     borderTopLeftRadius: 30,
// //     borderTopRightRadius: 30,
// //     padding: 3, // Thickness of the gradient border
// //     bottom: 0,
// //   },
// //   footer: {
// //     flex: 1,
// //     backgroundColor: COLORS.white,
// //     borderTopLeftRadius: 30,
// //     borderTopRightRadius: 30,
// //     paddingVertical: 20,
// //     paddingHorizontal: 30,
// //   },
// //   title: {
// //     color: COLORS.textDark,
// //     fontSize: 30,
// //     fontWeight: "bold",
// //   },
// //   text: {
// //     color: COLORS.grey,
// //     marginTop: 5,
// //   },
// //   button: {
// //     alignItems: "flex-end",
// //     marginTop: 30,
// //   },
// //   signIn: {
// //     width: 150,
// //     height: 50,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     borderRadius: 50,
// //     flexDirection: "row",
// //     marginTop: 20,
// //   },
// //   textSign: {
// //     color: COLORS.white,
// //     fontWeight: "bold",
// //   },
// //   footerImage: {
// //     width: "90%",
// //     height: 60,
// //     alignSelf: "center",
// //     position: "absolute",
// //     bottom: "20%",
// //   },
// //   disclaimer: {
// //     color: COLORS.grey,
// //     fontSize: 12,
// //     textAlign: "center",
// //     position: "absolute",
// //     alignSelf: "center",
// //     bottom: "10%",
// //   },

// //   madeInMaharastra: {
// //     fontSize: 14,
// //     textAlign: "center",
// //     position: "absolute",
// //     alignSelf: "center",
// //     bottom: "3%",
// //   },
// // });

// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   StatusBar,
// } from "react-native";
// import * as Animatable from "react-native-animatable";
// import { LinearGradient } from "expo-linear-gradient";
// import AntDesign from "react-native-vector-icons/AntDesign";
// import { useTheme } from "@react-navigation/native";
// import { Color } from "../../GlobalStyles";
// import ProductSlider from "../../Components/SplashScreen/ProductSlider";

// const { width, height } = Dimensions.get("screen");

// const COLORS = {
//   primary: Color.primaryColor,
//   secondary: "#4e54c8",
//   light: "#8f94fb",
//   white: "#fff",
//   textDark: "#05375a",
//   grey: "grey",
//   background: "#fff",
// };

// const SplashScreen = ({ navigation }) => {
//   const { colors } = useTheme();

//   // Define the custom animation for the arrow
//   const moveArrow = {
//     0: {
//       transform: [{ translateX: 0 }],
//     },
//     0.5: {
//       transform: [{ translateX: 5 }],
//     },
//     1: {
//       transform: [{ translateX: 0 }],
//     },
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" />
//       <View style={styles.header}>
//         <ProductSlider />
//       </View>
//       <LinearGradient
//         colors={["#08f", "#f03"]}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={styles.footerGradient}
//       >
//         <Animatable.View
//           style={[
//             styles.footer,
//             {
//               backgroundColor: colors.background || COLORS.background,
//             },
//           ]}
//           animation="fadeInUpBig"
//         >
//           <Text
//             style={[
//               styles.title,
//               {
//                 color: colors.text || COLORS.textDark,
//               },
//             ]}
//           >
//             Excellence Awaits, Let’s Begin.
//           </Text>
//           <Text style={styles.text}>
//             Empower your journey with the best resources at your fingertips.
//             Start today and conquer tomorrow!
//           </Text>
//           <View style={styles.button}>
//             <TouchableOpacity onPress={() => navigation.navigate("Login")}>
//               <LinearGradient
//                 colors={[COLORS.light, COLORS.secondary]}
//                 style={styles.signIn}
//               >
//                 <Text style={[styles.textSign, { marginRight: 10 }]}>
//                   Get Started
//                 </Text>
//                 <Animatable.View
//                   animation={moveArrow}
//                   iterationCount="infinite"
//                   duration={1000}
//                 >
//                   <AntDesign
//                     name="doubleright"
//                     color={COLORS.white}
//                     size={width * 0.05} // Responsive icon size
//                   />
//                 </Animatable.View>
//               </LinearGradient>
//             </TouchableOpacity>
//           </View>

//           <Text style={styles.disclaimer}>
//             Disclaimer - Meadhikari is an independent platform, not affiliated
//             with any public authority.
//           </Text>
//           <Text style={styles.madeInMaharastra}>❤️ Made in Maharastra ❤️</Text>
//         </Animatable.View>
//       </LinearGradient>
//     </View>
//   );
// };

// export default SplashScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     flex: 1,
//   },
//   footerGradient: {
//     flex: 1,
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     padding: 3,
//   },
//   footer: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     paddingVertical: height * 0.03, // Responsive vertical padding
//     paddingHorizontal: width * 0.06, // Responsive horizontal padding
//   },
//   title: {
//     color: COLORS.textDark,
//     fontSize: width * 0.08, // Responsive font size
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   text: {
//     color: COLORS.grey,
//     marginTop: height * 0.01, // Responsive margin
//     fontSize: width * 0.04, // Responsive font size
//     textAlign: "center",
//   },
//   button: {
//     alignItems: "center",
//     marginTop: height * 0.05, // Responsive margin
//   },
//   signIn: {
//     width: width * 0.4, // Responsive button width
//     height: height * 0.06, // Responsive button height
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: height * 0.03, // Responsive border radius
//     flexDirection: "row",
//   },
//   textSign: {
//     color: COLORS.white,
//     fontWeight: "bold",
//     fontSize: width * 0.045, // Responsive font size
//   },
//   disclaimer: {
//     color: COLORS.grey,
//     fontSize: width * 0.03, // Responsive font size
//     textAlign: "center",
//     position: "absolute",
//     alignSelf: "center",
//     bottom: "10%",
//   },
//   madeInMaharastra: {
//     fontSize: width * 0.035, // Responsive font size
//     textAlign: "center",
//     position: "absolute",
//     alignSelf: "center",
//     bottom: "5%",
//   },
// });

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  ScrollView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useTheme } from "@react-navigation/native";
import { Color } from "../../GlobalStyles";
import ProductSlider from "../../Components/SplashScreen/ProductSlider";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const { width, height } = Dimensions.get("screen");

const COLORS = {
  primary: Color.primaryColor,
  secondary: "#4e54c8",
  light: "#8f94fb",
  white: "#fff",
  textDark: "#05375a",
  grey: "grey",
  background: "#fff",
};

const SplashScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const moveArrow = {
    0: {
      transform: [{ translateX: 0 }],
    },
    0.5: {
      transform: [{ translateX: 5 }],
    },
    1: {
      transform: [{ translateX: 0 }],
    },
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <ProductSlider />
      </View>
      <LinearGradient
        colors={["#08f", "#f03"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.footerGradient}
      >
        <Animatable.View
          style={[
            styles.footer,
            {
              backgroundColor: colors.background || COLORS.background,
            },
          ]}
          animation="fadeInUpBig"
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Text
              style={[
                styles.title,
                {
                  color: colors.text || COLORS.textDark,
                },
              ]}
            >
              Excellence Awaits, Let’s Begin.
            </Text>
            <Text style={styles.text}>
              Empower your journey with the best resources at your fingertips.
              Start today and conquer tomorrow!
            </Text>
            <View style={styles.button}>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <LinearGradient
                  colors={[COLORS.light, COLORS.secondary]}
                  style={styles.signIn}
                >
                  <Text style={[styles.textSign, { marginRight: 10 }]}>
                    Get Started
                  </Text>
                  <Animatable.View
                    animation={moveArrow}
                    iterationCount="infinite"
                    duration={1000}
                  >
                    <AntDesign
                      name="doubleright"
                      color={COLORS.white}
                      size={width * 0.05}
                    />
                  </Animatable.View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <Text style={styles.website}>🌐 www.meadhikari.com</Text>
          </ScrollView>

          {/* Disclaimer and Made in Maharashtra */}
          <Text style={styles.disclaimer}>
            Disclaimer - Meadhikari is an independent platform, not affiliated
            with any public authority.
          </Text>
          <Text style={styles.madeInMaharastra}>❤️ Made in Maharastra ❤️</Text>
        </Animatable.View>
      </LinearGradient>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
  },
  footerGradient: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 3,
  },
  footer: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.06,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: height * 0.15, // Extra space for bottom elements
  },
  title: {
    color: COLORS.textDark,
    fontSize: width * 0.08,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    color: COLORS.grey,
    marginTop: height * 0.01,
    fontSize: width * 0.04,
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    marginTop: height * 0.05,
  },
  signIn: {
    width: width * 0.4,
    height: height * 0.06,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: height * 0.03,
    flexDirection: "row",
  },
  textSign: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: width * 0.045,
  },
  disclaimer: {
    position: "absolute",
    bottom: "12%",
    alignSelf: "center",
    color: COLORS.grey,
    fontSize: width * 0.03,
    textAlign: "center",
  },
  madeInMaharastra: {
    position: "absolute",
    bottom: "5%",
    alignSelf: "center",
    fontSize: width * 0.035,
    color: COLORS.grey,
    textAlign: "center",
  },

  website: {
    color: COLORS.grey,
    marginTop: height * 0.01,
    fontSize: width * 0.04,
    textAlign: "center",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height * 0.06,
    gap: width * 0.1, // Spacing between icons
  },
});
