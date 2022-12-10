// Import resources
import React from "react";
import Toast from "react-native-toast-message";

// Import custom files

// Component
const useCustomToastState = () => {
  // FUNCTIONS
  // Define success
  const success = (message) => {
    Toast.show({
      type: "success",
      position: "top",
      text1: "Success",
      text2: message,
      visibilityTime: 5000,
      autoHide: true,
      topOffset: 20,
      bottomOffset: 50,
    });
  }; // close fxn

  // Define error
  const error = (message) => {
    Toast.show({
      type: "error",
      position: "top",
      text1: "Error",
      text2: message,
      visibilityTime: 8000,
      autoHide: true,
      topOffset: 20,
      bottomOffset: 50,
    });
  }; // close fxn

  // Define toast info
  const info = (message) => {
    Toast.show({
      type: "info",
      position: "top",
      text1: "Info",
      text2: message,
      visibilityTime: 8000,
      autoHide: true,
      topOffset: 20,
      bottomOffset: 50,
    });
  }; // close fxn

  // Return component
  return { success, error, info }; // close return
}; // close component

// Export
export default useCustomToastState;
