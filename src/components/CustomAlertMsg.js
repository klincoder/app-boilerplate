// Import resources
import React from "react";
import { View } from "react-native";
import tw from "twrnc";

// Import custom files
import twStyles from "../config/twStyles";
import CustomText from "./CustomText";
import CustomIcon from "./CustomIcon";
import { appColors } from "../config/data";

// Component
const CustomAlertMsg = ({
  title,
  titleColor,
  iconType,
  iconName,
  iconSize,
  iconColor,
  hideIcon,
  description,
  actions,
  styleTitleText,
  styleDescText,
  styleActionsContainer,
}) => {
  // Define variables
  title = title || "No Result";
  titleColor = titleColor || `text-[${appColors?.primary}]`;
  iconType = iconType || "antDesign";
  iconName = iconName || "warning";
  iconSize = iconSize || 50;
  iconColor = iconColor || appColors?.primary;

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
          color={iconColor}
          style={tw`mb-3`}
        />
      )}

      {/** Title */}
      <View style={tw`mb-2 w-65`}>
        <CustomText
          style={[
            styleTitleText,
            tw`text-xl text-center ${titleColor}`,
            twStyles?.fontBold,
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
              styleDescText,
              tw`text-center text-sm`,
              twStyles?.fontRegular,
            ]}
          >
            {description}
          </CustomText>
        </View>
      )}

      {/** Actions */}
      {actions && <View style={styleActionsContainer}>{actions}</View>}
    </View>
  ); // close return
}; // close component

// Export
export default CustomAlertMsg;
