// import React from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   Image,
//   Dimensions,
//   Pressable,
// } from "react-native";
// import Carousel, { PaginationLight } from "react-native-x-carousel";
// import { BannerData } from "../../data/BannerData";

// const { width } = Dimensions.get("window");
// const Banner = () => {
//   const renderItem = (data) => (
//     <View key={data.coverImageUri} style={styles.cardContainer}>
//       <Pressable onPress={() => alert(data._id)}>
//         <View style={styles.cardWrapper}>
//           <Image style={styles.card} source={{ uri: data.coverImageUri }} />
//           <View
//             style={[
//               styles.cornerLabel,
//               { backgroundColor: data.cornerLabelColor },
//             ]}
//           >
//             <Text style={styles.cornerLabelText}>{data.cornerLabelText}</Text>
//           </View>
//         </View>
//       </Pressable>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Carousel
//         pagination={PaginationLight}
//         renderItem={renderItem}
//         data={BannerData}
//         loop
//         autoplay
//       />
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     // top: "10%",
//     paddingVertical: 10,
//   },
//   cardContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//     // width: "100%",
//   },
//   cardWrapper: {
//     // borderRadius: 8,
//     overflow: "hidden",
//   },
//   card: {
//     width: width * 1,
//     // height: width * 0.5,
//     // width: 600,
//     // maxWidth: 200,
//     height: 200,
//     resizeMode: "cover",
//   },
//   cornerLabel: {
//     position: "absolute",
//     bottom: 0,
//     right: 0,
//     borderTopLeftRadius: 8,
//   },
//   cornerLabelText: {
//     fontSize: 12,
//     color: "#fff",
//     fontWeight: "600",
//     paddingLeft: 5,
//     paddingRight: 5,
//     paddingTop: 2,
//     paddingBottom: 2,
//   },
// });
// export default Banner;

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from "react-native";
import Carousel, { PaginationLight } from "react-native-x-carousel";
import axios from "axios";

const { width } = Dimensions.get("window");

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch banners from API
    const fetchBanners = async () => {
      try {
        const response = await axios.get("/banner");
        setBanners(response.data);
      } catch (error) {
        console.error("Error fetching banners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  const renderItem = (data) => (
    <View key={data._id} style={styles.cardContainer}>
      <Pressable onPress={() => alert(`Banner ID: ${data._id}`)}>
        <View style={styles.cardWrapper}>
          <Image style={styles.card} source={{ uri: data.coverImageUri }} />
          {data.cornerLabelText && (
            <View
              style={[
                styles.cornerLabel,
                { backgroundColor: data.cornerLabelColor || "#000" },
              ]}
            >
              <Text style={styles.cornerLabelText}>{data.cornerLabelText}</Text>
            </View>
          )}
        </View>
      </Pressable>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Carousel
        pagination={PaginationLight}
        renderItem={renderItem}
        data={banners}
        loop
        autoplay
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  cardWrapper: {
    overflow: "hidden",
  },
  card: {
    width: width * 1,
    height: 200,
    resizeMode: "cover",
  },
  cornerLabel: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 8,
  },
  cornerLabelText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
});

export default Banner;
