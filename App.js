import { useEffect } from "react";
import RouteNavigation from "./RouteNavigation";
import { NavigationContainer } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";
import { GlobalRefreshProvider } from "./Context/GlobalRefreshContext";
import { requestUserPermission } from "./utils/notificationService";

import { useColorScheme } from "react-native";
import { DefaultTheme } from "@react-navigation/native";
import PushNotification from "react-native-push-notification";
import NoInternetWarning from "./Components/InternetWarning/NoInternetWarning";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "./Context/authContext";
import fetchConstants from "./Api/fetchConstants";
import constants from "./utils/constants";
import { usePreventScreenCapture } from "expo-screen-capture";

export default function App() {
  usePreventScreenCapture();

  useEffect(() => {
    const unlockOrientation = async () => {
      await ScreenOrientation.unlockAllOrientations();
    };

    return () => {
      unlockOrientation();
    };
  }, []);

  useEffect(() => {
    const loadConstants = async () => {
      try {
        await fetchConstants(); // Fetch constants on app launch
        // console.log("Constants loaded:", constants);
      } catch (error) {
        console.error("Error loading constants:", error);
      }
    };

    loadConstants();
  }, []);
  const scheme = useColorScheme();

  // Force light mode
  const lightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "white",
      text: "black",
    },
  };

  return (
    <NavigationContainer theme={lightTheme}>
      <GlobalRefreshProvider>
        <RouteNavigation></RouteNavigation>
        <NoInternetWarning />
      </GlobalRefreshProvider>
    </NavigationContainer>
  );
}
