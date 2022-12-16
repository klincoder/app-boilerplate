// Import resources
import React from "react";
import tw from "twrnc";
import { Controller } from "react-hook-form";

// Import custom files
import CustomInput from "./CustomInput";
import { appColors } from "../config/data";
import { View } from "react-native";
import CustomText from "./CustomText";

// Component
const CustomInputForm = ({
  name,
  control,
  rules = {},
  placeholder,
  ...rest
}) => {
  // Debug
  //console.log("Debug customInputForm: ")

  // Return component
  return (
    <>
      <Controller
        {...rest}
        control={control}
        name={name}
        rules={rules}
        render={({ field, fieldState }) => (
          <CustomInput
            {...rest}
            value={field?.value}
            onChangeText={field?.onChange}
            onBlur={field?.onBlur}
            focused={fieldState?.isTouched?.[name]}
            //errMsg={fieldState?.isTouched && fieldState?.error?.message}
            //errMsg={fieldState?.error?.message}
          />
        )}
      />

      {/* <CustomInput
      {...rest}
      value={values[name]}
      onChangeText={handleChange(name?.trim())}
      onBlur={() => setFieldTouched(name)}
      leftIconType={leftIconType || "antDesign"}
      leftIconName={leftIconName}
      rightIconType={rightIconType || "antDesign"}
      rightIconName={rightIconName}
      errMsg={touched[name] && errors[name]}
    /> */}
    </>
  ); // close return
}; // close component

// Export
export default CustomInputForm;
