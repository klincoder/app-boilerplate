// Import resources
import React from "react";
import { View } from "react-native";
import tw from "twrnc";

// Import custom files
import twStyles from "../config/twStyles";
import CustomText from "./CustomText";
import useAppSettings from "../hooks/useAppSettings";
import CustomIcon from "./CustomIcon";
import { appColors } from "../config/data";

// Component
const NoResultMsg = ({ title, iconType, iconName, iconSize, iconColor }) => {
  // Define app settings
  const { navigation } = useAppSettings();

  // Define variables
  title = title || "No Result";
  iconType = iconType || "antDesign";
  iconName = iconName || "warning";
  iconSize = iconSize || 60;
  iconColor = iconColor || appColors?.lightGray;

  // Debug
  //console.log("Debug noResultMsg: ",)

  // Return component
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      {/** Icon */}
      <CustomIcon
        type={iconType}
        name={iconName}
        size={iconSize}
        color={iconColor}
      />

      {/** Title */}
      <CustomText style={[tw`w-50 text-center`, twStyles?.fontBold]}>
        {title}
      </CustomText>
    </View>
  ); // close return
}; // close component

// Export
export default NoResultMsg;
