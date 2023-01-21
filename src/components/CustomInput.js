// Import resources
import React from "react";
import { View } from "react-native";
import { Input } from "@rneui/themed";
import tw from "twrnc";
import { Controller } from "react-hook-form";

// Import custom files
import twStyles from "../config/twStyles";
import CustomText from "./CustomText";
import CustomIcon from "./CustomIcon";
import CustomHelperText from "./CustomHelperText";
import { appColors } from "../config/data";

// Component
const CustomInput = ({
  isNormal,
  label,
  name,
  control,
  value,
  onChangeText,
  placeholder,
  leftIconType,
  leftIconName,
  leftIconOnPress,
  rightIconType,
  rightIconName,
  rightIconOnPress,
  helperText,
  errMsg,
  styleContainer,
  styleInput,
  styleInputContainer,
  ...rest
}) => {
  // Debug
  //console.log("Debug customInput: ", isTouched);

  // Return component
  return (
    <>
      {/** IF IS NORMAL */}
      {isNormal ? (
        <Input
          {...rest}
          //ref={ref}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder || `${label}`}
          containerStyle={[tw`-mb-3`, styleContainer]}
          errorStyle={(errMsg || helperText) && tw`mb-6`}
          inputStyle={[twStyles?.fontRegular]}
          leftIconContainerStyle={tw`pr-3`}
          inputContainerStyle={[
            styleInputContainer,
            tw`px-2 -py-3 border rounded-lg`,
            errMsg && tw`border-[${appColors?.danger}]`,
          ]}
          label={
            label && (
              <CustomText style={[tw`mb-1`, twStyles?.fontBold]}>
                {label}
              </CustomText>
            )
          }
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
      ) : (
        <Controller
          control={control}
          name={name}
          render={({
            field: { value, ref, onChange, onBlur },
            fieldState: { error },
          }) => (
            <Input
              {...rest}
              ref={ref}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder || `${label}`}
              containerStyle={[tw`-mb-3`, styleContainer]}
              errorStyle={(error?.message || helperText) && tw`mb-6`}
              inputStyle={[tw`w-full`, twStyles?.fontRegular]}
              leftIconContainerStyle={tw`pr-3`}
              disabledInputStyle={tw`opacity-50`}
              inputContainerStyle={[
                styleInputContainer,
                tw`px-2 border rounded-lg`,
                error && tw`border-[${appColors?.danger}]`,
              ]}
              label={
                label && (
                  <CustomText style={[tw`mb-1`, twStyles?.fontBold]}>
                    {label}
                  </CustomText>
                )
              }
              errorMessage={
                <>
                  <CustomHelperText visible={helperText} title={helperText} />{" "}
                  <CustomHelperText
                    isError
                    visible={error}
                    title={error?.message}
                  />
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
          )} // close render
        /> // close controller
      )}
    </>
  ); // close return
}; // close component

// Export
export default CustomInput;
