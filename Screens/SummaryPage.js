import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  useWindowDimensions,
} from "react-native";
import { PieChart } from "react-native-gifted-charts";
import HeaderMenu from "../Components/Menus/HeaderMenu";
import { Color } from "../GlobalStyles";
import HTML from "react-native-render-html";
import { AuthContext } from "../Context/authContext";

const SummaryPage = ({ route }) => {
  const {
    questionData,
    selectedOptions,
    testid,
    correctAnsNo,
    incorrectAnsNo,
    unAttempt,
    totalTime,
    historyPageData,
  } = route.params;
  const navigation = useNavigation(); // Initialize navigation hook
  const [state, setState] = useContext(AuthContext);

  let correctAnswersCount = 0;
  let incorrectAnswersCount = 0;
  let unattemptedCount = 0;

  // Iterate through each question's index
  questionData.forEach((question, index) => {
    const selectedOptionKey = selectedOptions[index];
    const correctAnswer = question.answer;

    if (selectedOptionKey === correctAnswer) {
      correctAnswersCount++;
    } else if (selectedOptionKey !== undefined) {
      incorrectAnswersCount++;
    } else {
      unattemptedCount++;
    }
  });

  const totalQuestions = questionData.length;
  const scorePercentage = (correctAnswersCount / totalQuestions) * 100;

  const pieData = [
    {
      value: correctAnswersCount,
      color: "#009FFF",
      gradientCenterColor: "#006DFF",
      focused: true,
      label: `Correct: ${correctAnswersCount}`,
    },
    {
      value: incorrectAnswersCount,
      color: "#FFA5BA",
      gradientCenterColor: "#FF7F97",
      label: `Incorrect: ${incorrectAnswersCount}`,
    },
    {
      value: unattemptedCount,
      color: "#BDB2FA",
      gradientCenterColor: "#8F80F3",
      label: `Unattempted: ${unattemptedCount}`,
    },
  ];

  const renderDot = (color) => (
    <View
      style={{
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: color,
        marginRight: 10,
      }}
    />
  );

  const renderLegendComponent = () => (
    <View style={{ alignItems: "center", marginBottom: 20 }}>
      {pieData.map((item, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 5,
          }}
        >
          {renderDot(item.color)}
          <Text style={{ color: "white" }}>{item.label}</Text>
        </View>
      ))}
    </View>
  );

  const containsHTMLForModal = (text) => {
    return /<[a-z][\s\S]*>/i.test(text);
  };

  // Utility function to check if the content is an image URL
  const isImageUrl = (url) => {
    return url?.match(/\.(jpeg|jpg|gif|png)$/) != null;
  };

  const getDriveImageUrl = (url) => {
    const match = url.match(/drive.google.com\/file\/d\/(.+?)\/view/);
    if (match) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
    return url;
  };

  const replaceDriveUrlsInHtml = (html) => {
    return html.replace(
      /<img[^>]+src="(https:\/\/drive\.google\.com\/file\/d\/[^"]+)"/g,
      (match, p1) => {
        const accessibleUrl = getDriveImageUrl(p1);
        return match.replace(p1, accessibleUrl);
      }
    );
  };

  const { width } = useWindowDimensions(); // Destructure width from useWindowDimensions()

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar backgroundColor="#34448B" barStyle="light-content" />

      {historyPageData && (
        <View
          style={{
            padding: 10,
            alignSelf: "center",
            backgroundColor: "#232B5D",
            width: "100%",
            marginBottom: 20,
            borderRadius: 15,
          }}
        >
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: Color.pink }]} />
            <Text style={styles.studentCard}>
              Test ID : {testid ? testid : "TEST"}
            </Text>
          </View>

          <View style={styles.legendItem}>
            <View
              style={[styles.legendDot, { backgroundColor: Color.bluerich }]}
            />
            <Text style={styles.studentCard}>Name : {state?.user?.name}</Text>
          </View>

          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: Color.pink }]} />
            <Text style={styles.studentCard}>
              <Text style={styles.tableValue}>
                Time Taken : {totalTime} minutes
              </Text>
            </Text>
          </View>

          <View style={styles.legendItem}>
            <View
              style={[styles.legendDot, { backgroundColor: Color.bluerich }]}
            />
            <Text style={styles.studentCard}>
              <Text style={styles.tableValue}>
                Attempted Questions : {correctAnsNo + incorrectAnsNo}
              </Text>
            </Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: Color.pink }]} />
            <Text style={styles.studentCard}>
              <Text style={styles.tableValue}>
                Coreect Answers : {correctAnsNo}
              </Text>
            </Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendDot, { backgroundColor: Color.bluerich }]}
            />
            <Text style={styles.studentCard}>
              <Text style={styles.tableValue}>
                Wrong Answers : {incorrectAnsNo}
              </Text>
            </Text>
          </View>

          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: Color.pink }]} />
            <Text style={styles.studentCard}>
              <Text style={styles.tableValue}>
                Unattempted Questions : {unAttempt}
              </Text>
            </Text>
          </View>
        </View>
      )}

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
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  style={{ fontSize: 22, color: "white", fontWeight: "bold" }}
                >
                  {scorePercentage.toFixed(1)}%
                </Text>
                <Text style={{ fontSize: 14, color: "white" }}>Score</Text>
              </View>
            )}
          />
        </View>
        {renderLegendComponent()}
      </View>

      {questionData.map((question, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.questionText}>
            {/* {question.question} */}

            {
              // isImageUrl(item.question) ? (
              //   <Image
              //     source={{ uri: getDriveImageUrl(item.question) }}
              //     style={{ width: "100%", height: 150 }}
              //     resizeMode="contain"
              //   />
              // ) :
              containsHTMLForModal(question.question) ? (
                <HTML
                  source={{ html: replaceDriveUrlsInHtml(question.question) }}
                  contentWidth={width}
                  tagsStyles={{
                    table: {
                      width: width * 0.6,
                      margin: 15, // Adjust margin of table
                      borderWidth: 0.2,
                      borderColor: "#000",
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                    },
                    td: {
                      borderWidth: 0.2,
                      borderColor: "#000",
                      padding: 5,
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                    },
                    img: {
                      width: width * 0.7,
                      height: 150,
                      resizeMode: "contain",
                      alignSelf: "flex-start", // Center the image
                    },
                  }}
                />
              ) : (
                <Text style={styles.questionText}>{question.question}</Text>
              )
            }
          </Text>
          <Text style={styles.subtitle}>Options:</Text>
          <View style={styles.optionContainer}>
            {["option1", "option2", "option3", "option4"].map((optionKey) => {
              const isSelected = optionKey === selectedOptions[index];
              const isCorrect = optionKey === question.answer;
              const isAttempted = selectedOptions[index] !== undefined;
              const isMismatch = isSelected && !isCorrect;
              const optionStyle = [
                styles.optionText,
                isSelected && !isCorrect ? styles.selectedOption : null,
                isCorrect ? styles.correctOption : null,
                isMismatch ? styles.mismatchOption : null,
              ];

              return (
                <Text key={optionKey} style={optionStyle}>
                  {question[optionKey]}
                </Text>
              );
            })}
          </View>
          <Text style={styles.subtitle}>Correct Answer: {question.answer}</Text>
          {selectedOptions[index] !== undefined ? (
            <Text
              style={
                selectedOptions[index] === question.answer
                  ? styles.selectedOptionText
                  : styles.mismatchOptionText
              }
            >
              Selected Option: {[`${selectedOptions[index]}`]}
            </Text>
          ) : (
            <Text style={styles.unattemptedText}>
              Selected Option: Unattempted Question
            </Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  studentCard: {
    color: Color.colorWhite,
    fontSize: 15,
  },
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: "#34448B",
  },
  summaryContainer: {
    backgroundColor: "#232B5D",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  chartContainer: {
    padding: 20,
    alignItems: "center",
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#fff",
  },
  questionText: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: Color.darkGreen,
  },
  optionContainer: {
    marginTop: 5,
  },
  optionText: {
    marginBottom: 5,
  },
  correctOption: {
    fontWeight: "bold",
    color: "green",
  },
  selectedOption: {
    color: "blue", // Color for selected option
    fontWeight: "bold",
  },
  mismatchOption: {
    color: "red", // Color for incorrect option (when user selection is incorrect)
  },
  mismatchOptionText: {
    color: "red", // Color for mismatched selected option text
  },
  selectedOptionText: {
    color: "green",
    marginTop: 5,
    fontWeight: "bold",
  },
  unattemptedText: {
    color: "red",
    marginTop: 5,
  },
});

export default SummaryPage;
