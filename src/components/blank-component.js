// Import resources
import React from "react";
import { View } from "react-native";
import tw from "twrnc";

// Import custom files
import CustomText from "./CustomText";
import useAppSettings from "../hooks/useAppSettings";

// Component
const BlankComponent = () => {
  // Define app settings
  const { navigation } = useAppSettings();

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
