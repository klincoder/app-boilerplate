// Import resources
import React, { useState } from "react";
import { View } from "react-native";
import { Input } from "@rneui/themed";
import tw from "twrnc";

// Import custom files
import CustomText from "./CustomText";
import CustomIcon from "./CustomIcon";
import CustomHelperText from "./CustomHelperText";
import { appColors, appFonts } from "../config/data";

// Component
const CustomTextInput = ({
  label,
  value,
  onChangeText,
  leftIconType,
  leftIconName,
  leftIconOnPress,
  rightIconType,
  rightIconName,
  rightIconOnPress,
  errMsg,
  errTouched,
  helperText,
  styleContainer,
  styleInput,
  styleInputContainer,
  ...rest
}) => {
  // Define state
  const [focused, setFocused] = useState(false);

  // Debug
  // console.log("Debug customTextInput: ",)

  // Return component
  return (
    <Input
      {...rest}
      value={value}
      onChangeText={onChangeText}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      label={<CustomText style={tw`mb-1`}>{label}</CustomText>}
      containerStyle={[tw`-mb-3`, styleContainer]}
      errorMessage={errMsg}
      errorStyle={errMsg && tw`mb-6`}
      inputStyle={{
        color: focused ? appColors?.primary : "black",
        fontFamily: appFonts?.medium,
      }}
      inputContainerStyle={[
        tw`px-2 border rounded-lg`,
        focused && tw`border-[${appColors?.primary}]`,
        styleInputContainer,
      ]}
      leftIcon={
        <CustomIcon
          type={leftIconType || "antDesign"}
          name={leftIconName || "user"}
          onPress={leftIconOnPress}
          size={24}
          color={focused ? appColors?.primary : appColors?.lightBlack}
        />
      }
      rightIcon={
        rightIconName && (
          <CustomIcon
            type={rightIconType || "antDesign"}
            name={rightIconName || "user"}
            onPress={rightIconOnPress}
            size={24}
            color={focused ? appColors?.primary : appColors?.lightBlack}
          />
        )
      }
    />
  ); // close return
}; // close component

// Export
export default CustomTextInput;
