// // import React, { useState, useContext, useEffect } from "react";
// // import {
// //   View,
// //   Text,
// //   TouchableOpacity,
// //   TextInput,
// //   Platform,
// //   StyleSheet,
// //   StatusBar,
// //   Alert,
// //   Keyboard,
// // } from "react-native";
// // import { LinearGradient } from "expo-linear-gradient";
// // import FontAwesome from "react-native-vector-icons/FontAwesome";
// // import Feather from "react-native-vector-icons/Feather";
// // import { useTheme } from "react-native-paper";
// // import * as Animatable from "react-native-animatable";
// // import axios from "axios";
// // import AsyncStorage from "@react-native-async-storage/async-storage";
// // import { AuthContext } from "../../Context/authContext";
// // import { requestUserPermission } from "../../utils/notificationService";
// // import LoadingAnimation from "../../Components/Loader/loader";
// // import { Color } from "../../GlobalStyles";
// // import IosAlertWithImage from "../../Components/Alert/IosAlertWithImage"; // Import custom alert
// // import ProductSlider from "../../Components/SplashScreen/ProductSlider";
// // import { err } from "react-native-svg";
// // import globalString from "../../utils/globalStrings";
// // import constants from "../../utils/constants";
// // import { trackLoginPageView } from "../../utils/analyticsUtils";

// // const COLORS = {
// //   primary: Color.primaryColor,
// //   background: "#fff",
// //   textPrimary: "#05375a",
// //   textSecondary: "#666666",
// //   buttonStart: "#8f94fb",
// //   buttonEnd: "#4e54c8",
// //   error: "#FF0000",
// //   icon: "grey",
// //   success: "green",
// // };

// // const Login = ({ navigation }) => {
// //   const [data, setData] = useState({
// //     email: "",
// //     password: "",
// //     isValidEmail: true,
// //     isValidPassword: true,
// //     secureTextEntry: true,
// //   });

// //   const [state, setState] = useContext(AuthContext);
// //   const [loading, setLoading] = useState(false);
// //   const [alertVisible, setAlertVisible] = useState(false);
// //   const [alertMessage, setAlertMessage] = useState("");
// //   const [alertSuccess, setAlertSuccess] = useState(false);

// //   const { colors } = useTheme();

// //   const textInputChange = (val) => {
// //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //     if (emailRegex.test(val)) {
// //       setData({
// //         ...data,
// //         email: val,
// //         isValidEmail: true,
// //       });
// //     } else {
// //       setData({
// //         ...data,
// //         email: val,
// //         isValidEmail: false,
// //       });
// //     }
// //   };

// //   const handlePasswordChange = (val) => {
// //     if (val.trim().length >= 8) {
// //       setData({
// //         ...data,
// //         password: val,
// //         isValidPassword: true,
// //       });
// //     } else {
// //       setData({
// //         ...data,
// //         password: val,
// //         isValidPassword: false,
// //       });
// //     }
// //   };

// //   const updateSecureTextEntry = () => {
// //     setData({
// //       ...data,
// //       secureTextEntry: !data.secureTextEntry,
// //     });
// //   };

// //   const showAlert = (message, isSuccess) => {
// //     setAlertMessage(message);
// //     setAlertSuccess(isSuccess);
// //     setAlertVisible(true);
// //   };

// //   const onSubmitLoginBtn = async () => {
// //     Keyboard.dismiss();
// //     setLoading(true);

// //     try {
// //       if (!data.email || !data.password) {
// //         showAlert("All fields are required", false);
// //         setLoading(false);
// //         return;
// //       }

// //       requestUserPermission();

// //       const lowerCaseEmail = data.email.toLowerCase();

// //       const { data: responseData } = await axios.post("/login", {
// //         email: lowerCaseEmail,
// //         password: data.password,
// //       });

// //       setState(responseData);
// //       await AsyncStorage.setItem("@auth", JSON.stringify(responseData));
// //       showAlert(responseData.message, true);

