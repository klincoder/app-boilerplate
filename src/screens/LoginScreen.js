// Import resources
import React from "react";
import { View } from "react-native";
import tw from "twrnc";

// Import custom files
import CustomSafeView from "../components/CustomSafeView";
import FormLogin from "../components/FormLogin";
import useAppSettings from "../hooks/useAppSettings";
import AuthHeader from "../components/AuthHeader";
import { appColors } from "../config/data";

// Component
const LoginScreen = () => {
  // Define app settings
  const { navigation } = useAppSettings();

  // Debug
  //console.log("Debug loginScreen: ",);

  // Return component
  return (
    <CustomSafeView statusBg={appColors?.primary}>
      {/** MAIN CONTAINER */}
      <View style={tw`flex-1 bg-[${appColors?.primary}]`}>
        {/** COL 1 - TITLE */}
        <AuthHeader title="Login" />

        {/** COL 2 - FORM */}
        <View style={tw`flex-1 p-5 rounded-t-3xl bg-white`}>
          <FormLogin />
        </View>
      </View>
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default LoginScreen;
