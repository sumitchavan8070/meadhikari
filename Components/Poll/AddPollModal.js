// // // import axios from "axios";
// // // import React, { useState } from "react";
// // // import {
// // //   View,
// // //   StyleSheet,
// // //   Text,
// // //   TextInput,
// // //   TouchableOpacity,
// // //   Keyboard,
// // // } from "react-native";
// // // import AsyncStorage from "@react-native-async-storage/async-storage";
// // // import { FontAwesome5 } from "@expo/vector-icons"; // Import FontAwesome5 for check mark icon
// // // import { Color } from "../../GlobalStyles";
// // // import PostAlert from "../Alert/PostAlert";
// // // import LoadingAnimation from "../Loader/loader";

// // // const AddPollModal = ({ visible, onClose, onAddPoll }) => {
// // //   const [question, setQuestion] = useState("");
// // //   const [options, setOptions] = useState(Array(4).fill(""));
// // //   const [selectedOption, setSelectedOption] = useState(null); // State to track the selected option

// // //   const [showAlert, setShowAlert] = useState(false); // State to control alert visibility
// // //   const [alertMessage, setAlertMessage] = useState("");
// // //   const [loading, setLoading] = useState(false);

// // //   const handleAddPollConfirm = async () => {
// // //     setLoading(true); // Start loading animation

// // //     try {
// // //       Keyboard.dismiss();

// // //       if (!question.trim()) {
// // //         alert("Please enter the question.");
// // //         return;
// // //       }

// // //       if (!options.every((option) => option !== "")) {
// // //         alert("Please fill all options.");
// // //         return;
// // //       }

// // //       if (!selectedOption) {
// // //         alert("Please Select the Checkbox to Set Answser.");
// // //         return;
// // //       }

// // //       const data = await AsyncStorage.getItem("@auth");
// // //       let loginData = JSON.parse(data);
// // //       let userId = loginData.user._id;

// // //       const response = await axios.post("/add-user-post", {
// // //         title: question,
// // //         content: "Poll content",
// // //         type: "poll",
// // //         approved: false,
// // //         postedBy: userId,
// // //         poll: {
// // //           question,
// // //           options,
// // //           answer: selectedOption, // Save the selected option as the answer
// // //           votes: {},
// // //         },
// // //       });

// // //       console.log(response.data);

// // //       // onClose();

// // //       setShowAlert(true);
// // //       setAlertMessage(
// // //         "Your poll has been submitted successfully and is awaiting review by our team. Thank you!"
// // //       );
// // //     } catch (error) {
// // //       console.error("Error adding poll:", error);
// // //       Keyboard.dismiss();
// // //       setShowAlert(true);
// // //       setAlertMessage("Appreciated Efforts.. But Please Try Again.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleOnClose = () => {
// // //     // setImage(null);
// // //     // setDescription("");
// // //     setShowAlert(false);
// // //     onClose();
// // //   };

// // //   const handleOptionSelect = (index) => {
// // //     // Update the selected option only if it's different from the currently selected one
// // //     if (selectedOption !== options[index]) {
// // //       setSelectedOption(options[index]);
// // //     } else {
// // //       setSelectedOption(null); // Deselect the option if it's already selected
// // //     }
// // //   };

// // //   return (
// // //     <View style={styles.modalContainer}>
// // //       <View style={styles.modalContent}>
// // //         {loading && <LoadingAnimation visible={loading} loop={true} />}

// // //         {showAlert && (
// // //           <PostAlert
// // //             isVisible={showAlert}
// // //             onClose={handleOnClose}
// // //             message={alertMessage}
// // //           />
// // //         )}
// // //         <View style={styles.header}>
// // //           <Text style={styles.modalTitle}>Add Poll</Text>

// // //           {selectedOption && (
// // //             <Text style={styles.selectedAnswer}>
// // //               Selected Answer: {selectedOption}
// // //             </Text>
// // //           )}
// // //           {/* Display selected answer */}
// // //         </View>

