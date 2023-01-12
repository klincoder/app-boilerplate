// Import resources
import * as ImagePicker from "expo-image-picker";

// Import custom files
import { handleRandomCode } from "../config/functions";
import {
  ref,
  fireStorage,
  getDownloadURL,
  uploadBytesResumable,
} from "../config/firebase";

// Component
const useFilePickerState = () => {
  // Debug
  //console.log("Debug useFilePickerState: ", );

  // FUNCTIONS
  // HANDLE PICK FILE
  const handlePickFile = async (currFiles, allowBulk, mediaType, editMedia) => {
    // If empty args, return
    if (!currFiles) return;
    // Define variables
    mediaType = mediaType?.toLowerCase() || "image";
    allowBulk = allowBulk || false;
    const isAll = mediaType === "all";
    const isVideo = mediaType === "video";
    const isEditMedia = editMedia ? true : false;
    const finalMediaType = isAll
      ? ImagePicker.MediaTypeOptions.All
      : isVideo
      ? ImagePicker.MediaTypeOptions.Videos
      : ImagePicker.MediaTypeOptions.Images;
    // No permissions request is necessary for launching the image library
    // Try catch
    try {
      return await ImagePicker.launchImageLibraryAsync({
        mediaTypes: finalMediaType,
        allowsEditing: isEditMedia,
        allowsMultipleSelection: allowBulk,
        aspect: [4, 3],
        quality: 1,
      }).then((res) => {
        // Define variables
        const resData = res?.assets;
        const currFilesLen = currFiles?.length;
        const isSelected = res?.canceled === false;
        const isCurrFiles = currFilesLen > 0;
        const rawFiles = isCurrFiles ? [...currFiles, ...resData] : resData; // merge object arrays
        const files = [...new Set(rawFiles)]; // remove duplicates
        //console.log("Debug fxn 1: ", files);
        // If isSelected
        if (isSelected) {
          return files;
        } else {
          return files;
        } // close if
      });
    } catch (err) {
      //console.log("Debug handlePickFile: ", err.message);
    } // close try catch
  }; // close fxn

  // HANDLE REMOVE FILE
  const handleRemoveFile = (objArr, id) => {
    // If empty args, return
    if (!objArr || !id) return [];
    const getNewArr = objArr?.filter((i) => i?.assetId !== id);
    return getNewArr;
  }; // close fxn

  // HANDLE UPLOAD FILE
  const handleUploadFile = async (images, username) => {
    // If empty args, return
    if (!images || !username) return;
    // Define variables
    let linksArr = [];
    // Upload files in a loop and get array of links
    await Promise.all(
      images?.map(async (item) => {
        // Define item variables
        const itemFile = item?.uri;
        // Create blob file
        const blobFile = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = () => resolve(xhr.response);
          xhr.onerror = () => reject(new TypeError("Network request failed"));
          xhr.responseType = "blob";
          xhr.open("GET", itemFile, true);
          xhr.send(null);
        });
        // Create file name
        const randomCode = handleRandomCode(4);
        const fileExt = "." + itemFile?.split(".").pop();
        const fileName = `file-${randomCode}${fileExt}`;
        // Create storage ref
        const storageRef = ref(fireStorage, `/${username}/${fileName}`);
        const uploadTask = await uploadBytesResumable(storageRef, blobFile);
        const url = await getDownloadURL(uploadTask.ref);
        linksArr.push(url);
      }) // close loop
    ); // close promise all
    //console.log("Debug uploadFile 3: ", linksArr);
    return linksArr;
  }; // close fxn

  // Return component
  return { handlePickFile, handleRemoveFile, handleUploadFile }; // close return
}; // close component

// Export
export default useFilePickerState;
