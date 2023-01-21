// Import resources
import React from "react";
import { View } from "react-native";
import tw from "twrnc";

// Import custom files
import CustomText from "./CustomText";
import { appColors } from "../config/data";

// Component
const StickyBottomView = ({ styleContainer, children, ...rest }) => {
  // Debug
  //console.log("Debug stickyBottomView: ",)

  // Return component
  return (
    <View
      {...rest}
      style={[
        styleContainer,
        tw`absolute z-1 bottom-0 right-0 left-0 px-4 py-3`,
      ]}
    >
      {children}
    </View>
  ); // close return
}; // close component

// Export
export default StickyBottomView;
