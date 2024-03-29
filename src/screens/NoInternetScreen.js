// Import resources
import React from "react";
import { View } from "react-native";

// Import custom files
import CustomSafeView from "../components/CustomSafeView";
import CustomAlertMsg from "../components/CustomAlertMsg";
import { tw } from "../config/data";

// Component
const NoInternetScreen = () => {
  // Return component
  return (
    <CustomSafeView>
      {/** Alert msg */}
      <CustomAlertMsg
        title="No Internet"
        description="Connect to a wifi or cellular data network to continue."
        iconType="materialIcons"
        iconName="wifi-off"
      />
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default NoInternetScreen;