// //       setLoading(false);
// //       navigation.navigate("Home");
// //     } catch (error) {
// //       // showAlert(error.message, false);
// //       // setLoading(false);
// //       if (error.response && error.response.status === 404) {
// //         showAlert(
// //           "🚫 Oops! We couldn't find your account. Please double-check your credentials and give it another try! 🔍😊",
// //           false
// //         ); // Show "User Not Found" if 404 error
// //         setLoading(false);
// //       } else if (error.response.data.message) {
// //         showAlert(error.response.data.message || "Login Error", false);
// //         setLoading(false);
// //       } else {
// //         // For other errors, show the error message returned from the server
// //         showAlert(error.message || "Login Error", false);
// //         setLoading(false);
// //       }
// //     }
// //   };

// //   const onForgotPassword = () => {
// //     Alert.alert(
// //       `Oops! Please drop us email regarding password to: ${constants.contactEmail}`
// //     );
// //   };

// //   useEffect(() => {
// //     trackLoginPageView(); // Track when the Login page is accessed
// //   }, []);

// //   return (
// //     <View style={styles.container}>
// //       <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
// //       {loading && <LoadingAnimation visible={loading} loop={true} />}

// //       <IosAlertWithImage
// //         visible={alertVisible}
// //         message={alertMessage}
// //         onClose={() => setAlertVisible(false)}
// //         isSuccess={alertSuccess}
// //       />

// //       <View style={styles.header}>
// //         {/* <ProductSlider></ProductSlider> */}
// //         <Text style={styles.text_header}>Welcome to Meadhikari ❤️</Text>
// //       </View>
// //       <Animatable.View animation="fadeInUpBig" style={styles.footer}>
// //         <Text style={[styles.text_footer, { color: colors.text }]}>Email</Text>
// //         <View style={styles.action}>
// //           <FontAwesome name="envelope" color={colors.text} size={20} />
// //           <TextInput
// //             placeholder="Your Email"
// //             placeholderTextColor={COLORS.textSecondary}
// //             style={[styles.textInput, { color: colors.text }]}
// //             autoCapitalize="none"
// //             keyboardType="email-address"
// //             onChangeText={(val) => textInputChange(val)}
// //           />
// //           {data.isValidEmail && data.email ? (
// //             <Animatable.View
// //               animation="fadeIn"
// //               duration={1000}
// //               style={styles.icon}
// //             >
// //               <Feather name="check-circle" color={COLORS.success} size={20} />
// //             </Animatable.View>
// //           ) : null}
// //         </View>
// //         {!data.isValidEmail && (
// //           <Animatable.View
// //             animation="fadeIn"
// //             duration={1000}
// //             style={styles.errorContainer}
// //           >
// //             <Text style={styles.errorMsg}>Invalid email format.</Text>
// //           </Animatable.View>
// //         )}

// //         <Text
// //           style={[styles.text_footer, { color: colors.text, marginTop: 35 }]}
// //         >
// //           Password
// //         </Text>
// //         <View style={styles.action}>
// //           <Feather name="lock" color={colors.text} size={20} />
// //           <TextInput
// //             placeholder="Your Password"
// //             placeholderTextColor={COLORS.textSecondary}
// //             secureTextEntry={data.secureTextEntry}
// //             style={[styles.textInput, { color: colors.text }]}
// //             autoCapitalize="none"
// //             onChangeText={(val) => handlePasswordChange(val)}
// //           />
// //           <TouchableOpacity onPress={updateSecureTextEntry}>
// //             {data.secureTextEntry ? (
// //               <Feather name="eye-off" color={COLORS.icon} size={20} />
// //             ) : (
// //               <Feather name="eye" color={COLORS.icon} size={20} />
// //             )}
// //           </TouchableOpacity>
// //         </View>
// //         {!data.isValidPassword && (
// //           <Animatable.View
// //             animation="fadeIn"
// //             duration={1000}
// //             style={styles.errorContainer}
// //           >
// //             <Text style={styles.errorMsg}>
// //               Password must be 8 characters long.
// //             </Text>
// //           </Animatable.View>
// //         )}

// //         <TouchableOpacity>
// //           <Text
// //             style={{ color: COLORS.primary, marginTop: 15 }}
// //             onPress={onForgotPassword}
// //           >
// //             Forgot password?
// //           </Text>
// //         </TouchableOpacity>

