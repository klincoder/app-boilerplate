// Import resources
import React from "react";
import { Switch, View } from "react-native";
import tw from "twrnc";

// Import custom files
import CustomListItem from "./CustomListItem";
import { appColors } from "../config/data";

// Component
const CustomSwitch = ({
  title,
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
      isNormal
      hideDivider
      title={title || "Switch"}
      containerStyle={[tw`p-0`, styleContainer]}
      rightIcon={
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
