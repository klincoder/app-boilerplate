// Import resources
import React, { useState } from "react";
import tw from "twrnc";
import { View } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// Import custom files
import twStyles from "../config/twStyles";
import KeyboardAvoidWrapper from "./KeyboardAvoidWrapper";
import useAppSettings from "../hooks/useAppSettings";
import CustomAlertModal from "./CustomAlertModal";
import CustomButton from "./CustomButton";
import CustomText from "./CustomText";
import useCustomAlertState from "../hooks/useCustomAlertState";
import useAuthState from "../hooks/useAuthState";
import CustomInput from "./CustomInput";
import { alertMsg, apiRoutes, appColors, appRegex } from "../config/data";
import { fireAuth, fireDB, setDoc, doc } from "../config/firebase";
import {
  handleTitleCase,
  handleSendEmail,
  handleGenUsername,
} from "../config/functions";

// Component
const FormRegister = () => {
  // Define auth
  const { handleEmailExist, handleRegister } = useAuthState();

  // Define state
  const [hidePass, setHidePass] = useState(true);

  // Define app settings
  const { todaysDate, todaysDate1, siteInfo } = useAppSettings();

  // Define alert
  const alert = useCustomAlertState();

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
  //console.log("Debug formRegister: ",);

  // FUNCTIONS
  // HANDLE SUBMIT FORM
  const handleSubmitForm = async (values) => {
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
    if (emailExist?.isValid) {
      alert.showAlert("Email address already exist");
      return;
    } // close if

    // Debug
    //console.log("Debug submitForm: ", values);

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
        reg_method: "app",
        role: "user",
        avatar: "",
        full_name: finalFullName,
        email_address: finalEmail,
        phone_number: "",
        push_status: { email: true, sms: true },
        user_id: currUserID,
        username: finalUsername,
        date_created: todaysDate,
        dateUpdated: todaysDate,
      });

      // Send user welcome email
      // await handleSendEmail(
      //   "user",
      //   finalUsername,
      //   finalEmail,
      //   emailMsg,
      //   apiRoutes?.welcome,
      //  siteInfo?.name
      // );

      // Send admin new user email
      // await handleSendEmail(
      //   "admin",
      //   siteInfo?.adminName,
      //   siteInfo?.adminEmail,
      //   emailMsg,
      //   apiRoutes?.newUser,
      //   siteInfo?.name
      // );

      // Alert succ
      alert.showAlert(alertMsg?.linkSentSucc);
      reset();
    } catch (err) {
      alert.showAlert(alertMsg?.generalErr);
      //console.log("Debug submitForm: ", err.message);
    } // close try catch
  }; // close fxn

  // Return component
  return (
    <KeyboardAvoidWrapper>
      {/** Debug */}
      {/* {console.log("Debug formValues: ", values)} */}

      {/** Show spinner */}
      <CustomAlertModal isSpinner visible={alert.loading || isSubmitting} />

      {/** Alert modal */}
      <CustomAlertModal
        visible={alert.visible}
        hideDialog={alert.hideAlert}
        cancelAction={alert.hideAlert}
        content={alert.message}
        cancelText="Close"
      />

      {/** Full name */}
      <CustomInput
        name="fullName"
        control={control}
        label="Full Name"
        placeholder="Full name"
        leftIconName="user"
        autoCapitalize="words"
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
        helperText="We'll send a confirmation link"
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
        title="Create Account"
        onPress={handleSubmit(handleSubmitForm)}
        disabled={!isValid || isSubmitting || alert?.loading}
      />

      {/** Terms */}
      <CustomText
        style={[
          tw`my-2 text-center text-[${appColors?.gray}]`,
          twStyles?.fontRegular,
        ]}
      >
        By creating an account, I accept the{" "}
        <CustomButton
          isText
          title="terms of service & privacy policy"
          styleTextTitle={tw`text-xs text-[${appColors?.gray}]`}
        />
      </CustomText>

      {/** TEST BUTTON */}
      {/* <CustomButton
          isNormal
          title="TEST BUTTON"
          type="outline"
          onPress={async () => {
            // Try catch
            try {
              await handleSendEmail(
                "user",
                "Klincoder",
                "klincoder@gmail.com",
                "123456",
                apiRoutes?.otp,
                siteInfo?.name
              );
            } catch (err) {
              console.log("Debug formRegDetails: ", err.message);
            } // close try catch
          }}
        /> */}
    </KeyboardAvoidWrapper>
  ); // close return
}; // close component

// Export
export default FormRegister;
