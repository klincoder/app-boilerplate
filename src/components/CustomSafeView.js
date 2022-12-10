// Import resources
import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import tw from "twrnc";

// Import custom files
import { appColors } from "../config/data";

// Component
const CustomSafeView = ({ statusBg, style, children }) => {
  // Return component
  return (
    <SafeAreaView style={[tw`flex-1 bg-[${appColors?.white}]`, style]}>
      {/** Status bar */}
      <StatusBar
        style="auto"
        barStyle={statusBg ? "light-content" : "dark-content"}
        backgroundColor={statusBg || appColors?.white}
      />
      {/** Children */}
      {children}
    </SafeAreaView>
  ); // close return
}; // close component

// Export
export default CustomSafeView;
