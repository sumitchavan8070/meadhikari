import { useEffect } from "react";
import RouteNavigation from "./RouteNavigation";
import { NavigationContainer } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";
import { GlobalRefreshProvider } from "./Context/GlobalRefreshContext";
import { requestUserPermission } from "./utils/notificationService";

export default function App() {
  useEffect(() => {
    const unlockOrientation = async () => {
      await ScreenOrientation.unlockAllOrientations();
    };

    return () => {
      unlockOrientation();
    };
  }, []);

  // useEffect(() => {
  //   requestUserPermission();
  // }, []);

  return (
    <NavigationContainer>
      {/* <CopilotProvider tooltipStyle={style}> */}
      <GlobalRefreshProvider>
        <RouteNavigation></RouteNavigation>
      </GlobalRefreshProvider>
      {/* </CopilotProvider> */}
    </NavigationContainer>
  );
}
