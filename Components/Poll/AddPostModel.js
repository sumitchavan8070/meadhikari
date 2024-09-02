// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Modal,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   ScrollView,
//   Keyboard,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { Color } from "../../GlobalStyles";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import LoadingAnimation from "../Loader/loader";
// import PostAlert from "../Alert/PostAlert";

// const AddPostModal = ({ onClose, onAddPost }) => {
//   const [image, setImage] = useState(null);
//   const [description, setDescription] = useState("");
//   const [imageuriLocal, setImageuriLocal] = useState(null);

//   const [loading, setLoading] = useState(false);
//   const [imageCloudUrl, setImageCloudUrl] = useState("");
//   const [imageCloudPublicId, setImageCloudPublicId] = useState("");

//   // const [postSuccessAlert, setPostSuccessAlert] = useState(false);
//   const [showAlert, setShowAlert] = useState(false); // State to control alert visibility
//   const [alertMessage, setAlertMessage] = useState("");

//   const handleImageUpload = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       aspect: [1, 1],
//       allowsEditing: true,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//       const imageUri = result.assets[0];
//       console.log(imageUri);
//       let newFile = {
//         uri: result.assets[0].uri,
//         type: `test/${result.assets[0].uri.split(".")[1]}`,
//         name: `test.${result.assets[0].uri.split(".")[1]}`,
//       };
//       setImageuriLocal(newFile);
//       // const imgData = await uploadFileOnCloudinary(newFile);
//     }
//   };

//   const handleAddPost = async () => {
//     setLoading(true); // Start loading animation
//     Keyboard.dismiss();

//     if (!image) {
//       alert("Please select an image.");
//       setLoading(false);

//       return;
//     }
//     if (!description) {
//       alert("Please add description.");
//       setLoading(false);

//       return;
//     }
//     const uploadedUrl = await uploadFileOnCloudinary(imageuriLocal);
//     console.log("loader " + uploadedUrl);
//     const data = await AsyncStorage.getItem("@auth");
//     let loginData = JSON.parse(data);
//     let userId = loginData.user._id;

//     const postData = {
//       imageUrl: uploadedUrl,
//       description: description,
//       postedBy: userId,
//       isSponsored: false,
//       approved: false,
//     };

//     try {
//       const response = await axios.post("posts/create-post", postData);
//       console.log("Create Post Response: ", response.data);

//       setShowAlert(true);
//       setAlertMessage(
//         "Your post has been submitted successfully and is awaiting review by our team. Thank you!"
//       );
//       // onClose();
//     } catch (error) {
//       console.error("Error creating post: ", error);
//       Keyboard.dismiss();
//       setLoading(false);
//       setShowAlert(true); // Show the error alert card
//       setAlertMessage("Appreciated Efforts.. But Please Try Again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOnClose = () => {
//     setImage(null);
//     setDescription("");
//     setShowAlert(false);
//     onClose();
//   };

//   const uploadFileOnCloudinary = async (img) => {
//     // setLoading(true); // Start loading animation

//     const data = new FormData();
//     data.append("file", img);
//     data.append("upload_preset", "meadhikari");
//     data.append("cloud_name", "sdchavan");
//     data.append("folder", "posts"); // Upload to 'profile' folder

//     try {
//       const response = await fetch(
//         "https://api.cloudinary.com/v1_1/sdchavan/image/upload",
//         {
//           method: "post",
//           body: data,
//         }
//       );
//       const result = await response.json();

//       setImageCloudUrl(result.url);
//       setImageCloudPublicId(result.public_id);
//       const pubId = await result.public_id;
//       return pubId;
//     } catch (error) {
//       console.error("Error uploading image to Cloudinary:", error);
//     } finally {
//       setLoading(false); // Stop loading animation
//     }
//   };

//   // Function to handle cancel button click
//   const handleCancel = async () => {
//     onClose();
//   };

//   return (
//     <View style={styles.modalContainer}>
//       <View style={styles.modalContent}>
//         {loading && <LoadingAnimation visible={loading} loop={true} />}