// //         <View style={styles.button}>
// //           {/* <TouchableOpacity onPress={onSubmitLoginBtn}>
// //             <LinearGradient
// //               colors={[COLORS.buttonStart, COLORS.buttonEnd]}
// //               style={styles.signIn}
// //             >
// //               <Text style={[styles.textSign, { color: "#fff" }]}>Sign In</Text>
// //             </LinearGradient>
// //           </TouchableOpacity> */}
// //           <TouchableOpacity
// //             style={styles.signIn}
// //             onPress={onSubmitLoginBtn}
// //             disabled={loading}
// //           >
// //             <LinearGradient
// //               colors={[COLORS.buttonStart, COLORS.buttonEnd]}
// //               style={styles.signIn}
// //             >
// //               <Text style={[styles.textSign, { color: "#fff" }]}>
// //                 {loading ? "Loading..." : "Login"}
// //               </Text>
// //             </LinearGradient>
// //           </TouchableOpacity>

// //           <TouchableOpacity
// //             onPress={() => navigation.navigate("Register")}
// //             style={[
// //               styles.signIn,
// //               {
// //                 borderColor: COLORS.primary,
// //                 borderWidth: 1,
// //                 marginTop: 15,
// //               },
// //             ]}
// //           >
// //             <Text style={[styles.textSign, { color: COLORS.primary }]}>
// //               Register
// //             </Text>
// //           </TouchableOpacity>
// //           {/* <TouchableOpacity
// //             onPress={() => {
// //               navigation.navigate("Splash");
// //             }}
// //           >
// //             <Text>Splash</Text>
// //           </TouchableOpacity> */}
// //         </View>
// //       </Animatable.View>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: COLORS.primary,
// //   },
// //   header: {
// //     flex: 1,
// //     justifyContent: "flex-end",
// //     paddingHorizontal: 20,
// //     paddingBottom: 20,
// //   },
// //   footer: {
// //     flex: 3,
// //     backgroundColor: COLORS.background,
// //     borderTopLeftRadius: 30,
// //     borderTopRightRadius: 30,
// //     paddingHorizontal: 20,
// //     paddingVertical: 30,
// //   },
// //   text_header: {
// //     color: "#fff",
// //     fontWeight: "bold",
// //     fontSize: 30,
// //     marginBottom: 15,
// //   },
// //   text_footer: {
// //     color: COLORS.textPrimary,
// //     fontSize: 18,
// //   },
// //   action: {
// //     flexDirection: "row",
// //     marginTop: 10,
// //     borderBottomWidth: 1,
// //     borderBottomColor: "#f2f2f2",
// //     paddingBottom: 5,
// //   },
// //   textInput: {
// //     flex: 1,
// //     marginTop: Platform.OS === "ios" ? 0 : -5,
// //     paddingLeft: 10,
// //     color: COLORS.textPrimary,
// //   },
// //   errorMsg: {
// //     color: COLORS.error,
// //     fontSize: 14,
// //   },
// //   icon: {
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   errorContainer: {
// //     marginTop: 5,
// //   },
// //   button: {
// //     alignItems: "center",
// //     marginTop: 50,
// //   },
// //   signIn: {
// //     width: "100%",
// //     height: 50,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     borderRadius: 10,
// //   },
// //   textSign: {
// //     fontSize: 18,
// //     fontWeight: "bold",
// //   },
// // });

// // export default Login;

// import React, { useState, useContext, useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   Platform,
//   StyleSheet,
//   StatusBar,
//   Alert,
//   Keyboard,
//   Dimensions,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import FontAwesome from "react-native-vector-icons/FontAwesome";
// import Feather from "react-native-vector-icons/Feather";
// import { useTheme } from "react-native-paper";
// import * as Animatable from "react-native-animatable";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { AuthContext } from "../../Context/authContext";
// import { requestUserPermission } from "../../utils/notificationService";
// import LoadingAnimation from "../../Components/Loader/loader";
// import { Color } from "../../GlobalStyles";
// import IosAlertWithImage from "../../Components/Alert/IosAlertWithImage";
// import constants from "../../utils/constants";
// import { trackLoginPageView } from "../../utils/analyticsUtils";

// const { width, height } = Dimensions.get("window");

// const responsiveFontSize = (size) => (width > 360 ? size : size - 2);
// const responsivePadding = (padding) => (width > 360 ? padding : padding - 5);

// const COLORS = {
//   primary: Color.primaryColor,
//   background: "#fff",
//   textPrimary: "#05375a",
//   textSecondary: "#666666",
//   buttonStart: "#8f94fb",
//   buttonEnd: "#4e54c8",
//   error: "#FF0000",
//   icon: "grey",
//   success: "green",
// };

// const Login = ({ navigation }) => {
//   const [data, setData] = useState({
//     email: "",
//     password: "",
//     isValidEmail: true,
//     isValidPassword: true,
//     secureTextEntry: true,
//   });

//   const [state, setState] = useContext(AuthContext);
//   const [loading, setLoading] = useState(false);
//   const [alertVisible, setAlertVisible] = useState(false);
//   const [alertMessage, setAlertMessage] = useState("");
//   const [alertSuccess, setAlertSuccess] = useState(false);

//   const { colors } = useTheme();

//   useEffect(() => {
//     trackLoginPageView();
//   }, []);

//   const textInputChange = (val) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     setData({
//       ...data,
//       email: val,
//       isValidEmail: emailRegex.test(val),
//     });
//   };

//   const handlePasswordChange = (val) => {
//     setData({
//       ...data,
//       password: val,
//       isValidPassword: val.trim().length >= 8,
//     });
//   };

//   const updateSecureTextEntry = () => {
//     setData({
//       ...data,
//       secureTextEntry: !data.secureTextEntry,
//     });
//   };

//   const onSubmitLoginBtn = async () => {
//     Keyboard.dismiss();
//     setLoading(true);

//     try {
//       if (!data.email || !data.password) {
//         setAlertMessage("All fields are required");
//         setAlertSuccess(false);
//         setAlertVisible(true);
//         setLoading(false);
//         return;
//       }

//       const lowerCaseEmail = data.email.toLowerCase();

//       const { data: responseData } = await axios.post("/login", {
//         email: lowerCaseEmail,
//         password: data.password,
//       });

//       setState(responseData);
//       await AsyncStorage.setItem("@auth", JSON.stringify(responseData));
//       setAlertMessage(responseData.message);
//       setAlertSuccess(true);
//       setAlertVisible(true);
//       setLoading(false);

//       navigation.navigate("Home");
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message ||
//         "Something went wrong, please try again.";
//       setAlertMessage(errorMessage);
//       setAlertSuccess(false);
//       setAlertVisible(true);
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
//       {loading && <LoadingAnimation visible={loading} loop={true} />}

//       <IosAlertWithImage
//         visible={alertVisible}
//         message={alertMessage}
//         onClose={() => setAlertVisible(false)}
//         isSuccess={alertSuccess}
//       />

//       <View style={styles.header}>
//         <Text style={styles.text_header}>Welcome to Meadhikari ❤️</Text>
//       </View>
//       <Animatable.View animation="fadeInUpBig" style={styles.footer}>
//         <Text style={[styles.text_footer, { color: colors.text }]}>Email</Text>
//         <View style={styles.action}>
//           <FontAwesome name="envelope" color={colors.text} size={20} />
//           <TextInput
//             placeholder="Your Email"
//             placeholderTextColor={COLORS.textSecondary}
//             style={[styles.textInput, { color: colors.text }]}
//             autoCapitalize="none"
//             keyboardType="email-address"
//             onChangeText={textInputChange}
//           />
//         </View>
//         {!data.isValidEmail && (
//           <Text style={styles.errorMsg}>Invalid email format.</Text>
//         )}

//         <Text style={[styles.text_footer, { marginTop: 35 }]}>Password</Text>
//         <View style={styles.action}>
//           <Feather name="lock" color={colors.text} size={20} />
//           <TextInput
//             placeholder="Your Password"
//             placeholderTextColor={COLORS.textSecondary}
//             secureTextEntry={data.secureTextEntry}
//             style={styles.textInput}
//             onChangeText={handlePasswordChange}
//           />
//           <TouchableOpacity onPress={updateSecureTextEntry}>
//             <Feather
//               name={data.secureTextEntry ? "eye-off" : "eye"}
//               color={COLORS.icon}
//               size={20}
//             />
//           </TouchableOpacity>
//         </View>
//         {!data.isValidPassword && (
//           <Text style={styles.errorMsg}>
//             Password must be 8 characters long.
//           </Text>
//         )}

//         <TouchableOpacity
//           onPress={() => {
//             Alert.alert("Please contact us on contact@meadhikari.com");
//           }}
//         >
//           <Text style={styles.forgotPassword}>Forgot password?</Text>
//         </TouchableOpacity>

//         <View style={styles.button}>
//           <TouchableOpacity
//             style={styles.signIn}
//             onPress={onSubmitLoginBtn}
//             disabled={loading}
//           >
//             <LinearGradient
//               colors={[COLORS.buttonStart, COLORS.buttonEnd]}
//               style={styles.signIn}
//             >
//               <Text style={[styles.textSign, { color: "#fff" }]}>
//                 {loading ? "Loading..." : "Login"}
//               </Text>
//             </LinearGradient>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => navigation.navigate("Register")}
//             style={[styles.signIn, styles.register]}
//           >
//             <Text style={[styles.textSign, { color: COLORS.primary }]}>
//               Register
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </Animatable.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.primary,
//   },
//   header: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   text_header: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: responsiveFontSize(28),
//   },
//   footer: {
//     flex: 3,
//     backgroundColor: COLORS.background,
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     paddingHorizontal: responsivePadding(20),
//     paddingVertical: responsivePadding(30),
//   },
//   text_footer: {
//     fontSize: responsiveFontSize(18),
//   },
//   action: {
//     flexDirection: "row",
//     marginTop: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#f2f2f2",
//     paddingBottom: 5,
//   },
//   textInput: {
//     flex: 1,
//     paddingLeft: 10,
//   },
//   errorMsg: {
//     color: COLORS.error,
//     fontSize: responsiveFontSize(12),
//   },
//   forgotPassword: {
//     color: COLORS.primary,
//     marginTop: 15,
//   },
//   button: {
//     alignItems: "center",
//     marginTop: responsivePadding(50),
//   },
//   signIn: {
//     width: "100%",
//     height: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 10,
//   },
//   register: {
//     borderColor: COLORS.primary,
//     borderWidth: 1,
//     marginTop: 15,
//   },
//   textSign: {
//     fontSize: responsiveFontSize(16),
//     fontWeight: "bold",
//   },
// });

// export default Login;

import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
  Keyboard,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { useTheme } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../Context/authContext";
import LoadingAnimation from "../../Components/Loader/loader";
import { Color } from "../../GlobalStyles";
import IosAlertWithImage from "../../Components/Alert/IosAlertWithImage";
import constants from "../../utils/constants";

const { width, height } = Dimensions.get("window");

const responsiveFontSize = (size) => (width > 360 ? size : size - 2);
const responsivePadding = (padding) => (width > 360 ? padding : padding - 5);

const COLORS = {
  primary: Color.primaryColor,
  background: "#fff",
  textPrimary: "#05375a",
  textSecondary: "#666666",
  buttonStart: "#8f94fb",
  buttonEnd: "#4e54c8",
  error: "#FF0000",
  icon: "grey",
  success: "green",
};

const Login = ({ navigation }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    isValidEmail: true,
    isValidPassword: true,
    secureTextEntry: true,
  });

  const [state, setState] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [isForgotPasswordLoading, setIsForgotPasswordLoading] = useState(false);
  const [showCustomAlert, setShowCustomAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(false);

  const { colors } = useTheme();

  useEffect(() => {
    // Track login page view (if needed)
  }, []);

  const textInputChange = (val) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setData({
      ...data,
      email: val,
      isValidEmail: emailRegex.test(val),
    });
  };

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
      isValidPassword: val.trim().length >= 8,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleForgotPassword = async () => {
    if (!data.email || !data.isValidEmail) {
      setAlertMessage("Please enter a valid email address.");
      setAlertSuccess(false);
      setShowCustomAlert(true);
      return;
    }

    try {
      setIsForgotPasswordLoading(true);

      const response = await axios.post(`/forgot-password`, {
        email: data.email.toLowerCase(),
      });

      if (response.data.success) {
        setAlertMessage("Password reset email sent. Please check your inbox.");
        setAlertSuccess(true);
        setShowCustomAlert(true);
      } else {
        setAlertMessage(
          response.data.message || "Failed to send password reset email."
        );
        setAlertSuccess(false);
        setShowCustomAlert(true);
      }
    } catch (error) {
      console.error("Error sending forgot password request:", error);
      setAlertMessage(
        error.response?.data?.message ||
          "An error occurred while processing your request."
      );
      setAlertSuccess(false);
      setShowCustomAlert(true);
    } finally {
      setIsForgotPasswordLoading(false);
    }
  };

  const onSubmitLoginBtn = async () => {
    Keyboard.dismiss();
    setLoading(true);

    try {
      if (!data.email || !data.password) {
        setAlertMessage("All fields are required");
        setAlertSuccess(false);
        setShowCustomAlert(true);
        setLoading(false);
        return;
      }

      const lowerCaseEmail = data.email.toLowerCase();

      const { data: responseData } = await axios.post("/login", {
        email: lowerCaseEmail,
        password: data.password,
      });

      setState(responseData);
      await AsyncStorage.setItem("@auth", JSON.stringify(responseData));
      setAlertMessage(responseData.message);
      setAlertSuccess(true);
      setShowCustomAlert(true);
      setLoading(false);

      navigation.navigate("Home");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong, please try again.";
      setAlertMessage(errorMessage);
      setAlertSuccess(false);
      setShowCustomAlert(true);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      {loading && <LoadingAnimation visible={loading} loop={true} />}

      <IosAlertWithImage
        visible={showCustomAlert}
        message={alertMessage}
        onClose={() => setShowCustomAlert(false)}
        isSuccess={alertSuccess}
      />

      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome to Meadhikari ❤️</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={[styles.text_footer, { color: colors.text }]}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="envelope" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Email"
            placeholderTextColor={COLORS.textSecondary}
            style={[styles.textInput, { color: colors.text }]}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={textInputChange}
          />
        </View>
        {!data.isValidEmail && (
          <Text style={styles.errorMsg}>Invalid email format.</Text>
        )}

        <Text style={[styles.text_footer, { marginTop: 35 }]}>Password</Text>
        <View style={styles.action}>
          <Feather name="lock" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor={COLORS.textSecondary}
            secureTextEntry={data.secureTextEntry}
            style={styles.textInput}
            onChangeText={handlePasswordChange}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            <Feather
              name={data.secureTextEntry ? "eye-off" : "eye"}
              color={COLORS.icon}
              size={20}
            />
          </TouchableOpacity>
        </View>
        {!data.isValidPassword && (
          <Text style={styles.errorMsg}>
            Password must be 8 characters long.
          </Text>
        )}

        <TouchableOpacity
          onPress={handleForgotPassword}
          disabled={isForgotPasswordLoading}
        >
          <Text style={styles.forgotPassword}>
            {isForgotPasswordLoading ? "Sending email..." : "Forgot password?"}
          </Text>
        </TouchableOpacity>

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={onSubmitLoginBtn}
            disabled={loading}
          >
            <LinearGradient
              colors={[COLORS.buttonStart, COLORS.buttonEnd]}
              style={styles.signIn}
            >
              <Text style={[styles.textSign, { color: "#fff" }]}>
                {loading ? "Loading..." : "Login"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={[styles.signIn, styles.register]}
          >
            <Text style={[styles.textSign, { color: COLORS.primary }]}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: responsiveFontSize(28),
  },
  footer: {
    flex: 3,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: responsivePadding(20),
    paddingVertical: responsivePadding(30),
  },
  text_footer: {
    fontSize: responsiveFontSize(18),
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
  },
  errorMsg: {
    color: COLORS.error,
    fontSize: responsiveFontSize(12),
  },
  forgotPassword: {
    color: COLORS.primary,
    marginTop: 15,
  },
  button: {
    alignItems: "center",
    marginTop: responsivePadding(50),
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  register: {
    borderColor: COLORS.primary,
    borderWidth: 1,
    marginTop: 15,
  },
  textSign: {
    fontSize: responsiveFontSize(16),
    fontWeight: "bold",
  },
});

export default Login;