// // //         <TextInput
// // //           style={styles.input}
// // //           placeholder="Question"
// // //           value={question}
// // //           onChangeText={setQuestion}
// // //         />
// // //         {options.map((option, index) => (
// // //           <View key={index} style={styles.optionContainer}>
// // //             <FontAwesome5
// // //               name={selectedOption === option ? "check-circle" : "circle"} // Show check mark for selected option
// // //               size={20}
// // //               color={selectedOption === option ? "#6949ff" : "#ccc"} // Change color for selected option
// // //               onPress={() => handleOptionSelect(index)} // Handle option selection
// // //               style={styles.checkIcon}
// // //             />
// // //             <TextInput
// // //               style={styles.optionInput}
// // //               placeholder={`Option ${index + 1}`}
// // //               value={option}
// // //               onChangeText={(text) =>
// // //                 setOptions((prevOptions) => {
// // //                   const updatedOptions = [...prevOptions];
// // //                   updatedOptions[index] = text;
// // //                   return updatedOptions;
// // //                 })
// // //               }
// // //             />
// // //           </View>
// // //         ))}
// // //         <TouchableOpacity
// // //           style={styles.addButton}
// // //           onPress={handleAddPollConfirm}
// // //         >
// // //           <Text style={styles.addButtonText}>Add Poll</Text>
// // //         </TouchableOpacity>
// // //         <TouchableOpacity style={styles.closeButton} onPress={onClose}>
// // //           <Text style={styles.closeButtonText}>Cancel</Text>
// // //         </TouchableOpacity>
// // //       </View>
// // //     </View>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   header: {
// // //     display: "flex",
// // //     flexDirection: "row",
// // //     alignContent: "center",
// // //     justifyContent: "space-between",
// // //   },
// // //   modalContainer: {
// // //     flex: 1,
// // //     backgroundColor: "rgba(0, 0, 0, 0.5)",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     width: "100%",
// // //   },
// // //   modalContent: {
// // //     backgroundColor: "#fff",
// // //     borderRadius: 10,
// // //     padding: 20,
// // //     width: "95%",
// // //   },
// // //   modalTitle: {
// // //     fontSize: 20,
// // //     fontWeight: "bold",
// // //     marginBottom: 10,
// // //   },
// // //   input: {
// // //     borderBottomWidth: 1,
// // //     borderColor: "#ccc",
// // //     marginBottom: 10,
// // //     padding: 5,
// // //   },
// // //   optionContainer: {
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     marginBottom: 10,
// // //   },
// // //   checkIcon: {
// // //     marginRight: 10,
// // //   },
// // //   optionInput: {
// // //     borderBottomWidth: 1,
// // //     borderColor: "#ccc",
// // //     flex: 1,
// // //     padding: 5,
// // //   },
// // //   addButton: {
// // //     backgroundColor: "#6949ff",
// // //     paddingVertical: 10,
// // //     borderRadius: 5,
// // //     alignItems: "center",
// // //     marginTop: 10,
// // //   },
// // //   addButtonText: {
// // //     color: "#fff",
// // //     fontWeight: "bold",
// // //   },
// // //   closeButton: {
// // //     paddingVertical: 10,
// // //     alignItems: "center",
// // //     marginTop: 10,
// // //   },
// // //   closeButtonText: {
// // //     color: "#555",
// // //     fontWeight: "bold",
// // //   },
// // //   selectedAnswer: {
// // //     fontWeight: "bold",
// // //     color: Color.green,

// // //     alignSelf: "center",
// // //   },
// // // });

// // // export default AddPollModal;

// // // import axios from "axios";
// // // import React, { useState } from "react";
// // // import {
// // //   View,
// // //   StyleSheet,
// // //   Text,
// // //   TextInput,
// // //   TouchableOpacity,
// // //   Keyboard,
// // // } from "react-native";
// // // import AsyncStorage from "@react-native-async-storage/async-storage";
// // // import { FontAwesome5 } from "@expo/vector-icons";
// // // import { Color } from "../../GlobalStyles";
// // // import PostAlert from "../Alert/PostAlert";
// // // import LoadingAnimation from "../Loader/loader";

// // // const AddPollModal = ({ visible, onClose, onAddPoll }) => {
// // //   const [question, setQuestion] = useState("");
// // //   const [options, setOptions] = useState(Array(4).fill(""));
// // //   const [selectedOption, setSelectedOption] = useState(null);

