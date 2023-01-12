// Import resources
import React from "react";
import { View, Share } from "react-native";
import tw from "twrnc";

// Import custom files
import CustomButton from "./CustomButton";
import CustomIcon from "./CustomIcon";
import { baseUrl } from "../config/data";

// Component
const ShareBtn = ({ title, slug, styleIcon, ...rest }) => {
  // Debug
  //console.log("Debug shareBtn: ",)

  // FUNCTIONS
  // HANDLE SHARE CONTENT
  const handleShareContent = async () => {
    // Try catch
    try {
      // Define variables
      const result = await Share.share({
        url: `${baseUrl}/cars/${slug}`,
        message: `RentDrive: Drive a ${title} - ${baseUrl}/cars/${slug}`,
      });
      // If share action
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with activity type of result.activityType
          console.log("activityType: ", result.activityType);
        } else {
          // Shared
          console.log("shared!");
        } // close if
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
        console.log("dismissed!");
      } // close if
    } catch (err) {
      console.log("Debug shareBtn: ", err.message);
    } // close try catch
  }; // close fxn

  // Return component
  return (
    <CustomButton {...rest} isTouchable onPress={handleShareContent}>
      <CustomIcon
        type="antDesign"
        name="sharealt"
        style={[tw`p-3 rounded-full`, styleIcon]}
      />
    </CustomButton>
  ); // close return
}; // close component

// Export
export default ShareBtn;
