// Import resources
import React, { forwardRef } from "react";
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
const CustomInputNormal = forwardRef(
  (
    {
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
      helperText,
      styleContainer,
      styleInput,
      styleInputContainer,
      ...rest
    },
    ref
  ) => {
    // Debug
    //console.log("Debug customInputNormal: ", isTouched);

    // Return component
    return (
      <Input
        {...rest}
        ref={ref}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || "Enter value"}
        containerStyle={[tw`-mb-3`, styleContainer]}
        errorStyle={(errMsg || helperText) && tw`mb-6`}
        inputStyle={[twStyles?.fontRegular]}
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
          errMsg && tw`border-[${appColors?.danger}]`,
        ]}
        errorMessage={
          <>
            <CustomHelperText visible={helperText} title={helperText} />{" "}
            <CustomHelperText isError visible={errMsg} title={errMsg} />
          </>
        }
        leftIcon={
          <CustomIcon
            type={leftIconType || "antDesign"}
            name={leftIconName || "user"}
            onPress={leftIconOnPress}
            color={appColors?.lightBlack}
          />
        }
        rightIcon={
          rightIconName && (
            <CustomIcon
              type={rightIconType || "antDesign"}
              name={rightIconName || "user"}
              onPress={rightIconOnPress}
              color={appColors?.lightBlack}
            />
          )
        }
      /> // close input
    ); // close return
  } // close component
); // close forward ref

// Export
export default CustomInputNormal;
