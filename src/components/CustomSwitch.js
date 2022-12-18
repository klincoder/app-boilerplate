// Import resources
import React from "react";
import { Switch, View } from "react-native";
import tw from "twrnc";

// Import custom files
import CustomListItem from "./CustomListItem";
import { appColors } from "../config/data";

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
      styleContainer={[tw`mb-3 mx-3 p-0`, styleContainer]}
      rightContent={
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ true: appColors?.primary, false: appColors?.disabled }}
          thumbColor={appColors?.primary}
        />
      }
    />
  ); // close return
}; // close component

// Export
export default CustomSwitch;
