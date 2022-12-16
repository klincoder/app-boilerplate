// Import resources
import React from "react";
import { View } from "react-native";
import tw from "twrnc";

// Import custom files
import CustomText from "./CustomText";

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
        tw`absolute z-1 bottom-0 right-0 left-0 px-2 p-3 bg-white opacity-90`,
      ]}
    >
      {children}
    </View>
  ); // close return
}; // close component

// Export
export default StickyBottomView;
