// Import resources
import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import tw from "twrnc";
//import { StatusBar } from "expo-status-bar";

// Import custom files
import { appColors } from "../config/data";

// Component
const CustomSafeView = ({ style, children, ...rest }) => {
  // Return component
  return (
    <SafeAreaView style={[tw`flex-1 bg-[${appColors?.white}]`, style]}>
      {/** Status bar */}
      <StatusBar {...rest} style="dark" />
      {/** Children */}
      {children}
    </SafeAreaView>
  ); // close return
}; // close component

// Export
export default CustomSafeView;
