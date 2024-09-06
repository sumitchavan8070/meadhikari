// import React, { useContext, useEffect, useState } from "react";
// import { useFocusEffect, useNavigation } from "@react-navigation/native";
// import {
//   ScrollView,
//   View,
//   Text,
//   StyleSheet,
//   Button,
//   TouchableOpacity,
//   BackHandler,
// } from "react-native";
// import confettiAnimation from "../assets/conf.json"; // Replace with the actual path to your confetti JSON file
// import LottieView from "lottie-react-native";
// import ProgressBar from "react-native-progress/Bar";
// import { Border, Color, FontSize, Padding } from "../GlobalStyles";
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
// import SecoundaryHeader from "../Components/Menus/SecoundaryHeader";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { AuthContext } from "../Context/authContext";

// const TestResult = ({ route }) => {
//   const {
//     testId,
//     selectedOptions,
//     questionData,
//     correctAnsNo,
//     incorrectAnsNo,
//     unAttempt,
//     score,
//     scorePercentage,
//     totalTime,
//   } = route.params;
//   // console.log("Time Result :" + totalTime);
//   const [state, setState] = useContext(AuthContext);

//   const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);

//   // const [score, setScore] = useState(0);

//   const navigation = useNavigation();

//   useEffect(() => {
//     setIsAnimationPlaying(true);
//   }, []);

//   // Function to navigate to the home page
//   const navigateToHome = () => {
//     navigation.navigate("Home"); // Replace "Home" with your actual home screen name
//   };

//   // Effect to redirect to home page on component focus
//   useFocusEffect(
//     React.useCallback(() => {
//       const onBackPress = () => {
//         navigation.navigate("Home"); // Navigate to the home screen
//         return true; // Return true to prevent default back navigation
//       };

//       // Add event listener for Android back button press
//       const backHandler = BackHandler.addEventListener(
//         "hardwareBackPress",
//         onBackPress
//       );

//       // Clean up the event listener when the component is unfocused
//       return () => backHandler.remove();
//     }, [navigation])
//   );

//   // let correctAnswersCount = 0;
//   // let incorrectAnswersCount = 0;
//   // questionData.forEach((question, index) => {
//   //   const selectedOptionKey = selectedOptions[index];
//   //   const correctAnswer = question.answer;
//   //   if (selectedOptionKey === correctAnswer) {
//   //     correctAnswersCount++;
//   //   } else {
//   //     incorrectAnswersCount++;
//   //   }
//   // });

//   // let totalQuestions = questionData.length;
//   // let scorePercentage = ((correctAnswersCount / totalQuestions) * 100).toFixed(
//   //   2
//   // );

//   // Feedback message based on the score
//   let feedbackMessage = "";
//   if (scorePercentage >= 70) {
//     feedbackMessage = "Great job!";
//   } else if (scorePercentage >= 50) {
//     feedbackMessage = "Good effort!";
//   } else {
//     feedbackMessage = "Keep practicing!";
//   }

//   // Function to navigate to the Summary Page
//   const handleViewSummary = () => {
//     navigation.navigate("SummaryPage", {
//       questionData,
//       selectedOptions,
//     });
//   };

//   const handleViewHistory = () => {
//     navigation.navigate("History", {
//       questionData,
//       selectedOptions,
//       totalTime,
//     });
//   };

//   // Function to navigate to the Review Page
//   const handleReviewAnswers = () => {
//     navigation.navigate("ReviewPage", {
//       questionData,
//       selectedOptions,
//     });
//   };

//   // Define colors for low, medium, and high levels
//   const lowColor = "#FF6347"; // Red
//   const mediumColor = "#FFD700"; // Yellow
//   const highColor = "#32CD32"; // Green

//   let iconColor = "";
//   let iconName = "";

//   if (scorePercentage < 50) {
//     iconColor = Color.primaryColor;
//     iconName = "heart-broken";
//   } else if (scorePercentage >= 50 && scorePercentage <= 70) {
//     iconColor = Color.primaryColor;
//     iconName = "hippo";
//   } else {
//     iconColor = Color.primaryColor;
//     iconName = "horse-head";
//   }

//   return (
//     <View style={styles.container}>
//       <SecoundaryHeader pageName="Test Result" />
//       {isAnimationPlaying && (
//         <LottieView
//           source={confettiAnimation}
//           autoPlay
//           loop={true}
//           style={styles.animation}
//           resizeMode="cover"
//         />
//       )}

