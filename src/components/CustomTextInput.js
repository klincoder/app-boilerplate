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
      //onFocus={() => setFocused(true)}
      //onBlur={() => setFocused(false)}
      containerStyle={[tw`-mb-3`, styleContainer]}
      errorStyle={(errMsg || helperText) && tw`mb-6`}
      inputStyle={[
        twStyles?.fontRegular,
        focused ? tw`text-[${appColors?.secondary}]` : tw`text-black`,
      ]}
      label={
        <CustomText style={[tw`mb-1`, twStyles?.fontBold]}>{label}</CustomText>
      }
      inputContainerStyle={[
        styleInputContainer,
        tw`px-2 border rounded-lg`,
        focused && tw`border-[${appColors?.secondary}]`,
      ]}
      errorMessage={
        <>
          <CustomHelperText visible={helperText} title={helperText} />
          <CustomHelperText isError visible={errMsg} title={errMsg} />
        </>
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
export default CustomTextInput;
