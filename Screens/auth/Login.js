// // // // // import { View, Text, StyleSheet, Alert, Keyboard } from "react-native";
// // // // // import React, { useState, useContext } from "react";
// // // // // import { AuthContext } from "../../Context/authContext";
// // // // // import InputBox from "../../Components/Forms/InputBox";
// // // // // import { Color, FontSize } from "../../GlobalStyles";
// // // // // import PrimaryButton from "../../Components/Forms/PrimaryButton";
// // // // // import SecoundaryButton from "../../Components/Forms/SecoundaryButton";
// // // // // import axios from "axios";
// // // // // import AsyncStorage from "@react-native-async-storage/async-storage";
// // // // // import LoadingAnimation from "../../Components/Loader/loader";
// // // // // import { requestUserPermission } from "../../utils/notificationService";

// // // // // const Login = ({ navigation }) => {
// // // // //   //global state
// // // // //   const [state, setState] = useContext(AuthContext);

// // // // //   //Setting Getter and Setter to Get Input
// // // // //   const [email, setEmail] = useState("");
// // // // //   const [password, setPassword] = useState("");
// // // // //   // We will Get Values and SetValues
// // // // //   const [loading, setLoading] = useState(false);

// // // // //   const onSubmitLoginBtn = async () => {
// // // // //     Keyboard.dismiss;

// // // // //     try {
// // // // //       setLoading(true);
// // // // //       if (!email || !password) {
// // // // //         Alert.alert("All Fileds are Required");
// // // // //         setLoading(false);
// // // // //         return;
// // // // //       }
// // // // //       requestUserPermission();

// // // // //       Keyboard.dismiss;
// // // // //       const { data } = await axios.post("/login", {
// // // // //         email,
// // // // //         password,
// // // // //       });
// // // // //       setState(data);
// // // // //       //Setting Local Storage
// // // // //       await AsyncStorage.setItem("@auth", JSON.stringify(data));
// // // // //       alert(data && data.message);

// // // // //       setLoading(false);

// // // // //       navigation.navigate("Home");
// // // // //       // console.log("Login Data==> ", { email, password });
// // // // //       // console.log("Information Entered By User : ", { email, password });
// // // // //     } catch (error) {
// // // // //       alert(error.message);
// // // // //       setLoading(false);
// // // // //       console.log(error);
// // // // //     }
// // // // //   };

// // // // //   //Naviagte to Register Page
// // // // //   const onSubmitNewUserBtn = () => {
// // // // //     console.log("Naviagted to Register Page");
// // // // //     navigation.navigate("Register");
// // // // //   };

// // // // //   //temp function to check local storage data
// // // // //   const getLcoalStorageData = async () => {
// // // // //     let data = await AsyncStorage.getItem("@auth");
// // // // //     console.log("Local Storage ==> ", data);
// // // // //   };
// // // // //   getLcoalStorageData();

// // // // //   return (
// // // // //     <View style={styles.loginScreen}>
// // // // //       {loading && <LoadingAnimation visible={loading} loop={true} />}

// // // // //       <Text style={styles.login}>Login</Text>

// // // // //       <InputBox
// // // // //         inputPlaceholderText={"Enter email "}
// // // // //         inputLabel={"Email"}
// // // // //         keyboardType="email-address"
// // // // //         // propTop={294}
// // // // //         value={email}
// // // // //         setValue={setEmail}
// // // // //       />
// // // // //       <InputBox
// // // // //         inputPlaceholderText={"Enter password"}
// // // // //         inputLabel={"Password"}
// // // // //         secureTextEntry={true}
// // // // //         // propTop={374}
// // // // //         value={password}
// // // // //         setValue={setPassword}
// // // // //       />
// // // // //       {/* <Text style={{ marginTop: 400 }}>
// // // // //         {JSON.stringify({ email, password }, null, 4)}
// // // // //       </Text> */}

