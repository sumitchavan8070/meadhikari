// // import { View, Text,ViewStyle, SafeAreaView , StyleSheet} from "react-native";
// // import React ,{FC,ReactNode} from "react";

// // interface CustomeSafeAreaViewProps{
// //     children : ReactNode
// //     style?:ViewStyle
// // }

// // const CustomeSafeAreaView : FC <CustomeSafeAreaViewProps> = ({children , style}) => {
// //   return (
// //     <SafeAreaView style={[style.container , style]}>
// // <View style={[styles.container , style]}>{children}</View>
// //     </SafeAreaView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //     container:{
// //         flex:1,
// //         backgroundColor:"#fff"
// //     }
// // })

// // export default CustomeSafeAreaView;

// import React from "react";
// import PropTypes from "prop-types";
// import { View, SafeAreaView, StyleSheet } from "react-native";

// const CustomeSafeAreaView = ({ children, style }) => {
//   return (
//     <SafeAreaView style={[styles.container, style]}>
//       <View style={[styles.container, style]}>{children}</View>
//     </SafeAreaView>
//   );
// };

// CustomeSafeAreaView.propTypes = {
//   children: PropTypes.node.isRequired,
//   style: PropTypes.object,
// };

// CustomeSafeAreaView.defaultProps = {
//   style: {},
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
// });

// export default CustomeSafeAreaView;

import React from "react";
import PropTypes from "prop-types";
import { View, SafeAreaView, StyleSheet } from "react-native";

const CustomeSafeAreaView = ({ children, style = {} }) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
};

CustomeSafeAreaView.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default CustomeSafeAreaView;
