// Import resources
import React, { useLayoutEffect, useState } from "react";
import { FlatList, View } from "react-native";

// Import custom files
import routes from "./routes";
import useAppSettings from "../hooks/useAppSettings";
import CustomSafeView from "../components/CustomSafeView";
import useAuthState from "../hooks/useAuthState";
import CustomText from "../components/CustomText";
import CustomButton from "../components/CustomButton";
import useAlertState from "../hooks/useAlertState";
import { tw, alertMsg } from "../config/data";

// Component
const HomeScreen = () => {
  // Define app settings
  const { navigation, isMounted } = useAppSettings();

  // Define state
  const { userID } = useAuthState();

  // Define alert
  const alert = useAlertState();

  // Debug
  // console.log("Debug homeScreen: ",);

  // Return component
  return (
    <CustomSafeView styleContainer={tw`px-4`}>
      {/** MAIN CONTAINER */}
      <View style={tw`flex-1 items-center justify-center`}>
        <CustomText>HomeScreen</CustomText>

        {/** TEST BUTTON */}
        {/* <CustomButton
          isNormal
          title="TEST BUTTON"
          styleNormalButton={tw`mt-6`}
          onPress={() => {
            // alert.showLoading();
            // setTimeout(() => {
            //   alert.hideLoading();
            // }, 5000);
            alert.success(alertMsg?.generalSucc);
          }}
        /> */}
      </View>
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default HomeScreen;
