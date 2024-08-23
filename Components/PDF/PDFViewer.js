import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Pdf from "react-native-pdf";
import { FontAwesome } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Color } from "../../GlobalStyles";

const PDFViewer = ({ pdfFiles, handleDownlaodPdf }) => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      {pdfFiles.map((file, index) => (
        <View key={index} style={styles.pdfContainer}>
          <View style={styles.headingContainer}>
            <TouchableOpacity
              onPress={() => handleDownlaodPdf(file.source, file.filename)}
            >
              <MaterialIcons
                name="cloud-download"
                size={24}
                color={Color.primaryColor}
              />
            </TouchableOpacity>

            <Text style={styles.heading}>{file.heading}</Text>

            <TouchableOpacity onPress={() => toggleExpand(index)}>
              <FontAwesome
                name={expandedIndex === index ? "chevron-up" : "chevron-down"}
                size={18}
                color="#555"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          {expandedIndex === index && (
            <View style={styles.pdfWrapper}>
              <Pdf
                trustAllCerts={false}
                source={
                  typeof file.source === "string"
                    ? { uri: file.source }
                    : file.source
                }
                // source={{ uri: file.source, cache: true }}

                onLoadComplete={(numberOfPages, filePath) => {
                  console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                  console.log(`Current page: ${page}`);
                }}
                onError={(error) => {
                  console.log(error);
                }}
                onPressLink={(uri) => {
                  console.log(`Link pressed: ${uri}`);
                }}
                style={styles.pdf}
              />
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    // justifyContent: "center",
  },
  pdfContainer: {
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
    width: Dimensions.get("window").width * 0.9,
    alignItems: "center", // Centering the content inside the card
  },
  headingContainer: {
    padding: 15,
    backgroundColor: "#F0F0F0",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    textAlign: "center", // Centering the text
    flex: 1,
  },
  icon: {
    marginLeft: 10,
  },
  pdfWrapper: {
    height: Dimensions.get("window").height * 0.7,
    overflow: "hidden",
    width: "100%", // Making the PDF take up the full width
  },
  pdf: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});

export default PDFViewer;
