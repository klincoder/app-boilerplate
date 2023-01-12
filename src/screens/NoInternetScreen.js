// Import resources
import React from "react";
import { View } from "react-native";
import tw from "twrnc";

// Import custom files
import CustomSafeView from "../components/CustomSafeView";
import CustomAlertMsg from "../components/CustomAlertMsg";
import { appColors, appFonts } from "../config/data";

// Component
const NoInternetScreen = () => {
  // Return component
  return (
    <CustomSafeView>
      {/** Alert msg */}
      <CustomAlertMsg
        title="No Internet Connection"
        description="Please connect to a wifi or cellular data network to continue."
        iconType="materialIcons"
        iconName="wifi-off"
      />
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default NoInternetScreen;
