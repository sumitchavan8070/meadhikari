// import React, { useState, useContext, useEffect } from "react";
// import {
//   View,
//   Text,
//   Button,
//   TouchableOpacity,
//   Dimensions,
//   TextInput,
//   Platform,
//   StyleSheet,
//   ScrollView,
//   StatusBar,
//   Alert,
// } from "react-native";
// import * as Animatable from "react-native-animatable";
// import { LinearGradient } from "expo-linear-gradient";
// import FontAwesome from "react-native-vector-icons/FontAwesome";
// import Feather from "react-native-vector-icons/Feather";
// import { AuthContext } from "../../Context/authContext";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import { Color } from "../../GlobalStyles";
// import IosAlertWithImage from "../../Components/Alert/IosAlertWithImage"; // Adjust the path as needed
// import LoadingAnimation from "../../Components/Loader/loader";
// import IosAlertWithImageWithCallBack from "../../Components/Alert/IosAlertWithImageWithCallBack";
// import BouncyCheckbox from "react-native-bouncy-checkbox"; // Import the BouncyCheckbox
// import { trackRegisterPageView } from "../../utils/analyticsUtils";

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

// const Register = ({ navigation }) => {
//   const [state, setState] = useContext(AuthContext);

//   // Setting Getter and Setter to Get Input
//   const [name, setName] = useState("");
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [alertVisible, setAlertVisible] = useState(false);
//   const [alertVisibleWithCounter, setAlertVisibleWithCounter] = useState(false);

//   const [alertMessage, setAlertMessage] = useState("");
//   const [isSuccess, setIsSuccess] = useState(true);
//   const [registrationSuccess, setRegistrationSuccess] = useState(false);
//   const [isChecked, setIsChecked] = useState(true); // State for checkbox

//   // Helper function for email validation
//   const isValidEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   // Helper function for password validation
//   const isValidPassword = (password) => {
//     return password.length >= 8;
//   };

//   const onCloseAlert = () => {
//     setAlertVisible(false);
//     setAlertVisibleWithCounter(false);
//   };

//   const onRedirect = () => {
//     navigation.navigate("Login"); // Adjust the navigation target as needed
//   };

//   const onResgisterSuccess = (data) => {
//     setAlertMessage(data.message || "Registration successful");
//     setIsSuccess(true);
//     setAlertVisibleWithCounter(true);
//     setRegistrationSuccess(true);
//   };

//   // Function to handle registration
//   const onSubmitRegisterBtn = async () => {
//     try {
//       if (!isChecked) {
//         setAlertMessage("You must accept Terms and Conditions");
//         setIsSuccess(false);
//         setAlertVisible(true);
//         setLoading(false);
//         return;
//       }
//       setLoading(true);

//       if (!name || !username || !email || !password) {
//         setAlertMessage("All Fields are Required");
//         setIsSuccess(false);
//         setAlertVisible(true);
//         setLoading(false);
//         return;
//       }

//       if (!isValidEmail(email)) {
//         setAlertMessage("Please enter a valid email address");
//         setIsSuccess(false);
//         setAlertVisible(true);
//         setLoading(false);
//         return;
//       }

//       if (!isValidPassword(password)) {
//         setAlertMessage("Password must be at least 8 characters long");
//         setIsSuccess(false);
//         setAlertVisible(true);
//         setLoading(false);
//         return;
//       }

//       if (
//         username.match(/^\s/) ||
//         username.match(/["']/) ||
//         username.match(/[^\w\s]/)
//       ) {
//         setAlertMessage(
//           "Username should not contain spaces, quotes, or special characters."
//         );
//         setIsSuccess(false);
//         setAlertVisible(true);
//         setLoading(false);
//         return;
//       }

//       let fcmToken = await AsyncStorage.getItem("fcm_token");

//       const { data } = await axios.post("/register", {
//         name,
//         username,
//         email,
//         password,
//         fcmToken,
//       });

//       setState(data);
//       await AsyncStorage.setItem("@auth", JSON.stringify(data));

//       onResgisterSuccess(data);
//       console.log("Register Data==> ", { name, username, email, password });
//     } catch (error) {
//       setLoading(false);
//       setAlertMessage(error.response?.data?.message || "An error occurred");
//       setIsSuccess(false);
//       setAlertVisible(true);
//       console.log(error);
//     }
//   };

//   const onSubmitExistingUserBtn = () => {
//     navigation.navigate("Login");
//     console.log("Navigated to Login Page");
//   };

//   useEffect(() => {
//     trackRegisterPageView(); // Track when the Register page is accessed
//   }, []);

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
//       {loading && <LoadingAnimation visible={loading} loop={true} />}

//       <View style={styles.header}>
//         <Text style={styles.text_header}>Register Now!</Text>
//       </View>
//       <Animatable.View animation="fadeInUpBig" style={styles.footer}>
//         <ScrollView showsVerticalScrollIndicator={false}>
//           <Text style={styles.text_footer}>Name</Text>
//           <View style={styles.action}>
//             <FontAwesome name="user-o" color={COLORS.textPrimary} size={20} />
//             <TextInput
//               placeholder="Your Name"
//               style={styles.textInput}
//               autoCapitalize="none"
//               onChangeText={(val) => setName(val)}
//             />
//           </View>

