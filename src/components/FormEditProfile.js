// Import resources
import React from "react";
import { View } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import tw from "twrnc";

// Import custom files
import routes from "../screens/routes";
import useAppSettings from "../hooks/useAppSettings";
import KeyboardAvoidWrapper from "./KeyboardAvoidWrapper";
import CustomAlertModal from "./CustomAlertModal";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
import useCustomAlertState from "../hooks/useCustomAlertState";
import useCustomToastState from "../hooks/useCustomToastState";
import useAuthState from "../hooks/useAuthState";
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
  // Define auth state
  const { userFullName, userEmail, username, userPhone, handleUsernameExist } =
    useAuthState();

  // Define app settings
  const { todaysDate, todaysDate2, navigation } = useAppSettings();

  // Define toast
  const toast = useCustomToastState();

  // Define alert
  const alert = useCustomAlertState();

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

  // Form state
  const {
    control,
    formState: { isValid, isSubmitting, isDirty },
    handleSubmit,
  } = useForm({
    mode: "all",
    defaultValues: initialValues,
    resolver: yupResolver(validate),
  }); // close form state

  // Debug
  //console.log("Debug formEditProfile: ", todaysDate2);

  // FUNCTIONS
  // HANDLE SUBMIT FORM
  const handleSubmitForm = async (values) => {
    // Define variables
    const finalFullName = handleUppercaseFirst(values.fullName);
    const finalEmail = values.emailAddr;
    const finalUsername = values.username?.trim()?.toLowerCase();
    const finalPhone = values.phoneNum?.trim();

    // Define username exist
    const usernameExist =
      finalUsername === username ? false : handleUsernameExist(finalUsername);
    if (usernameExist?.isValid) {
      alert.showAlert(alertMsg?.usernameExistErr);
      return;
    } // close if

    // Debug
    //console.log("Debug submitForm: ", values);

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
    //   navigation.navigate(routes.ACCOUNT);
    // } catch (err) {
    //   alert.showAlert(alertMsg?.generalErr);
    //   //console.log("Debug submitForm", err.message);
    // } // close try catch
  }; // close submit form

  // Return component
  return (
    <KeyboardAvoidWrapper>
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
      <CustomInput
        name="fullName"
        control={control}
        label="Full Name"
        leftIconName="user"
        autoCapitalize="words"
        defaultValue={userFullName}
      />

      {/** Email address */}
      <CustomInput
        name="emailAddr"
        control={control}
        label="Email Address"
        leftIconType="feather"
        leftIconName="mail"
        autoCapitalize="none"
        keyboardType="email-address"
        defaultValue={userEmail}
        disabled
      />

      {/** Username */}
      <CustomInput
        name="username"
        control={control}
        label="Username"
        leftIconName="user"
        autoCapitalize="none"
        defaultValue={username}
      />

      {/** Phone number */}
      <CustomInput
        name="phoneNum"
        control={control}
        label="Phone Number"
        leftIconType="feather"
        leftIconName="phone"
        keyboardType="numeric"
        defaultValue={userPhone}
      />

      {/** Submit button */}
      <CustomButton
        isNormal
        onPress={handleSubmit(handleSubmitForm)}
        disabled={!isValid || isSubmitting || !isDirty}
      />
    </KeyboardAvoidWrapper>
  ); // close return
}; // close component

// Export
export default FormEditProfile;
