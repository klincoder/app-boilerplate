// Import resources
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

// Import custom files
import routes from "../screens/routes";

// Component
const useCustomAlertState = () => {
  // Define state
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState();
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Define navigation
  const navigation = useNavigation();

  // Debug
  //console.log("Debug useCustomAlertState: ")

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
    goToLogin,
    setHasError,
    handleErrorCode,
    goBackToPrev,
  }; // close retun
}; // close component

// Export
export default useCustomAlertState;
