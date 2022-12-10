// Import resources
import React, { useState } from "react";
import tw from "twrnc";
import { View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

// Import custom files
import routes from "../screens/routes";
import CustomButton from "./CustomButton";
import KeyboardAvoidWrapper from "./KeyboardAvoidWrapper";
import CustomAlertModal from "./CustomAlertModal";
import useAppSettings from "../hooks/useAppSettings";
import CustomTextInputForm from "./CustomTextInputForm";
import useCustomToastState from "../hooks/useCustomToastState";
import useCustomAlertState from "../hooks/useCustomAlertState";
import { useAuthContext } from "../context/AuthContext";
import { handleSendEmail } from "../config/functions";
import { alertMsg, apiRoutes } from "../config/data";
import { fireAuth } from "../config/firebase";

// Component
const FormLogin = () => {
  // Define auth context
  const { handleLogin, handleSendEmailVerifyLink } = useAuthContext();

  // Define state
  const [hidePass, setHidePass] = useState(true);

  // Define app settings
  const { todaysDate1, navigation } = useAppSettings();

  // Define alert
  const alert = useCustomAlertState();

  // Define toast
  const toast = useCustomToastState();

  // Debug
  //console.log("Debug loginForm: ");

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

  // FUNCTIONS
  // HANDLE SUBMIT FORM
  const handleSubmitForm = async (values, { setSubmitting, resetForm }) => {
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
        await handleSendEmail(
          "user",
          currUser?.displayName,
          currUser?.email,
          todaysDate1,
          apiRoutes?.login
        );
      } else {
        // Send email verify link
        await handleSendEmailVerifyLink(currUser);
        alert.showAlert(alertMsg?.linkSentSucc);
        resetForm();
      } // close if
    } catch (err) {
      alert.showAlert(alertMsg?.loginErr);
      //console.error("Debug submitForm: ", err.message);
    } // close try catch
    // Set submitting
    setSubmitting(false);
  }; // close submit form

  // Return component
  return (
    <KeyboardAvoidWrapper>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmitForm}
        validationSchema={validate}
      >
        {({ values, isValid, isSubmitting, handleSubmit }) => (
          <>
            {/** Debug */}
            {/* {console.log("Debug formLoginValues: ", values)} */}

            {/** Show spinner */}
            <CustomAlertModal
              isSpinner
              visible={isSubmitting || alert.loading}
            />

            {/** Alert modal */}
            <CustomAlertModal
              visible={alert.visible}
              hideDialog={alert.hideAlert}
              cancelAction={alert.hideAlert}
              cancelText="Close"
              content={alert.message}
            />

            {/** Email address */}
            <CustomTextInputForm
              name="emailAddr"
              label="Email Address"
              placeholder="Enter email address"
              leftIconName="user"
              autoCapitalize="none"
            />

            {/** Pass */}
            <CustomTextInputForm
              isPass
              name="pass"
              label="Password"
              placeholder="Enter password"
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
              onPress={handleSubmit}
              disabled={!isValid || isSubmitting}
            />

            {/** OTHER LINKS */}
            <View style={tw`flex-row justify-between mt-6`}>
              {/** Forgot password */}
              <CustomButton
                isText
                onPress={() => navigation.navigate(routes.PASSWORD_RECOVERY)}
              >
                Forgot Password?
              </CustomButton>

              {/** Register */}
              <CustomButton
                isText
                onPress={() => navigation.navigate(routes.REGISTER)}
              >
                Register
              </CustomButton>
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
          </>
        )}
      </Formik>
    </KeyboardAvoidWrapper>
  ); // close return
}; // close component

// Export
export default FormLogin;
