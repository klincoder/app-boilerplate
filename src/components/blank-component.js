// Import resources
import React from "react";
import { View } from "react-native";

// Import custom files
import CustomText from "./CustomText";
import useAppSettings from "../hooks/useAppSettings";
import useAuthState from "../hooks/useAuthState";
import { tw } from "../config/data";

// Component
const BlankComponent = () => {
  // Define app settings
  const { navigation } = useAppSettings();

  // Define state
  const { user } = useAuthState();

  // Debug
  //console.log("Debug blankComponent: ",)

  // Return component
  return (
    <View>
      <CustomText>Content goes here</CustomText>
    </View>
  ); // close return
}; // close component

// Export
export default BlankComponent;