// // //   const [showAlert, setShowAlert] = useState(false);
// // //   const [alertMessage, setAlertMessage] = useState("");
// // //   const [loading, setLoading] = useState(false);

// // //   const handleAddPollConfirm = async () => {
// // //     setLoading(true);

// // //     try {
// // //       Keyboard.dismiss();

// // //       if (!question.trim()) {
// // //         alert("Please enter the question.");
// // //         return;
// // //       }

// // //       if (!options.every((option) => option !== "")) {
// // //         alert("Please fill all options.");
// // //         return;
// // //       }

// // //       if (!selectedOption) {
// // //         alert("Please select the checkbox to set an answer.");
// // //         return;
// // //       }

// // //       const data = await AsyncStorage.getItem("@auth");
// // //       let loginData = JSON.parse(data);
// // //       let userId = loginData.user._id;

// // //       const response = await axios.post("/add-user-post", {
// // //         title: question,
// // //         content: "Poll content",
// // //         type: "poll",
// // //         approved: false,
// // //         postedBy: userId,
// // //         poll: {
// // //           question,
// // //           options,
// // //           answer: selectedOption,
// // //           votes: {},
// // //         },
// // //       });

// // //       console.log(response.data);

// // //       setShowAlert(true);
// // //       setAlertMessage(
// // //         "Your poll has been submitted successfully and is awaiting review by our team. Thank you!"
// // //       );
// // //     } catch (error) {
// // //       console.error("Error adding poll:", error);
// // //       Keyboard.dismiss();
// // //       setShowAlert(true);
// // //       setAlertMessage("Appreciated efforts.. But please try again.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleOnClose = () => {
// // //     setShowAlert(false);
// // //     onClose();
// // //   };

// // //   const handleOptionSelect = (index) => {
// // //     if (selectedOption !== options[index]) {
// // //       setSelectedOption(options[index]);
// // //     } else {
// // //       setSelectedOption(null);
// // //     }
// // //   };

// // //   return (
// // //     <View style={styles.modalContainer}>
// // //       <View style={styles.modalContent}>
// // //         {loading && <LoadingAnimation visible={loading} loop={true} />}

// // //         {showAlert && (
// // //           <PostAlert
// // //             isVisible={showAlert}
// // //             onClose={handleOnClose}
// // //             message={alertMessage}
// // //           />
// // //         )}
// // //         <View style={styles.header}>
// // //           <Text style={styles.modalTitle}>Add Poll</Text>

// // //           {selectedOption && (
// // //             <Text style={styles.selectedAnswer}>
// // //               Selected Answer: {selectedOption}
// // //             </Text>
// // //           )}
// // //         </View>

