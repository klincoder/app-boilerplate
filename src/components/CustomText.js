// Import resources
import React from "react";
import { Text } from "@rneui/themed";

// Import custom files
import { appFonts } from "../config/data";

// Component
const CustomText = ({ children, style, ...rest }) => {
  // Return component
  return (
    <Text style={style || { fontFamily: appFonts?.regular }} {...rest}>
      {children}
    </Text>
  ); // close return
}; // close component

// Export
export default CustomText;