//         {showAlert && (
//           <PostAlert
//             isVisible={showAlert}
//             onClose={handleOnClose}
//             message={alertMessage}
//           />
//         )}

//         <TouchableOpacity
//           style={styles.selectImgBtn}
//           onPress={handleImageUpload}
//         >
//           <Text style={styles.selectImgBtnTxt}>Select Image</Text>
//         </TouchableOpacity>
//         {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
//         <TextInput
//           placeholder="Add Description..."
//           value={description}
//           onChangeText={setDescription}
//           multiline={true}
//           style={styles.descriptionInput}
//           keyboardType="default"
//         />

//         <View style={styles.btnContainer}>
//           <TouchableOpacity style={styles.selectImgBtn} onPress={handleAddPost}>
//             <Text style={styles.selectImgBtnTxt}>Add Post</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.selectImgBtn} onPress={handleCancel}>
//             <Text style={styles.selectImgBtnTxt}>Cancel</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   btnContainer: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginHorizontal: "10%",
//   },
//   selectImgBtnTxt: {
//     color: Color.colorWhite,
//   },
//   selectImgBtn: {
//     padding: 10,
//     paddingHorizontal: "15%",
//     backgroundColor: Color.primaryColor,
//     alignItems: "center",
//     borderRadius: 15,
//     marginBottom: 20,
//     marginTop: "5%",
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//     width: "100%",
//     // zIndex: 1,
//   },
//   modalContent: {
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 20,
//     width: "95%",
//   },
//   imagePreview: {
//     width: "100%",
//     height: 300,
//     marginVertical: 10,
//     alignSelf: "center",
//     borderColor: Color.primaryColor,
//     borderWidth: 1,
//     borderRadius: 15,
//   },
//   descriptionInput: {
//     width: "100%",
//     height: 100,
//     borderColor: Color.primaryColor,
//     borderWidth: 1,
//     borderRadius: 15,
//     padding: 5,
//     marginBottom: 10,
//     // zIndex: 99999,
//   },
// });

// export default AddPostModal;

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Modal,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   ScrollView,
//   Keyboard,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { Color } from "../../GlobalStyles";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import LoadingAnimation from "../Loader/loader";
// import PostAlert from "../Alert/PostAlert";
// import { LinearGradient } from "expo-linear-gradient";
// import { FontAwesome5 } from "@expo/vector-icons"; // Ensure you have this installed

// const AddPostModal = ({ onClose, onAddPost }) => {
//   const [image, setImage] = useState(null);
//   const [description, setDescription] = useState("");
//   const [imageuriLocal, setImageuriLocal] = useState(null);

//   const [loading, setLoading] = useState(false);
//   const [imageCloudUrl, setImageCloudUrl] = useState("");
//   const [imageCloudPublicId, setImageCloudPublicId] = useState("");

//   // const [postSuccessAlert, setPostSuccessAlert] = useState(false);
//   const [showAlert, setShowAlert] = useState(false); // State to control alert visibility
//   const [alertMessage, setAlertMessage] = useState("");

//   const handleImageUpload = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       aspect: [1, 1],
//       allowsEditing: true,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//       const imageUri = result.assets[0];
//       console.log(imageUri);
//       let newFile = {
//         uri: result.assets[0].uri,
//         type: `test/${result.assets[0].uri.split(".")[1]}`,
//         name: `test.${result.assets[0].uri.split(".")[1]}`,
//       };
//       setImageuriLocal(newFile);
//       // const imgData = await uploadFileOnCloudinary(newFile);
//     }
//   };

//   const handleAddPost = async () => {
//     setLoading(true); // Start loading animation
//     Keyboard.dismiss();

//     if (!image) {
//       alert("Please select an image.");
//       setLoading(false);

//       return;
//     }
//     if (!description) {
//       alert("Please add description.");
//       setLoading(false);