// // //         <TextInput
// // //           style={styles.input}
// // //           placeholder="Question"
// // //           value={question}
// // //           onChangeText={setQuestion}
// // //         />
// // //         {options.map((option, index) => (
// // //           <View key={index} style={styles.optionContainer}>
// // //             <TouchableOpacity onPress={() => handleOptionSelect(index)}>
// // //               <FontAwesome5
// // //                 name={selectedOption === option ? "check-circle" : "circle"}
// // //                 size={24}
// // //                 color={selectedOption === option ? "#6200ee" : "#ccc"}
// // //               />
// // //             </TouchableOpacity>
// // //             <TextInput
// // //               style={styles.optionInput}
// // //               placeholder={`Option ${index + 1}`}
// // //               value={option}
// // //               onChangeText={(text) =>
// // //                 setOptions((prevOptions) => {
// // //                   const updatedOptions = [...prevOptions];
// // //                   updatedOptions[index] = text;
// // //                   return updatedOptions;
// // //                 })
// // //               }
// // //             />
// // //           </View>
// // //         ))}
// // //         <TouchableOpacity
// // //           style={styles.addButton}
// // //           onPress={handleAddPollConfirm}
// // //         >
// // //           <Text style={styles.addButtonText}>Add Poll</Text>
// // //         </TouchableOpacity>
// // //         <TouchableOpacity style={styles.closeButton} onPress={onClose}>
// // //           <Text style={styles.closeButtonText}>Cancel</Text>
// // //         </TouchableOpacity>
// // //       </View>
// // //     </View>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   modalContainer: {
// // //     flex: 1,
// // //     backgroundColor: "rgba(0, 0, 0, 0.3)",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     width: "100%",
// // //   },
// // //   modalContent: {
// // //     backgroundColor: "#fff",
// // //     borderRadius: 8,
// // //     padding: 20,
// // //     width: "90%",
// // //     elevation: 5, // Shadow effect
// // //   },
// // //   header: {
// // //     marginBottom: 15,
// // //   },
// // //   modalTitle: {
// // //     fontSize: 22,
// // //     fontWeight: "bold",
// // //     marginBottom: 10,
// // //     color: "#333",
// // //   },
// // //   input: {
// // //     borderBottomWidth: 1,
// // //     borderColor: "#ddd",
// // //     marginBottom: 10,
// // //     padding: 8,
// // //     fontSize: 16,
// // //     color: "#333",
// // //   },
// // //   optionContainer: {
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     marginBottom: 10,
// // //   },
// // //   optionInput: {
// // //     borderBottomWidth: 1,
// // //     borderColor: "#ddd",
// // //     flex: 1,
// // //     padding: 8,
// // //     fontSize: 16,
// // //     color: "#333",
// // //   },
// // //   addButton: {
// // //     backgroundColor: "#6200ee",
// // //     paddingVertical: 12,
// // //     borderRadius: 5,
// // //     alignItems: "center",
// // //     marginTop: 15,
// // //     elevation: 3, // Shadow effect
// // //   },
// // //   addButtonText: {
// // //     color: "#fff",
// // //     fontWeight: "600",
// // //     fontSize: 16,
// // //   },
// // //   closeButton: {
// // //     paddingVertical: 12,
// // //     alignItems: "center",
// // //     marginTop: 10,
// // //   },
// // //   closeButtonText: {
// // //     color: "#555",
// // //     fontWeight: "600",
// // //     fontSize: 16,
// // //   },
// // //   selectedAnswer: {
// // //     fontWeight: "500",
// // //     color: "#6200ee",
// // //     fontSize: 16,
// // //     textAlign: "center",
// // //     marginBottom: 10,
// // //   },
// // // });

// // // export default AddPollModal;

// // import axios from "axios";
// // import React, { useState } from "react";
// // import {
// //   View,
// //   StyleSheet,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   Keyboard,
// //   ImageBackground,
// //   Platform,
// // } from "react-native";
// // import AsyncStorage from "@react-native-async-storage/async-storage";
// // import { FontAwesome5 } from "@expo/vector-icons";
// // import { LinearGradient } from "expo-linear-gradient";
// // import PostAlert from "../Alert/PostAlert";
// // import LoadingAnimation from "../Loader/loader";

// // const AddPollModal = ({ visible, onClose, onAddPoll }) => {
// //   const [question, setQuestion] = useState("");
// //   const [options, setOptions] = useState(Array(4).fill(""));
// //   const [selectedOption, setSelectedOption] = useState(null);

// //   const [showAlert, setShowAlert] = useState(false);
// //   const [alertMessage, setAlertMessage] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const handleAddPollConfirm = async () => {
// //     setLoading(true);

// //     try {
// //       Keyboard.dismiss();

// //       if (!question.trim()) {
// //         alert("Please enter the question.");
// //         return;
// //       }

// //       if (!options.every((option) => option !== "")) {
// //         alert("Please fill all options.");
// //         return;
// //       }

// //       if (!selectedOption) {
// //         alert("Please select an option as the answer.");
// //         return;
// //       }

// //       const data = await AsyncStorage.getItem("@auth");
// //       let loginData = JSON.parse(data);
// //       let userId = loginData.user._id;

// //       const response = await axios.post("/add-user-post", {
// //         title: question,
// //         content: "Poll content",
// //         type: "poll",
// //         approved: false,
// //         postedBy: userId,
// //         poll: {
// //           question,
// //           options,
// //           answer: selectedOption,
// //           votes: {},
// //         },
// //       });

