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

const FeedbackFormTwoEmoji = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

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
      Alert.alert("Error", "Please rate us by selecting a mood.");
      return;
    }

    if (feedback.trim() === "") {
      Alert.alert("Error", "Please enter your feedback.");
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
          Alert.alert("Success", "Thank you for your feedback!");
          setFeedback(""); // Clear feedback input after submission
          setRating(0);
        })
        .catch((error) => {
          setLoading(false);
          Alert.alert("Error", "Failed to submit feedback. Please try again.");
        });
    }
  };

  return (
    <>
      {loading && <LoadingAnimation visible={loading} loop={true} />}
      <LinearGradient
        colors={["#FFFFFF", "#E3FDF5", "#FFAAAA"]}
        style={styles.container}
      >
        <ScrollView>
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
                    color="#FF7272"
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
              colors={["#FF7272", "#FFAAAA"]}
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
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF7272",
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
    borderColor: "#FF7272",
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
    color: "#FF7272",
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
    color: "#FF7272",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 50,
  },
});

export default FeedbackFormTwoEmoji;
