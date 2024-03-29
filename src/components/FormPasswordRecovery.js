// Import resources
import React from "react";
import { View } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// Import custom files
import routes from "../screens/routes";
import KeyboardAvoidWrapper from "./KeyboardAvoidWrapper";
import CustomAlertModal from "./CustomAlertModal";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import useAlertState from "../hooks/useAlertState";
import useAppSettings from "../hooks/useAppSettings";
import useAuthState from "../hooks/useAuthState";
import { tw, alertMsg } from "../config/data";
import { fireAuth } from "../config/firebase";

// Component
const FormPasswordRecovery = () => {
  // Define app settings
  const { navigation } = useAppSettings();

  // Define state
  const { handleUserExist, handleSendPasswordResetLink } = useAuthState();

  // Define alert
  const alert = useAlertState();

  // Debug
  //console.log("Debug formPassRecovery: ",);

  // FORM CONFIG
  // Initial values
  const initialValues = {
    emailAddr: "",
  };

  // Validate
  const validate = Yup.object().shape({
    emailAddr: Yup.string().required("Required").email("Invalid email address"),
  });

  // Form state
  const {
    control,
    formState: { isValid, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    mode: "all",
    defaultValues: initialValues,
    resolver: yupResolver(validate),
  }); // close form state

  // FUNCTIONS
  // HANDLE SUBMIT FORM
  const handleSubmitForm = async (values) => {
    // Define variables
    const finalEmail = values.emailAddr?.trim()?.toLowerCase();
    const userExist = handleUserExist(finalEmail);
    const userInfo = userExist?.data;
    const username = userInfo?.username;
    const userEmail = userInfo?.email_address;

    // If user exit
    if (!userExist?.isValid) {
      alert.showAlert(alertMsg?.inValidCred);
      return;
    } // close if

    // Debug
    //console.log("Debug submitForm: ", values);

    // Try catch
    try {
      // Send password reset link
      await handleSendPasswordResetLink(username, userEmail);
      // Alert succ
      alert.showAlert(alertMsg?.linkSentSucc);
      reset();
    } catch (err) {
      alert.showAlert(err.message);
      //console.log("Debug submitForm: ", err.message);
    } // close try catch
  }; // close submit form

  // Return component
  return (
    <KeyboardAvoidWrapper>
      {/** Debug */}
      {/* {console.log("Form formValues: ", values)} */}

      {/** Show spinner */}
      <CustomAlertModal isSpinner visible={isSubmitting || alert.loading} />

      {/** Alert modal */}
      <CustomAlertModal
        visible={alert.visible}
        hideDialog={alert.hideAlert}
        cancelAction={alert.hideAlert}
        content={alert.message}
        cancelText="Close"
      />

      {/** Email Address */}
      <CustomInput
        name="emailAddr"
        control={control}
        label="Email Address"
        placeholder="Enter email address"
        leftIconType="feather"
        leftIconName="mail"
        autoCapitalize="none"
        keyboardType="email-address"
      />

      {/** Submit button */}
      <CustomButton
        isNormal
        title="Send recovery link"
        onPress={handleSubmit(handleSubmitForm)}
        styleNormalButton={tw`mt-3`}
        disabled={!isValid || isSubmitting || alert.loading}
      />
    </KeyboardAvoidWrapper>
  ); // close return
}; // close component

// Export
export default FormPasswordRecovery;
