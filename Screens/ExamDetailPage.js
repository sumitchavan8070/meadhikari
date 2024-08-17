// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   useWindowDimensions,
// } from "react-native";
// import { getExamCatList } from "../Api/examCatApi";
// import SecoundaryHeader from "../Components/Menus/SecoundaryHeader";
// import PDFViewer from "../Components/PDF/PDFViewer";
// import { useNavigation } from "@react-navigation/native";

// // Function to convert Google Drive PDF URLs
// const getDrivePdfUrl = (url) => {
//   const match = url.match(/drive.google.com\/file\/d\/(.+?)\/view/);
//   if (match) {
//     return `https://drive.google.com/uc?export=view&id=${match[1]}`;
//   }
//   console.log("url" + url);

//   return url;
// };

// const ExamDetailPage = ({ route }) => {
//   const [categoriesData, setCategoriesData] = useState([]);
//   const [eDetails, setEDetails] = useState({});
//   const navigation = useNavigation();

//   const { params } = route;

//   // Get Exam Detail
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getExamCatList();
//         setCategoriesData(data);

//         const getExam = data.find((item) => item._id === params?._id);
//         setEDetails(getExam);
//       } catch (error) {
//         console.error("Error fetching exam details:", error);
//       }
//     };

//     if (categoriesData.length === 0) {
//       fetchData();
//     }
//   }, [params?._id, categoriesData]);

//   const handleSolveBtn = () => {
//     const examDetailCatName = eDetails.catName;
//     const examDetailId = eDetails._id;

//     const detailPageValue = {
//       _id: examDetailId,
//       catName: examDetailCatName,
//     };

//     navigation.navigate("ChooseExam", {
//       detailPageValue: detailPageValue,
//     });
//   };

//   const handleModifyBtn = () => {
//     const examDetailCatName = eDetails.catName;
//     const examDetailId = eDetails._id;

//     const detailPageValue = {
//       _id: examDetailId,
//       catName: examDetailCatName,
//     };

//     navigation.navigate("ChooseExam", {
//       detailPageValue: detailPageValue,
//     });
//   };

//   const { width } = useWindowDimensions();

//   // Prepare PDF files with converted URLs
//   const pdfFiles = (eDetails.pdfFiles || []).map((file) => ({
//     heading: file.heading,
//     source: getDrivePdfUrl(file.source), // Convert the URL if needed
//   }));

//   console.log("pdfFiles" + JSON.stringify(pdfFiles));

//   return (
//     <View style={styles.main}>
//       <SecoundaryHeader pageName="Exam Details" />
//       <View style={{ flex: 1, margin: 10 }}>
//         <Text style={styles.title}>{eDetails?.catName}</Text>

//         {/* PDFViewer component now handles dynamic PDF list */}
//         <PDFViewer pdfFiles={pdfFiles} />

//         <View style={styles.btnContainer}>
//           <TouchableOpacity style={styles.btnModify} onPress={handleModifyBtn}>
//             <Text style={styles.txtModify}>Modify Test</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.btnSolve} onPress={handleSolveBtn}>
//             <Text style={styles.txtSolve}>Solve Paper</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   main: { flex: 1, backgroundColor: "#fff" },
//   btnContainer: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "80%",
//     position: "absolute",
//     bottom: "10%",
//     height: "8%",
//     alignContent: "center",
//     alignItems: "center",
//     alignSelf: "center",
//     borderRadius: 15,
//   },
//   btnSolve: {
//     backgroundColor: "#007BFF",
//     borderRadius: 15,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 13,
//   },
//   btnModify: {
//     borderRadius: 15,
//     backgroundColor: "#6c757d",
//     borderStyle: "solid",
//     borderColor: "#007BFF",
//     borderWidth: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },
//   txtModify: {
//     fontSize: 16,
//     textTransform: "capitalize",
//     fontWeight: "700",
//     color: "#007BFF",
//     textAlign: "center",
//   },
//   txtSolve: {
//     fontSize: 16,
//     textTransform: "capitalize",
//     fontWeight: "700",
//     color: "#fff",
//     textAlign: "center",
//   },
//   title: {
//     textTransform: "uppercase",
//     fontWeight: "600",
//     color: "#000",
//     textAlign: "left",
//     fontSize: 24,
//     margin: 10,
//   },
// });

// export default ExamDetailPage;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome"; // Or any other icon library
import { getExamCatList } from "../Api/examCatApi";
import SecoundaryHeader from "../Components/Menus/SecoundaryHeader";
import PDFViewer from "../Components/PDF/PDFViewer";
import { useNavigation } from "@react-navigation/native";

// Function to convert Google Drive PDF URLs
const getDrivePdfUrl = (url) => {
  const match = url.match(/drive.google.com\/file\/d\/(.+?)\/view/);
  if (match) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }
  console.log("url" + url);

  return url;
};

const ExamDetailPage = ({ route }) => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [eDetails, setEDetails] = useState({});
  const navigation = useNavigation();

  const { params } = route;

  // Get Exam Detail
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getExamCatList();
        setCategoriesData(data);

        const getExam = data.find((item) => item._id === params?._id);
        setEDetails(getExam);
      } catch (error) {
        console.error("Error fetching exam details:", error);
      }
    };

    if (categoriesData.length === 0) {
      fetchData();
    }
  }, [params?._id, categoriesData]);

  const handleSolveBtn = () => {
    const examDetailCatName = eDetails.catName;
    const examDetailId = eDetails._id;

    const detailPageValue = {
      _id: examDetailId,
      catName: examDetailCatName,
    };

    navigation.navigate("ChooseExam", {
      detailPageValue: detailPageValue,
    });
  };

  const { width } = useWindowDimensions();

  // Prepare PDF files with converted URLs
  const pdfFiles = (eDetails.pdfFiles || []).map((file) => ({
    heading: file.heading,
    source: getDrivePdfUrl(file.source), // Convert the URL if needed
  }));

  console.log("pdfFiles" + JSON.stringify(pdfFiles));

  return (
    <View style={styles.main}>
      <SecoundaryHeader pageName="Exam Details" />
      <View style={{ flex: 1, margin: 10 }}>
        <Text style={styles.title}>{eDetails?.catName}</Text>

        {/* PDFViewer component now handles dynamic PDF list */}
        <PDFViewer pdfFiles={pdfFiles} />
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fabContainer} onPress={handleSolveBtn}>
        <LinearGradient
          colors={["#007BFF", "#00BFFF"]} // Gradient colors
          style={styles.fab}
        >
          <Icon name="arrow-right" size={20} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: "#fff" },
  fabContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 1000, // Ensure the FAB is above other elements
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    textTransform: "uppercase",
    fontWeight: "600",
    color: "#000",
    textAlign: "left",
    fontSize: 24,
    margin: 10,
    alignSelf: "center",
  },
});

export default ExamDetailPage;
