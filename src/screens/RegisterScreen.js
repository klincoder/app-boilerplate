// Import resources
import React from "react";
import { View } from "react-native";
import tw from "twrnc";

// Import custom files
import CustomSafeView from "../components/CustomSafeView";
import FormRegister from "../components/FormRegister";
import useAppSettings from "../hooks/useAppSettings";
import AuthHeader from "../components/AuthHeader";
import { appColors } from "../config/data";

// Component
const RegisterScreen = () => {
  // Define app settings
  const { navigation } = useAppSettings();

  // Debug
  //console.log("Debug registerScreen: ",)

  // Return component
  return (
    <CustomSafeView statusBg={appColors?.primary}>
      {/** MAIN CONTAINER */}
      <View style={tw`flex-1 bg-[${appColors?.primary}]`}>
        {/** COL 1 - TITLE */}
        <AuthHeader title="Register" />

        {/** COL 2 - FORM */}
        <View style={tw`flex-1 p-5 rounded-t-3xl bg-[${appColors?.white}]`}>
          <FormRegister />
        </View>
      </View>
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default RegisterScreen;
