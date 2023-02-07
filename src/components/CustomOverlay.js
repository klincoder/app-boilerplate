// Import resources
import React from "react";
import { View } from "react-native";
import { Overlay } from "@rneui/themed";

// Import custom files
import { tw } from "../config/data";

// Component
const CustomOverlay = ({ visible, styleBg, children, ...rest }) => {
  // Debug
  //console.log("Debug CustomOverlay: ",)

  // Return component
  return (
    <Overlay
      {...rest}
      isVisible={visible}
      backdropStyle={styleBg || tw`bg-black opacity-90`}
      overlayStyle={tw`p-0 m-0 bg-transparent rounded-full`}
    >
      {children}
    </Overlay>
  ); // close return
}; // close component

// Export
export default CustomOverlay;
