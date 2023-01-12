// Import resources
import React from "react";
import { TouchableOpacity } from "react-native";
import { Button } from "@rneui/themed";
import tw from "twrnc";

// Import custom files
import twStyles from "../config/twStyles";
import CustomIcon from "./CustomIcon";
import { appColors } from "../config/data";
import CustomText from "./CustomText";

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
            tw`text-xl`,
            twStyles?.fontBold,
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
          name={iconName}
          onPress={onPress}
        />
      )}

      {/** isText */}
      {isText && (
        <>
          {/* <TouchableOpacity
          {...rest}
          activeOpacity={0.8}
          onPress={onPress}
          style={styleTextButton}
        > */}
          <CustomText
            onPress={onPress}
            style={[
              tw`text-base underline`,
              twStyles?.fontBold,
              styleTextTitle,
            ]}
          >
            {title || "Text Button"}
          </CustomText>
          {/* </TouchableOpacity> */}
        </>
      )}
    </>
  ); // close return component
}; // close component

// Export
export default CustomButton;
