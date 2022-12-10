// Import resources
import React, { useState } from "react";
import { useFormikContext } from "formik";
import tw from "twrnc";

// Import custom files
import CustomTextInput from "./CustomTextInput";
import { appColors } from "../config/data";

// Component
const CustomTextInputForm = ({
  name,
  leftIconType,
  leftIconName,
  rightIconType,
  rightIconName,
  ...rest
}) => {
  // Define formik context
  const { values, errors, touched, setFieldTouched, handleChange } =
    useFormikContext();

  // Debug
  //console.log("Debug customTextInputForm: ")

  // Return component
  return (
    <CustomTextInput
      {...rest}
      value={values[name]}
      onChangeText={handleChange(name?.trim())}
      onBlur={() => setFieldTouched(name)}
      leftIconType={leftIconType || "antDesign"}
      leftIconName={leftIconName}
      rightIconType={rightIconType || "antDesign"}
      rightIconName={rightIconName}
      errMsg={touched[name] && errors[name]}
    />
  ); // close return
}; // close component

// Export
export default CustomTextInputForm;
