import { useEffect } from "react";
import RouteNavigation from "./RouteNavigation";
import { NavigationContainer } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";
import { GlobalRefreshProvider } from "./Context/GlobalRefreshContext";
import { requestUserPermission } from "./utils/notificationService";

import { useColorScheme } from "react-native";
import { DefaultTheme } from "@react-navigation/native";
import PushNotification from "react-native-push-notification";

export default function App() {
  useEffect(() => {
    const unlockOrientation = async () => {
      await ScreenOrientation.unlockAllOrientations();
    };

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

  return (
    <NavigationContainer theme={lightTheme}>
      <GlobalRefreshProvider>
        <RouteNavigation></RouteNavigation>
      </GlobalRefreshProvider>
    </NavigationContainer>
  );
}
