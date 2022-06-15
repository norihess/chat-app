<<<<<<< HEAD
import React from "react";
import PropTypes from "prop-types";
//imports for communicatios features (permission and device camera/image gallery)
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
//native component to allow text components to be clickable (and button)
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { storage } from "../firebase-config/firebase-config";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export default class CustomActions extends React.Component {
  imagePicker = async () => {
    // expo permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    try {
      if (status === "granted") {
        // pick image
        let result = await ImagePicker.launchImageLibraryAsync({
=======
/**
 * @description this file handles the CustomAction button in text input field
 * @class CustomActions
 * @requires React
 * @requires React-Native
 * @requires Prop-Types
 * @requires Expo-Image-Picker
 * @requires Expo-Permissions
 * @requires Expo-Location
 * @requires Firebase
 * @requires Firestore
 */

//  import PropTypes
import PropTypes from "prop-types";
//import react
import React from "react";
//import necessary components from react-native
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
//import permissions and imagepicker
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import firebase from 'firebase';
import firestore from 'firebase';
//import firebase
// const firebase = require("firebase");
// require("firebase/firestore");

export default class CustomActions extends React.Component {
  /**
   * Let the user pick an image from the device's image library
   * @function imagePicker
   * @async
   */
  imagePicker = async () => {
    // expo permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    try {
      if (status === "granted") {
        // pick image
        const result = await ImagePicker.launchImageLibraryAsync({
>>>>>>> c30020300203c3a8b353a2f5d92cbc4badd4a033
          mediaTypes: ImagePicker.MediaTypeOptions.Images, // only images are allowed
        }).catch((error) => console.log(error));
        // canceled process
        if (!result.cancelled) {
          const imageUrl = await this.uploadImageFetch(result.uri);
          this.props.onSend({ image: imageUrl });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
   * Let the user take a photo with device's camera
   * @function takePhoto
   * @async
   */
  takePhoto = async () => {
<<<<<<< HEAD
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    try {
      if (status === "granted") {
        let result = await ImagePicker.launchCameraAsync({
=======
    const { status } = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    try {
      if (status === "granted") {
        const result = await ImagePicker.launchCameraAsync({
>>>>>>> c30020300203c3a8b353a2f5d92cbc4badd4a033
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        }).catch((error) => console.log(error));

        if (!result.cancelled) {
          const imageUrl = await this.uploadImageFetch(result.uri);
          this.props.onSend({ image: imageUrl });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

<<<<<<< HEAD
  //location function
  getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const result = await Location.getCurrentPositionAsync({}).catch(
          (error) => console.log(error)
        );
=======
  /**
   * get the location of the user by using GPS
   * @function getLocation
   * @async
   */
  getLocation = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === "granted") {
        const result = await Location.getCurrentPositionAsync(
          {}
        ).catch((error) => console.log(error));
        const longitude = JSON.stringify(result.coords.longitude);
        const altitude = JSON.stringify(result.coords.latitude);
>>>>>>> c30020300203c3a8b353a2f5d92cbc4badd4a033
        if (result) {
          this.props.onSend({
            location: {
              longitude: result.coords.longitude,
              latitude: result.coords.latitude,
            },
          });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

<<<<<<< HEAD
  uploadImageFetch = async (uri) => {
    //To create your own blob, you need to create a new XMLHttpRequest and set its responseType to 'blob'. Then, open the connection and retrieve the URI’s data (the image) via GET:
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      //on load
      xhr.onload = function () {
        resolve(xhr.response);
      };
      //on error
=======
  /**
   * Upload images to firebase
   * @function uploadImageFetch
   * @async
   */
  uploadImageFetch = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
>>>>>>> c30020300203c3a8b353a2f5d92cbc4badd4a033
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
<<<<<<< HEAD
      //on complete
=======
>>>>>>> c30020300203c3a8b353a2f5d92cbc4badd4a033
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const imageNameBefore = uri.split("/");
    const imageName = imageNameBefore[imageNameBefore.length - 1];
<<<<<<< HEAD
    // Create a child reference
    //images will be uploaded in the subfolder "images"
    const imagesRef = ref(storage, `images/${imageName}`);
    // imagesRef now points to 'images'
    //upload blob
    await uploadBytes(imagesRef, blob);
    console.log("blob uploaded");
    const downloadUrl = await getDownloadURL(imagesRef);
    console.log(
      "file available on firebase storage at the following link",
      downloadUrl
    );
    return downloadUrl;
  };

  onActionPress = () => {
    const options = [
      "Choose form library",
      "Take picture",
      "Send location",
=======

    const ref = firebase.storage().ref().child(`images/${imageName}`);

    const snapshot = await ref.put(blob);

    blob.close();

    return await snapshot.ref.getDownloadURL();
  };

  /**
   * function that handles communication features
   * @function onActionPress
   */
  onActionPress = () => {
    const options = [
      "Choose From Library",
      "Take Picture",
      "Send Location",
>>>>>>> c30020300203c3a8b353a2f5d92cbc4badd4a033
      "Cancel",
    ];
    const cancelButtonIndex = options.length - 1;
    console.log(this.context)
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            console.log("user wants to pick an image");
            return this.imagePicker();
          case 1:
            console.log("user wants to take a photo");
            return this.takePhoto();
          case 2:
            console.log("user wants to get their location");
            return this.getLocation();
        }
      }
    );
  };
<<<<<<< HEAD
  render() {
    return (
      <TouchableOpacity style={[styles.container]} onPress={this.onActionPress}>
=======

  //render function
  render() {
    return (
      <TouchableOpacity
        accessible={true}
        accessibilityLabel="More options"
        accessibilityHint="Let’s you choose to send an image or your geolocation."
        style={[styles.container]}
        onPress={this.onActionPress}
      >
>>>>>>> c30020300203c3a8b353a2f5d92cbc4badd4a033
        <View style={[styles.wrapper, this.props.wrapperStyle]}>
          <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: "#b2b2b2",
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: "#b2b2b2",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "transparent",
    textAlign: "center",
  },
});

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
};
