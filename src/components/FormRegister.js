// Import resources
import React, { useState } from "react";
import { View } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// Import custom files
import KeyboardAvoidWrapper from "./KeyboardAvoidWrapper";
import useAppSettings from "../hooks/useAppSettings";
import CustomAlertModal from "./CustomAlertModal";
import CustomButton from "./CustomButton";
import CustomText from "./CustomText";
import useCustomAlertState from "../hooks/useAlertState";
import useAuthState from "../hooks/useAuthState";
import CustomInput from "./CustomInput";
import { tw, alertMsg, apiRoutes } from "../config/data";
import { fireAuth, fireDB, setDoc, doc } from "../config/firebase";
import { handleSendEmail, handleHashVal } from "../config/functions";

// Component
const FormRegister = () => {
  // Define app settings
  const { todaysDate, todaysDate1, siteInfo } = useAppSettings();

  // Define state
  const { handleUserExist, handleRegister } = useAuthState();
  const [hidePass, setHidePass] = useState(true);

  // Define alert
  const alert = useCustomAlertState();

  // FORM CONFIG
  // Initial values
  const initialValues = {
    username: "",
    emailAddr: "",
    pass: "",
  };

  // Validate
  const validate = Yup.object().shape({
    username: Yup.string().required("Required").min(3, "Too short"),
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
  //console.log("Debug formRegister: ",);

  // FUNCTIONS
  // HANDLE SUBMIT FORM
  const handleSubmitForm = async (values) => {
    // Define variables
    const finalUsername = values?.username?.trim()?.toLowerCase();
    const finalEmail = values?.emailAddr?.trim()?.toLowerCase();
    const finalPass = values?.pass?.trim();
    const passHash = await handleHashVal(finalPass, "hash");
    const userExist = handleUserExist(finalEmail);

    // If userExist
    if (userExist?.isValid) {
      alert.showAlert(alertMsg?.inValidCred);
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

      // Add user to db
      const newUserRef = doc(fireDB, "users", currUserID);
      await setDoc(newUserRef, {
        reg_method: "app",
        role: "user",
        avatar: "",
        full_name: "",
        phone_number: "",
        email_address: finalEmail,
        password: passHash,
        push_status: { app: true, email: true, sms: true },
        user_id: currUserID,
        username: finalUsername,
        date_created: todaysDate,
        dateUpdated: todaysDate,
      });

      // Send email
      const userEmailMsg = {
        role: "user",
        toName: finalUsername,
        toEmail: finalEmail,
      };
      const adminEmailMsg = {
        role: "admin",
        toName: siteInfo?.adminName,
        toEmail: siteInfo?.adminEmail,
        username: finalUsername,
      };
      await handleSendEmail(userEmailMsg, apiRoutes?.welcome);
      await handleSendEmail(adminEmailMsg, apiRoutes?.newUser);

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

      {/** Spinner */}
      <CustomAlertModal isSpinner visible={alert.loading || isSubmitting} />

      {/** Alert modal */}
      <CustomAlertModal
        visible={alert.visible}
        hideDialog={alert.hideAlert}
        cancelAction={alert.hideAlert}
        content={alert.message}
        cancelText="Close"
      />

      {/** Username */}
      <CustomInput
        name="username"
        control={control}
        label="Username"
        placeholder="Username"
        leftIconName="user"
        autoCapitalize="none"
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
      <CustomText style={tw`text-sm text-center font-regular my-2`}>
        By clicking on the create account button, I agree to the{" "}
        <CustomText
          style={tw`font-medium underline`}
          onPress={() => console.log("Clicked privacy!")}
        >
          privacy
        </CustomText>{" "}
        and{" "}
        <CustomText
          style={tw`font-medium underline`}
          onPress={() => console.log("Clicked terms!")}
        >
          terms
        </CustomText>{" "}
        policy.
      </CustomText>

      {/** TEST BUTTON */}
      {/* <CustomButton
        isNormal
        title="TEST BUTTON"
        type="outline"
        onPress={async () => {
          // Try catch
          try {
            //const result = await handleHashVal("incorr3t", "hash");
            const hashedVal =
              "$2a$10$/2UigxcFwJQ2gW9q4H7wH.53clkyBS/B1EZ5zvYlTJgIfOll5IHpS";
            const result = await handleHashVal(
              "incorr3t",
              "compare",
              hashedVal
            );
            console.log("Debug testBtn 1: ", result);
          } catch (err) {
            console.log("Debug testBtn 2: ", err.message);
          } // close try catch
        }}
      /> */}
    </KeyboardAvoidWrapper>
  ); // close return
}; // close component

// Export
export default FormRegister;
