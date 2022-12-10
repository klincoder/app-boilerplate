// Import resources
import React from "react";
import { View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import tw from "twrnc";

// Import custom files
import routes from "../screens/routes";
import useAppSettings from "../hooks/useAppSettings";
import KeyboardAvoidWrapper from "./KeyboardAvoidWrapper";
import CustomAlertModal from "./CustomAlertModal";
import CustomButton from "./CustomButton";
import CustomTextInputForm from "./CustomTextInputForm";
import useCustomAlertState from "../hooks/useCustomAlertState";
import useCustomToastState from "../hooks/useCustomToastState";
import { useAuthContext } from "../context/AuthContext";
import { alertMsg, apiRoutes, appRegex } from "../config/data";
import { handleSendEmail, handleUppercaseFirst } from "../config/functions";
import {
  fireDB,
  doc,
  setDoc,
  updateProfile,
  fireAuth,
} from "../config/firebase";

// Component
const FormEditProfile = () => {
  // Define auth context
  const { user, handleUsernameExist } = useAuthContext();
  const userID = user?.id;
  const userFullName = user?.fullName;
  const userEmail = user?.email;
  const username = user?.username;
  const userPhone = user?.phone;

  // Define app settings
  const { todaysDate, todaysDate2, navigation } = useAppSettings();

  // Define toast
  const toast = useCustomToastState();

  // Define alert
  const alert = useCustomAlertState();

  // Debug
  //console.log("Debug formEditProfile: ", todaysDate2);

  // FORM CONFIG
  // Define initial values
  const initialValues = {
    fullName: userFullName ? userFullName : "",
    emailAddr: userEmail ? userEmail : "",
    username: username ? username : "",
    phoneNum: userPhone ? userPhone : "",
  };

  // Validations
  const validate = Yup.object().shape({
    fullName: Yup.string().required("Required").min(3, "Too small"),
    username: Yup.string().required("Required").min(3, "Too small"),
    phoneNum: Yup.string().matches(
      appRegex?.digitsOnly,
      "Invalid phone number"
    ),
  });

  // FUNCTIONS
  // HANDLE SUBMIT FORM
  const handleSubmitForm = async (values, { setSubmitting }) => {
    // Define variables
    const finalFullName = handleUppercaseFirst(values.fullName);
    const finalEmail = values.emailAddr;
    const finalUsername = values.username?.trim()?.toLowerCase();
    const finalPhone = values.phoneNum?.trim();
    const usernameExist =
      finalUsername === username ? false : handleUsernameExist(finalUsername);

    // If username exist
    if (usernameExist?.isValid) {
      alert.showAlert(alertMsg?.usernameExistErr);
      return;
    } // close if

    // Debug
    //console.log("Debug formRegisterSubmit: ", usernameExist);
    setSubmitting(false);

    // Try catch
    // try {
    //   // Update fireAuth display name
    //   await updateProfile(fireAuth.currentUser, { displayName: finalUsername });
    //   // Edit user profile
    //   const editUserRef = doc(fireDB, "users", `${userID}`);
    //   await setDoc(
    //     editUserRef,
    //     {
    //       fullName: finalFullName,
    //       username: finalUsername,
    //       phoneNumber: finalPhone,
    //       dateUpdated: todaysDate,
    //     },
    //     { merge: true }
    //   ); // close set doc

    //   // Send email
    //   await handleSendEmail(
    //     "user",
    //     finalUsername,
    //     finalEmail,
    //     todaysDate2,
    //     apiRoutes?.profileChange
    //   );

    //   // Alert succ
    //   toast.success(alertMsg?.profileSucc);
    //   setSubmitting(false);
    //   navigation.navigate(routes.ACCOUNT);
    // } catch (err) {
    //   alert.showAlert(alertMsg?.generalErr);
    //   //console.log("Debug submitForm", err.message);
    //   setSubmitting(false);
    // } // close try catch
  }; // close submit form

  // Return component
  return (
    <KeyboardAvoidWrapper>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmitForm}
        validationSchema={validate}
        //enableReinitialize
      >
        {({ values, isValid, isSubmitting, dirty, handleSubmit }) => (
          <View>
            {/** Debug */}
            {/* {console.log("Debug formEditProfValues: ", values)} */}

            {/** Show spinner */}
            <CustomAlertModal isSpinner visible={isSubmitting} />

            {/** Alert modal */}
            <CustomAlertModal
              visible={alert.visible}
              content={alert.message}
              hideDialog={alert.hideAlert}
              cancelAction={alert.hideAlert}
            />

            {/** Full name */}
            <CustomTextInputForm
              name="fullName"
              label="Full Name"
              placeholder="Enter full name"
              leftIconName="user"
              autoCapitalize="words"
              defaultValue={userFullName}
            />

            {/** Email address */}
            <CustomTextInputForm
              name="emailAddr"
              label="Email Address"
              placeholder="Enter email address"
              leftIconType="feather"
              leftIconName="mail"
              autoCapitalize="none"
              keyboardType="email-address"
              defaultValue={userEmail}
              disabled
            />

            {/** Username */}
            <CustomTextInputForm
              name="username"
              label="Username"
              placeholder="Enter username"
              leftIconName="user"
              autoCapitalize="none"
              defaultValue={username}
            />

            {/** Phone number */}
            <CustomTextInputForm
              name="phoneNum"
              label="Phone Number"
              placeholder="Phone Number"
              leftIconType="feather"
              leftIconName="phone"
              keyboardType="numeric"
              defaultValue={userPhone}
            />

            {/** Submit button */}
            <CustomButton
              isNormal
              onPress={handleSubmit}
              style={tw`mt-3`}
              disabled={!isValid || isSubmitting || !dirty}
            />
          </View>
        )}
      </Formik>
    </KeyboardAvoidWrapper>
  ); // close return
}; // close component

// Export
export default FormEditProfile;
