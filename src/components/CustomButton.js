// Import resources
import React from "react";
import { TouchableOpacity } from "react-native";
import { Button } from "@rneui/themed";

// Import custom files
import CustomIcon from "./CustomIcon";
import CustomText from "./CustomText";
import { tw } from "../config/data";

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
  styleNormalTitle,
  styleNormalButton,
  styleTouchable,
  styleTextTitle,
  styleTextButton,
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
            tw`text-lg font-medium`,
            isOutline ? tw`text-primary` : tw`text-white`,
          ]}
          buttonStyle={[
            styleNormalButton,
            tw`rounded-lg`,
            isOutline ? tw`border-primary` : tw`bg-primary`,
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
          name={iconName}
          onPress={onPress}
        />
      )}

      {/** isText */}
      {isText && (
        <TouchableOpacity
          {...rest}
          activeOpacity={0.8}
          onPress={onPress}
          style={styleTextButton}
        >
          <CustomText
            {...rest}
            style={[styleTextTitle, tw`text-base underline`]}
          >
            {title || "Text Button"}
          </CustomText>
        </TouchableOpacity>
      )}
    </>
  ); // close return component
}; // close component

// Export
export default CustomButton;
