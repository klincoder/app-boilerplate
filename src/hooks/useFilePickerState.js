// Import resources
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

// Import custom files

// Component
const useFilePickerState = () => {
  // Define state
  const [fileInfo, setFileInfo] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Define variables
  let testFxn;

  // Debug
  //console.log("Debug useFilePickerState: ", );

  // FUNCTIONS
  // HANDLE PICK IMAGE
  const handlePickImage = async (mediaType, editMedia) => {
    // Define variables
    mediaType = mediaType?.toLowerCase();
    const isAll = mediaType === "all";
    const isVideo = mediaType === "video";
    const isEditMedia = editMedia === true ? true : false;
    const finalMediaType = isAll
      ? ImagePicker.MediaTypeOptions.All
      : isVideo
      ? ImagePicker.MediaTypeOptions.Videos
      : ImagePicker.MediaTypeOptions.Images;
    // No permissions request is necessary for launching the image library
    // Try catch
    try {
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: finalMediaType,
        allowsEditing: isEditMedia,
        aspect: [4, 3],
        quality: 1,
      }).then((res) => {
        // Define res data
        const resData = res?.assets;
        const resFile1 = resData?.[0]?.url;
        const isSelected = res?.canceled === false;
        // If isSelected
        if (isSelected) {
          setFileInfo(resData);
          setSelectedImage(resFile1);
          // Debug
          console.log("Debug handlePickImage: ", res);
          // Return
          //return { resData, resFile1 };
        } // close if
      });
    } catch (err) {
      console.log("Debug handlePickImage: ", err.message);
    } // close try catch
  }; // close fxn

  // Return component
  return { fileInfo, selectedImage, handlePickImage }; // close return
}; // close component

// Export
export default useFilePickerState;
