// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   Platform,
//   StyleSheet,
//   StatusBar,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import FontAwesome from "react-native-vector-icons/FontAwesome";
// import Feather from "react-native-vector-icons/Feather";
// import { useTheme } from "react-native-paper";
// import Animated, {
//   Easing,
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
// } from "react-native-reanimated";

// const SignInScreen = ({ navigation }) => {
//   const [data, setData] = useState({
//     username: "",
//     password: "",
//     check_textInputChange: false,
//     secureTextEntry: true,
//     isValidUser: true,
//     isValidPassword: true,
//   });

//   const { colors } = useTheme();

//   // Shared value for the animated transition
//   const fadeAnim = useSharedValue(1); // Set initial opacity to 1 for visibility

//   // Animation style
//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       opacity: withTiming(fadeAnim.value, {
//         duration: 1000,
//         easing: Easing.linear,
//       }),
//     };
//   });

//   const textInputChange = (val) => {
//     if (val.trim().length >= 4) {
//       setData({
//         ...data,
//         username: val,
//         check_textInputChange: true,
//         isValidUser: true,
//       });
//       fadeAnim.value = 1; // Keep the elements visible
//     } else {
//       setData({
//         ...data,
//         username: val,
//         check_textInputChange: false,
//         isValidUser: false,
//       });
//       fadeAnim.value = 1; // Keep the elements visible even on invalid input
//     }
//   };

//   const handlePasswordChange = (val) => {
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

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="#009387" barStyle="light-content" />
//       <View style={styles.header}>
//         <Text style={styles.text_header}>Welcome!</Text>
//       </View>
//       <View style={styles.footer}>
//         <Text style={[styles.text_footer, { color: colors.text }]}>
//           Username
//         </Text>
//         <View style={styles.action}>
//           <FontAwesome name="user-o" color={colors.text} size={20} />
//           <TextInput
//             placeholder="Your Username"
//             placeholderTextColor="#666666"
//             style={[styles.textInput, { color: colors.text }]}
//             autoCapitalize="none"
//             onChangeText={(val) => textInputChange(val)}
//           />
//           {data.check_textInputChange ? (
//             <Animated.View style={animatedStyle}>
//               <Feather name="check-circle" color="green" size={20} />
//             </Animated.View>
//           ) : null}
//         </View>
//         {data.isValidUser ? null : (
//           <Animated.View style={animatedStyle}>
//             <Text style={styles.errorMsg}>
//               Username must be 4 characters long.
//             </Text>
//           </Animated.View>
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
//             placeholderTextColor="#666666"
//             secureTextEntry={data.secureTextEntry ? true : false}
//             style={[styles.textInput, { color: colors.text }]}
//             autoCapitalize="none"
//             onChangeText={(val) => handlePasswordChange(val)}
//           />
//           <TouchableOpacity onPress={updateSecureTextEntry}>
//             {data.secureTextEntry ? (
//               <Feather name="eye-off" color="grey" size={20} />
//             ) : (
//               <Feather name="eye" color="grey" size={20} />
//             )}
//           </TouchableOpacity>
//         </View>
//         {data.isValidPassword ? null : (
//           <Animated.View style={animatedStyle}>
//             <Text style={styles.errorMsg}>
//               Password must be 8 characters long.
//             </Text>
//           </Animated.View>
//         )}

//         <TouchableOpacity>
//           <Text style={{ color: "#009387", marginTop: 15 }}>
//             Forgot password?
//           </Text>
//         </TouchableOpacity>
//         <View style={styles.button}>
//           <LinearGradient colors={["#08d4c4", "#01ab9d"]} style={styles.signIn}>
//             <Text style={[styles.textSign, { color: "#fff" }]}>Sign In</Text>
//           </LinearGradient>

//           <TouchableOpacity
//             onPress={() => navigation.navigate("SignUpScreen")}
//             style={[
//               styles.signIn,
//               {
//                 borderColor: "#009387",
//                 borderWidth: 1,
//                 marginTop: 15,
//               },
//             ]}
//           >
//             <Text
//               style={[
//                 styles.textSign,
//                 {
//                   color: "#009387",
//                 },
//               ]}
//             >
//               Sign Up
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default SignInScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#009387",
//   },
//   header: {
//     flex: 1,
//     justifyContent: "flex-end",
//     paddingHorizontal: 20,
//     paddingBottom: 50,
//   },
//   footer: {
//     flex: 3,
//     backgroundColor: "#fff",
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
//     color: "#05375a",
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
//     color: "#05375a",
//   },
//   errorMsg: {
//     color: "#FF0000",
//     fontSize: 14,
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
// });

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

const SignInScreen = ({ navigation }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    isValidEmail: true,
    isValidPassword: true,
    secureTextEntry: true,
  });

  const [state, setState] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const { colors } = useTheme();

  const textInputChange = (val) => {
    // Validate email format
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
    // Validate password length
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

  const onSubmitLoginBtn = async () => {
    Keyboard.dismiss();
    setLoading(true);

    try {
      if (!data.email || !data.password) {
        Alert.alert("All fields are required");
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
      Alert.alert("Success", responseData.message);

      setLoading(false);
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error", error.message);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      {/* {loading && <Text style={styles.loading}>Loading...</Text>} */}
      {loading && <LoadingAnimation visible={loading} loop={true} />}

      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={[styles.text_footer, { color: colors.text }]}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="envelope" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Email"
            placeholderTextColor="#666666"
            style={[styles.textInput, { color: colors.text }]}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={(val) => textInputChange(val)}
          />
          {data.isValidEmail ? (
            <Animatable.View
              animation="fadeIn"
              duration={1000}
              style={styles.icon}
            >
              <Feather name="check-circle" color="green" size={20} />
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
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry}
            style={[styles.textInput, { color: colors.text }]}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
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
          <Text style={{ color: "#009387", marginTop: 15 }}>
            Forgot password?
          </Text>
        </TouchableOpacity>

        <View style={styles.button}>
          <LinearGradient colors={["#08d4c4", "#01ab9d"]} style={styles.signIn}>
            <TouchableOpacity onPress={onSubmitLoginBtn}>
              <Text style={[styles.textSign, { color: "#fff" }]}>Sign In</Text>
            </TouchableOpacity>
          </LinearGradient>

          <TouchableOpacity
            onPress={() => navigation.navigate("SignUpScreen")}
            style={[
              styles.signIn,
              {
                borderColor: "#009387",
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
          >
            <Text style={[styles.textSign, { color: "#009387" }]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
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
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    marginTop: 10,
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
  loading: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

export default SignInScreen;