//       <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
//         <View style={styles.card}>
//           <FontAwesome5 name={iconName} color={iconColor} style={styles.icon} />
//           <Text style={styles.usernameText}>
//             Hello , <Text style={styles.usernameActual}>{state.user.name}</Text>
//           </Text>
//           <Text style={styles.details}>
//             Your detailed results are now in! 🎉 Dive in to discover your
//             performance 🚀
//           </Text>
//           <View style={[styles.tableContainer]}>
//             {/* <View style={styles.tableRow}>
//               <Text style={styles.tableLabel}>Total Score:</Text>
//               <Text style={styles.tableValue}>{score}</Text>
//             </View> */}
//             <View style={styles.tableRow}>
//               <Text style={styles.tableLabel}>Total Correct Answers:</Text>
//               <Text style={styles.tableValue}>{correctAnsNo}</Text>
//             </View>
//             <View style={styles.tableRow}>
//               <Text style={styles.tableLabel}>Total Incorrect Answers:</Text>
//               <Text style={styles.tableValue}>{incorrectAnsNo}</Text>
//             </View>
//             <View style={styles.tableRow}>
//               <Text style={styles.tableLabel}>Score Percentage:</Text>
//               <Text style={[styles.tableValue, styles.score]}>
//                 {scorePercentage}%
//               </Text>
//             </View>
//             <View style={styles.tableRow}>
//               <Text style={styles.tableLabel}>Total Time Taken:</Text>
//               <Text style={styles.tableValue}>{totalTime} minutes</Text>
//             </View>
//           </View>
//           <View style={styles.feedbackMessage}>
//             <Text style={styles.feedbackMessageTxt}>{feedbackMessage}</Text>
//           </View>
//           <View style={styles.scoreConatiner}>
//             <Text style={styles.score}>
//               Total Score: <Text style={styles.actualScore}>{score}</Text>
//             </Text>
//           </View>
//           <View style={styles.progressContainer}>
//             <ProgressBar
//               progress={scorePercentage / 100}
//               width={200}
//               color={
//                 scorePercentage >= 70
//                   ? highColor
//                   : scorePercentage >= 50
//                     ? mediumColor
//                     : lowColor
//               }
//               borderRadius={10}
//               animated
//             />
//             <View style={styles.colorPalette}>
//               <View style={[styles.colorBox, { backgroundColor: lowColor }]} />
//               <Text style={styles.colorLabel}>Low</Text>
//               <View
//                 style={[styles.colorBox, { backgroundColor: mediumColor }]}
//               />
//               <Text style={styles.colorLabel}>Medium</Text>
//               <View style={[styles.colorBox, { backgroundColor: highColor }]} />
//               <Text style={styles.colorLabel}>High</Text>
//             </View>
//           </View>
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity
//               style={styles.btnModify}
//               onPress={handleViewHistory}
//             >
//               <Text style={styles.txtModify}>View History</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.btnSummary}
//               onPress={handleViewSummary}
//             >
//               <Text style={styles.txtSummary}>View Summary</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   details: {
//     textAlign: "center",
//     fontSize: 14,
//     marginBottom: 10,
//     color: Color.darkGreen,
//   },
//   usernameText: {
//     // color: Color.red,
//     fontWeight: "bold",
//     fontSize: 20,
//     alignSelf: "center",
//     paddingBottom: 5,
//   },
//   usernameActual: {
//     color: Color.red,
//     fontWeight: "bold",
//     fontSize: 20,
//   },
//   scoreConatiner: {
//     // paddingVertical: 5,
//     marginBottom: 10,
//     alignSelf: "center",
//   },
//   score: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: Color.primaryColor,
//   },
//   actualScore: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   tableContainer: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 5,
//     padding: 15,
//     marginBottom: 10,
//   },
//   tableRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 5,
//     alignContent: "center",
//     alignItems: "center",
//   },
//   tableLabel: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginTop: 10,
//     color: Color.primaryColor,
//   },
//   tableValue: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginTop: 10,
//     color: Color.primaryColor,
//     marginLeft: 10,
//   },

