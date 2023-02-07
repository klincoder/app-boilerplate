// Import resources
import React from "react";
import { Switch } from "react-native";

// Import custom files
import CustomListItem from "./CustomListItem";
import { tw } from "../config/data";

// Component
const CustomSwitch = ({
  label,
  value,
  leftImage,
  leftIconType,
  leftIconName,
  onValueChange,
  styleContainer,
  ...rest
}) => {
  // Debug
  //console.log("Debug customSwitch: ")

  // Return component
  return (
    <CustomListItem
      {...rest}
      hideDivider
      title={label || "Switch"}
      styleContainer={[styleContainer, tw`mb-3 mx-3 p-0`]}
      rightContent={
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ true: "#8d3f72", false: "#9ca3af" }}
          thumbColor={"#8d3f72"}
        />
      }
    />
  ); // close return
}; // close component

// Export
export default CustomSwitch;
