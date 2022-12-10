// Import resources
import React from "react";
import { View } from "react-native";
import tw from "twrnc";
import { Overlay } from "@rneui/themed";

// Import custom files

// Component
const CustomOverlay = ({ visible, children, ...rest }) => {
  // Debug
  //console.log("Debug CustomOverlay: ",)

  // Return component
  return (
    <Overlay
      {...rest}
      isVisible={visible}
      backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      overlayStyle={tw`p-0 m-0 bg-white rounded-full`}
    >
      {children}
    </Overlay>
  ); // close return
}; // close component

// Export
export default CustomOverlay;
