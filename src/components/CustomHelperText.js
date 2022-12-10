// Import resources
import React from "react";
import tw from "twrnc";

// Import custom files
import CustomText from "./CustomText";
import { appColors, appFonts } from "../config/data";

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
        tw`text-xs ml-4`,
        { fontFamily: appFonts?.medium },
        isError
          ? tw`text-[${appColors?.danger}]`
          : tw`mt-0.5 text-[${appColors?.gray}]`,
      ]}
    >
      {title}
    </CustomText>
  ); // close return
}; // close component

// Export
export default CustomHelperText;
