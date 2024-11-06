// import * as React from "react";
// import { Image } from "expo-image";
// import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
// import {
//   useFocusEffect,
//   useNavigation,
//   useRoute,
// } from "@react-navigation/native";
// import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
// import FooterMenu from "../Components/Menus/FooterMenu";
// import HeaderMenu from "../Components/Menus/HeaderMenu";
// import Banner from "../Components/Banner/Banner";
// import ExamCategories from "../Components/Exams/ExamCategories";
// import Exam from "../Components/Exams/Exam";
// import CategoryComponent from "../Components/CategoryBanner/CategoryComponent";
// import MenuContainerComponent from "../Components/MenuContainer/MenuContainerComponent";
// import BetaHomePageBanner from "../Components/BetaBanner/BetaHomePageBanner";
// import { useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useEffect } from "react";
// import JoinBox from "../Components/JoinBox/JoinBox";
// import QuestionPaperSection from "../Components/QuestionPaperSection/QuestionPaperSection";
// import socketServices from "../utils/sockertService";
// import axios from "axios";
// import { AuthContext } from "../Context/authContext";
// import UpdatePopup from "../Components/appUpdate/popup/UpdatePopup";

// import { Platform } from "react-native";
// import DeviceInfo from "react-native-device-info";
// import * as Linking from "expo-linking"; // Uncomment if using Expo

// const HomeScreen = () => {
//   const navigation = useNavigation();
//   const route = useRoute();

//   const handleLinkText = () => {
//     navigation.navigate("ViewAll");
//   };

//   const [username, setUsername] = useState(null);
//   const [appUpdate, setAppUpdate] = useState("");
//   const [id, setId] = useState("");

//   // useEffect(() => {
//   //   const getUsername = async () => {
//   //     try {
//   //       const data = await AsyncStorage.getItem("@auth");
//   //       if (data) {
//   //         const loginData = JSON.parse(data);
//   //         const fetchedUsername = loginData.user.name;

//   //         //Initilized socket
//   //         socketServices.initialzeSocekt(loginData.user._id);

//   //         setUsername(fetchedUsername);
//   //       } else {
//   //         setUsername(null); // Handle case where data is not available
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching username:", error);
//   //       setUsername(null); // Handle error case
//   //     }
//   //   };

//   //   getUsername();
//   // }, []); // Empty dependency array to run effect only once

//   const [state] = React.useContext(AuthContext);
//   //auth condition true false
//   const authenticatedUser = state?.user && state?.token;

//   const [fcmToken, setFcmToken] = useState(null);

//   // useEffect(() => {
//   //   const updateFCMToken = async () => {
//   //     try {
//   //       const token = await AsyncStorage.getItem("fcm_token");
//   //       if (token !== null) {
//   //         setFcmToken(token);
//   //         // Get user ID from state or wherever you store it
//   //         const userId = state?.user._id;

//   //         // Send API request to update FCM token for the user
//   //         const response = await axios.put(`/fcm/${userId}/update`, {
//   //           fcmToken: token,
//   //         });
//   //         // console.log("FCM token updated successfully:", response.data);
//   //       }
//   //     } catch (error) {
//   //       console.error("Error updating FCM token:", error);
//   //     }
//   //   };

//   //   updateFCMToken();
//   // }, []); // Empty dependency array to run only once on mount

//   const CheckForUpdate = async () => {
//     const reponse = await axios.post("/app-update", {
//       app_name: "meadhikari",
//       app_type: "Android",
//     });

//     // const reponse = {
//     //   appId: "com.sc.meadhikari",
//     //   softUpdate: 0,
//     //   forceUpdate: 1,
//     //   buildNo: 1,
//     //   iosBuildNo: 102,
//     //   version: "6.1.8",
//     //   title: "Update Available",
//     //   message:
//     //     "A new version of the app is available. Please update to the latest version.",
//     //   downloadUrl:
//     //     "https://play.google.com/store/apps/details?id=com.globalassignmenthelp&hl=en",
//     //   playIcon: "",
//     // };

//     setAppUpdate(reponse);
//   };

//   useFocusEffect(
//     React.useCallback(() => {
//       CheckForUpdate();

