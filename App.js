import { useEffect } from "react";
import RouteNavigation from "./RouteNavigation";
import { NavigationContainer } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";
import { GlobalRefreshProvider } from "./Context/GlobalRefreshContext";
import { requestUserPermission } from "./utils/notificationService";

import { useColorScheme } from "react-native";
import { DefaultTheme } from "@react-navigation/native";
import axios from "axios";
import { appUpdateFunction } from "./Components/appUpdate/appUpdatex";

export default function App() {
  useEffect(() => {
    const unlockOrientation = async () => {
      await ScreenOrientation.unlockAllOrientations();
    };
    CheckForUpdate();
    return () => {
      unlockOrientation();
    };
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

  const CheckForUpdate = async () => {
    // const reponse = await axios.post("/app-update", {
    //   app_name: "meadhikari",
    //   app_type: "Android",
    // });

    const reponse = {
      appId: "com.sc.meadhikari",
      softUpdate: 0,
      forceUpdate: 1,
      buildNo: 1,
      iosBuildNo: 102,
      version: "6.1.8",
      title: "Update Available",
      message:
        "A new version of the app is available. Please update to the latest version.",
      downloadUrl:
        "https://play.google.com/store/apps/details?id=com.globalassignmenthelp&hl=en",
      playIcon: "",
    };

    appUpdateFunction(reponse);
  };

  // const lightTheme = {
  //   dark: false,
  //   colors: {
  //     primary: '#6200ee',
  //     background: '#ffffff',
  //     card: '#ffffff',
  //     text: '#000000',
  //     border: '#cccccc',
  //     notification: '#ff80ab',
  //   },
  // };

  // useEffect(() => {
  //   requestUserPermission();
  // }, []);

  return (
    <NavigationContainer theme={lightTheme}>
      {/* <CopilotProvider tooltipStyle={style}> */}
      <GlobalRefreshProvider>
        <RouteNavigation></RouteNavigation>
      </GlobalRefreshProvider>
      {/* </CopilotProvider> */}
    </NavigationContainer>
  );
}