// // // // //       <PrimaryButton
// // // // //         buttonTitle="Login"
// // // // //         loading={loading}
// // // // //         handleOnSubmit={onSubmitLoginBtn}
// // // // //       />

// // // // //       <SecoundaryButton
// // // // //         buttonTitle="New User ? Register here."
// // // // //         handleOnSubmit={onSubmitNewUserBtn}
// // // // //       />
// // // // //     </View>
// // // // //   );
// // // // // };

// // // // // const styles = StyleSheet.create({
// // // // //   login: {
// // // // //     left: "10%",
// // // // //     fontSize: FontSize.size_5xl,
// // // // //     fontWeight: "600",
// // // // //     // fontFamily: FontFamily.interSemiBold,
// // // // //     color: Color.primaryColor,
// // // // //     textAlign: "left",
// // // // //     marginVertical: 20,
// // // // //   },
// // // // //   loginScreen: {
// // // // //     backgroundColor: Color.colorWhite,
// // // // //     flex: 1,
// // // // //     width: "100%",
// // // // //     justifyContent: "center",
// // // // //   },
// // // // // });

// // // // // export default Login;

// // import React, { useState, useContext } from "react";
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

// //   const { colors } = useTheme();

// //   const textInputChange = (val) => {
// //     // Validate email format
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
// //     // Validate password length
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

// //   const onSubmitLoginBtn = async () => {
// //     Keyboard.dismiss();
// //     setLoading(true);

// //     try {
// //       if (!data.email || !data.password) {
// //         Alert.alert("All fields are required");
// //         setLoading(false);
// //         return;
// //       }

// //       requestUserPermission();

// //       const { data: responseData } = await axios.post("/login", {
// //         email: data.email,
// //         password: data.password,
// //       });

// //       setState(responseData);
// //       await AsyncStorage.setItem("@auth", JSON.stringify(responseData));
// //       Alert.alert("Success", responseData.message);

// //       setLoading(false);
// //       navigation.navigate("Home");
// //     } catch (error) {
// //       Alert.alert("Error", error.message);
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <StatusBar backgroundColor="#009387" barStyle="light-content" />
// //       {/* {loading && <Text style={styles.loading}>Loading...</Text>} */}
// //       {loading && <LoadingAnimation visible={loading} loop={true} />}

// //       <View style={styles.header}>
// //         <Text style={styles.text_header}>Welcome!</Text>
// //       </View>
// //       <Animatable.View animation="fadeInUpBig" style={styles.footer}>
// //         <Text style={[styles.text_footer, { color: colors.text }]}>Email</Text>
// //         <View style={styles.action}>
// //           <FontAwesome name="envelope" color={colors.text} size={20} />
// //           <TextInput
// //             placeholder="Your Email"
// //             placeholderTextColor="#666666"
// //             style={[styles.textInput, { color: colors.text }]}
// //             autoCapitalize="none"
// //             keyboardType="email-address"
// //             onChangeText={(val) => textInputChange(val)}
// //           />
// //           {data.isValidEmail ? (
// //             <Animatable.View
// //               animation="fadeIn"
// //               duration={1000}
// //               style={styles.icon}
// //             >
// //               <Feather name="check-circle" color="green" size={20} />
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
// //             placeholderTextColor="#666666"
// //             secureTextEntry={data.secureTextEntry}
// //             style={[styles.textInput, { color: colors.text }]}
// //             autoCapitalize="none"
// //             onChangeText={(val) => handlePasswordChange(val)}
// //           />
// //           <TouchableOpacity onPress={updateSecureTextEntry}>
// //             {data.secureTextEntry ? (
// //               <Feather name="eye-off" color="grey" size={20} />
// //             ) : (
// //               <Feather name="eye" color="grey" size={20} />
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
// //           <Text style={{ color: "#009387", marginTop: 15 }}>
// //             Forgot password?
// //           </Text>
// //         </TouchableOpacity>

