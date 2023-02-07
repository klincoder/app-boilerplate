// Import resources
import React, { useState } from "react";
import { View } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// Import custom files
import routes from "../screens/routes";
import CustomButton from "./CustomButton";
import KeyboardAvoidWrapper from "./KeyboardAvoidWrapper";
import CustomAlertModal from "./CustomAlertModal";
import useAppSettings from "../hooks/useAppSettings";
import CustomInput from "./CustomInput";
import useAlertState from "../hooks/useAlertState";
import useAuthState from "../hooks/useAuthState";
import { handleSendEmail } from "../config/functions";
import { tw, alertMsg, apiRoutes } from "../config/data";
import { fireAuth } from "../config/firebase";

// Component
const FormLogin = () => {
  // Define app settings
  const { navigation, siteInfo, todaysDate1 } = useAppSettings();

  // Define state
  const [hidePass, setHidePass] = useState(true);
  const { handleLogin, handleUserExist, handleSendVerifyEmailLink } =
    useAuthState();

  // Define alert
  const alert = useAlertState();

  // FORM CONFIG
  // Initial values
  const initialValues = {
    emailAddr: "",
    pass: "",
  };

  // Validate
  const validate = Yup.object({
    emailAddr: Yup.string()
      .required("Required")
      .email("Invalid email address")
      .max(150, "Too long"),
    pass: Yup.string().required("Required").min(8, "Too short"),
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

  // Debug
  //console.log("Debug loginForm: ");

  // FUNCTIONS
  // HANDLE SUBMIT FORM
  const handleSubmitForm = async (values) => {
    // Define variables
    const finalEmail = values.emailAddr?.trim()?.toLowerCase();
    const finalPass = values.pass?.trim();
    const userExist = handleUserExist(finalEmail);
    const userInfo = userExist?.data;
    const username = userInfo?.username;
    const userEmail = userInfo?.email_address;

    // If !userExist
    if (!userExist?.isValid) {
      alert.showAlert(alertMsg?.inValidCred);
      return;
    } // close if

    // Debug
    //console.log("Debug submitForm: ",);

    // Try catch
    try {
      // Login user
      await handleLogin(finalEmail, finalPass);
      const currUser = fireAuth.currentUser;

      // If email verified
      if (currUser?.emailVerified) {
        // Alert succ
        alert.success(alertMsg?.loginSucc);
        // Send email
        const emailMsg = { toName: username, toEmail: userEmail };
        await handleSendEmail(emailMsg, apiRoutes?.login);
      } else {
        // Send verify email link
        await handleSendVerifyEmailLink(username, userEmail);
        alert.showAlert(alertMsg?.linkSentSucc);
        reset();
      } // close if
    } catch (err) {
      alert.showAlert(alertMsg?.inValidCred);
      //console.error("Debug submitForm: ", err.message);
    } // close try catch
  }; // close submit form

  // Return component
  return (
    <KeyboardAvoidWrapper>
      {/** Debug */}
      {/* {console.log("Debug formLoginValues: ", values)} */}

      {/** Show spinner */}
      <CustomAlertModal isSpinner visible={isSubmitting || alert.loading} />

      {/** Alert modal */}
      <CustomAlertModal
        visible={alert.visible}
        hideDialog={alert.hideAlert}
        cancelText="Close"
        content={alert.message}
        onCancel={alert.hideAlert}
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

      {/** Password */}
      <CustomInput
        name="pass"
        control={control}
        label="Password"
        placeholder="Password"
        leftIconName="lock"
        rightIconType="feather"
        rightIconName={hidePass ? "eye" : "eye-off"}
        rightIconOnPress={() => setHidePass(!hidePass)}
        secureTextEntry={hidePass}
        autoCapitalize="none"
      />

      {/** Submit button */}
      <CustomButton
        isNormal
        onPress={handleSubmit(handleSubmitForm)}
        disabled={!isValid || isSubmitting}
      />

      {/** OTHER LINKS */}
      <View style={tw`flex-row justify-between mt-6`}>
        {/** Forgot password */}
        <CustomButton
          isText
          title="Forgot Password?"
          onPress={() => navigation.navigate(routes.PASSWORD_RECOVERY)}
        />
        {/** Register */}
        <CustomButton
          isText
          title="Register"
          onPress={() => navigation.navigate(routes.REGISTER)}
        />
      </View>

      {/** TEST BUTTON */}
      {/* <CustomButton
        isNormal
        title="TEST BUTTON"
        styleNormalButton={tw`mt-12`}
        onPress={() => {
          alert.showLoading();
          setTimeout(() => {
            alert.hideLoading();
          }, 5000);
        }}
      /> */}
    </KeyboardAvoidWrapper>
  ); // close return
}; // close component

// Export
export default FormLogin;