// //       console.log(response.data);

// //       setShowAlert(true);
// //       setAlertMessage(
// //         "Your poll has been submitted successfully and is awaiting review by our team. Thank you!"
// //       );
// //     } catch (error) {
// //       console.error("Error adding poll:", error);
// //       Keyboard.dismiss();
// //       setShowAlert(true);
// //       setAlertMessage("Appreciated efforts.. But please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleOnClose = () => {
// //     setShowAlert(false);
// //     onClose();
// //   };

// //   const handleOptionSelect = (index) => {
// //     if (selectedOption !== options[index]) {
// //       setSelectedOption(options[index]);
// //     } else {
// //       setSelectedOption(null);
// //     }
// //   };

// //   return (
// //     <View style={styles.modalContainer}>
// //       <ImageBackground
// //         source={{ uri: "https://example.com/background-image.jpg" }} // Replace with your image URL
// //         style={styles.background}
// //       >
// //         <View style={styles.modalContent}>
// //           {loading && <LoadingAnimation visible={loading} loop={true} />}

// //           {showAlert && (
// //             <PostAlert
// //               isVisible={showAlert}
// //               onClose={handleOnClose}
// //               message={alertMessage}
// //             />
// //           )}

// //           <View style={styles.header}>
// //             <Text style={styles.modalTitle}>🗳️ Add Poll</Text>

// //             {selectedOption && (
// //               <Text style={styles.selectedAnswer}>
// //                 ✅ Selected Answer: {selectedOption}
// //               </Text>
// //             )}
// //           </View>

// //           <TextInput
// //             style={styles.input}
// //             placeholder="Enter your question"
// //             placeholderTextColor="#aaa"
// //             value={question}
// //             onChangeText={setQuestion}
// //           />
// //           {options.map((option, index) => (
// //             <View key={index} style={styles.optionContainer}>
// //               <TouchableOpacity onPress={() => handleOptionSelect(index)}>
// //                 <FontAwesome5
// //                   name={selectedOption === option ? "check-circle" : "circle"}
// //                   size={24}
// //                   color={selectedOption === option ? "#4CAF50" : "#bbb"}
// //                 />
// //               </TouchableOpacity>
// //               <TextInput
// //                 style={styles.optionInput}
// //                 placeholder={`Option ${index + 1}`}
// //                 placeholderTextColor="#aaa"
// //                 value={option}
// //                 onChangeText={(text) =>
// //                   setOptions((prevOptions) => {
// //                     const updatedOptions = [...prevOptions];
// //                     updatedOptions[index] = text;
// //                     return updatedOptions;
// //                   })
// //                 }
// //               />
// //             </View>
// //           ))}

// //           <LinearGradient
// //             colors={["#6200ee", "#3700b3"]}
// //             style={styles.addButton}
// //             start={[0, 0]}
// //             end={[1, 1]}
// //           >
// //             <TouchableOpacity onPress={handleAddPollConfirm}>
// //               <Text style={styles.addButtonText}>Add Poll</Text>
// //             </TouchableOpacity>
// //           </LinearGradient>

