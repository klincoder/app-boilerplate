// Import resources
import { useState } from "react";
import Toast from "react-native-toast-message";

// Import custom files
import routes from "../screens/routes";
import useAppSettings from "./useAppSettings";

// Component
const useAlertState = () => {
  // Define app settings
  const { navigation } = useAppSettings();

  // Define state
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState();
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Debug
  //console.log("Debug useAlertState: ")

  // FUNCTIONS
  // HANDLE SHOW ALERT
  const showAlert = (msg) => {
    setMessage(msg);
    setVisible(true);
  }; // close fxn

  // HANDLE HIDE ALERT
  const hideAlert = () => setVisible(false);

  // SHOW LOADING
  const showLoading = () => setLoading(true);

  // HIDE LOADING
  const hideLoading = () => setLoading(false);

  // HANDLE TOAST SUCCESS
  const success = (msg) => {
    Toast.show({
      type: "success",
      position: "top",
      text1: "Success",
      text2: msg,
      visibilityTime: 5000,
      autoHide: true,
      topOffset: 20,
      bottomOffset: 50,
    });
  }; // close fxn

  // HANDLE TOAST ERROR
  const error = (msg) => {
    Toast.show({
      type: "error",
      position: "top",
      text1: "Error",
      text2: msg,
      visibilityTime: 8000,
      autoHide: true,
      topOffset: 20,
      bottomOffset: 50,
    });
  }; // close fxn

  // HANDLE TOAST INFO
  const info = (msg) => {
    Toast.show({
      type: "info",
      position: "top",
      text1: "Info",
      text2: msg,
      visibilityTime: 8000,
      autoHide: true,
      topOffset: 20,
      bottomOffset: 50,
    });
  }; // close fxn

  // HANDLE GO TO LOGIN SCREEN
  const goToLogin = () => {
    hideAlert();
    navigation.navigate(routes.LOGIN);
  }; // close fxn

  // HANDLE GO TO PREVIOUS SCREEN
  const goBackToPrev = () => {
    hideAlert();
    navigation.goBack();
  }; // close fxn

  // HANDLE FIREBASE ERROR CODE
  const handleErrorCode = (errCode) => {
    let customErrMsg;
    // If hasError
    if (hasError) {
      // Switch error code
      switch (errCode) {
        case "auth/wrong-password":
          customErrMsg = "Wrong password";
          break;
        default:
          customErrMsg = "Unknown error occured";
          break;
      } // close switch
    } // close if hasError
    // Return
    return setMessage(customErrMsg);
  }; // close fxn

  // Return component
  return {
    visible,
    message,
    hasError,
    loading,
    setMessage,
    showAlert,
    hideAlert,
    showLoading,
    hideLoading,
    success,
    error,
    info,
    goToLogin,
    setHasError,
    handleErrorCode,
    goBackToPrev,
  }; // close retun
}; // close component

// Export
export default useAlertState;
