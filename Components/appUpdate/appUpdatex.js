// import { Platform, Alert } from "react-native";
// import DeviceInfo from "react-native-device-info";

// // import { checkUpdate, startUpdate, completeUpdate } from "react-native-update"; // Hypothetical package
// // import * as Linking from "expo-linking";
// // import * as Updates from "expo-updates"; // For in-app updates, particularly on iOS

// const appUpdateFunction = (appUpdate) => {
//   console.log(
//     appUpdate.softUpdate +
//       "=-----------------------------------  here is softUpdate update func "
//   );

//   // const buildNumber = await getBuildNumber(); // Function to get current build number
//   const buildNumber = 10; // Function to get current build number
//   console.log(`=----------------------------------- ${buildNumber}`);

//   // let updateAvailable = (appUpdate?.buildNo ?? 0) > parseInt(buildNumber, 10);
//   let updateAvailable = true;
//   console.log(
//     `=----------------------------------- updateAvailable : ${updateAvailable}`
//   );

//   if (Platform.OS === "ios") {
//     updateAvailable = (appUpdate?.iosBuildNo ?? 0) > parseInt(buildNumber, 10);
//   }

//   if (appUpdate?.softUpdate === 1 || appUpdate?.forceUpdate === 1) {
//     if (updateAvailable) {
//       console.log(
//         `=----------------------------------- update drawer : ${updateAvailable}`
//       );
//       updateDrawer(appUpdate);
//     }

//     // if (Platform.OS === "android" && updateAvailable) {
//     //   const updateInfo = await checkUpdate();
//     //   if (updateInfo.updateAvailable) {
//     //     if (appUpdate?.forceUpdate === 1) {
//     //       console.log("FORCE UPDATE STARTED");
//     //       const appUpdateResult = await startUpdate("immediate");
//     //       if (appUpdateResult === "success") {
//     //         // Handle success
//     //       }
//     //     } else if (appUpdate?.softUpdate === 1) {
//     //       console.log("SOFT UPDATE STARTED");
//     //       const appUpdateResult = await startUpdate("flexible");
//     //       if (appUpdateResult === "success") {
//     //         completeUpdate();
//     //       }
//     //     }
//     //   }
//     // }
//   }
// };

// const updateDrawer = (appUpdate) => {
//   if (
//     Platform.OS === "android" &&
//     (appUpdate?.forceUpdate === 1 || appUpdate?.softUpdate === 1)
//   ) {
//     appUpdateDialog({
//       // context,
//       appUpdate,
//       launchStore: () => _launchStore({ appId: appUpdate?.appId }),
//     });
//   }
//   if (Platform.OS === "ios") {
//     appUpdateDialog({
//       // context,
//       appUpdate,
//       launchStore: () => _launchStore({ appId: appUpdate?.appId }),
//     });
//   }
// };

// const _launchStore = async ({ appId }) => {
//   if (Platform.OS === "android" || Platform.OS === "ios") {
//     const androidUri = `market://details?id=${appId}`;
//     const iosUri = `https://apps.apple.com/gb/app/id${appId}`;

//     const uri = Platform.OS === "android" ? androidUri : iosUri;

//     console.log(`+------------- : market://details?id=${appId}`);

//     const supported = await Linking.canOpenURL(uri);
//     if (supported) {
//       await Linking.openURL(uri);
//     } else {
//       throw new Error("Could not launch Store URL");
//     }
//   }
// };

// const appUpdateDialog = ({ appUpdate, launchStore }) => {
//   Alert.alert(
//     appUpdate?.title || "Update Available",
//     appUpdate?.message || "A new version of the app is available.",
//     [
//       {
//         text: "Update",
//         onPress: launchStore,
//       },
//       ...(appUpdate?.forceUpdate === 0
//         ? [{ text: "Close", onPress: () => console.log("Update dismissed") }]
//         : []),
//     ],
//     { cancelable: false }
//   );
// };

// // const getBuildNumber = async () => {
// //   // Implement this function to return the current app build number
// //   // Example for Expo apps:
// //   return Updates.manifest.version;
// // };

// const getBuildNumber = async () => {
//   try {
//     const buildNumber = DeviceInfo.getBuildNumber();
//     console.log(buildNumber + "sumit build number ");

//     return buildNumber;
//   } catch (error) {
//     console.error("Failed to get build number:", error);
//     throw error;
//   }
// };

// export { appUpdateFunction };

import React, { useState } from "react";
import { Platform, View, Text, Button } from "react-native";
import DeviceInfo from "react-native-device-info";
import * as Linking from "expo-linking"; // Uncomment if using Expo
import UpdatePopup from "./popup/UpdatePopup";
// import * as Updates from "expo-updates"; // For in-app updates, particularly on iOS

// const AppUpdateComponent = ({ appUpdate, onClose, launchStore }) => {
//   return (
//     <View style={{ padding: 20, backgroundColor: "white", borderRadius: 10 }}>
//       <Text style={{ fontSize: 20, fontWeight: "bold" }}>
//         {appUpdate?.title || "Update Available"}
//       </Text>
//       <Text style={{ marginVertical: 10 }}>
//         {appUpdate?.message || "A new version of the app is available."}
//       </Text>
//       <Button title="Update" onPress={launchStore} />
//       {appUpdate?.forceUpdate === 0 && (
//         <Button title="Close" onPress={onClose} />
//       )}
//     </View>
//   );
// };

// const AppUpdateWrapper = ({ appUpdate }) => {
//   return (
//     <>

//       {/* Rest of your app components go here */}
//     </>
//   );
// };

// export { AppUpdateWrapper };
