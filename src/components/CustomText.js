// Import resources
import React from "react";
import { Text } from "@rneui/themed";

// Import custom files
import twStyles from "../config/twStyles";

// Component
const CustomText = ({ children, style, ...rest }) => {
  // Return component
  return (
    <Text {...rest} style={style || twStyles?.fontRegular}>
      {children}
    </Text>
  ); // close return
}; // close component

// Export
export default CustomText;
