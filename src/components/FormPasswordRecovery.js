// Import resources
import React from "react";
import tw from "twrnc";
import { View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";

// Import custom files
import routes from "../screens/routes";
import KeyboardAvoidWrapper from "./KeyboardAvoidWrapper";
import CustomAlertModal from "./CustomAlertModal";
import CustomTextInputForm from "./CustomTextInputForm";
import CustomButton from "./CustomButton";
import useCustomAlertState from "../hooks/useCustomAlertState";
import useAppSettings from "../hooks/useAppSettings";
import { useAuthContext } from "../context/AuthContext";
import { alertMsg } from "../config/data";
import { fireAuth } from "../config/firebase";

// Component
const FormPasswordRecovery = () => {
  // Define auth context
  const { handleEmailExist, handleSendPassResetLink } = useAuthContext();

  // Define app settings
  const { navigation } = useAppSettings();

  // Define alert
  const alert = useCustomAlertState();

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

  // FUNCTIONS
  // HANDLE SUBMIT FORM
  const handleSubmitForm = async (values, { setSubmitting, resetForm }) => {
    // Define variables
    const finalEmail = values.emailAddr?.trim()?.toLowerCase();
    const emailExist = handleEmailExist(finalEmail);

    // If !emailExist
    if (!emailExist?.isValid) {
      alert.showAlert("User not found");
      return;
    } // close if

    // Debug
    // console.log("Debug submitForm: ", values);

    // Try catch
    try {
      // Send password reset link
      await handleSendPassResetLink(fireAuth, finalEmail);
      // Alert succ
      alert.showAlert(alertMsg?.linkSentSucc);
      resetForm();
    } catch (err) {
      alert.showAlert(err.message);
      //console.log("Debug submitForm: ", err.message);
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
        {({ values, errors, isValid, isSubmitting, handleSubmit }) => (
          <>
            {/** Debug */}
            {/* {console.log("Form formValues: ", values)} */}

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
              content={alert.message}
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
            />

            {/** Submit button */}
            <CustomButton
              isPaper
              stylePaper={tw`mt-3`}
              disabled={!isValid || isSubmitting || alert.loading}
              onPress={handleSubmit}
            >
              Send recovery link
            </CustomButton>

            {/** OTHER LINKS */}
            {/* <View style={tw`flex items-center mt-6`}>
              <CustomButton
                isText
                onPress={() => navigation.navigate(routes.LOGIN)}
              >
                Back to Login
              </CustomButton>
            </View> */}
          </>
        )}
      </Formik>
    </KeyboardAvoidWrapper>
  ); // close return
}; // close component

// Export
export default FormPasswordRecovery;