//   icon: {
//     fontSize: 150,
//     alignSelf: "center",
//     marginBottom: 20,
//   },
//   container: {
//     flexGrow: 1,
//     padding: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: Color.colorWhite,
//   },
//   scroll: { marginTop: "15%" },
//   resultCard: {
//     marginBottom: 20,
//     width: "95%",
//   },
//   btnSummary: {
//     backgroundColor: Color.primaryColor,
//     borderRadius: Border.br_3xs,
//     backgroundColor: Color.primaryColor,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: Padding.p_16xl,
//     paddingVertical: 13,
//   },
//   btnModify: {
//     borderRadius: Border.br_3xs,
//     backgroundColor: Color.secoundaryBtnColor,
//     borderStyle: "solid",
//     borderColor: Color.primaryColor,
//     borderWidth: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: Padding.p_16xl,
//     paddingVertical: Padding.p_2xs,
//   },
//   txtModify: {
//     fontSize: FontSize.size_xs,
//     textTransform: "capitalize",
//     fontWeight: "700",
//     // fontFamily: FontFamily.interBold,
//     color: Color.primaryColor,
//     textAlign: "center",
//   },
//   txtSummary: {
//     fontSize: FontSize.size_xs,
//     textTransform: "capitalize",
//     fontWeight: "700",
//     // fontFamily: FontFamily.interBold,
//     color: Color.colorWhite,
//     textAlign: "center",
//   },
//   animation: {
//     pointerEvents: "none",
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },

//   card: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 10,
//     padding: 20,
//     marginBottom: 20,
//     backgroundColor: "#fff",
//     elevation: 5,
//     alignContent: "center",
//     alignSelf: "center",
//     // width: "100%",
//   },
//   heading: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//     textAlign: "center",
//   },

//   resultText: {
//     marginBottom: 5,
//     // left: "10%",
//     paddingHorizontal: "20%",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   feedbackMessage: {
//     alignSelf: "center",
//     marginBottom: 30,
//     // justifyContent: "center",
//   },
//   feedbackMessageTxt: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginTop: 10,
//     color: Color.primaryColor,
//   },
//   progressContainer: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   colorPalette: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     width: "100%",
//     marginBottom: 20,
//   },
//   colorBox: {
//     width: 50,
//     height: 20,
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     marginTop: "5%",
//   },
//   colorLabel: {
//     textAlign: "center",
//     marginTop: 5,
//     fontSize: 12,
//     marginTop: "5%",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//   },
// });

// export default TestResult;

import React, { useContext, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  StatusBar,
} from "react-native";
import LottieView from "lottie-react-native";
import { AuthContext } from "../Context/authContext";
import { PieChart } from "react-native-gifted-charts";
import HeaderMenu from "../Components/Menus/HeaderMenu";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Color } from "../GlobalStyles";

