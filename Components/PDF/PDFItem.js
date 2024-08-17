import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Pdf from "react-native-pdf";

const PDFItem = ({ heading, source }) => {
  return (
    <View style={styles.pdfContainer}>
      <Text style={styles.heading}>{heading}</Text>
      <View style={styles.pdfWrapper}>
        <Pdf
          trustAllCerts={false}
          source={
            typeof source === "string" ? { uri: source, cache: true } : source
          }
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
    </View>
  );
};

const styles = StyleSheet.create({
  pdfContainer: {
    marginBottom: 30,
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    padding: 15,
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  pdfWrapper: {
    flex: 1,
    width: Dimensions.get("window").width * 0.85,
    height: Dimensions.get("window").height * 0.7,
    borderRadius: 5,
    overflow: "hidden",
  },
  pdf: {
    flex: 1,
  },
});

export default PDFItem;