// //           <TouchableOpacity style={styles.closeButton} onPress={onClose}>
// //             <Text style={styles.closeButtonText}>❌ Cancel</Text>
// //           </TouchableOpacity>
// //         </View>
// //       </ImageBackground>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   modalContainer: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     width: "100%",
// //   },
// //   background: {
// //     width: "100%",
// //     height: "100%",
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   modalContent: {
// //     backgroundColor: "#fff",
// //     borderRadius: 20,
// //     padding: 25,
// //     width: "90%",
// //     maxWidth: 500,
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 10 },
// //     shadowOpacity: 0.3,
// //     shadowRadius: 15,
// //     elevation: 5, // Shadow effect for Android
// //   },
// //   header: {
// //     marginBottom: 20,
// //     alignItems: "center",
// //   },
// //   modalTitle: {
// //     fontSize: 26,
// //     fontWeight: "bold",
// //     color: "#333",
// //   },
// //   input: {
// //     borderBottomWidth: 1,
// //     borderColor: "#ddd",
// //     marginBottom: 15,
// //     padding: 10,
// //     fontSize: 16,
// //     color: "#333",
// //     // backgroundColor: "#f9f9f9",
// //     borderRadius: 5,
// //   },
// //   optionContainer: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     marginBottom: 15,
// //   },
// //   optionInput: {
// //     borderBottomWidth: 1,
// //     borderColor: "#ddd",
// //     flex: 1,
// //     padding: 10,
// //     fontSize: 16,
// //     color: "#333",
// //     // backgroundColor: "#f9f9f9",
// //     borderRadius: 5,
// //   },
// //   addButton: {
// //     paddingVertical: 12,
// //     borderRadius: 30,
// //     alignItems: "center",
// //     marginTop: 20,
// //     elevation: 5, // Shadow effect for Android
// //   },
// //   addButtonText: {
// //     color: "#fff",
// //     fontWeight: "700",
// //     fontSize: 18,
// //   },
// //   closeButton: {
// //     paddingVertical: 12,
// //     alignItems: "center",
// //     marginTop: 15,
// //     backgroundColor: "#f5f5f5",
// //     borderRadius: 30,
// //   },
// //   closeButtonText: {
// //     color: "#555",
// //     fontWeight: "600",
// //     fontSize: 16,
// //   },
// //   selectedAnswer: {
// //     fontWeight: "500",
// //     color: "#4CAF50",
// //     fontSize: 16,
// //     marginBottom: 15,
// //   },
// // });

// // export default AddPollModal;

import axios from "axios";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
  ImageBackground,
  Animated,
  Easing,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import LoadingAnimation from "../Loader/loader";
import PostAlert from "../Alert/PostAlert";
import MessageAlert from "../Alert/MessageAlert";