const TestResult = ({ route }) => {
  const {
    testId,
    selectedOptions,
    questionData,
    correctAnsNo,
    incorrectAnsNo,
    unAttempt,
    score,
    scorePercentage,
    totalTime,
  } = route.params;

  // const [state] = useContext(AuthContext);
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(true);
  const navigation = useNavigation();
  const [state, setState] = useContext(AuthContext);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("Home");
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => backHandler.remove();
    }, [navigation])
  );

  useEffect(() => {
    // Automatically stop the animation after 3 seconds
    const timeout = setTimeout(() => {
      setIsAnimationPlaying(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  const feedbackMessage =
    scorePercentage >= 70
      ? "Great job!"
      : scorePercentage >= 50
        ? "Good effort!"
        : "Keep practicing!";

  const handleViewSummary = () => {
    navigation.navigate("SummaryPage", {
      questionData,
      selectedOptions,
      testId,
      totalTime,
      correctAnsNo,
      incorrectAnsNo,
      unAttempt,
    });
  };

  const handleViewHistory = () => {
    navigation.navigate("History", {
      questionData,
      selectedOptions,
      totalTime,
    });
  };

  const pieData = [
    {
      value: correctAnsNo,
      color: "#009FFF",
      gradientCenterColor: "#006DFF",
      label: `Correct: ${correctAnsNo}`,
    },
    {
      value: incorrectAnsNo,
      color: "#FFA5BA",
      gradientCenterColor: "#FF7F97",
      label: `Incorrect: ${incorrectAnsNo}`,
    },
    {
      value: unAttempt,
      color: "#BDB2FA",
      gradientCenterColor: "#8F80F3",
      label: `Unattempted: ${unAttempt}`,
    },
  ];

  const renderLegendComponent = () => (
    <View style={styles.legendContainer}>
      {pieData.map((item, index) => (
        <View key={index} style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: item.color }]} />
          <Text style={styles.legendText}>{item.label}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#232B5D" barStyle="light-content" />
      <HeaderMenu />
      <ScrollView style={styles.card} showsVerticalScrollIndicator={false}>
        {/* <FontAwesome5
          name={
            scorePercentage < 50
              ? "heart-broken"
              : scorePercentage <= 70
                ? "hippo"
                : "horse-head"
          }
          color={Color.primaryColor}
          style={styles.icon}
        /> */}
        <Text style={styles.usernameText}>
          Hello, <Text style={styles.usernameActual}>{state.user.name}</Text>
        </Text>
        <Text style={styles.details}>
          Your detailed results are now in! 🎉 Dive in to discover your
          performance 🚀
        </Text>

        <View style={styles.summaryContainer}>
          <Text style={styles.title}>Performance Summary</Text>
          <View style={styles.chartContainer}>
            <PieChart
              data={pieData}
              donut
              showGradient
              sectionAutoFocus
              radius={90}
              innerRadius={60}
              innerCircleColor={"#232B5D"}
              centerLabelComponent={() => (
                <View style={styles.centerLabel}>
                  <Text style={styles.scorePercentageText}>
                    {scorePercentage}%
                  </Text>
                  <Text style={styles.scoreText}>Score</Text>
                </View>
              )}
            />
          </View>
          {renderLegendComponent()}

          {/* <Text
            style={{
              alignSelf: "center",
              color: Color.colorWhite,
              fontSize: 18,
              fontWeight: "bold",
              padding: 20,
            }}
          >
            {feedbackMessage}
          </Text> */}
        </View>

        <View style={styles.buttonContainer}>
          <LinearGradient
            colors={["#4c669f", "#3b5998", "#192f6a"]}
            style={styles.gradientButton}
          >
            <TouchableOpacity onPress={handleViewHistory}>
              <Text style={styles.buttonText}>View History</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={["#FF7E5F", "#FD3A69"]}
            style={styles.gradientButton}
          >
            <TouchableOpacity onPress={handleViewSummary}>
              <Text style={styles.buttonText}>View Summary</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View
          style={{
            padding: 10,
            alignSelf: "center",
            backgroundColor: "#232B5D",
            width: "95%",
            marginBottom: "15%",
            borderRadius: 15,
          }}
        >
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#009FFF" }]} />
            <Text style={{ color: Color.colorWhite }}>
              Test ID : {testId ? testId : "TEST"}
            </Text>
          </View>

          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#009FFF" }]} />
            <Text style={{ color: Color.colorWhite }}>
              Name : {state?.user?.name}
            </Text>
          </View>

          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#009FFF" }]} />
            <Text style={{ color: Color.colorWhite }}>
              <Text style={styles.tableValue}>
                Time Taken : {totalTime} minutes
              </Text>
            </Text>
          </View>

          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#009FFF" }]} />
            <Text style={{ color: Color.colorWhite }}>
              <Text style={styles.tableValue}>
                Attempted Questions : {correctAnsNo + incorrectAnsNo}
              </Text>
            </Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#009FFF" }]} />
            <Text style={{ color: Color.colorWhite }}>
              <Text style={styles.tableValue}>
                Coreect Answers : {correctAnsNo}
              </Text>
            </Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#009FFF" }]} />
            <Text style={{ color: Color.colorWhite }}>
              <Text style={styles.tableValue}>
                Wrong Answers : {incorrectAnsNo}
              </Text>
            </Text>
          </View>

          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#009FFF" }]} />
            <Text style={{ color: Color.colorWhite }}>
              <Text style={styles.tableValue}>
                Unattempted Questions : {unAttempt}
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>

      {isAnimationPlaying && (
        <LottieView
          source={require("../assets/confitee.json")}
          autoPlay
          loop={false}
          style={styles.lottie}
          pointerEvents="none" // This ensures the animation doesn't block touch events
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    padding: 30,
  },
  icon: {
    fontSize: 80,
    marginBottom: 15,
    alignSelf: "center",
  },
  usernameText: {
    fontSize: 18,
    color: "#333",
    alignSelf: "center",
  },
  usernameActual: {
    color: "#FF6F61",
    fontWeight: "bold",
  },
  details: {
    textAlign: "center",
    fontSize: 16,
    color: Color.darkGreen,
    marginVertical: 10,
  },
  summaryContainer: {
    backgroundColor: "#232B5D",
    borderRadius: 20,
    padding: 20,
    marginVertical: 20,
    alignItems: "center",
    width: "100%",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  chartContainer: {
    alignItems: "center",
  },
  centerLabel: {
    justifyContent: "center",
    alignItems: "center",
  },
  scorePercentageText: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
  },
  scoreText: {
    fontSize: 14,
    color: "#fff",
  },
  legendContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  legendDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  legendText: {
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 40,
  },
  gradientButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  lottie: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  },
});

export default TestResult;