//           <Text style={[styles.text_footer, { marginTop: 35 }]}>Username</Text>
//           <View style={styles.action}>
//             <FontAwesome name="user-o" color={COLORS.textPrimary} size={20} />
//             <TextInput
//               placeholder="Your Username"
//               style={styles.textInput}
//               autoCapitalize="none"
//               onChangeText={(val) => setUsername(val)}
//             />
//           </View>

//           <Text style={[styles.text_footer, { marginTop: 35 }]}>Email</Text>
//           <View style={styles.action}>
//             <FontAwesome name="envelope" color={COLORS.textPrimary} size={20} />
//             {/* <TextInput
//               placeholder="Your Email"
//               style={styles.textInput}
//               autoCapitalize="none"
//               onChangeText={(val) => setEmail(val)}
//             /> */}

//             <TextInput
//               placeholder="Your Email"
//               style={styles.textInput}
//               autoCapitalize="none"
//               onChangeText={(val) => setEmail(val.toLowerCase())} // Convert input to lowercase
//             />
//           </View>

//           <Text style={[styles.text_footer, { marginTop: 35 }]}>Password</Text>
//           <View style={styles.action}>
//             <Feather name="lock" color={COLORS.textPrimary} size={20} />
//             <TextInput
//               placeholder="Your Password"
//               secureTextEntry={true}
//               style={styles.textInput}
//               autoCapitalize="none"
//               onChangeText={(val) => setPassword(val)}
//             />
//           </View>

//           <View style={styles.textPrivate}>
//             <BouncyCheckbox
//               isChecked={isChecked}
//               fillColor={COLORS.primary}
//               onPress={() => setIsChecked(!isChecked)}
//             />
//             <Text style={styles.color_textPrivate}>
//               By signing up you agree to our
//             </Text>
//             <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
//               {" "}
//               Terms and Conditions
//             </Text>
//             <Text style={styles.color_textPrivate}> and</Text>
//             <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
//               {" "}
//               Privacy policy
//             </Text>
//           </View>
//           <View style={styles.button}>
//             <TouchableOpacity
//               style={styles.signIn}
//               onPress={onSubmitRegisterBtn}
//               disabled={loading}
//             >
//               <LinearGradient
//                 colors={[COLORS.buttonStart, COLORS.buttonEnd]}
//                 style={styles.signIn}
//               >
//                 <Text style={[styles.textSign, { color: "#fff" }]}>
//                   {loading ? "Loading..." : "Register"}
//                 </Text>
//               </LinearGradient>
//             </TouchableOpacity>

//             <TouchableOpacity
//               onPress={onSubmitExistingUserBtn}
//               style={[
//                 styles.signIn,
//                 {
//                   borderColor: COLORS.primary,
//                   borderWidth: 1,
//                   marginTop: 15,
//                 },
//               ]}
//             >
//               <Text style={[styles.textSign, { color: COLORS.primary }]}>
//                 Back
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </Animatable.View>

//       {/* Custom Alert Component */}
//       <IosAlertWithImage
//         visible={alertVisible}
//         message={alertMessage}
//         onClose={onCloseAlert}
//         isSuccess={isSuccess}
//       />

//       {registrationSuccess && (
//         <IosAlertWithImageWithCallBack
//           visible={alertVisibleWithCounter}
//           message={alertMessage}
//           onClose={onCloseAlert}
//           isSuccess={isSuccess}
//           countdownTime={5}
//           onRedirect={onRedirect}
//         />
//       )}
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
//     paddingBottom: 20,
//   },
//   footer: {
//     flex: Platform.OS === "ios" ? 3 : 5,
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
//     marginTop: Platform.OS === "ios" ? 0 : -5,
//     paddingLeft: 10,
//     color: COLORS.textPrimary,
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
//   textPrivate: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     marginTop: 20,
//     justifyContent: "center",
//   },
//   color_textPrivate: {
//     color: "grey",
//   },
// });

// export default Register;

import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { AuthContext } from "../../Context/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Color } from "../../GlobalStyles";
import IosAlertWithImage from "../../Components/Alert/IosAlertWithImage";
import LoadingAnimation from "../../Components/Loader/loader";
import IosAlertWithImageWithCallBack from "../../Components/Alert/IosAlertWithImageWithCallBack";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { trackRegisterPageView } from "../../utils/analyticsUtils";

const { width, height } = Dimensions.get("window");

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

