// import React, { useState, useEffect } from "react";
// import {
//   ScrollView,
//   TouchableOpacity,
//   Text,
//   View,
//   Image,
//   StyleSheet,
//   Dimensions,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import axios from "axios";
// import { Color } from "../../GlobalStyles";

// const QuestionPaperSection = () => {
//   const [categoryData, setCategoryData] = useState([]);
//   const navigation = useNavigation();

//   useEffect(() => {
//     fetchCategoryData();
//   }, []);

//   const fetchCategoryData = async () => {
//     try {
//       const response = await axios.get(
//         "/exam-categories/get-all-exam-category"
//       );
//       setCategoryData(
//         response.data.map(({ _id, catName, catShortName, image }) => ({
//           _id,
//           catName,
//           catShortName,
//           image,
//         }))
//       );
//     } catch (error) {
//       console.error("Error fetching category data:", error);
//     }
//   };

//   const handleCategoryPress = (categoryId) => {
//     navigation.navigate("QuestionPaperCardPage", { categoryId });
//   };

//   const renderCategoryItem = (category, index) => (
//     <TouchableOpacity
//       key={category._id}
//       onPress={() => handleCategoryPress(category._id)}
//       style={styles.categoryButton}
//     >
//       <Image
//         source={{ uri: category?.image }}
//         contentFit="contain"
//         style={styles.categoryImage}
//       />

//       <View style={styles.categoryContent}>
//         <Text style={styles.categoryButtonText}>
//           {category.catShortName || category.catName}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <ScrollView
//       contentContainerStyle={styles.container}
//       horizontal
//       showsHorizontalScrollIndicator={false}
//     >
//       {categoryData.map(renderCategoryItem)}
//     </ScrollView>
//   );
// };

// const screenWidth = Dimensions.get("window").width;
// const cardWidthPercentage = 35;
// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//     flexDirection: "row",
//   },
//   categoryButton: {
//     width: screenWidth * (cardWidthPercentage / 100),
//     height: 170,
//     alignItems: "center",
//     justifyContent: "center",
//     margin: 5,
//     padding: 10,
//     backgroundColor: Color.secoundaryBtnColor,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//   },
//   categoryImage: {
//     width: 100,
//     height: 100,
//     resizeMode: "contain",
//     borderRadius: 10,
//   },
//   categoryContent: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 10,
//   },
//   categoryButtonText: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "#333",
//     textAlign: "center",
//   },
// });

// export default QuestionPaperSection;

import React, { useState, useEffect } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Color } from "../../GlobalStyles";

const QuestionPaperSection = () => {
  const [categoryData, setCategoryData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const fetchCategoryData = async () => {
    try {
      const response = await axios.get(
        "/exam-categories/get-all-exam-category"
      );
      // Assuming the response contains categoryNumber
      const sortedData = response.data
        .map(({ _id, catName, catShortName, image, categoryNumber }) => ({
          _id,
          catName,
          catShortName,
          image,
          categoryNumber,
        }))
        .sort((a, b) => a.categoryNumber - b.categoryNumber); // Sort by categoryNumber

      setCategoryData(sortedData);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  const handleCategoryPress = (categoryId) => {
    navigation.navigate("QuestionPaperCardPage", { categoryId });
  };

  const renderCategoryItem = (category) => (
    <TouchableOpacity
      key={category._id}
      onPress={() => handleCategoryPress(category._id)}
      style={styles.categoryButton}
    >
      <Image
        source={{ uri: category?.image }}
        contentFit="contain"
        style={styles.categoryImage}
      />

      <View style={styles.categoryContent}>
        <Text style={styles.categoryButtonText}>
          {category.catShortName || category.catName}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {categoryData.map(renderCategoryItem)}
    </ScrollView>
  );
};

const screenWidth = Dimensions.get("window").width;
const cardWidthPercentage = 35;
const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
  },
  categoryButton: {
    width: screenWidth * (cardWidthPercentage / 100),
    height: 170,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    padding: 10,
    backgroundColor: Color.secoundaryBtnColor,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  categoryImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    borderRadius: 10,
  },
  categoryContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  categoryButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
});

export default QuestionPaperSection;
