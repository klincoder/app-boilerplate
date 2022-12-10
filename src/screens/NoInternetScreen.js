// Import resources
import React from "react";
import { View } from "react-native";
import tw from "twrnc";

// Import custom files
import CustomSafeView from "../components/CustomSafeView";
import CustomText from "../components/CustomText";
import CustomIcon from "../components/CustomIcon";
import { appColors, appFonts } from "../config/data";

// Component
const NoInternetScreen = () => {
  // Return component
  return (
    <CustomSafeView style={tw`bg-[${appColors?.lightGray}]`}>
      {/** SECTION - ALERT MSG */}
      <View style={tw`flex-1 items-center justify-center`}>
        {/** Icon */}
        <CustomIcon type="materialIcons" name="wifi-off" size={60} />

        {/** Text */}
        <CustomText
          style={[tw`max-w-xs text-center`, { fontFamily: appFonts?.medium }]}
        >
          No Internet Connection
        </CustomText>
      </View>
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default NoInternetScreen;
