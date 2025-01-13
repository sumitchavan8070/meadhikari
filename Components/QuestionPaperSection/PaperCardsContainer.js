import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Color } from "../../GlobalStyles";
import ChooseExamAlertSuccess from "../Alert/ChooseExamAlertSuccess";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../Context/authContext";
import axios from "axios";
import MaxTestAllowedAlert from "../Alert/MaxTestAllowedAlert";
import IosAlertWithImageWithCallBack from "../Alert/IosAlertWithImageWithCallBack";

const PaperCard = ({ data, onPress }) => {
  const { subCatId, yearId, QPYear, subCatName, questions, questionPaperName } =
    data;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(questions, QPYear)}
    >
      {/* <Text>Subcategory ID: {subCatId}</Text>
      <Text>Year ID: {yearId}</Text>
      <Text>subCatName: {subCatName}</Text>
      <Text>QPYear: {QPYear}</Text>
      <Text>Total Questions: {questions.length}</Text> */}
      <Text style={[styles.subCatLabel]}>{subCatName}</Text>
      <Text style={{ marginVertical: 5, color: "blue" }}>
        {questionPaperName}
      </Text>
      <Text style={styles.content}>Year : {QPYear}</Text>
      <Text style={styles.content}>Total Questions: {questions.length}</Text>
      <Text style={[styles.attemptNowBtn]}>Attempt Paper</Text>
    </TouchableOpacity>
  );
};

