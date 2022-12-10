// Import resources
import React, { useState } from "react";
import tw from "twrnc";
import { View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

// Import custom files
import KeyboardAvoidWrapper from "./KeyboardAvoidWrapper";
import useAppSettings from "../hooks/useAppSettings";
import CustomAlertModal from "./CustomAlertModal";
import CustomButton from "./CustomButton";
import CustomTextInputForm from "./CustomTextInputForm";
import CustomText from "./CustomText";
import useCustomAlertState from "../hooks/useCustomAlertState";
import { useAuthContext } from "../context/AuthContext";
import { alertMsg, apiRoutes, appColors, appRegex } from "../config/data";
import { fireAuth, fireDB, setDoc, doc } from "../config/firebase";
import {
  handleTitleCase,
  handleSendEmail,
  handleGenUsername,
} from "../config/functions";

// Component
const FormRegister = () => {
  // Define auth context
  const { handleEmailExist, handleRegister } = useAuthContext();

  // Define state
  const [hidePass, setHidePass] = useState(true);

  // Define app settings
  const { todaysDate, todaysDate1, siteInfo } = useAppSettings();

  // Define alert
  const alert = useCustomAlertState();

  // Debug
  //console.log("Debug formRegister: ",);

  // FORM CONFIG
  // Initial values
  const initialValues = {
    fullName: "",
    emailAddr: "",
    pass: "",
  };

  // Validate
  const validate = Yup.object().shape({
    fullName: Yup.string().required("Required").min(3, "Too short"),
    emailAddr: Yup.string().required("Required").email("Invalid email address"),
    pass: Yup.string().required("Required").min(8, "Too short"),
  });

  // FUNCTIONS
  // HANDLE SUBMIT FORM
  const handleSubmitForm = async (values, { setSubmitting, resetForm }) => {
    // Define variables
    const finalFullName = handleTitleCase(values.fullName?.trim());
    const finalEmail = values.emailAddr?.trim()?.toLowerCase();
    const finalPass = values.pass?.trim();
    const finalUsername = handleGenUsername(finalEmail);
    const emailMsg = {
      username: finalUsername,
      email: finalEmail,
      date: todaysDate1,
    };

    // Define email exist
    const emailExist = handleEmailExist(finalEmail);

    // Debug
    //console.log("Debug formRegisterSubmit: ", compareVerifyCode);
    // setSubmitting(false)

    // If emailExist
    if (emailExist?.isValid) {
      // Alert err
      alert.showAlert("Email address already exist");
      return;
    } // close if

    // Try catch
    try {
      // Create user
      await handleRegister(finalUsername, finalEmail, finalPass);
      // Define variables
      const currUser = fireAuth.currentUser;
      const currUserID = currUser.uid;

      // Add user to database
      const newUserRef = doc(fireDB, "users", currUserID);
      await setDoc(newUserRef, {
        avatar: "",
        regMethod: "app",
        fullName: finalFullName,
        emailAddress: finalEmail,
        role: "user",
        phoneNumber: "",
        pushStatus: true,
        userID: currUserID,
        username: finalUsername,
        dateCreated: todaysDate,
        dateUpdated: todaysDate,
      });

      // Send user welcome email
      // await handleSendEmail(
      //   "user",
      //   finalUsername,
      //   finalEmail,
      //   emailMsg,
      //   apiRoutes?.welcome
      // );

      // Send admin new user email
      await handleSendEmail(
        "admin",
        siteInfo?.adminName,
        siteInfo?.adminEmail,
        emailMsg,
        apiRoutes?.newUser
      );

      // Alert succ
      alert.showAlert(alertMsg?.linkSentSucc);
      resetForm();
    } catch (err) {
      // Alert err
      alert.showAlert(alertMsg?.generalErr);
      //console.log("Debug submitForm: ", err.message);
    } // close try catch
    // Set submitting
    setSubmitting(false);
  }; // close fxn

  // Return component
  return (
    <KeyboardAvoidWrapper>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmitForm}
        validationSchema={validate}
      >
        {({ values, errors, isValid, isSubmitting, handleSubmit }) => (
          <>
            {/** Debug */}
            {/* {console.log("Debug formValues: ", values)} */}

            {/** Show spinner */}
            <CustomAlertModal
              isSpinner
              visible={alert.loading || isSubmitting}
            />

            {/** Alert modal */}
            <CustomAlertModal
              visible={alert.visible}
              hideDialog={alert.hideAlert}
              cancelAction={alert.hideAlert}
              content={alert.message}
            />

            {/** Full name */}
            <CustomTextInputForm
              label="Full Name"
              name="fullName"
              placeholder="Full name"
              leftIconName="user"
              autoCapitalize="words"
            />

            {/** Email Address */}
            <CustomTextInputForm
              name="emailAddr"
              label="Email Address"
              placeholder="Enter email address"
              leftIconType="feather"
              leftIconName="mail"
              autoCapitalize="none"
              keyboardType="email-address"
              helperText="We'll send a confirmation link"
            />

            {/** Password */}
            <CustomTextInputForm
              isPass
              name="pass"
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
              title="Create Account"
              onPress={handleSubmit}
              disabled={!isValid || isSubmitting || alert?.loading}
            />

            {/** TEST BUTTON */}
            {/* <CustomButton
              isText
              style={tw`mt-8`}
              styleText={tw`bg-black text-white text-center px-2 py-3`}
              icon="arrow-right"
              mode="contained"
              onPress={async () => {
                // Try catch
                try {
                  await handleSendEmail(
                    "user",
                    "Klincoder",
                    "klincoder@gmail.com",
                    "123456",
                    apiRoutes?.otp
                  );
                } catch (err) {
                  console.log("Debug formRegDetails: ", err.message);
                }
                //setShowOtpInput();
              }}
            >
              TEST BUTTON
            </CustomButton> */}

            {/** Terms */}
            <CustomText style={tw`mt-2 text-center text-[${appColors?.gray}]`}>
              By creating an account, I accept the terms.
            </CustomText>
          </>
        )}
      </Formik>
    </KeyboardAvoidWrapper>
  ); // close return
}; // close component

// Export
export default FormRegister;
