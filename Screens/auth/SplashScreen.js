import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "@react-navigation/native";
import { Color } from "../../GlobalStyles";
import ProductSlider from "../../Components/SplashScreen/ProductSlider";

// Define your colors as a constant
const COLORS = {
  primary: Color.primaryColor,
  secondary: "#4e54c8",
  light: "#8f94fb",
  white: "#fff",
  textDark: "#05375a",
  grey: "grey",
  background: "#fff", // Default background color
};

const SplashScreen = ({ navigation }) => {
  const { colors } = useTheme();

  // Sample data for politicians
  const politicians = [
    {
      img: require("../../assets/shinde.png"),
      designation: "Chief Minister",
    },
    {
      img: require("../../assets/modi.png"),
      designation: "Prime Minister",
    },
  ];

  // State to toggle the position of politician images
  const [swapPositions, setSwapPositions] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        {/* <CustomeSafeAreaView> */}
        <ProductSlider></ProductSlider>
        {/* </CustomeSafeAreaView> */}
        {/* <Animatable.View
          animation="fadeIn"
          duration={2000}
          style={styles.headerImageWrapper}
        >
          {politicians.map((politician, index) => (
            <Animatable.View
              key={index}
              style={[
                styles.politicianContainer,
                index === 0
                  ? swapPositions
                    ? styles.topRight
                    : styles.topLeft
                  : swapPositions
                    ? styles.topLeft
                    : styles.topRight,
              ]}
            >
              <Animatable.Image
                source={politician.img}
                style={styles.politicianImage}
                resizeMode="cover"
              />
              <Text style={styles.designation}>{politician.designation}</Text>
            </Animatable.View>
          ))}
          <Animatable.Image
            animation="bounceIn"
            duration={1500}
            source={require("../../assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animatable.View> */}
      </View>
      <Animatable.View
        style={[
          styles.footer,
          {
            backgroundColor: colors.background || COLORS.background,
          },
        ]}
        animation="fadeInUpBig"
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
          Empower your journey with the best resources at your fingertips. Start
          today and conquer tomorrow!
        </Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <LinearGradient
              colors={[COLORS.light, COLORS.secondary]}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>Get Started</Text>
              <MaterialIcons
                name="navigate-next"
                color={COLORS.white}
                size={20}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <Animatable.Image
          source={require("../../assets/RazorpayBanner.png")} // Replace with your image path
          style={styles.footerImage}
          //   resizeMode="cover"
          resizeMethod="resize"
        />
        <Text style={styles.disclaimer}>
          We love our leaders, which is why they're here, but they have no
          affiliation with this app.
        </Text>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.15;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.primary,
  },
  header: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // position: "relative",
  },
  headerImageWrapper: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  politicianContainer: {
    position: "absolute",
    alignItems: "center",
  },
  politicianImage: {
    width: 100,
    height: 100,
  },
  topLeft: {
    top: 20,
    left: 20,
  },
  topRight: {
    top: 15,
    right: 20,
  },
  designation: {
    marginTop: 5,
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  logo: {
    width: height_logo,
    height: height_logo,
    bottom: 20, // Added to give a margin below the logo
    position: "absolute",
  },
  footer: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  title: {
    color: COLORS.textDark,
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: COLORS.grey,
    marginTop: 5,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
    marginTop: 20,
  },
  textSign: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  footerImage: {
    width: "90%",
    height: 60,
    alignSelf: "center",
    position: "absolute",
    bottom: "15%",
  },
  disclaimer: {
    color: COLORS.grey,
    fontSize: 12,
    textAlign: "center",
    position: "absolute",
    alignSelf: "center",
    bottom: "2%",
  },
});

// import React, { useRef, useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   Dimensions,
//   Animated,
// } from "react-native";
// import ProductSlider from "../../Components/SplashScreen/ProductSlider";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import CustomeSafeAreaView from "../../Components/SafeAreaView/CustomeSafeAreaView";

// const ProductScrollingSection = () => {
//   const { width } = Dimensions.get("window");

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <View style={styles.container}>
//         <CustomeSafeAreaView>
//           <ProductSlider></ProductSlider>
//         </CustomeSafeAreaView>
//       </View>
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default ProductScrollingSection;
