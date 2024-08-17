// import { View, Text, StyleSheet } from "react-native";
// import React, { useEffect, useState } from "react";
// import { Color, FontSize } from "../../GlobalStyles";
// import { Image } from "expo-image";
// import { AuthContext } from "../../Context/authContext";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import { TouchableOpacity } from "react-native-gesture-handler";

// const HeaderMenu = () => {
//   const [greeting, setGreeting] = useState("Hello");
//   const [state] = React.useContext(AuthContext);

//   useEffect(() => {
//     const getGreeting = () => {
//       const hours = new Date().getHours();
//       if (hours < 12) return `Good Morning,`;
//       if (hours < 17) return `Good Afternoon,`;
//       if (hours < 20) return `Good Evening,`;
//       return "Good Night,";
//     };
//     setGreeting(getGreeting());
//   }, []);
//   let username = state.user.username;

//   return (
//     <View style={[styles.header]}>
//       {/* <Text style={styles.greeting}>
//         {greeting}
//         <Text style={styles.username}>{username}</Text>
//       </Text> */}

//       <Image
//         style={styles.profile}
//         contentFit="cover"
//         source={require("../../assets/all/profilePic.png")}
//       />

//       <MaterialIcons
//         name="support-agent"
//         style={[styles.icon]}
//         color={Color.primaryColor}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   icon: {
//     fontSize: 45,
//     alignSelf: "center",
//   },
//   profile: {
//     width: 57,
//     height: 56,
//   },
//   greeting: {
//     color: Color.primaryColor,
//     textAlign: "center",
//     fontWeight: "400",
//     fontSize: 27,
//   },
//   username: {
//     fontWeight: "700",
//     fontSize: 27,
//   },
//   bellIcon: {
//     width: 25,
//     height: 25,
//     overflow: "hidden",
//   },
//   header: {
//     width: "100%",
//     paddingHorizontal: "5%",
//     alignItems: "center",
//     justifyContent: "space-between",
//     flexDirection: "row",
//     // zIndex: 9999,
//     paddingVertical: 10,
//     // backgroundColor: Color.red,
//   },
// });

// export default HeaderMenu;

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Color, FontSize } from "../../GlobalStyles";
import { Image } from "expo-image";
import { AuthContext } from "../../Context/authContext";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const HeaderMenu = () => {
  const [greeting, setGreeting] = useState("Hello");
  const [state] = React.useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    const getGreeting = () => {
      const hours = new Date().getHours();
      if (hours < 12) return `Good Morning,`;
      if (hours < 17) return `Good Afternoon,`;
      if (hours < 20) return `Good Evening,`;
      return "Good Night,";
    };
    setGreeting(getGreeting());
  }, []);

  let username = state.user.username;

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Image
          style={styles.profile}
          contentFit="cover"
          source={require("../../assets/profile.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("DonationScreen")}>
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../../assets/donate.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 47,
    height: 47,
    alignSelf: "center",
    borderRadius: 28.5, // Added borderRadius to make it circular
  },
  profile: {
    width: 47,
    height: 47,
    borderRadius: 28.5, // Added borderRadius to make it circular
  },
  header: {
    width: "100%",
    paddingHorizontal: "5%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingBottom: 10,
  },
});

export default HeaderMenu;