//       return;
//     }
//     const uploadedUrl = await uploadFileOnCloudinary(imageuriLocal);
//     console.log("loader " + uploadedUrl);
//     const data = await AsyncStorage.getItem("@auth");
//     let loginData = JSON.parse(data);
//     let userId = loginData.user._id;

//     const postData = {
//       imageUrl: uploadedUrl,
//       description: description,
//       postedBy: userId,
//       isSponsored: false,
//       approved: false,
//     };

//     try {
//       const response = await axios.post("posts/create-post", postData);
//       console.log("Create Post Response: ", response.data);

//       setShowAlert(true);
//       setAlertMessage(
//         "Your post has been submitted successfully and is awaiting review by our team. Thank you!"
//       );
//       // onClose();
//     } catch (error) {
//       console.error("Error creating post: ", error);
//       Keyboard.dismiss();
//       setLoading(false);
//       setShowAlert(true); // Show the error alert card
//       setAlertMessage("Appreciated Efforts.. But Please Try Again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOnClose = () => {
//     setImage(null);
//     setDescription("");
//     setShowAlert(false);
//     onClose();
//   };

//   const uploadFileOnCloudinary = async (img) => {
//     // setLoading(true); // Start loading animation

//     const data = new FormData();
//     data.append("file", img);
//     data.append("upload_preset", "meadhikari");
//     data.append("cloud_name", "sdchavan");
//     data.append("folder", "posts"); // Upload to 'profile' folder

//     try {
//       const response = await fetch(
//         "https://api.cloudinary.com/v1_1/sdchavan/image/upload",
//         {
//           method: "post",
//           body: data,
//         }
//       );
//       const result = await response.json();

//       setImageCloudUrl(result.url);
//       setImageCloudPublicId(result.public_id);
//       const pubId = await result.public_id;
//       return pubId;
//     } catch (error) {
//       console.error("Error uploading image to Cloudinary:", error);
//     } finally {
//       setLoading(false); // Stop loading animation
//     }
//   };

//   // Function to handle cancel button click
//   const handleCancel = async () => {
//     onClose();
//   };

//   return (
//     <View style={styles.modalContainer}>
//       <View style={styles.modalContent}>
//         {loading && <LoadingAnimation visible={loading} loop={true} />}

//         {showAlert && (
//           <PostAlert
//             isVisible={showAlert}
//             onClose={handleOnClose}
//             message={alertMessage}
//           />
//         )}

//         <TouchableOpacity
//           style={styles.selectImgBtn}
//           onPress={handleImageUpload}
//         >
//           <LinearGradient
//             colors={["#ff7e5f", "#feb47b"]}
//             style={styles.selectImgBtnGradient}
//           >
//             <FontAwesome5 name="image" size={16} color={Color.colorWhite} />
//             <Text style={styles.selectImgBtnTxt}>Select Image</Text>
//           </LinearGradient>
//         </TouchableOpacity>

//         {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

//         <TextInput
//           placeholder="Add Description..."
//           placeholderTextColor="#666"
//           value={description}
//           onChangeText={setDescription}
//           multiline={true}
//           style={styles.descriptionInput}
//           keyboardType="default"
//         />

