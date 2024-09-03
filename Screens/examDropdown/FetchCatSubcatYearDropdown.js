// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import axios from "axios";
// import { Ionicons } from "@expo/vector-icons"; // Import icons
// import { Color } from "../GlobalStyles";

// const ExamDropdowns = () => {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [subcategoriesAndYears, setSubcategoriesAndYears] = useState([]);
//   const [selectedSubcategoryAndYear, setSelectedSubcategoryAndYear] =
//     useState("");

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get(
//           "/exam-categories/get-all-exam-category"
//         );
//         setCategories(
//           response.data.map((cat) => ({ key: cat._id, value: cat.catName }))
//         );
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     const fetchSubcategoriesAndYears = async () => {
//       if (selectedCategory) {
//         setSelectedSubcategoryAndYear("");
//         setSubcategoriesAndYears([]);

//         try {
//           const response = await axios.get(`/years/${selectedCategory}`);
//           setSubcategoriesAndYears(response.data);
//         } catch (error) {
//           console.error("Error fetching subcategories and years:", error);
//         }
//       }
//     };

//     fetchSubcategoriesAndYears();
//   }, [selectedCategory]);

//   const handleSubmit = () => {
//     if (selectedCategory && selectedSubcategoryAndYear) {
//       const selectedItem = subcategoriesAndYears.find(
//         (item) => item.key === selectedSubcategoryAndYear
//       );
//       const result = {
//         catId: selectedCategory,
//         subCatId: selectedItem?.subCatId,
//         yearId: selectedSubcategoryAndYear,
//       };
//       console.log("Selected Data:", result);
//     } else {
//       console.error("Please select both category and subcategory/year.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.card}>
//         <Text style={styles.label}>Select Category:</Text>
//         <View style={styles.pickerContainer}>
//           <Ionicons name="list-outline" size={24} color="#6949ff" />
//           <Picker
//             selectedValue={selectedCategory}
//             onValueChange={(value) => setSelectedCategory(value)}
//             style={styles.picker}
//           >
//             <Picker.Item label="Select a category..." value="" />
//             {categories.map((category) => (
//               <Picker.Item
//                 key={category.key}
//                 label={category.value}
//                 value={category.key}
//                 style={styles.pickerItem}
//               />
//             ))}
//           </Picker>
//         </View>
//       </View>

//       <View style={styles.card}>
//         <Text style={styles.label}>Select Subcategory and Year:</Text>
//         <View style={styles.pickerContainer}>
//           <Ionicons name="calendar-outline" size={24} color="#6949ff" />
//           <Picker
//             selectedValue={selectedSubcategoryAndYear}
//             onValueChange={(value) => setSelectedSubcategoryAndYear(value)}
//             style={styles.picker}
//             enabled={subcategoriesAndYears.length > 0}
//           >
//             <Picker.Item label="Select a subcategory and year..." value="" />
//             {subcategoriesAndYears.map((item) => (
//               <Picker.Item key={item.key} label={item.value} value={item.key} />
//             ))}
//           </Picker>
//         </View>
//       </View>

//       <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//         <Text style={styles.buttonText}>Submit</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 16,
//     backgroundColor: "#f5f5f5", // Light background
//   },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   label: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#333",
//     marginBottom: 8,
//   },
//   pickerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#f0f0f0",
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 4,
//   },
//   picker: {
//     flex: 1,
//     height: 50,
//     // color: Color.colorBlack,
//   },
//   pickerItem: {
//     flexWrap: "wrap",
//     color: Color.primaryColor,
//     gap: 30,
//   },
//   button: {
//     backgroundColor: "#6949ff",
//     padding: 16,
//     borderRadius: 12,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   buttonText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#fff",
//   },
// });

// export default ExamDropdowns;

import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import axios from "axios";
import ModalSelectorSearchable from "react-native-modal-selector-searchable"; // Updated import
import { Ionicons } from "@expo/vector-icons"; // Import icons

const ExamDropdowns = ({
  setSelectedCatId,
  setSelectedSubCatId,
  setSelectedYearId,
  setSelectedTimer,
  selectedTimer,
  creatingTest,
}) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategoriesAndYears, setSubcategoriesAndYears] = useState([]);
  const [selectedSubcategoryAndYear, setSelectedSubcategoryAndYear] =
    useState("");
  const [timerOptions] = useState([
    { key: 1, label: "Timer On" },
    { key: 2, label: "Timer Off" },
  ]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingSubcategories, setLoadingSubcategories] = useState(false);

  const fetchCategories = useCallback(async () => {
    setLoadingCategories(true);
    try {
      const response = await axios.get(
        "/exam-categories/get-all-exam-category"
      );
      setCategories(
        response.data.map((cat) => ({
          key: cat._id,
          label: cat.catName,
        }))
      );
    } catch (error) {
      console.error("Error fetching categories:", error);
      Alert.alert("Error", "Failed to fetch categories. Please try again.");
    } finally {
      setLoadingCategories(false);
    }
  }, []);

  const fetchSubcategoriesAndYears = useCallback(async () => {
    if (selectedCategory) {
      setLoadingSubcategories(true);
      setSelectedSubcategoryAndYear("");
      setSubcategoriesAndYears([]);

      try {
        const response = await axios.get(`/years/${selectedCategory}`);
        console.log("Response:", JSON.stringify(response.data));

        setSubcategoriesAndYears(
          response.data.map((item) => ({
            key: item.key, // Assuming `key` is the unique identifier
            label: item.value,
            subCatId: item.subCatId,
          }))
        );
      } catch (error) {
        console.error("Error fetching subcategories and years:", error);
        Alert.alert(
          "Error",
          "Failed to fetch subcategories and years. Please try again."
        );
      } finally {
        setLoadingSubcategories(false);
      }
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchSubcategoriesAndYears();
  }, [selectedCategory, fetchSubcategoriesAndYears]);

  useEffect(() => {
    if (selectedCategory && selectedSubcategoryAndYear) {
      const selectedItem = subcategoriesAndYears.find(
        (item) => item.key === selectedSubcategoryAndYear
      );
      // Set the selected values using the provided functions
      setSelectedCatId(selectedCategory);
      setSelectedSubCatId(selectedItem?.subCatId);
      setSelectedYearId(selectedSubcategoryAndYear);
      // No need to call setSelectedTimer here
    }
  }, [
    selectedCategory,
    selectedSubcategoryAndYear,
    subcategoriesAndYears,
    setSelectedCatId,
    setSelectedSubCatId,
    setSelectedYearId,
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Select Category:</Text>
        {loadingCategories ? (
          <ActivityIndicator size="small" color="#6949ff" />
        ) : (
          <ModalSelectorSearchable
            data={categories}
            initValue="Select a category"
            onChange={(option) => setSelectedCategory(option.key)}
            style={styles.pickerContainer}
            selectTextStyle={styles.selectText}
            optionTextStyle={styles.optionText}
            searchPlaceholderText="Search..."
            modalStyle={styles.modalContainer}
            modalSelector={styles.modalSelector}
          >
            <View style={styles.selector}>
              <Ionicons name="list-outline" size={24} color="#6949ff" />
              <Text style={styles.selectedValue}>
                {categories.find((cat) => cat.key === selectedCategory)
                  ?.label || "Select a category"}
              </Text>
            </View>
          </ModalSelectorSearchable>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Select Subcategory and Year:</Text>
        {loadingSubcategories ? (
          <ActivityIndicator size="small" color="#6949ff" />
        ) : (
          <ModalSelectorSearchable
            data={subcategoriesAndYears}
            initValue="Select a subcategory and year"
            onChange={(option) => setSelectedSubcategoryAndYear(option.key)}
            style={styles.pickerContainer}
            selectTextStyle={styles.selectText}
            optionTextStyle={styles.optionText}
            searchPlaceholderText="Search..."
            modalStyle={styles.modalContainer}
            modalSelector={styles.modalSelector}
            disabled={subcategoriesAndYears.length === 0}
          >
            <View style={styles.selector}>
              <Ionicons name="calendar-outline" size={24} color="#6949ff" />
              <Text style={styles.selectedValue}>
                {subcategoriesAndYears.find(
                  (item) => item.key === selectedSubcategoryAndYear
                )?.label || "Select a subcategory and year"}
              </Text>
            </View>
          </ModalSelectorSearchable>
        )}
      </View>

      {!creatingTest && (
        <View style={styles.card}>
          <Text style={styles.label}>Select Timer Visibility:</Text>
          <ModalSelectorSearchable
            data={timerOptions}
            initValue="Select timer visibility"
            onChange={(option) => setSelectedTimer(option.key)}
            style={styles.pickerContainer}
            selectTextStyle={styles.selectText}
            optionTextStyle={styles.optionText}
            searchPlaceholderText="Search..."
            modalStyle={styles.modalContainer}
            modalSelector={styles.modalSelector}
          >
            <View style={styles.selector}>
              <Ionicons name="timer-outline" size={24} color="#6949ff" />
              <Text style={styles.selectedValue}>
                {timerOptions.find((opt) => opt.key === selectedTimer)?.label ||
                  "Select timer visibility"}
              </Text>
            </View>
          </ModalSelectorSearchable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  pickerContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  selector: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectedValue: {
    flex: 1,
    paddingLeft: 12,
    fontSize: 16,
    color: "#333",
  },
  selectText: {
    // Optional: Customize the text style here
  },
  optionText: {
    // Optional: Customize the option text style here
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  modalSelector: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  searchInput: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderColor: "#6949ff",
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  optionContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  optionTextStyle: {
    fontSize: 16,
    color: "#333",
  },
});

export default ExamDropdowns;
