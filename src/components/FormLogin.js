// Import resources
import React, { useState } from "react";
import tw from "twrnc";
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
import useCustomToastState from "../hooks/useCustomToastState";
import useCustomAlertState from "../hooks/useCustomAlertState";
import useAuthState from "../hooks/useAuthState";
import { handleSendEmail } from "../config/functions";
import { alertMsg, apiRoutes } from "../config/data";
import { fireAuth } from "../config/firebase";

// Component
const FormLogin = () => {
  // Define auth
  const { handleLogin, handleSendEmailVerifyLink } = useAuthState();

  // Define state
  const [hidePass, setHidePass] = useState(true);

  // Define app settings
  const { navigation, siteInfo, todaysDate1 } = useAppSettings();

  // Define alert
  const alert = useCustomAlertState();

  // Define toast
  const toast = useCustomToastState();

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
      .max(50, "Too long"),
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

    // Debug
    //console.log("Debug submitForm: ",);

    // Try catch
    try {
      // Login user
      await handleLogin(finalEmail, finalPass);
      // Define variables
      const currUser = fireAuth.currentUser;
      const isEmailVerified = currUser.emailVerified === true;
      // If isEmailVerified
      if (isEmailVerified) {
        // Alert succ
        toast.success(alertMsg?.loginSucc);
        // Send login alert
        // await handleSendEmail(
        //   "user",
        //   currUser?.displayName,
        //   currUser?.email,
        //   todaysDate1,
        //   apiRoutes?.login,
        //   siteInfo?.name
        // );
      } else {
        // Send email verify link
        await handleSendEmailVerifyLink(currUser);
        alert.showAlert(alertMsg?.linkSentSucc);
        reset();
      } // close if
    } catch (err) {
      alert.showAlert(alertMsg?.loginErr);
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
        cancelAction={alert.hideAlert}
        cancelText="Close"
        content={alert.message}
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
              isText
              styleText={[tw`mt-12`, twStyles?.linkBtn]}
              onPress={() => {
                alert.showAlert("Test!");
                //alert.showLoading();
                // setTimeout(() => {
                //   alert.hideLoading();
                // }, 5000);
              }}
            >
              TEST BUTTON
            </CustomButton> */}
    </KeyboardAvoidWrapper>
  ); // close return
}; // close component

// Export
export default FormLogin;
