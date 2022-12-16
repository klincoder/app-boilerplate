// Import resources
import React, { useState } from "react";
import { View, TextInput } from "react-native";
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
  control,
  name,
  rules,
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
  touched,
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
    <Controller
      {...rest}
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState, formState }) => (
        <>
          {/** Debug */}
          {/* {console.log("Debug field: ", {
            //touched: fieldState?.isTouched,
            msg: fieldState?.error,
            field: field?.name,
          })} */}

          {/** Custom Input */}
          <Input
            {...rest}
            value={field?.value}
            onChangeText={(val) => field?.onChange(val)}
            onBlur={field?.onBlur}
            placeholder={placeholder || "Enter value"}
            containerStyle={[tw`-mb-3`, styleContainer]}
            // errorStyle={(fieldState?.error || helperText) && tw`mb-6`}
            // errorMessage={
            //   <>
            //     <CustomHelperText
            //       visible={helperText}
            //       title={helperText}
            //       styleText={tw`pr-10`}
            //     />
            //     <CustomHelperText
            //       isError
            //       visible={fieldState?.isTouched}
            //       title={fieldState?.error}
            //     />
            //   </>
            // }
            inputStyle={[
              twStyles?.fontRegular,
              //focused ? tw`text-[${appColors?.secondary}]` : tw`text-black`,
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
              //focused && tw`border-[${appColors?.secondary}]`,
              //errMsg && tw`border-[${appColors?.danger}]`,
            ]}
            leftIcon={
              <CustomIcon
                type={leftIconType || "antDesign"}
                name={leftIconName || "user"}
                onPress={leftIconOnPress}
                //color={focused ? appColors?.primary : appColors?.lightBlack}
              />
            }
            rightIcon={
              rightIconName && (
                <CustomIcon
                  type={rightIconType || "antDesign"}
                  name={rightIconName || "user"}
                  onPress={rightIconOnPress}
                  //color={focused ? appColors?.primary : appColors?.lightBlack}
                />
              )
            }
          />
        </>
      )}
    />
  ); // close return
}; // close component

// Export
export default CustomInput;
