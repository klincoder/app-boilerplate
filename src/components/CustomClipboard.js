// Import resources
import React from "react";

// Import custom files
import useCustomClipboard from "../hooks/useCustomClipboard";
import CustomButton from "./CustomButton";
import CustomListItem from "./CustomListItem";

// Component
const CustomCopyText = ({ title, ...rest }) => {
  // Define copy to clipboard
  const { handleCopyToClipboard } = useCustomClipboard();

  // Return component
  return (
    <CustomButton isTouchable onPress={() => handleCopyToClipboard(title)}>
      <CustomListItem {...rest} title={title} leftIconName="copy1" />
    </CustomButton>
  ); // close return
}; // close component

// Export
export default CustomCopyText;
