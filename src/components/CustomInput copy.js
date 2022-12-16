// Import resources
import React, { useState } from "react";
import { View } from "react-native";
import { Input } from "@rneui/themed";
import tw from "twrnc";

// Import custom files
import twStyles from "../config/twStyles";
import CustomText from "./CustomText";
import CustomIcon from "./CustomIcon";
import CustomHelperText from "./CustomHelperText";
import { appColors } from "../config/data";

// Component
const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  leftIconType,
  leftIconName,
  leftIconOnPress,
  rightIconType,
  rightIconName,
  rightIconOnPress,
  errMsg,
  errTouched,
  helperText,
  focused,
  styleContainer,
  styleInput,
  styleInputContainer,
  ...rest
}) => {
  // Define state
  //const [focused, setFocused] = useState(false);

  // Debug
  //console.log("Debug customInput: ", errMsg);

  // Return component
  return (
    <Input
      {...rest}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder || "Enter value"}
      containerStyle={[tw`-mb-3`, styleContainer]}
      errorStyle={(errMsg || helperText) && tw`mb-6`}
      inputStyle={[
        twStyles?.fontRegular,
        focused ? tw`text-[${appColors?.secondary}]` : tw`text-black`,
      ]}
      label={
        label && (
          <CustomText style={[tw`mb-1`, twStyles?.fontBold]}>
            {label}
          </CustomText>
        )
      }
      inputContainerStyle={[
        styleInputContainer,
        tw`px-2 border rounded-lg`,
        focused && tw`border-[${appColors?.secondary}]`,
        errMsg && tw`border-[${appColors?.danger}]`,
      ]}
      errorMessage={
        <CustomText style={tw`flex flex-col`}>
          <CustomHelperText visible={helperText} title={helperText} />
          <CustomHelperText isError visible={errMsg} title={errMsg} />
        </CustomText>
      }
      leftIcon={
        <CustomIcon
          type={leftIconType || "antDesign"}
          name={leftIconName || "user"}
          onPress={leftIconOnPress}
          color={focused ? appColors?.primary : appColors?.lightBlack}
        />
      }
      rightIcon={
        rightIconName && (
          <CustomIcon
            type={rightIconType || "antDesign"}
            name={rightIconName || "user"}
            onPress={rightIconOnPress}
            color={focused ? appColors?.primary : appColors?.lightBlack}
          />
        )
      }
    />
  ); // close return
}; // close component

// Export
export default CustomInput;
