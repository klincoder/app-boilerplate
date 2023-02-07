// Import resources
import React from "react";
import { View } from "react-native";

// Import custom files
import CustomSafeView from "../components/CustomSafeView";
import FormRegister from "../components/FormRegister";
import useAppSettings from "../hooks/useAppSettings";
import AuthHeader from "../components/AuthHeader";
import { tw } from "../config/data";

// Component
const RegisterScreen = () => {
  // Define app settings
  const { navigation } = useAppSettings();

  // Debug
  //console.log("Debug registerScreen: ",)

  // Return component
  return (
    <CustomSafeView styleStatusBar="light">
      {/** SECTION */}
      <View style={tw`flex-1 bg-primary`}>
        {/** COL 1 - TITLE */}
        <AuthHeader title="Register" />

        {/** COL 2 - FORM */}
        <View style={tw`flex-1 px-3 py-5 rounded-t-3xl bg-white`}>
          <FormRegister />
        </View>
      </View>
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default RegisterScreen;