//       const updateTokenOnFocus = async () => {
//         const token = await AsyncStorage.getItem("fcm_token");
//         if (token !== fcmToken) {
//           // FCM token changed, update it
//           setFcmToken(token);
//           const userId = state?.user._id;
//           const response = await axios.put(`/fcm/${userId}/update`, {
//             fcmToken: token,
//           });
//           console.log("FCM token updated on focus:", response.data);
//         }
//       };

//       updateTokenOnFocus();

//       return () => {
//         // Cleanup function (optional)
//       };
//     }, []) // Dependency array with fcmToken as dependency
//   );

//   const [showUpdateDialog, setShowUpdateDialog] = useState(false);

//   const handleLaunchStore = () => {
//     setShowUpdateDialog(false);
//     _launchStore({ appId: appUpdate?.appId });
//   };

//   const handleClose = () => {
//     setShowUpdateDialog(false);
//     console.log("Update dismissed");
//   };

//   const updateDrawer = (appUpdate) => {
//     if (
//       Platform.OS === "android" &&
//       (appUpdate?.forceUpdate === 1 || appUpdate?.softUpdate === 1)
//     ) {
//       setShowUpdateDialog(true);
//     } else if (Platform.OS === "ios") {
//       setShowUpdateDialog(true);
//     }
//   };

//   React.useEffect(() => {
//     if (appUpdate?.softUpdate === 1 || appUpdate?.forceUpdate === 1) {
//       const buildNumber = DeviceInfo.getBuildNumber();
//       let updateAvailable = true;

//       if (Platform.OS === "ios") {
//         updateAvailable =
//           (appUpdate?.iosBuildNo ?? 0) > parseInt(buildNumber, 10);
//       }

//       if (updateAvailable) {
//         updateDrawer(appUpdate);
//       }
//     }
//   }, [appUpdate]);

//   const _launchStore = async ({ appId }) => {
//     if (Platform.OS === "android" || Platform.OS === "ios") {
//       const androidUri = `market://details?id=${appId}`;
//       const iosUri = `https://apps.apple.com/gb/app/id${appId}`;

//       const uri = Platform.OS === "android" ? androidUri : iosUri;

//       const supported = await Linking.canOpenURL(uri);
//       if (supported) {
//         await Linking.openURL(uri);
//       } else {
//         throw new Error("Could not launch Store URL");
//       }
//     }
//   };

//   return (
//     //Header

//     <View style={styles.homescreen}>
//       <ScrollView style={styles.scroll}>
//         {showUpdateDialog && (
//           <UpdatePopup
//             appUpdate={appUpdate}
//             onClose={handleClose}
//             onUpdate={handleLaunchStore}
//           />
//         )}
//         {/* //Header */}
//         <HeaderMenu />
//         <Banner />
//         <JoinBox />

//         <BetaHomePageBanner username={state.user.name} />

//         {/* <View style={styles.catContainer}> */}
//         <CategoryComponent
//           mainCatName="Exams"
//           // linkName="ViewAll"
//           // handleLinkText={handleLinkText}
//         />
//         <Exam />

//         <MenuContainerComponent></MenuContainerComponent>
//         {/* </View> */}

//         <CategoryComponent
//           mainCatName="Exam wise Question Papers"
//           // linkName="ViewAll"
//           handleLinkText={handleLinkText}
//         />
//         <QuestionPaperSection />

//         {/* <Section /> */}
//         <View style={styles.bottomSpace} />
//       </ScrollView>
//       <FooterMenu />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   scroll: {
//     backgroundColor: Color.colorWhite,
//     flexGrow: 1,
//   },

//   homescreen: {
//     flex: 1,
//   },
//   bottomSpace: {
//     paddingVertical: 60,
//   },
// });

// export default HomeScreen;

