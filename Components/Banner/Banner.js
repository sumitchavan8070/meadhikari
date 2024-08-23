// // import React, { useEffect, useState } from "react";
// // import {
// //   StyleSheet,
// //   View,
// //   Text,
// //   Image,
// //   Dimensions,
// //   Pressable,
// //   ActivityIndicator,
// // } from "react-native";
// // import Carousel, { PaginationLight } from "react-native-x-carousel";
// // import axios from "axios";

// // const { width } = Dimensions.get("window");

// // const Banner = () => {
// //   const [banners, setBanners] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     // Fetch banners from API
// //     const fetchBanners = async () => {
// //       try {
// //         const response = await axios.get("/banner/get-all");
// //         setBanners(response.data);
// //       } catch (error) {
// //         console.error("Error fetching banners:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchBanners();
// //   }, []);

// //   const renderItem = (data) => (
// //     <View key={data._id} style={styles.cardContainer}>
// //       <Pressable onPress={() => alert(`Banner ID: ${data._id}`)}>
// //         <View style={styles.cardWrapper}>
// //           <Image style={styles.card} source={{ uri: data.coverImageUri }} />
// //           {data.cornerLabelText && (
// //             <View
// //               style={[
// //                 styles.cornerLabel,
// //                 { backgroundColor: data.cornerLabelColor || "#000" },
// //               ]}
// //             >
// //               <Text style={styles.cornerLabelText}>{data.cornerLabelText}</Text>
// //             </View>
// //           )}
// //         </View>
// //       </Pressable>
// //     </View>
// //   );

// //   if (loading) {
// //     return (
// //       <View style={[styles.container, styles.loadingContainer]}>
// //         <ActivityIndicator size="large" color="#3498db" />
// //       </View>
// //     );
// //   }

// //   return (
// //     <View style={styles.container}>
// //       <Carousel
// //         pagination={PaginationLight}
// //         renderItem={renderItem}
// //         data={banners}
// //         loop
// //         autoplay
// //       />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     backgroundColor: "#fff",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     paddingVertical: 10,
// //   },
// //   loadingContainer: {
// //     flex: 1,
// //     justifyContent: "center",
// //   },
// //   cardContainer: {
// //     alignItems: "center",
// //     justifyContent: "center",
// //   },
// //   cardWrapper: {
// //     overflow: "hidden",
// //   },
// //   card: {
// //     width: width * 1,
// //     height: 200,
// //     resizeMode: "cover",
// //   },
// //   cornerLabel: {
// //     position: "absolute",
// //     bottom: 0,
// //     right: 0,
// //     borderTopLeftRadius: 8,
// //   },
// //   cornerLabelText: {
// //     fontSize: 12,
// //     color: "#fff",
// //     fontWeight: "600",
// //     paddingLeft: 5,
// //     paddingRight: 5,
// //     paddingTop: 2,
// //     paddingBottom: 2,
// //   },
// // });

// // export default Banner;

// import React, { useEffect, useState } from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   Image,
//   Dimensions,
//   Pressable,
//   ActivityIndicator,
//   Platform,
// } from "react-native";
// import Carousel, { PaginationLight } from "react-native-x-carousel";
// import axios from "axios";

// const { width } = Dimensions.get("window");

// const Banner = () => {
//   const [banners, setBanners] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch banners from API
//     const fetchBanners = async () => {
//       try {
//         const response = await axios.get("/banner/get-all");
//         setBanners(response.data);
//       } catch (error) {
//         console.error("Error fetching banners:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBanners();
//   }, []);

//   const renderItem = (data) => (
//     <View key={data._id} style={styles.cardContainer}>
//       <Pressable onPress={() => alert(`Banner ID: ${data._id}`)}>
//         <View style={styles.cardWrapper}>
//           <Image style={styles.card} source={{ uri: data.coverImageUri }} />
//           {data.cornerLabelText && (
//             <View
//               style={[
//                 styles.cornerLabel,
//                 { backgroundColor: data.cornerLabelColor || "#000" },
//               ]}
//             >
//               <Text style={styles.cornerLabelText}>{data.cornerLabelText}</Text>
//             </View>
//           )}
//         </View>
//       </Pressable>
//     </View>
//   );

//   if (loading) {
//     return (
//       <View style={[styles.container, styles.loadingContainer]}>
//         <ActivityIndicator size="large" color="#007aff" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Carousel
//         pagination={PaginationLight}
//         renderItem={renderItem}
//         data={banners}
//         loop
//         autoplay
//         autoplayInterval={3000} // Adjust autoplay interval if needed
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     // backgroundColor: "#f8f8f8", // Light background color for a softer look
//     paddingVertical: 5,
//     alignSelf: "center",
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//   },
//   cardContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 10, // Add padding to prevent images from touching the edges
//   },
//   cardWrapper: {
//     overflow: "hidden",
//     borderRadius: 12, // Rounded corners for a more modern look
//     // shadowColor: "#000",
//     // shadowOffset: { width: 0, height: 2 },
//     // shadowOpacity: 0.2,
//     // shadowRadius: 8,
//     // elevation: 2, // Add elevation for Android to show shadow
//   },
//   card: {
//     width: width * 0.9, // Slightly less than full width for padding
//     height: 200, // Adjust height to fit within a more compact view
//     resizeMode: "cover",
//     borderRadius: 12, // Ensure image matches cardWrapper rounding
//   },
//   cornerLabel: {
//     position: "absolute",
//     bottom: 10,
//     right: 10,
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     borderRadius: 12, // Rounded corners for the label
//     backgroundColor: "#000", // Default background color
//   },
//   cornerLabelText: {
//     fontSize: 14,
//     color: "#fff",
//     fontWeight: "600",
//     textAlign: "center",
//   },
// });

// export default Banner;

import React, { useEffect, useLayoutEffect, useState } from "react";
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

const Banner = ({ banners, bannerLoading }) => {
  // const [loading, setLoading] = useState(true);
  // const [banners, setBanners] = useState([]);

  // useLayoutEffect(() => {
  //   // Fetch banners from API
  //   const fetchBanners = async () => {
  //     try {
  //       const response = await axios.get("/banner/get-all");
  //       const sortedBanners = response.data.sort((a, b) => a.index - b.index); // Sort banners by index
  //       setBanners(sortedBanners);
  //     } catch (error) {
  //       console.error("Error fetching banners:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchBanners();
  // }, []);

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

  // if (loading) {
  //   return (
  //     <View style={[styles.container, styles.loadingContainer]}>
  //       <ActivityIndicator size="large" color="#007aff" />
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <Carousel
        pagination={PaginationLight}
        renderItem={renderItem}
        data={banners}
        loop
        autoplay
        autoplayInterval={3000} // Adjust autoplay interval if needed
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    alignSelf: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  cardWrapper: {
    overflow: "hidden",
    borderRadius: 12,
  },
  card: {
    width: width * 0.9,
    height: 200,
    resizeMode: "cover",
    borderRadius: 12,
  },
  cornerLabel: {
    position: "absolute",
    bottom: 10,
    right: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: "#000",
  },
  cornerLabelText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
});

export default Banner;
