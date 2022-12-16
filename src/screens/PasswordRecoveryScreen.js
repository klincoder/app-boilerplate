// Import resources
import React from "react";
import { View } from "react-native";
import tw from "twrnc";

// Import custom files
import CustomSafeView from "../components/CustomSafeView";
import useAppSettings from "../hooks/useAppSettings";
import FormPasswordRecovery from "../components/FormPasswordRecovery";
import AuthHeader from "../components/AuthHeader";
import { appColors } from "../config/data";

// Component
const PasswordRecoveryScreen = () => {
  // Define app settings
  const { navigation } = useAppSettings();

  // Debug
  //console.log("Debug passRecoveryScreen: ",)

  // Return component
  return (
    <CustomSafeView statusBg={appColors?.primary}>
      {/** MAIN CONTAINER */}
      <View style={tw`flex-1 bg-[${appColors?.primary}]`}>
        {/** COL 1 - TITLE */}
        <AuthHeader title="Recovery" />

        {/** COL 2 - FORM */}
        <View style={tw`flex-1 p-5 rounded-t-3xl bg-[${appColors?.white}]`}>
          <FormPasswordRecovery />
        </View>
      </View>
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default PasswordRecoveryScreen;