const Register = ({ navigation }) => {
  const [state, setState] = useContext(AuthContext);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertVisibleWithCounter, setAlertVisibleWithCounter] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [isChecked, setIsChecked] = useState(true);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (password) => password.length >= 8;

  const onCloseAlert = () => {
    setAlertVisible(false);
    setAlertVisibleWithCounter(false);
  };

  const onRedirect = () => {
    navigation.navigate("Login");
  };

  const onResgisterSuccess = (data) => {
    setAlertMessage(data.message || "Registration successful");
    setIsSuccess(true);
    setAlertVisibleWithCounter(true);
    setRegistrationSuccess(true);
  };

  const onSubmitRegisterBtn = async () => {
    try {
      if (!isChecked) {
        setAlertMessage("You must accept Terms and Conditions");
        setIsSuccess(false);
        setAlertVisible(true);
        setLoading(false);
        return;
      }
      setLoading(true);

      if (!name || !username || !email || !password) {
        setAlertMessage("All Fields are Required");
        setIsSuccess(false);
        setAlertVisible(true);
        setLoading(false);
        return;
      }

      if (!isValidEmail(email)) {
        setAlertMessage("Please enter a valid email address");
        setIsSuccess(false);
        setAlertVisible(true);
        setLoading(false);
        return;
      }

      if (!isValidPassword(password)) {
        setAlertMessage("Password must be at least 8 characters long");
        setIsSuccess(false);
        setAlertVisible(true);
        setLoading(false);
        return;
      }

      if (
        username.match(/^\s/) ||
        username.match(/["']/) ||
        username.match(/[^\w\s]/)
      ) {
        setAlertMessage(
          "Username should not contain spaces, quotes, or special characters."
        );
        setIsSuccess(false);
        setAlertVisible(true);
        setLoading(false);
        return;
      }

      let fcmToken = await AsyncStorage.getItem("fcm_token");

      const { data } = await axios.post("/register", {
        name,
        username,
        email,
        password,
        fcmToken,
      });

      setState(data);
      await AsyncStorage.setItem("@auth", JSON.stringify(data));

      onResgisterSuccess(data);
    } catch (error) {
      setLoading(false);
      setAlertMessage(error.response?.data?.message || "An error occurred");
      setIsSuccess(false);
      setAlertVisible(true);
    }
  };

  const onSubmitExistingUserBtn = () => {
    navigation.navigate("Login");
  };

  useEffect(() => {
    trackRegisterPageView();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      {loading && <LoadingAnimation visible={loading} loop={true} />}

      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.text_footer}>Name</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color={COLORS.textPrimary} size={20} />
            <TextInput
              placeholder="Your Name"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setName(val)}
            />
          </View>

          <Text style={[styles.text_footer, { marginTop: height * 0.03 }]}>
            Username
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color={COLORS.textPrimary} size={20} />
            <TextInput
              placeholder="Your Username"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setUsername(val)}
            />
          </View>

          <Text style={[styles.text_footer, { marginTop: height * 0.03 }]}>
            Email
          </Text>
          <View style={styles.action}>
            <FontAwesome name="envelope" color={COLORS.textPrimary} size={20} />
            <TextInput
              placeholder="Your Email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setEmail(val.toLowerCase())}
            />
          </View>

          <Text style={[styles.text_footer, { marginTop: height * 0.03 }]}>
            Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color={COLORS.textPrimary} size={20} />
            <TextInput
              placeholder="Your Password"
              secureTextEntry={true}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setPassword(val)}
            />
          </View>

          <View style={styles.textPrivate}>
            <BouncyCheckbox
              isChecked={isChecked}
              fillColor={COLORS.primary}
              onPress={() => setIsChecked(!isChecked)}
            />
            <Text style={styles.color_textPrivate}>
              By signing up you agree to our
            </Text>
            <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
              {" "}
              Terms and Conditions
            </Text>
            <Text style={styles.color_textPrivate}> and</Text>
            <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
              {" "}
              Privacy policy
            </Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={onSubmitRegisterBtn}
              disabled={loading}
            >
              <LinearGradient
                colors={[COLORS.buttonStart, COLORS.buttonEnd]}
                style={styles.signIn}
              >
                <Text style={[styles.textSign, { color: "#fff" }]}>
                  {loading ? "Loading..." : "Register"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onSubmitExistingUserBtn}
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
                Back
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>

      <IosAlertWithImage
        visible={alertVisible}
        message={alertMessage}
        onClose={onCloseAlert}
        isSuccess={isSuccess}
      />

      {registrationSuccess && (
        <IosAlertWithImageWithCallBack
          visible={alertVisibleWithCounter}
          message={alertMessage}
          onClose={onCloseAlert}
          isSuccess={isSuccess}
          countdownTime={5}
          onRedirect={onRedirect}
        />
      )}
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
    paddingHorizontal: width * 0.05,
    paddingBottom: height * 0.02,
  },
  footer: {
    flex: Platform.OS === "ios" ? 3 : 5,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.03,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: width * 0.08,
  },
  text_footer: {
    color: COLORS.textPrimary,
    fontSize: width * 0.045,
  },
  action: {
    flexDirection: "row",
    marginTop: height * 0.01,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: height * 0.01,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -5,
    paddingLeft: width * 0.03,
    color: COLORS.textPrimary,
  },
  button: {
    alignItems: "center",
    marginTop: height * 0.05,
  },
  signIn: {
    width: "100%",
    height: height * 0.06,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: width * 0.045,
    fontWeight: "bold",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: height * 0.02,
    justifyContent: "center",
  },
  color_textPrivate: {
    color: "grey",
  },
});

export default Register;
