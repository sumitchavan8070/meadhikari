// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   ScrollView,
// } from "react-native";
// import { Color } from "../../GlobalStyles";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import LoadingAnimation from "../Loader/loader";

// const FeedbackForm = () => {
//   const [feedback, setFeedback] = useState("");
//   const [rating, setRating] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const icons = [
//     "alarm-light-outline",
//     "alarm-light-outline",
//     "alarm-light-outline",
//     "alarm-light-outline",
//     "alarm-light-outline",
//   ];

//   const filledIcons = [
//     "alarm-light",
//     "alarm-light",
//     "alarm-light",
//     "alarm-light",
//     "alarm-light",
//   ];

//   const handleRatingChange = (newRating) => {
//     setRating(newRating);
//     // console.log("===> Rating" + newRating);
//   };

//   const handleSubmit = async () => {
//     if (rating < 1) {
//       Alert.alert("Error", "Please rate us using the icons.");
//       return;
//     }

//     if (feedback.trim() === "") {
//       Alert.alert("Error", "Please enter your feedback.");
//     } else {
//       setLoading(true);
//       const data = await AsyncStorage.getItem("@auth");
//       let loginData = JSON.parse(data);
//       let userid = loginData.user._id;
//       await axios
//         .post("/feedback/create", {
//           feedback,
//           rating,
//           userid,
//         })
//         .then((response) => {
//           setLoading(false);

//           Alert.alert("Success", "Thank you for your feedback!");
//           setFeedback(""); // Clear feedback input after submission
//           setRating(0);
//         })
//         .catch((error) => {
//           setLoading(false);

//           Alert.alert(
//             "Error",
//             "Failed to submit feedback. Please try again later."
//           );
//         });
//     }
//   };

//   const handleFeedbackChange = (text) => {
//     setFeedback(text);
//   };

//   return (
//     <>
//       {loading && <LoadingAnimation visible={loading} loop={true} />}

//       <ScrollView style={styles.container}>
//         <Text style={styles.heading}>Feedback Form</Text>
//         <View style={styles.ratingContainer}>
//           <Text style={styles.ratingText}>Rate Us:</Text>