// //         <View style={styles.button}>
// //           <LinearGradient colors={["#08d4c4", "#01ab9d"]} style={styles.signIn}>
// //             <TouchableOpacity onPress={onSubmitLoginBtn}>
// //               <Text style={[styles.textSign, { color: "#fff" }]}>Sign In</Text>
// //             </TouchableOpacity>
// //           </LinearGradient>

// //           <TouchableOpacity
// //             onPress={() => navigation.navigate("SignUpScreen")}
// //             style={[
// //               styles.signIn,
// //               {
// //                 borderColor: "#009387",
// //                 borderWidth: 1,
// //                 marginTop: 15,
// //               },
// //             ]}
// //           >
// //             <Text style={[styles.textSign, { color: "#009387" }]}>Sign Up</Text>
// //           </TouchableOpacity>
// //         </View>
// //       </Animatable.View>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#009387",
// //   },
// //   header: {
// //     flex: 1,
// //     justifyContent: "flex-end",
// //     paddingHorizontal: 20,
// //     paddingBottom: 50,
// //   },
// //   footer: {
// //     flex: 3,
// //     backgroundColor: "#fff",
// //     borderTopLeftRadius: 30,
// //     borderTopRightRadius: 30,
// //     paddingHorizontal: 20,
// //     paddingVertical: 30,
// //   },
// //   text_header: {
// //     color: "#fff",
// //     fontWeight: "bold",
// //     fontSize: 30,
// //   },
// //   text_footer: {
// //     color: "#05375a",
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
// //     marginTop: Platform.OS === "ios" ? 0 : -12,
// //     paddingLeft: 10,
// //     color: "#05375a",
// //   },
// //   errorMsg: {
// //     color: "#FF0000",
// //     fontSize: 14,
// //   },
// //   icon: {
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   errorContainer: {
// //     marginTop: 10,
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
// //   loading: {
// //     color: "#fff",
// //     fontSize: 18,
// //     textAlign: "center",
// //     marginTop: 20,
// //   },
// // });

// // export default Login;

// import React, { useState, useContext } from "react";
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

// // Define color constants
// const COLORS = {
//   // primary: "#009387",
//   primary: Color.primaryColor,

//   background: "#fff",
//   textPrimary: "#05375a",
//   textSecondary: "#666666",
//   // buttonStart: "#08d4c4",
//   // buttonEnd: "#01ab9d",
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

//   const { colors } = useTheme();

//   const textInputChange = (val) => {
//     // Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (emailRegex.test(val)) {
//       setData({
//         ...data,
//         email: val,
//         isValidEmail: true,
//       });
//     } else {
//       setData({
//         ...data,
//         email: val,
//         isValidEmail: false,
//       });
//     }
//   };

//   const handlePasswordChange = (val) => {
//     // Validate password length
//     if (val.trim().length >= 8) {
//       setData({
//         ...data,
//         password: val,
//         isValidPassword: true,
//       });
//     } else {
//       setData({
//         ...data,
//         password: val,
//         isValidPassword: false,
//       });
//     }
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
//         Alert.alert("All fields are required");
//         setLoading(false);
//         return;
//       }

//       requestUserPermission();

//       const { data: responseData } = await axios.post("/login", {
//         email: data.email,
//         password: data.password,
//       });

//       setState(responseData);
//       await AsyncStorage.setItem("@auth", JSON.stringify(responseData));
//       Alert.alert("Success", responseData.message);

//       setLoading(false);
//       navigation.navigate("Home");
//     } catch (error) {
//       Alert.alert("Error", error.message);
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
//       {loading && <LoadingAnimation visible={loading} loop={true} />}

//       <View style={styles.header}>
//         <Text style={styles.text_header}>Welcome!</Text>
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
//             onChangeText={(val) => textInputChange(val)}
//           />
//           {data.isValidEmail ? (
//             <Animatable.View
//               animation="fadeIn"
//               duration={1000}
//               style={styles.icon}
//             >
//               <Feather name="check-circle" color={COLORS.success} size={20} />
//             </Animatable.View>
//           ) : null}
//         </View>
//         {!data.isValidEmail && (
//           <Animatable.View
//             animation="fadeIn"
//             duration={1000}
//             style={styles.errorContainer}
//           >
//             <Text style={styles.errorMsg}>Invalid email format.</Text>
//           </Animatable.View>
//         )}

//         <Text
//           style={[styles.text_footer, { color: colors.text, marginTop: 35 }]}
//         >
//           Password
//         </Text>
//         <View style={styles.action}>
//           <Feather name="lock" color={colors.text} size={20} />
//           <TextInput
//             placeholder="Your Password"
//             placeholderTextColor={COLORS.textSecondary}
//             secureTextEntry={data.secureTextEntry}
//             style={[styles.textInput, { color: colors.text }]}
//             autoCapitalize="none"
//             onChangeText={(val) => handlePasswordChange(val)}
//           />
//           <TouchableOpacity onPress={updateSecureTextEntry}>
//             {data.secureTextEntry ? (
//               <Feather name="eye-off" color={COLORS.icon} size={20} />
//             ) : (
//               <Feather name="eye" color={COLORS.icon} size={20} />
//             )}
//           </TouchableOpacity>
//         </View>
//         {!data.isValidPassword && (
//           <Animatable.View
//             animation="fadeIn"
//             duration={1000}
//             style={styles.errorContainer}
//           >
//             <Text style={styles.errorMsg}>
//               Password must be 8 characters long.
//             </Text>
//           </Animatable.View>
//         )}

//         <TouchableOpacity>
//           <Text style={{ color: COLORS.primary, marginTop: 15 }}>
//             Forgot password?
//           </Text>
//         </TouchableOpacity>

//         <View style={styles.button}>
//           <LinearGradient
//             colors={[COLORS.buttonStart, COLORS.buttonEnd]}
//             style={styles.signIn}
//           >
//             <TouchableOpacity onPress={onSubmitLoginBtn}>
//               <Text style={[styles.textSign, { color: "#fff" }]}>Sign In</Text>
//             </TouchableOpacity>
//           </LinearGradient>

//           <TouchableOpacity
//             onPress={() => navigation.navigate("SignUpScreen")}
//             style={[
//               styles.signIn,
//               {
//                 borderColor: COLORS.primary,
//                 borderWidth: 1,
//                 marginTop: 15,
//               },
//             ]}
//           >
//             <Text style={[styles.textSign, { color: COLORS.primary }]}>
//               Sign Up
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
//     justifyContent: "flex-end",
//     paddingHorizontal: 20,
//     paddingBottom: 50,
//   },
//   footer: {
//     flex: 3,
//     backgroundColor: COLORS.background,
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     paddingHorizontal: 20,
//     paddingVertical: 30,
//   },
//   text_header: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 30,
//   },
//   text_footer: {
//     color: COLORS.textPrimary,
//     fontSize: 18,
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
//     marginTop: Platform.OS === "ios" ? 0 : -12,
//     paddingLeft: 10,
//     color: COLORS.textPrimary,
//   },
//   errorMsg: {
//     color: COLORS.error,
//     fontSize: 14,
//   },
//   icon: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   errorContainer: {
//     marginTop: 10,
//   },
//   button: {
//     alignItems: "center",
//     marginTop: 50,
//   },
//   signIn: {
//     width: "100%",
//     height: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 10,
//   },
//   textSign: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   loading: {
//     color: "#fff",
//     fontSize: 18,
//     textAlign: "center",
//     marginTop: 20,
//   },
// });

// export default Login;

import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { useTheme } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../Context/authContext";
import { requestUserPermission } from "../../utils/notificationService";
import LoadingAnimation from "../../Components/Loader/loader";
import { Color } from "../../GlobalStyles";
import IosAlertWithImage from "../../Components/Alert/IosAlertWithImage"; // Import custom alert
import ProductSlider from "../../Components/SplashScreen/ProductSlider";

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
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(false);

  const { colors } = useTheme();

  const textInputChange = (val) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(val)) {
      setData({
        ...data,
        email: val,
        isValidEmail: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        isValidEmail: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const showAlert = (message, isSuccess) => {
    setAlertMessage(message);
    setAlertSuccess(isSuccess);
    setAlertVisible(true);
  };

  const onSubmitLoginBtn = async () => {
    Keyboard.dismiss();
    setLoading(true);

    try {
      if (!data.email || !data.password) {
        showAlert("All fields are required", false);
        setLoading(false);
        return;
      }

      requestUserPermission();

      const { data: responseData } = await axios.post("/login", {
        email: data.email,
        password: data.password,
      });

      setState(responseData);
      await AsyncStorage.setItem("@auth", JSON.stringify(responseData));
      showAlert(responseData.message, true);

      setLoading(false);
      navigation.navigate("Home");
    } catch (error) {
      // showAlert(error.message, false);
      // setLoading(false);
      if (error.response && error.response.status === 404) {
        showAlert(
          "🚫 Oops! We couldn't find your account. Please double-check your credentials and give it another try! 🔍😊",
          false
        ); // Show "User Not Found" if 404 error
        setLoading(false);
      } else {
        // For other errors, show the error message returned from the server
        showAlert(error.message || "Login Error", false);
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      {loading && <LoadingAnimation visible={loading} loop={true} />}

      <IosAlertWithImage
        visible={alertVisible}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
        isSuccess={alertSuccess}
      />

      <View style={styles.header}>
        {/* <ProductSlider></ProductSlider> */}
        <Text style={styles.text_header}>Welcome!</Text>
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
            onChangeText={(val) => textInputChange(val)}
          />
          {data.isValidEmail && data.email ? (
            <Animatable.View
              animation="fadeIn"
              duration={1000}
              style={styles.icon}
            >
              <Feather name="check-circle" color={COLORS.success} size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {!data.isValidEmail && (
          <Animatable.View
            animation="fadeIn"
            duration={1000}
            style={styles.errorContainer}
          >
            <Text style={styles.errorMsg}>Invalid email format.</Text>
          </Animatable.View>
        )}

        <Text
          style={[styles.text_footer, { color: colors.text, marginTop: 35 }]}
        >
          Password
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor={COLORS.textSecondary}
            secureTextEntry={data.secureTextEntry}
            style={[styles.textInput, { color: colors.text }]}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color={COLORS.icon} size={20} />
            ) : (
              <Feather name="eye" color={COLORS.icon} size={20} />
            )}
          </TouchableOpacity>
        </View>
        {!data.isValidPassword && (
          <Animatable.View
            animation="fadeIn"
            duration={1000}
            style={styles.errorContainer}
          >
            <Text style={styles.errorMsg}>
              Password must be 8 characters long.
            </Text>
          </Animatable.View>
        )}

        <TouchableOpacity>
          <Text style={{ color: COLORS.primary, marginTop: 15 }}>
            Forgot password?
          </Text>
        </TouchableOpacity>

        <View style={styles.button}>
          {/* <TouchableOpacity onPress={onSubmitLoginBtn}>
            <LinearGradient
              colors={[COLORS.buttonStart, COLORS.buttonEnd]}
              style={styles.signIn}
            >
              <Text style={[styles.textSign, { color: "#fff" }]}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity> */}
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
            style={[
              styles.signIn,
              {
                borderColor: COLORS.primary,
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
          >
            <Text style={[styles.textSign, { color: COLORS.primary }]}>
              Register
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => {
              navigation.navigate("Splash");
            }}
          >
            <Text>Splash</Text>
          </TouchableOpacity> */}
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
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  footer: {
    flex: 3,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 15,
  },
  text_footer: {
    color: COLORS.textPrimary,
    fontSize: 18,
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
    marginTop: Platform.OS === "ios" ? 0 : -5,
    paddingLeft: 10,
    color: COLORS.textPrimary,
  },
  errorMsg: {
    color: COLORS.error,
    fontSize: 14,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    marginTop: 5,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Login;
