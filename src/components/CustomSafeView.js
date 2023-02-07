// Import resources
import React from "react";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";

// Import custom files
import { tw } from "../config/data";

// Component
const CustomSafeView = ({
  styleContainer,
  styleStatusBar,
  children,
  ...rest
}) => {
  // Return component
  return (
    <SafeAreaView style={[styleContainer, tw`flex-1 bg-white`]}>
      {/** Status bar */}
      <StatusBar {...rest} style={styleStatusBar || "auto"} />
      {/** Children */}
      {children}
    </SafeAreaView>
  ); // close return
}; // close component

// Export
export default CustomSafeView;