//           {icons.map((icon, index) => (
//             <TouchableOpacity
//               key={index}
//               style={[
//                 styles.ratingButton,
//                 index < rating && styles.selectedRating,
//               ]}
//               onPress={() => handleRatingChange(index + 1)}
//             >
//               {index < rating ? (
//                 <MaterialCommunityIcons
//                   name={filledIcons[index]}
//                   size={30}
//                   color={Color.extraRed}
//                 />
//               ) : (
//                 //unselcted
//                 <MaterialCommunityIcons
//                   name={icon}
//                   size={30}
//                   color={Color.primaryColor}
//                 />
//               )}
//             </TouchableOpacity>
//           ))}
//         </View>
//         <TextInput
//           style={styles.input}
//           multiline
//           placeholder="Write your feedback here..."
//           value={feedback}
//           onChangeText={(text) => setFeedback(text)}
//         />
//         <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//           <Text style={styles.buttonText}>Submit Feedback</Text>
//         </TouchableOpacity>
//         <Text style={styles.instructions}>Instructions:</Text>
//         <Text style={styles.point}>1. Requesting Question Papers:</Text>
//         <Text style={styles.bullet}>
//           - Students can request any question paper they need by filling out
//           this form.
//         </Text>
//         <Text style={styles.bullet}>
//           - Please specify the category, subcategory, and year of the question
//           paper you require.
//         </Text>
//         <Text style={styles.point}>2. Asking Questions:</Text>
//         <Text style={styles.bullet}>
//           - Feel free to ask any questions or seek clarification on any topic
//           related to our services or products.
//         </Text>
//         <Text style={styles.point}>
//           3. Providing Suggestions for Improvement:
//         </Text>
//         <Text style={styles.bullet}>
//           - Your feedback is valuable! If you have any suggestions for how we
//           can improve our services or features, please let us know.
//         </Text>
//         <Text style={styles.encourageText}>
//           We highly encourage you to share your feedback with us. Your input
//           helps us enhance our offerings and provide a better experience for
//           you.
//         </Text>
//       </ScrollView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   ratingContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//     alignSelf: "center",
//   },
//   ratingText: {
//     marginRight: 10,
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   ratingButton: {
//     marginRight: 10,
//   },
//   selectedRating: {
//     color: Color.primaryColor,
//   },
//   selectedRatingText: {
//     color: Color.colorWhite,
//   },
//   ratingButtonText: {
//     color: Color.primaryColor,
//     fontWeight: "bold",
//   },
//   encouragement: {
//     marginTop: 20,
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   encourageText: {
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   instructions: {
//     marginBottom: 10,
//     marginTop: 20,
//     color: Color.primaryColor,
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   point: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginTop: 10,
//   },
//   bullet: {
//     marginLeft: 10,
//     marginBottom: 5,
//   },
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: Color.colorWhite,
//   },
//   heading: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 20,
//     color: Color.primaryColor,
//     textAlign: "center",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: Color.primaryColor,
//     borderRadius: 15,
//     padding: 10,
//     marginBottom: 20,
//     minHeight: 150,
//   },
//   button: {
//     backgroundColor: Color.primaryColor,
//     padding: 10,
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: Color.colorWhite,
//     fontWeight: "bold",
//   },
// });

// export default FeedbackForm;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import LoadingAnimation from "../Loader/loader";
import HeaderMenu from "../Menus/HeaderMenu";
import MessageAlert from "../Alert/MessageAlert";
import { Color } from "../../GlobalStyles";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const [messageAlertVisible, setMessageAlertVisible] = useState(false);
  const [messageAlertText, setMessageAlertText] = useState("");
  const [messageAlertTitle, setMessageAlertTitle] = useState("");

  const icons = [
    "emoticon-sad-outline",
    "emoticon-neutral-outline",
    "emoticon-happy-outline",
    "emoticon-excited-outline",
    "emoticon-kiss-outline",
  ];

  const filledIcons = [
    "emoticon-sad",
    "emoticon-neutral",
    "emoticon-happy",
    "emoticon-excited",
    "emoticon-kiss",
  ];

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async () => {
    if (rating < 1) {
      // Alert.alert("Error", "Please rate us by selecting a mood.");
      setMessageAlertVisible(true);
      setMessageAlertText("Please rate us by selecting a mood.");
      return;
    }

    if (feedback.trim() === "") {
      // Alert.alert("Error", "Please enter your feedback.");
      setMessageAlertVisible(true);
      setMessageAlertText("Please enter your feedback.");
    } else {
      setLoading(true);
      const data = await AsyncStorage.getItem("@auth");
      let loginData = JSON.parse(data);
      let userid = loginData.user._id;
      await axios
        .post("/feedback/create", {
          feedback,
          rating,
          userid,
        })
        .then((response) => {
          setLoading(false);
          // Alert.alert("Success", "Thank you for your feedback!");
          setMessageAlertVisible(true);
          setMessageAlertText("Thank you for your feedback!");
          setFeedback(""); // Clear feedback input after submission
          setRating(0);
        })
        .catch((error) => {
          setLoading(false);
          // Alert.alert("Error", "Failed to submit feedback. Please try again.");
          setMessageAlertVisible(true);
          setMessageAlertText("Failed to submit feedback. Please try again.");
        });
    }
  };

  const onMessageAlertClose = () => {
    setMessageAlertVisible(false);
  };

  return (
    <>
      {loading && <LoadingAnimation visible={loading} loop={true} />}
      <HeaderMenu></HeaderMenu>
      <LinearGradient
        // colors={["#FFFFFF", "#E3FDF5", "#FFAAAA"]}
        colors={["#ffffff", "#ffffff"]}
        style={styles.container}
      >
        {messageAlertVisible && (
          <MessageAlert
            message={messageAlertText}
            onClose={onMessageAlertClose}
          />
        )}
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.heading}>We Value Your Feedback!</Text>

          <Text style={styles.subheading}>How did we do?</Text>
          <View style={styles.ratingContainer}>
            {icons.map((icon, index) => (
              <TouchableOpacity
                key={index}
                style={styles.ratingButton}
                onPress={() => handleRatingChange(index + 1)}
              >
                {index < rating ? (
                  <MaterialCommunityIcons
                    name={filledIcons[index]}
                    size={50}
                    // color="#FF7272"
                    color={Color.primaryColor}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name={icon}
                    size={50}
                    color="#AAAAAA"
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={styles.input}
            multiline
            placeholder="Share your thoughts with us..."
            placeholderTextColor="#888"
            value={feedback}
            onChangeText={(text) => setFeedback(text)}
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <LinearGradient
              // colors={["#FF7272", "#FFAAAA"]}
              colors={["#4e54c8", "#8f94fb"]}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Submit Feedback</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.instructions}>Here’s How You Can Help Us:</Text>

          <View style={styles.instructionSection}>
            <Text style={styles.point}>1. Request Question Papers:</Text>
            <Text style={styles.bullet}>
              - If you need specific papers, let us know!
            </Text>
            <Text style={styles.bullet}>
              - Be sure to specify the category, year, and more.
            </Text>
          </View>

          <View style={styles.instructionSection}>
            <Text style={styles.point}>2. Ask Questions:</Text>
            <Text style={styles.bullet}>
              - We’re here to answer any queries you have.
            </Text>
          </View>

          <View style={styles.instructionSection}>
            <Text style={styles.point}>3. Share Suggestions:</Text>
            <Text style={styles.bullet}>
              - We’d love to hear how we can improve!
            </Text>
          </View>

          <Text style={styles.encourageText}>
            Your feedback helps us improve and serve you better!
          </Text>
        </ScrollView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 5,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    // color: "#FF7272",
    color: Color.primaryColor,
    textAlign: "center",
    marginVertical: 20,
  },
  subheading: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  ratingButton: {
    marginHorizontal: 10,
  },
  input: {
    borderWidth: 1,
    // borderColor: "#FF7272",
    borderColor: Color.primaryColor,
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#FFF",
    marginBottom: 20,
    minHeight: 150,
  },
  button: {
    marginBottom: 20,
  },
  buttonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  instructions: {
    fontSize: 16,
    fontWeight: "bold",
    // color: "#FF7272",
    color: Color.primaryColor,
    marginBottom: 10,
  },
  instructionSection: {
    marginBottom: 20,
  },
  point: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  bullet: {
    fontSize: 14,
    color: "#666",
    marginLeft: 15,
    marginBottom: 5,
  },
  encourageText: {
    fontSize: 16,
    // color: "#FF7272",
    color: Color.primaryColor,
    textAlign: "center",
    // marginTop: 30,
    marginBottom: 50,
  },
});

export default FeedbackForm;
