import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";
import CustomAlert from "../../Components/Alert/CustomAlertPort";
import ChooseExamDropdown from "../../Components/Dropdown/ChooseExamDropdown";
import PrimaryButton from "../../Components/Forms/PrimaryButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import SecoundaryHeader from "../../Components/Menus/SecoundaryHeader";
import { Color } from "../../GlobalStyles";
import CreateTestPage from "../CreateTestPage";
import LoadingAnimation from "../../Components/Loader/loader";
import ChooseExamAlert from "../../Components/Alert/ChooseExamAlert";
import ChooseExamAlertSuccess from "../../Components/Alert/ChooseExamAlertSuccess";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FetchCatSubcatYearDropdown from "./FetchCatSubcatYearDropdown";
import HeaderMenu from "../../Components/Menus/HeaderMenu";

const ChooseExamUpdated = ({}) => {
  const navigation = useNavigation();

  const route = useRoute(); // Get the route object
  const { detailPageValue } = route.params || {}; // Destructure _id from params or use an empty object if params is undefined
  const [selectedExamCategory, setSelectedExamCategory] = useState(
    detailPageValue && detailPageValue._id ? detailPageValue._id : null // Check if detailPageValue and detailPageValue._id exist before accessing _id
  );

  useEffect(() => {
    if (!detailPageValue || !detailPageValue._id) {
      setSelectedExamCategory(null); // Update selectedExamCategory to null if detailPageValue or detailPageValue._id is not found
    }
  }, [detailPageValue]);

  const [questionData, setQuestionData] = useState([]);
  const [testId, setTestId] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [showAlertTest, setShowAlertTest] = useState(false);
  const [alertMessageTest, setAlertMessageTest] = useState("");

  // const [selectedExamCategory, setSelectedExamCategory] = useState("");

  const [selectedSubExamType, setSelectedSubExamType] = useState("");

  const [selectedTimer, setSelectedTimer] = useState("1");

  const [catId, setCatId] = useState(null);
  const [subCatId, setSubCatId] = useState(null);
  const [yearId, setYearId] = useState(null);

  const onSubmitChooseExam = async () => {
    // console.log("selectedExamCategory" + selectedExamCategory);
    // console.log("selectedSubExamType" + selectedSubExamType);
    // console.log("selectedExamYear" + selectedExamYear);
    // console.log("selectedTimer" + selectedTimer);
    // console.log("catId" + catId);
    // console.log("subCatId" + subCatId);
    // console.log("yearId" + yearId);

    // if (!catId) {
    //   alert("Please select an exam category");
    //   return;
    // }

    // if (!subCatId) {
    //   alert("Please select an exam type");
    //   return;
    // }

    // if (!yearId) {
    //   alert("Please select an exam year");
    //   return;
    // }

    if (!catId || !subCatId || !yearId) {
      alert("Please select correct information");
      return;
    }

    loadQuestionPaper();
  };

  const handleOnClose = () => {
    setShowAlert(false);
  };

  const loadQuestionPaper = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/question-papers/getQuestionPapersByFilter",
        {
          catID: catId,
          subCatID: subCatId,
          QPYearID: yearId,
        }
      );
      const incomingData = response.data.data;
      const myTestData = incomingData.map(
        ({ _id, question, option1, option2, option3, option4, answer }) => ({
          _id,
          question,
          option1,
          option2,
          option3,
          option4,
          answer,
        })
      );
      const dataAuth = await AsyncStorage.getItem("@auth");
      const loginData = JSON.parse(dataAuth);
      const creatorId = loginData.user._id;
      const creatorName = loginData.user.name;

      // Send POST request with combinedQuestions
      const responseMainTest = await axios.post("/question-papers/main-test", {
        testName: selectedExamCategory ? selectedExamCategory : "testName",
        totalQuestions: myTestData.length,
        passingMarks: 0, // You can set this as required
        creatorId: creatorId,
        questions: myTestData,
      });

      setQuestionData(responseMainTest.data.data.questions);
      setTestId(responseMainTest.data.data.testId);
      // console.log("QuestionPaper Data " + JSON.stringify(data));
      setShowAlertTest(true);
      setAlertMessageTest("Quick Tips: There are no Tips. Best of luck!");
      //===============when we are changing this message please do the changes in papercardcontainer in components question paper section ===
    } catch (error) {
      console.error("Error fetching question paper:", error);
      setShowAlert(true);
      setAlertMessage(
        "No question papers are available for the selected options. Please review your selections and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOnInstructions = () => {
    navigation.navigate("InstructionPage", {
      questionData,
      testId,
      catId,
      subCatId,
      yearId,
      selectedTimer,
    });
  };

  const handleOnSkipIntructions = () => {
    navigation.navigate("TestPage", {
      questionData,
      testId,
      catId,
      subCatId,
      yearId,
      selectedTimer,
    });
  };
  const onCloseChooseExamAlert = () => {
    setShowAlertTest(false);
  };

  return (
    <>
      {loading && <LoadingAnimation visible={loading} loop={true} />}

      {/* <HeaderMenu /> */}

      {showAlert && (
        <ChooseExamAlert
          isVisible={showAlert}
          onClose={handleOnClose}
          message={alertMessage}
        />
      )}

      {showAlertTest && (
        <ChooseExamAlertSuccess
          isVisible={showAlertTest}
          onInstructions={handleOnInstructions}
          onSkipIntructions={handleOnSkipIntructions}
          message={alertMessageTest}
          onClose={onCloseChooseExamAlert}
        />
      )}
      <ScrollView
        style={styles.mainConatiner}
        showsVerticalScrollIndicator={false}
      >
        <FetchCatSubcatYearDropdown
          setSelectedCatId={setCatId}
          setSelectedSubCatId={setSubCatId}
          setSelectedYearId={setYearId}
          setSelectedTimer={setSelectedTimer}
          selectedTimer={selectedTimer}
        />
        <PrimaryButton
          styles={styles.button}
          buttonTitle={loading ? "Loading..." : "Submit"}
          handleOnSubmit={onSubmitChooseExam}
          disabled={loading}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  mainConatiner: {
    // width: "100%",
    // height: "100%",
    backgroundColor: Color.colorWhite,
    // flexGrow: 1,
  },

  header: {
    fontSize: 20,
    fontWeight: "bold",
    // marginBottom: 10,
    // paddingVertical: 10,
    color: "blue", // Color of the header
  },
  step: {
    marginBottom: 8,
    color: "green", // Color of the step text
  },
  stepNumber: {
    fontWeight: "bold",
    color: "red", // Color of the step number
  },
  stepsContainer: {
    paddingHorizontal: 20,
    backgroundColor: Color.secoundaryBtnColor,
    borderRadius: 20,
    top: "8%",
    marginHorizontal: 5,
    paddingVertical: 10,
  },

  txt: {
    textAlign: "center",
    marginTop: "20%",
    fontSize: 20,
    justifyContent: "center",
    color: Color.red,
    width: "90%",
    alignSelf: "center",
  },
  button: {
    // marginTop: "5%",
    marginTop: 20,
  },
});

export default ChooseExamUpdated;