import * as React from "react";
import { Image } from "expo-image";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Alert,
  Button,
} from "react-native";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import FooterMenu from "../Components/Menus/FooterMenu";
import HeaderMenu from "../Components/Menus/HeaderMenu";
import Banner from "../Components/Banner/Banner";
import ExamCategories from "../Components/Exams/ExamCategories";
import Exam from "../Components/Exams/Exam";
import CategoryComponent from "../Components/CategoryBanner/CategoryComponent";
import MenuContainerComponent from "../Components/MenuContainer/MenuContainerComponent";
import BetaHomePageBanner from "../Components/BetaBanner/BetaHomePageBanner";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import JoinBox from "../Components/JoinBox/JoinBox";
import QuestionPaperSection from "../Components/QuestionPaperSection/QuestionPaperSection";
import socketServices from "../utils/sockertService";
import axios from "axios";
import { AuthContext } from "../Context/authContext";
import UpdatePopup from "../Components/appUpdate/popup/UpdatePopup";

import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import * as Linking from "expo-linking"; // Uncomment if using Expo
import * as Animatable from "react-native-animatable";

import ExpiredSubscriptionSheet from "../Components/BottomSheet/ExpiredSubscriptionSection";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { trackHomePageView } from "../utils/analyticsUtils";

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const handleLinkText = () => {
    navigation.navigate("ViewAll");
  };

  const [username, setUsername] = useState(null);
  const [appUpdate, setAppUpdate] = useState("");
  const [id, setId] = useState("");

  // useEffect(() => {
  //   const getUsername = async () => {
  //     try {
  //       const data = await AsyncStorage.getItem("@auth");
  //       if (data) {
  //         const loginData = JSON.parse(data);
  //         const fetchedUsername = loginData.user.name;

  //         //Initilized socket
  //         socketServices.initialzeSocekt(loginData.user._id);

  //         setUsername(fetchedUsername);
  //       } else {
  //         setUsername(null); // Handle case where data is not available
  //       }
  //     } catch (error) {
  //       console.error("Error fetching username:", error);
  //       setUsername(null); // Handle error case
  //     }
  //   };

  //   getUsername();
  // }, []); // Empty dependency array to run effect only once

  const [state, setState] = React.useContext(AuthContext);
  //auth condition true false
  const authenticatedUser = state?.user && state?.token;

  const [fcmToken, setFcmToken] = useState(null);

  // useEffect(() => {
  //   const updateFCMToken = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem("fcm_token");
  //       if (token !== null) {
  //         setFcmToken(token);
  //         // Get user ID from state or wherever you store it
  //         const userId = state?.user._id;

  //         // Send API request to update FCM token for the user
  //         const response = await axios.put(`/fcm/${userId}/update`, {
  //           fcmToken: token,
  //         });
  //         // console.log("FCM token updated successfully:", response.data);
  //       }
  //     } catch (error) {
  //       console.error("Error updating FCM token:", error);
  //     }
  //   };

  //   updateFCMToken();
  // }, []); // Empty dependency array to run only once on mount

  const CheckForUpdate = async () => {
    const reponse = await axios.post("/app-update", {
      app_name: "meadhikari",
      app_type: "Android",
    });

    // const reponse = {
    //   appId: "com.sc.meadhikari",
    //   softUpdate: 0,
    //   forceUpdate: 1,
    //   buildNo: 1,
    //   iosBuildNo: 102,
    //   version: "6.1.8",
    //   title: "Update Available",
    //   message:
    //     "A new version of the app is available. Please update to the latest version.",
    //   downloadUrl:
    //     "https://play.google.com/store/apps/details?id=com.globalassignmenthelp&hl=en",
    //   playIcon: "",
    // };

    setAppUpdate(reponse);
  };

  useFocusEffect(
    React.useCallback(() => {
      CheckForUpdate();

      const updateTokenOnFocus = async () => {
        const token = await AsyncStorage.getItem("fcm_token");
        if (token !== fcmToken) {
          // FCM token changed, update it
          setFcmToken(token);
          const userId = state?.user._id;
          const response = await axios.put(`/fcm/${userId}/update`, {
            fcmToken: token,
          });
          // console.log("FCM token updated on focus:", response.data);
        }
      };

      updateTokenOnFocus();

      return () => {
        // Cleanup function (optional)
      };
    }, []) // Dependency array with fcmToken as dependency
  );

  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

  const handleLaunchStore = () => {
    setShowUpdateDialog(false);
    _launchStore({ appId: appUpdate?.appId });
  };

  const handleClose = () => {
    setShowUpdateDialog(false);
    console.log("Update dismissed");
  };

  const updateDrawer = (appUpdate) => {
    if (
      Platform.OS === "android" &&
      (appUpdate?.forceUpdate === 1 || appUpdate?.softUpdate === 1)
    ) {
      setShowUpdateDialog(true);
    } else if (Platform.OS === "ios") {
      setShowUpdateDialog(true);
    }
  };

  React.useEffect(() => {
    if (appUpdate?.softUpdate === 1 || appUpdate?.forceUpdate === 1) {
      const buildNumber = DeviceInfo.getBuildNumber();
      let updateAvailable = true;

      if (Platform.OS === "ios") {
        updateAvailable =
          (appUpdate?.iosBuildNo ?? 0) > parseInt(buildNumber, 10);
      }

      if (updateAvailable) {
        updateDrawer(appUpdate);
      }
    }
  }, [appUpdate]);

  const _launchStore = async ({ appId }) => {
    if (Platform.OS === "android" || Platform.OS === "ios") {
      const androidUri = `market://details?id=${appId}`;
      const iosUri = `https://apps.apple.com/gb/app/id${appId}`;

      const uri = Platform.OS === "android" ? androidUri : iosUri;

      const supported = await Linking.canOpenURL(uri);
      if (supported) {
        await Linking.openURL(uri);
      } else {
        throw new Error("Could not launch Store URL");
      }
    }
  };

  const [banners, setBanners] = useState([]);
  const [bannerLoading, setBannerLoading] = useState(true);

  React.useLayoutEffect(() => {
    // Fetch banners from API
    const fetchBanners = async () => {
      try {
        const response = await axios.get("/banner/get-all");
        const sortedBanners = response.data.sort((a, b) => a.index - b.index);
        setBanners(sortedBanners);
      } catch (error) {
        console.error("Error fetching banners:", error);
      } finally {
        setBannerLoading(false);
      }
    };

    socketServices.initialzeSocekt(state.user._id);

    fetchBanners();
  }, []);

  useEffect(() => {
    trackHomePageView(); // Track when the Home page is accessed
  }, []);

  return (
    //Header

    <View style={styles.homescreen}>
      <ScrollView style={styles.scroll}>
        {showUpdateDialog && (
          <UpdatePopup
            appUpdate={appUpdate}
            onClose={handleClose}
            onUpdate={handleLaunchStore}
          />
        )}
        {/* //Header */}

        <Animatable.View animation="slideInUp" duration={5000}>
          <HeaderMenu />
        </Animatable.View>

        {/* Banner */}
        <Animatable.View animation="slideInUp" duration={5000} delay={600}>
          <Banner banners={banners} bannerLoading={bannerLoading} />
        </Animatable.View>

        {/* Join Box */}
        <Animatable.View animation="slideInUp" duration={5000} delay={800}>
          <JoinBox />
        </Animatable.View>

        {/* Beta Home Page Banner */}
        <Animatable.View animation="slideInUp" duration={5000} delay={1000}>
          <BetaHomePageBanner username={state.user.name} />
        </Animatable.View>

        {/* Category Component */}
        <Animatable.View animation="slideInUp" duration={3000} delay={1100}>
          <CategoryComponent mainCatName="Exams" />
        </Animatable.View>

        {/* Exam Section */}
        {/* <Animatable.View animation="slideInUp" duration={1000} delay={1000}> */}
        <Exam />
        {/* </Animatable.View> */}

        {/* Menu Container */}
        <Animatable.View animation="slideInUp" duration={3000} delay={1200}>
          <MenuContainerComponent />
        </Animatable.View>

        {/* Question Paper Section */}
        <Animatable.View animation="slideInUp" duration={3000} delay={1400}>
          <CategoryComponent
            mainCatName="Exam wise Question Papers"
            handleLinkText={handleLinkText}
          />
          <QuestionPaperSection />
        </Animatable.View>
        {/* <Section /> */}
        <View style={styles.bottomSpace} />
      </ScrollView>
      <FooterMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: Color.colorWhite,
    flexGrow: 1,
  },

  homescreen: {
    flex: 1,
  },
  bottomSpace: {
    paddingVertical: 60,
  },
});

export default HomeScreen;
