// Import resources
import React from "react";
import { TouchableOpacity } from "react-native";
import { Button } from "@rneui/themed";
import tw from "twrnc";

// Import custom files
import CustomIcon from "./CustomIcon";
import CustomText from "./CustomText";
import { appColors, appFonts } from "../config/data";
import { twStyles } from "../config/twStyles";

// Component
const CustomButton = ({
  isNormal,
  isTouchable,
  isIcon,
  isText,
  title,
  type,
  iconType,
  iconName,
  onPress,
  styleText,
  styleTouchable,
  styleNormalTitle,
  styleNormalButton,
  children,
  ...rest
}) => {
  // Define variables
  const isOutline = type?.toLowerCase() === "outline";

  // Return component
  return (
    <>
      {/** isNormal */}
      {isNormal && (
        <Button
          {...rest}
          title={title || "Submit"}
          type={type || "solid"}
          onPress={onPress}
          titleStyle={[
            styleNormalTitle,
            tw`text-xl`,
            { fontFamily: appFonts?.medium },
            isOutline ? tw`text-[${appColors?.primary}]` : tw`text-white`,
          ]}
          buttonStyle={[
            styleNormalButton,
            tw`mt-3 rounded-lg`,
            isOutline
              ? tw`border-[${appColors?.primary}]`
              : tw`bg-[${appColors?.primary}]`,
          ]}
        />
      )}

      {/** isTouchable */}
      {isTouchable && (
        <TouchableOpacity
          {...rest}
          activeOpacity={0.8}
          onPress={onPress}
          style={styleTouchable}
        >
          <>{children}</>
        </TouchableOpacity>
      )}

      {/** isIcon */}
      {isIcon && (
        <CustomIcon
          {...rest}
          type={iconType}
          icon={iconName}
          onPress={onPress}
        />
      )}

      {/** isText */}
      {isText && (
        <TouchableOpacity {...rest} activeOpacity={0.6} onPress={onPress}>
          <CustomText
            style={[
              styleText,
              { fontFamily: appFonts?.medium },
              type === "button" ? twStyles?.linkBtn : twStyles?.linkText,
            ]}
          >
            {children}
          </CustomText>
        </TouchableOpacity>
      )}
    </>
  ); // close return component
}; // close component

// Export
export default CustomButton;
