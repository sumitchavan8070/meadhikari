import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import LoadingAnimation from "../Loader/loader";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const maxRating = 5;
  const starColor = "#FFD700"; // Gold color for filled stars
  const starBorderColor = "#CCCCCC"; // Grey color for unfilled stars

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async () => {
    if (rating < 1) {
      Alert.alert("Error", "Please rate us using the stars.");
      return;
    }

    if (feedback.trim() === "") {
      Alert.alert("Error", "Please enter your feedback.");
    } else {
      try {
        setLoading(true);
        const data = await AsyncStorage.getItem("@auth");
        let loginData = JSON.parse(data);
        let userid = loginData.user._id;
        await axios.post("/feedback/create", {
          feedback,
          rating,
          userid,
        });
        setLoading(false);
        Alert.alert("Success", "Thank you for your feedback!");
        setFeedback("");
        setRating(0);
      } catch (error) {
        setLoading(false);
        Alert.alert(
          "Error",
          "Failed to submit feedback. Please try again later."
        );
      }
    }
  };

  return (
    <>
      {loading && <LoadingAnimation visible={loading} loop={true} />}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Animatable.Text
            animation="fadeInDown"
            duration={800}
            style={styles.heading}
          >
            We Value Your Feedback
          </Animatable.Text>

          <Animatable.View
            animation="fadeInUp"
            delay={200}
            style={styles.ratingContainer}
          >
            <Text style={styles.ratingText}>Rate Us:</Text>
            <View style={styles.starsContainer}>
              {[...Array(maxRating)].map((_, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleRatingChange(index + 1)}
                  activeOpacity={0.7}
                >
                  <Animatable.View
                    animation={rating >= index + 1 ? "bounceIn" : undefined}
                    duration={500}
                  >
                    <FontAwesome
                      name={rating >= index + 1 ? "star" : "star-o"}
                      size={thirtyFontSize()}
                      color={rating >= index + 1 ? starColor : starBorderColor}
                      style={styles.star}
                    />
                  </Animatable.View>
                </TouchableOpacity>
              ))}
            </View>
          </Animatable.View>

          <Animatable.View
            animation="fadeInUp"
            delay={400}
            style={styles.inputContainer}
          >
            <TextInput
              style={styles.input}
              multiline
              placeholder="Write your feedback here..."
              placeholderTextColor="#888888"
              value={feedback}
              onChangeText={setFeedback}
              textAlignVertical="top"
            />
          </Animatable.View>

          <Animatable.View
            animation="fadeInUp"
            delay={600}
            style={styles.buttonContainer}
          >
            <TouchableOpacity onPress={handleSubmit} activeOpacity={0.8}>
              <LinearGradient
                colors={["#4c669f", "#3b5998", "#192f6a"]}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Submit Feedback</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animatable.View>

          <Animatable.View
            animation="fadeInUp"
            delay={800}
            style={styles.instructionsContainer}
          >
            <Text style={styles.instructionsHeading}>Instructions:</Text>
            <View style={styles.instructionItem}>
              <Text style={styles.point}>1. Requesting Question Papers:</Text>
              <Text style={styles.bullet}>
                - Students can request any question paper they need by filling
                out this form.
              </Text>
              <Text style={styles.bullet}>
                - Please specify the category, subcategory, and year of the
                question paper you require.
              </Text>
            </View>
            <View style={styles.instructionItem}>
              <Text style={styles.point}>2. Asking Questions:</Text>
              <Text style={styles.bullet}>
                - Feel free to ask any questions or seek clarification on any
                topic related to our services or products.
              </Text>
            </View>
            <View style={styles.instructionItem}>
              <Text style={styles.point}>
                3. Providing Suggestions for Improvement:
              </Text>
              <Text style={styles.bullet}>
                - Your feedback is valuable! If you have any suggestions for how
                we can improve our services or features, please let us know.
              </Text>
            </View>
            <Text style={styles.encourageText}>
              We highly encourage you to share your feedback with us. Your input
              helps us enhance our offerings and provide a better experience for
              you.
            </Text>
          </Animatable.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

// Helper function for responsive font size
const thirtyFontSize = () => {
  const { width } = require("react-native").Dimensions.get("window");
  return width * 0.07; // Adjust as needed
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: "#f2f2f2", // Light background for better contrast
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333333",
    textAlign: "center",
    marginBottom: 30,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    justifyContent: "center",
  },
  ratingText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333333",
    marginRight: 10,
  },
  starsContainer: {
    flexDirection: "row",
  },
  star: {
    marginHorizontal: 5,
  },
  inputContainer: {
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: "#333333",
    height: 150,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonContainer: {
    marginBottom: 40,
    alignItems: "center",
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#3b5998",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
  instructionsContainer: {
    marginTop: 10,
  },
  instructionsHeading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 15,
  },
  instructionItem: {
    marginBottom: 15,
  },
  point: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 5,
  },
  bullet: {
    fontSize: 16,
    color: "#666666",
    marginLeft: 10,
    marginBottom: 3,
  },
  encourageText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555555",
    textAlign: "center",
    marginTop: 20,
  },
});

export default FeedbackForm;
