// Import resources
import React from "react";
import { View } from "react-native";

// Import custom files
import CustomText from "./CustomText";
import CustomIcon from "./CustomIcon";
import { tw } from "../config/data";

// Component
const CustomAlertMsg = ({
  title,
  iconType,
  iconName,
  iconSize,
  hideIcon,
  description,
  actions,
  styleTitleText,
  styleDescText,
  styleIcon,
}) => {
  // Define variables
  title = title || "No Result";
  iconType = iconType || "antDesign";
  iconName = iconName || "warning";
  iconSize = iconSize || 50;

  // Debug
  //console.log("Debug customAlertMsg: ",)

  // Return component
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      {/** Icon */}
      {!hideIcon && (
        <CustomIcon
          type={iconType}
          name={iconName}
          size={iconSize}
          style={[styleIcon || tw`text-primary`, tw`mb-3`]}
        />
      )}

      {/** Title */}
      <View style={tw`mb-2 w-65`}>
        <CustomText
          style={[
            styleTitleText || tw`text-primary`,
            tw`text-xl text-center font-medium`,
          ]}
        >
          {title}
        </CustomText>
      </View>

      {/** Description */}
      {description && (
        <View style={tw`mb-6 w-65`}>
          <CustomText
            style={[
              styleDescText || tw`text-black`,
              tw`text-center text-sm font-regular`,
            ]}
          >
            {description}
          </CustomText>
        </View>
      )}

      {/** Actions */}
      {actions && <>{actions}</>}
    </View>
  ); // close return
}; // close component

// Export
export default CustomAlertMsg;
