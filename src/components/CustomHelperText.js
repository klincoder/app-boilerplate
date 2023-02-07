// Import resources
import React from "react";

// Import custom files
import CustomText from "./CustomText";
import { tw } from "../config/data";

// Component
const CustomHelperText = ({ title, visible, isError, styleText, ...rest }) => {
  // If not visible or empty title
  if (!visible || !title) return null;

  // Debug
  // console.log("Debug customHelperText: ")

  // Return component
  return (
    <CustomText
      {...rest}
      visible={visible}
      style={[
        styleText,
        tw`text-xs font-medium`,
        isError ? tw`text-danger` : tw`mt-0.5 text-gray`,
      ]}
    >
      {title}
    </CustomText>
  ); // close return
}; // close component

// Export
export default CustomHelperText;