const AddPollModal = ({ visible, onClose, onAddPoll }) => {
  const [question, setQuestion] = useState("");
  // const [options, setOptions] = useState(Array(4).fill(""));
  const [options, setOptions] = useState(["", "", "", ""]); // Initialize with empty strings

  const [selectedOption, setSelectedOption] = useState(null);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [messageAlertVisible, setMessageAlertVisible] = useState(false);
  const [messageAlertText, setMessageAlertText] = useState("");
  const [messageAlertTitle, setMessageAlertTitle] = useState("");

  // Animation for modal appearance
  const animation = useState(new Animated.Value(0))[0];

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [animation]);

  const validateInputs = () => {
    if (!question.trim()) {
      // Alert.alert("Validation Error", "Please enter a valid question.");
      setMessageAlertVisible(true);
      setMessageAlertText("Please enter a valid question.");
      return false;
    }

    if (question.length < 5) {
      // Alert.alert(
      //   "Validation Error",
      //   "Question should be at least 5 characters long."
      // );
      setMessageAlertVisible(true);
      setMessageAlertText("Question should be at least 5 characters long.");
      return false;
    }

    if (!options.every((option) => option.trim() !== "")) {
      // Alert.alert("Validation Error", "Please fill all options.");
      setMessageAlertVisible(true);
      setMessageAlertText("Please fill all options.");
      return false;
    }

    if (new Set(options).size !== options.length) {
      // Alert.alert("Validation Error", "Options should be unique.");
      setMessageAlertVisible(true);
      setMessageAlertText("Options should be unique.");
      return false;
    }

    if (!selectedOption) {
      // Alert.alert("Validation Error", "Please select an option as the answer.");
      setMessageAlertVisible(true);
      setMessageAlertText("Please select answer.");
      return false;
    }

    return true;
  };

  const handleAddPollConfirm = async () => {
    setLoading(true);

    if (!validateInputs()) {
      setLoading(false);
      return;
    }

    try {
      Keyboard.dismiss();

      const data = await AsyncStorage.getItem("@auth");
      let loginData = JSON.parse(data);
      let userId = loginData.user._id;

      const response = await axios.post("/add-user-post", {
        title: question,
        content: "Poll content",
        type: "poll",
        approved: false,
        postedBy: userId,
        poll: {
          question,
          options,
          answer: selectedOption,
          votes: {},
        },
      });

      console.log(response.data);

      setShowAlert(true);
      setAlertMessage(
        "Your poll has been submitted successfully and is awaiting review by our team. Thank you!"
      );
      // Optionally, you can reset the form or handle additional actions here
    } catch (error) {
      console.error("Error adding poll:", error);
      Keyboard.dismiss();
      setShowAlert(true);
      setAlertMessage("Appreciated efforts.. But please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOnClose = () => {
    onClose();
  };

  const handleOptionSelect = (index) => {
    if (selectedOption !== options[index]) {
      setSelectedOption(options[index]);
    } else {
      setSelectedOption(null);
    }
  };

  const animatedStyle = {
    opacity: animation,
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.9, 1],
        }),
      },
    ],
  };

  const onMessageAlertClose = () => {
    setMessageAlertVisible(false);
  };

  return (
    <View style={styles.modalContainer}>
      <ImageBackground
        source={{ uri: "https://example.com/background-image.jpg" }} // Replace with your image URL
        style={styles.background}
      >
        <Animated.View style={[styles.modalContent, animatedStyle]}>
          {loading && <LoadingAnimation visible={loading} loop={true} />}

          {showAlert && (
            <PostAlert
              isVisible={showAlert}
              onClose={handleOnClose}
              message={alertMessage}
            />
          )}

          {messageAlertVisible && (
            <MessageAlert
              message={messageAlertText}
              onClose={onMessageAlertClose}
            />
          )}

          <View style={styles.header}>
            <Text style={styles.modalTitle}>📢 Add Poll 🗳️</Text>

            {/* {selectedOption && (
              <Text style={styles.selectedAnswer}>
                🎉 Selected Answer: {selectedOption}
              </Text>
            )} */}
          </View>

          <TextInput
            style={styles.input}
            placeholder="Enter your question"
            placeholderTextColor="#aaa"
            value={question}
            onChangeText={setQuestion}
          />
          {options.map((option, index) => (
            <View key={index} style={styles.optionContainer}>
              <TouchableOpacity onPress={() => handleOptionSelect(index)}>
                <FontAwesome5
                  name={selectedOption === option ? "check-circle" : "circle"}
                  size={24}
                  color={selectedOption === option ? "#4CAF50" : "#bbb"}
                />
              </TouchableOpacity>
              <TextInput
                style={styles.optionInput}
                placeholder={`Option ${index + 1}`}
                placeholderTextColor="#aaa"
                value={option}
                onChangeText={(text) =>
                  setOptions((prevOptions) => {
                    const updatedOptions = [...prevOptions];
                    updatedOptions[index] = text;
                    return updatedOptions;
                  })
                }
              />
            </View>
          ))}

          {selectedOption && (
            <Text style={styles.selectedAnswer}>
              🎉 Selected Answer: {selectedOption}
            </Text>
          )}

          <LinearGradient
            // colors={["#6200ee", "#3700b3"]}
            colors={["#ff9900", "#ff3300"]}
            style={styles.addButton}
            start={[0, 0]}
            end={[1, 1]}
          >
            <TouchableOpacity onPress={handleAddPollConfirm}>
              <Text style={styles.addButtonText}>Add Poll</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={["#f5f5f5", "#e0e0e0"]}
            style={styles.closeButton}
            start={[0, 0]}
            end={[1, 1]}
          >
            <TouchableOpacity onPress={handleOnClose}>
              <Text style={styles.closeButtonText}>❌ Cancel</Text>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  background: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    width: "90%",
    maxWidth: 500,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10, // Shadow effect for Android
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textShadowColor: "#ddd",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
    padding: 12,
    fontSize: 16,
    color: "#333",
    // backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  optionInput: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: "#333",
    // backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  addButton: {
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
    elevation: 5, // Shadow effect for Android
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    textTransform: "uppercase",
  },
  closeButton: {
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 15,
    borderRadius: 30,
  },
  closeButtonText: {
    color: "#555",
    fontWeight: "600",
    fontSize: 16,
  },
  selectedAnswer: {
    fontWeight: "500",
    color: "#4CAF50",
    fontSize: 18,
    margin: 15,
  },
});

export default AddPollModal;