//         <View style={styles.btnContainer}>
//           <TouchableOpacity style={styles.actionBtn} onPress={handleAddPost}>
//             <LinearGradient
//               colors={["#6a11cb", "#2575fc"]}
//               style={styles.actionBtnGradient}
//             >
//               <FontAwesome5 name="plus" size={16} color={Color.colorWhite} />
//               <Text style={styles.actionBtnTxt}>Add Post</Text>
//             </LinearGradient>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.actionBtn} onPress={handleCancel}>
//             <LinearGradient
//               colors={["#ff416c", "#ff4b2b"]}
//               style={styles.actionBtnGradient}
//             >
//               <FontAwesome5 name="times" size={16} color={Color.colorWhite} />
//               <Text style={styles.actionBtnTxt}>Cancel</Text>
//             </LinearGradient>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//     width: "100%",
//   },
//   modalContent: {
//     backgroundColor: "#fff",
//     borderRadius: 15,
//     padding: 20,
//     width: "90%",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 5,
//     },
//     shadowOpacity: 0.34,
//     shadowRadius: 6.27,
//     elevation: 10,
//   },
//   selectImgBtn: {
//     marginBottom: 20,
//     marginTop: "5%",
//   },
//   selectImgBtnGradient: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 10,
//     paddingHorizontal: "15%",
//     borderRadius: 15,
//   },
//   selectImgBtnTxt: {
//     color: Color.colorWhite,
//     marginLeft: 10,
//   },
//   imagePreview: {
//     width: "100%",
//     height: 300,
//     marginVertical: 10,
//     alignSelf: "center",
//     borderColor: Color.primaryColor,
//     borderWidth: 1,
//     borderRadius: 15,
//   },
//   descriptionInput: {
//     width: "100%",
//     height: 100,
//     borderColor: Color.primaryColor,
//     borderWidth: 1,
//     borderRadius: 15,
//     padding: 10,
//     marginBottom: 10,
//     textAlignVertical: "top",
//     color: "#333",
//   },
//   btnContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 20,
//   },
//   actionBtn: {
//     width: "45%",
//   },
//   actionBtnGradient: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 10,
//     borderRadius: 15,
//     justifyContent: "center",
//   },
//   actionBtnTxt: {
//     color: Color.colorWhite,
//     marginLeft: 10,
//   },
// });

// export default AddPostModal;

import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Keyboard,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Color } from "../../GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import LoadingAnimation from "../Loader/loader";
import PostAlert from "../Alert/PostAlert";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import MessageAlert from "../Alert/MessageAlert";

