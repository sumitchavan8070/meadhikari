// // // import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
// // // import React, { useState, useContext } from "react";
// // // import InputBox from "../../Components/Forms/InputBox";
// // // import { Color, FontSize } from "../../GlobalStyles";
// // // import PrimaryButton from "../../Components/Forms/PrimaryButton";
// // // import SecoundaryButton from "../../Components/Forms/SecoundaryButton";
// // // import axios from "axios";
// // // import AsyncStorage from "@react-native-async-storage/async-storage";
// // // import { AuthContext } from "../../Context/authContext";

// // // const Register = ({ navigation }) => {
// // //   const [state, setState] = useContext(AuthContext);

// // //   //Setting Getter and Setter to Get Input
// // //   const [name, setName] = useState("");
// // //   const [username, setUsername] = useState("");

// // //   const [email, setEmail] = useState("");
// // //   const [password, setPassword] = useState("");
// // //   // We will Get Values and SetValues
// // //   const [loading, setLoading] = useState(false);

// // //   //Function
// // //   //btn
// // //   const onSubmitRegisterBtn = async () => {
// // //     try {
// // //       setLoading(true);
// // //       if (!name || !username || !email || !password) {
// // //         Alert.alert("All Fileds are Required");
// // //         setLoading(false);

// // //         return;
// // //       }
// // //       if (
// // //         username.match(/^\s/) ||
// // //         username.match(/["']/) ||
// // //         username.match(/[^\w\s]/)
// // //       ) {
// // //         Alert.alert(
// // //           "Invalid Username",
// // //           "Username should not contain spaces, quotes, or special characters."
// // //         );
// // //         setLoading(false);
// // //         return;
// // //       }
// // //       setLoading(false);

// // //       let fcmToken = await AsyncStorage.getItem("fcm_token");

// // //       const { data } = await axios.post("/register", {
// // //         name,
// // //         username,
// // //         email,
// // //         password,
// // //         fcmToken,
// // //       });

// // //       setState(data);
// // //       await AsyncStorage.setItem("@auth", JSON.stringify(data));
// // //       alert(data && data.message);
// // //       navigation.navigate("Login");
// // //       console.log("Register Data==> ", { name, username, email, password });
// // //     } catch (error) {
// // //       setLoading(false);
// // //       // console.log(JSON.stringify(error.response));
// // //       alert(error.response.data.message);
// // //       console.log(error);
// // //     }
// // //   };

// // //   const onSubmitExistingUserBtn = () => {
// // //     navigation.navigate("Login");
// // //     console.log("Naviagted to Login Page");
// // //   };

// // //   return (
// // //     <View style={styles.registerScreen}>
// // //       <Text style={styles.register}>Register</Text>
// // //       <InputBox
// // //         inputPlaceholderText={"Enter full name here"}
// // //         inputLabel={"Full Name"}
// // //         value={name}
// // //         setValue={setName}
// // //       />
// // //       <InputBox
// // //         inputPlaceholderText={"Enter username here"}
// // //         inputLabel={"Username"}
// // //         value={username}
// // //         setValue={(value) =>
// // //           setUsername(
// // //             value.toLowerCase().trim().replace(/\s+/g, "").replace(/['"]/g, "") // Replace single and double quotes with an empty string
// // //           )
// // //         }
// // //       />
// // //       <InputBox
// // //         inputPlaceholderText={"Enter email here"}
// // //         inputLabel={"Email"}
// // //         keyboardType="email-address"
// // //         value={email}
// // //         setValue={setEmail}
// // //       />
// // //       <InputBox
// // //         inputPlaceholderText={"Enter password"}
// // //         inputLabel={"Password"}
// // //         secureTextEntry={true}
// // //         value={password}
// // //         setValue={setPassword}
// // //       />

// // //       <PrimaryButton
// // //         buttonTitle="Register"
// // //         loading={loading}
// // //         handleOnSubmit={onSubmitRegisterBtn}
// // //       />

// // //       <SecoundaryButton
// // //         buttonTitle="Already have an account ?"
// // //         secoundBtnMarginTop={600}
// // //         handleOnSubmit={onSubmitExistingUserBtn}
// // //       />
// // //     </View>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   register: {
// // //     left: "10%",
// // //     fontSize: FontSize.size_5xl,
// // //     fontWeight: "600",
// // //     // fontFamily: FontFamily.interSemiBold,
// // //     color: Color.primaryColor,
// // //     textAlign: "left",
// // //     marginVertical: 20,
// // //   },
// // //   registerScreen: {
// // //     backgroundColor: Color.colorWhite,
// // //     flex: 1,
// // //     width: "100%",
// // //     justifyContent: "center",
// // //   },
// // // });

// // // export default Register;

import React, { useState, useContext } from "react";
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
import IosAlertWithImage from "../../Components/Alert/IosAlertWithImage"; // Adjust the path as needed
import LoadingAnimation from "../../Components/Loader/loader";
import IosAlertWithImageWithCallBack from "../../Components/Alert/IosAlertWithImageWithCallBack";

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

  // Setting Getter and Setter to Get Input
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

  // Helper function for email validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Helper function for password validation
  const isValidPassword = (password) => {
    return password.length >= 8;
  };

  const onCloseAlert = () => {
    setAlertVisible(false);
    setAlertVisibleWithCounter(false);
  };

  const onRedirect = () => {
    navigation.navigate("Login"); // Adjust the navigation target as needed
  };

  const onResgisterSuccess = (data) => {
    setAlertMessage(data.message || "Registration successful");
    setIsSuccess(true);
    setAlertVisibleWithCounter(true);
    setRegistrationSuccess(true);
  };

  // Function to handle registration
  const onSubmitRegisterBtn = async () => {
    try {
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
      console.log("Register Data==> ", { name, username, email, password });
    } catch (error) {
      setLoading(false);
      setAlertMessage(error.response?.data?.message || "An error occurred");
      setIsSuccess(false);
      setAlertVisible(true);
      console.log(error);
    }
  };

  const onSubmitExistingUserBtn = () => {
    navigation.navigate("Login");
    console.log("Navigated to Login Page");
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      {loading && <LoadingAnimation visible={loading} loop={true} />}

      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
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

          <Text style={[styles.text_footer, { marginTop: 35 }]}>Username</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color={COLORS.textPrimary} size={20} />
            <TextInput
              placeholder="Your Username"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setUsername(val)}
            />
          </View>

          <Text style={[styles.text_footer, { marginTop: 35 }]}>Email</Text>
          <View style={styles.action}>
            <FontAwesome name="envelope" color={COLORS.textPrimary} size={20} />
            <TextInput
              placeholder="Your Email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setEmail(val)}
            />
          </View>

          <Text style={[styles.text_footer, { marginTop: 35 }]}>Password</Text>
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
            <Text style={styles.color_textPrivate}>
              By signing up you agree to our
            </Text>
            <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
              {" "}
              Terms of service
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

      {/* Custom Alert Component */}
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
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  footer: {
    flex: Platform.OS === "ios" ? 3 : 5,
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
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    justifyContent: "center",
  },
  color_textPrivate: {
    color: "grey",
  },
});

export default Register;