const PaperCardsContainer = ({ papers }) => {
  const navigation = useNavigation();
  const [state] = React.useContext(AuthContext);

  const [showAlertTest, setShowAlertTest] = useState(false);
  const [questionData, setQuestionData] = useState([]);
  const [alertMessageTest, setAlertMessageTest] = useState("");
  const [qpYear, setQpYear] = useState("");

  const handleAttempt = (questions, QPYear) => {
    // console.log("Attempt Questions:", questions);
    setShowAlertTest(true);
    setAlertMessageTest("Quick Tips: There are no Tips. Best of luck!");
    setQuestionData(questions);
    // console.log("=========>" + QPYear);
    setQpYear(QPYear);
  };

  const handleOnInstructions = () => {
    if (questionData && questionData.length > 0) {
      navigation.navigate("InstructionPage", {
        questionData,
        testId: "MAPYQ" + qpYear,
      });
    } else {
      Alert.alert("No Questions", "No questions are available.");
    }
  };

  const [planStatus, setPlanStatus] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [attemptsRemaining, setattemptsRemaining] = useState(0);
  const [maxTestAllowedCount, setmaxTestAllowedCount] = useState(5);

  // Function to check subscription through app
  const checkSubscription = async () => {
    try {
      const userId = state.user._id; // Replace with the actual user ID
      const response = await axios.get(
        `/subscription/check-subscription/${userId}`
      );

      if (response.data.isSubscriptionActive) {
        // console.log("User has a valid plan");
        setPlanStatus(true);
        return true; // Return true if the subscription is active
      } else {
        // alert("User doesn't have any plan");
        setattemptsRemaining(response.data.testsTaken);
        setmaxTestAllowedCount(response.data.maxTestsAllowed);
        setPlanStatus(false);
        setModalVisible(true);
        return false; // Return false if the subscription is not active
      }
    } catch (error) {
      console.error("Error checking subscription:", error);
      return false; // Handle error case and return false
    }
  };

  const handleOnSkipIntructions = async () => {
    const isActive = await checkSubscription(); // Get subscription status

    // console.log("planStatus", isActive); // Use isActive instead of planStatus

    if (!isActive) {
      return;
    }

    if (questionData && questionData.length > 0) {
      navigation.navigate("TestPage", {
        questionData,
        testId: "MAPYQ" + qpYear,
      });
    } else {
      Alert.alert("No Questions", "No questions are available.");
    }
  };

  // const attemptsRemaining = 1; // Replace with dynamic value from backend

  // const handleProceed = async () => {
  //   try {
  //     // Make API call to update testsCompleted count
  //     await axios.post("/user/update-tests-completed");
  //     // Navigate to TestPage
  //     navigation.navigate("TestPage");
  //   } catch (error) {
  //     console.error("Failed to update tests:", error);
  //   } finally {
  //     setModalVisible(false);
  //   }
  // };

  const [maxTestLimitReached, setmaxTestLimitReached] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const [alertVisibleWithCounter, setAlertVisibleWithCounter] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  const handleProceed = async () => {
    try {
      const userId = state.user._id; // Assuming user ID is in the state or context

      // Make PUT request to update testsTaken count
      const response = await axios.put(
        "/subscription/update-tests-completed-after-expiry-of-plan",
        {
          userId,
        }
      );

      if (questionData && questionData.length > 0) {
        navigation.navigate("TestPage", {
          questionData,
          testId: "MAPYQ" + qpYear,
        });
      } else {
        Alert.alert("No Questions", "No questions are available.");
      }
    } catch (error) {
      console.error("Failed to update tests:", error);

      // Handle maxTestsAllowed error message
      if (error.response && error.response.status === 400) {
        // Alert.alert("Limit Reached", error.response.data.message);

        setAlertMessage(error.response.data.message);
        setIsSuccess(true);
        setAlertVisibleWithCounter(true);
        setmaxTestLimitReached(true);
      } else {
        Alert.alert("Error", "Failed to update tests.");
      }
    } finally {
      setModalVisible(false); // Close the modal regardless of the outcome
    }
  };

  const onCloseAlert = () => {
    setAlertVisible(false);
    setAlertVisibleWithCounter(false);
  };

  const onRedirect = () => {
    navigation.navigate("Profile"); // Adjust the navigation target as needed
  };

  const handleCancel = () => {
    setModalVisible(false);
    navigation.navigate("Home");
  };

  return (
    <>
      {showAlertTest && (
        <ChooseExamAlertSuccess
          isVisible={showAlertTest}
          onInstructions={handleOnInstructions}
          onSkipIntructions={handleOnSkipIntructions}
          message={alertMessageTest}
          onClose={() => {
            setShowAlertTest(false);
          }}
        />
      )}
      <ScrollView>
        <View style={styles.container}>
          {papers.map((paper, index) => (
            //   console.log("===>" + JSON.stringify(paper.QPYear)),
            <PaperCard key={index} data={paper} onPress={handleAttempt} />
          ))}
        </View>
      </ScrollView>

      {!planStatus && (
        <MaxTestAllowedAlert
          visible={modalVisible}
          attemptsRemaining={attemptsRemaining}
          onProceed={handleProceed}
          onCancel={handleCancel}
          maxTestAllowedCount={maxTestAllowedCount}
        />
      )}

      {maxTestLimitReached && (
        <IosAlertWithImageWithCallBack
          visible={alertVisibleWithCounter}
          message={alertMessage}
          onClose={onCloseAlert}
          isSuccess={isSuccess}
          countdownTime={5}
          onRedirect={onRedirect}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexGrow: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 10,
    // backgroundColor: Color.primaryColor,
  },
  card: {
    width: "45%",
    marginVertical: 10,
    padding: 15,
    // backgroundColor: Color.secoundaryBtnColor,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.primaryColor,
  },
  subCatLabel: {
    color: Color.primaryColor,
    alignSelf: "flex-start",
    fontWeight: "bold",
    backgroundColor: Color.secoundaryBtnColor,
    padding: 10,
    paddingVertical: 5,
    // width: "70%",
    marginBottom: 10,
  },
  content: {
    marginVertical: 5,
  },
  attemptNowBtn: {
    color: Color.colorWhite,
    alignSelf: "center",
    fontWeight: "bold",
    backgroundColor: Color.primaryColor,
    padding: 10,
    paddingHorizontal: 20,
    marginVertical: 20,
    marginBottom: 5,
    borderRadius: 20,
  },
});

export default PaperCardsContainer;

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   Dimensions,
// } from "react-native";
// import { Color } from "../../GlobalStyles";
// import ChooseExamAlertSuccess from "../Alert/ChooseExamAlertSuccess";
// import { useNavigation } from "@react-navigation/native";
// import { AuthContext } from "../../Context/authContext";
// import axios from "axios";
// import MaxTestAllowedAlert from "../Alert/MaxTestAllowedAlert";
// import IosAlertWithImageWithCallBack from "../Alert/IosAlertWithImageWithCallBack";

// const { width } = Dimensions.get("window");

// const PaperCard = ({ data, onPress }) => {
//   const { subCatId, yearId, QPYear, subCatName, questions } = data;

//   return (
//     <TouchableOpacity
//       style={styles.card}
//       onPress={() => onPress(questions, QPYear)}
//     >
//       <Text style={styles.subCatLabel}>{subCatName}</Text>
//       <Text style={styles.content}>Year : {QPYear}</Text>
//       <Text style={styles.content}>Total Questions: {questions.length}</Text>
//       <Text style={styles.attemptNowBtn}>Attempt Paper</Text>
//     </TouchableOpacity>
//   );
// };

// const PaperCardsContainer = ({ papers }) => {
//   const navigation = useNavigation();
//   const [state] = React.useContext(AuthContext);
//   const [showAlertTest, setShowAlertTest] = useState(false);
//   const [questionData, setQuestionData] = useState([]);
//   const [alertMessageTest, setAlertMessageTest] = useState("");
//   const [qpYear, setQpYear] = useState("");

//   const handleAttempt = (questions, QPYear) => {
//     setShowAlertTest(true);
//     setAlertMessageTest("Quick Tips: There are no Tips. Best of luck!");
//     setQuestionData(questions);
//     setQpYear(QPYear);
//   };

//   const handleOnInstructions = () => {
//     if (questionData && questionData.length > 0) {
//       navigation.navigate("InstructionPage", {
//         questionData,
//         testId: "MAPYQ" + qpYear,
//       });
//     } else {
//       Alert.alert("No Questions", "No questions are available.");
//     }
//   };

//   const handleOnSkipIntructions = async () => {
//     const isActive = await checkSubscription();
//     if (!isActive) {
//       return;
//     }

//     if (questionData && questionData.length > 0) {
//       navigation.navigate("TestPage", {
//         questionData,
//         testId: "MAPYQ" + qpYear,
//       });
//     } else {
//       Alert.alert("No Questions", "No questions are available.");
//     }
//   };

//   const checkSubscription = async () => {
//     try {
//       const userId = state.user._id;
//       const response = await axios.get(
//         `/subscription/check-subscription/${userId}`
//       );

//       if (response.data.isSubscriptionActive) {
//         return true;
//       } else {
//         setattemptsRemaining(response.data.testsTaken);
//         setmaxTestAllowedCount(response.data.maxTestsAllowed);
//         setPlanStatus(false);
//         setModalVisible(true);
//         return false;
//       }
//     } catch (error) {
//       console.error("Error checking subscription:", error);
//       return false;
//     }
//   };

//   return (
//     <>
//       {showAlertTest && (
//         <ChooseExamAlertSuccess
//           isVisible={showAlertTest}
//           onInstructions={handleOnInstructions}
//           onSkipIntructions={handleOnSkipIntructions}
//           message={alertMessageTest}
//           onClose={() => setShowAlertTest(false)}
//         />
//       )}
//       <ScrollView>
//         <View style={styles.container}>
//           {papers.map((paper, index) => (
//             <PaperCard key={index} data={paper} onPress={handleAttempt} />
//           ))}
//         </View>
//       </ScrollView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     padding: 10,
//   },
//   card: {
//     width: "47%",
//     marginBottom: 10,
//     padding: 15,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: Color.primaryColor,
//   },
//   subCatLabel: {
//     color: Color.primaryColor,
//     fontWeight: "bold",
//     backgroundColor: Color.secoundaryBtnColor,
//     padding: 8,
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   content: {
//     marginVertical: 5,
//   },
//   attemptNowBtn: {
//     color: Color.colorWhite,
//     alignSelf: "center",
//     fontWeight: "bold",
//     backgroundColor: Color.primaryColor,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 20,
//     marginTop: 15,
//   },
// });

// export default PaperCardsContainer;
