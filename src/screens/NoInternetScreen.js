// Import resources
import React from "react";
import { View } from "react-native";
import tw from "twrnc";

// Import custom files
import CustomSafeView from "../components/CustomSafeView";
import NoResultMsg from "../components/NoResultMsg";
import { appColors, appFonts } from "../config/data";

// Component
const NoInternetScreen = () => {
  // Return component
  return (
    <CustomSafeView>
      {/** No result msg */}
      <NoResultMsg
        title="No Internet Connection"
        iconType="materialIcons"
        iconName="wifi-off"
      />
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default NoInternetScreen;
