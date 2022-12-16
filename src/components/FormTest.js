// Import resources
import React from "react";
import { View } from "react-native";
import tw from "twrnc";
import { useForm, Controller } from "react-hook-form";

// Import custom files
import CustomText from "./CustomText";
import useAppSettings from "../hooks/useAppSettings";
import CustomTextInput from "./CustomTextInput";
import CustomButton from "./CustomButton";
import CustomInputForm from "./CustomInputForm";
import CustomInput from "./CustomInput";

// Component
const FormTest = () => {
  // Define app settings
  const { navigation } = useAppSettings();

  // FORM CONFIG
  // Initial values
  const initialValues = {
    firstName: "",
    lastName: "",
    gender: "",
    allowPush: false,
    paymentMethod: "",
    dateofBirth: "",
  };

  // Form state
  const { control, formState, handleSubmit, getValues, setValue } = useForm({
    mode: "onBlur",
    defaultValues: initialValues,
  });

  // Define variables
  const formVal = getValues();

  // Debug
  // console.log("Debug formTest: ", {
  //   //form: formVal,
  //   err: formState?.errors,
  //   valid: formState?.isValid,
  //   //values: formVal,
  // });

  // FUNCTIONS
  // HANDLE SUBMIT FORM
  const handleSubmitForm = (data) => {
    console.log("Debug submitForm: ", data);
  }; // close fxn

  // Return component
  return (
    <View>
      {/* <CustomText>Content goes here</CustomText> */}
      {/** First name */}
      <CustomInput
        name="firstName"
        control={control}
        label="First name"
        rules={{ required: "Required" }}
        helperText="A simple message"
        // touched={formState?.touchedFields?.firstName}
        // errMsg={formState?.errors.firstName}
      />

      {/** Last name */}
      <CustomInput
        name="lastName"
        control={control}
        label="Last name"
        rules={{ required: { value: true, message: "Required" } }}
      />

      {/** Button */}
      <CustomButton
        isNormal
        title="Submit"
        onPress={handleSubmit(handleSubmitForm)}
        disabled={!formState?.isValid || formState?.isSubmitting}
      />

      {/** Button - set value */}
      {/* <CustomButton
        isNormal
        title="Set Value"
        type="outline"
        onPress={() => setValue("allowPush", true)}
      /> */}
    </View>
  ); // close return
}; // close component

// Export
export default FormTest;
