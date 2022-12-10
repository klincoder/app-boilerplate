// Import resources
import React from "react";
import { Chip, withTheme, lightColors } from "@rneui/themed";

// Import custom files
import CustomButton from "./CustomButton";
import CustomListItem from "./CustomListItem";
import { appColors } from "../config/data";

// Component
const CustomRadio = ({ title, value, onValueChange, onPress, ...rest }) => {
  // Debug
  //console.log("Debug customRadio: ",)

  // Return component
  return (
    <CustomButton isTouchable onPress={onPress}>
      <CustomListItem {...rest} title={title} />
    </CustomButton>
  ); // close return
}; // close component

// Export
export default CustomRadio;
