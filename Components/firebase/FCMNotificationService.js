import messaging, { firebase } from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
// import { navigate } from "./MyNavigator"; // Import your custom navigator

class FCMNotificationService {
  async updateFCMToken() {
    const authorizationStatus = await messaging().requestPermission();
    console.log("authorizationStatus " + authorizationStatus);
    await firebase.messaging().registerDeviceForRemoteMessages();

    if (authorizationStatus) {
      const fcmToken = await messaging().getToken();
      console.log("FCM TOKEN:", fcmToken);
      console.log("Firebase Instance Id:", fcmToken?.split(":")[0]);

      // Send the FCM token to your server using your API
      //   await this.fcmTokenApi(fcmToken);
    }
  }

  async clearFCMToken() {
    await messaging().deleteToken();
  }

  async initNotification() {
    PushNotification.configure({
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        try {
          const payload = JSON.parse(notification.data || "{}");
          FCMNotificationService.onNotificationClicked(
            payload,
            "PushNotification"
          );
        } catch (error) {
          console.error("Error processing notification response:", error);
        }
      },
      requestPermissions: Platform.OS === "ios",
    });
  }

  static async onNotificationClicked(payload, path) {
    console.log(
      `------------------- called from || ${path} -------------------`
    );
    const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");

    console.log("payload data:", payload);

    if (payload.route) {
      navigate(payload.route, { data: payload });
    } else {
      navigate("SplashScreen");
    }
  }

  fcmListener() {
    messaging().onMessage(async (remoteMessage) => {
      console.log("Notification received", remoteMessage);
      FCMNotificationService.createNotification(remoteMessage);
    });
  }

  static async createNotification(remoteMessage) {
    try {
      PushNotification.localNotification({
        /* Android Only Properties */
        channelId: "pushNotification",
        largeIcon: "ic_launcher", // Large icon name (without extension)
        color: "#6949ff", // Notification icon background color
        importance: "high",

        /* iOS and Android properties */
        title: remoteMessage.notification?.title,
        message: remoteMessage.notification?.body,
        userInfo: remoteMessage.data, // Payload data
      });
    } catch (error) {
      console.error("Notification Create Error:", error);
    }
  }

  async fcmTokenApi(fcmToken) {
    // Implement your API call here to send the token to your server
  }
}

export default FCMNotificationService;
