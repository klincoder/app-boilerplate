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
        tw`absolute bottom-0 z-1 px-2 py-3 w-full`,
        { backgroundColor: "rgba(255, 255, 255, 0.7)" },
      ]}
    >
      {children}
    </View>
  ); // close return
}; // close component

// Export
export default StickyBottomView;