const AddPostModal = ({ onClose, onAddPost }) => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [imageuriLocal, setImageuriLocal] = useState(null);

  const [loading, setLoading] = useState(false);
  const [imageCloudUrl, setImageCloudUrl] = useState("");
  const [imageCloudPublicId, setImageCloudPublicId] = useState("");

  // const [postSuccessAlert, setPostSuccessAlert] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // State to control alert visibility
  const [alertMessage, setAlertMessage] = useState("");

  const [messageAlertVisible, setMessageAlertVisible] = useState(false);
  const [messageAlertText, setMessageAlertText] = useState("");
  const [messageAlertTitle, setMessageAlertTitle] = useState("");

  const handleImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const imageUri = result.assets[0];
      console.log(imageUri);
      let newFile = {
        uri: result.assets[0].uri,
        type: `test/${result.assets[0].uri.split(".")[1]}`,
        name: `test.${result.assets[0].uri.split(".")[1]}`,
      };
      setImageuriLocal(newFile);
      // const imgData = await uploadFileOnCloudinary(newFile);
    }
  };

  const handleAddPost = async () => {
    setLoading(true); // Start loading animation
    Keyboard.dismiss();

    if (!image) {
      // alert("Please select an image.");
      setMessageAlertVisible(true);
      setMessageAlertText("Please select an image by clicking on button");
      setLoading(false);

      return;
    }
    if (!description) {
      // alert("Please add description.");
      setMessageAlertVisible(true);
      setMessageAlertText("Please add description.");
      setLoading(false);

      return;
    }
    const uploadedUrl = await uploadFileOnCloudinary(imageuriLocal);
    console.log("loader " + uploadedUrl);
    const data = await AsyncStorage.getItem("@auth");
    let loginData = JSON.parse(data);
    let userId = loginData.user._id;

    const postData = {
      imageUrl: uploadedUrl,
      description: description,
      postedBy: userId,
      isSponsored: false,
      approved: false,
    };

    try {
      const response = await axios.post("posts/create-post", postData);
      console.log("Create Post Response: ", response.data);

      setShowAlert(true);
      setAlertMessage(
        "Your post has been submitted successfully and is awaiting review by our team. Thank you!"
      );
      // onClose();
    } catch (error) {
      console.error("Error creating post: ", error);
      Keyboard.dismiss();
      setLoading(false);
      setShowAlert(true); // Show the error alert card
      setAlertMessage("Appreciated Efforts.. But Please Try Again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOnClose = () => {
    setImage(null);
    setDescription("");
    setShowAlert(false);
    onClose();
  };

  const uploadFileOnCloudinary = async (img) => {
    // setLoading(true); // Start loading animation

    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "meadhikari");
    data.append("cloud_name", "sdchavan");
    data.append("folder", "posts"); // Upload to 'profile' folder

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/sdchavan/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const result = await response.json();

      setImageCloudUrl(result.url);
      setImageCloudPublicId(result.public_id);
      const pubId = await result.public_id;
      return pubId;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
    } finally {
      setLoading(false); // Stop loading animation
    }
  };

  // Function to handle cancel button click
  const handleCancel = async () => {
    onClose();
  };

  const onMessageAlertClose = () => {
    setMessageAlertVisible(false);
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        {loading && <LoadingAnimation visible={loading} loop={true} />}

        {showAlert && (
          <PostAlert
            isVisible={showAlert}
            onClose={handleOnClose}
            message={alertMessage}
          />
        )}

        {messageAlertVisible && (
          <MessageAlert
            message={messageAlertText}
            onClose={onMessageAlertClose}
          />
        )}

        <Text style={styles.modalTitle}>Add New Post</Text>

        <TouchableOpacity
          style={styles.selectImgBtn}
          onPress={handleImageUpload}
        >
          <LinearGradient
            colors={["#ff7e5f", "#feb47b"]}
            style={styles.selectImgBtnGradient}
          >
            <FontAwesome5 name="image" size={20} color={Color.colorWhite} />
            <Text style={styles.selectImgBtnTxt}>
              {image ? "Change Image" : "Select Image From Gallary"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {image ? (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <FontAwesome5
              name="image"
              size={50}
              color="#ccc"
              style={{ marginBottom: 10 }}
            />
            <Text style={styles.placeholderText}>No Image Selected</Text>
          </View>
        )}

        <Text style={styles.label}>Description</Text>
        <TextInput
          placeholder="Add Description..."
          placeholderTextColor="#666"
          value={description}
          onChangeText={setDescription}
          multiline={true}
          style={styles.descriptionInput}
          keyboardType="default"
        />

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.actionBtn} onPress={handleAddPost}>
            <LinearGradient
              colors={["#6a11cb", "#2575fc"]}
              style={styles.actionBtnGradient}
            >
              <Ionicons
                name="checkmark-done-circle"
                size={20}
                color={Color.colorWhite}
              />
              <Text style={styles.actionBtnTxt}>Upload</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={handleCancel}>
            <LinearGradient
              colors={["#ff416c", "#ff4b2b"]}
              style={styles.actionBtnGradient}
            >
              <FontAwesome5 name="times" size={20} color={Color.colorWhite} />
              <Text style={styles.actionBtnTxt}>Cancel</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  selectImgBtn: {
    marginBottom: 20,
    marginTop: "5%",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  selectImgBtnGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingHorizontal: "15%",
    borderRadius: 15,
  },
  selectImgBtnTxt: {
    color: Color.colorWhite,
    marginLeft: 10,
  },
  imagePreview: {
    width: "100%",
    height: 300,
    marginVertical: 10,
    alignSelf: "center",
    borderColor: Color.primaryColor,
    borderWidth: 1,
    borderRadius: 15,
  },
  imagePlaceholder: {
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 15,
    marginVertical: 10,
  },
  placeholderText: {
    color: "#666",
    fontSize: 16,
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  descriptionInput: {
    height: 80,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    textAlignVertical: "top",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  actionBtn: {
    flex: 1,
    marginHorizontal: 5,
  },
  actionBtnGradient: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  actionBtnTxt: {
    color: Color.colorWhite,
    marginLeft: 10,
  },
});

export default AddPostModal;
