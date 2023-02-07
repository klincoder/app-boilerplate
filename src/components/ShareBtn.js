// Import resources
import React from "react";
import { Share } from "react-native";

// Import custom files
import CustomButton from "./CustomButton";
import CustomIcon from "./CustomIcon";
import { tw } from "../config/data";

// Component
const ShareBtn = ({ title, slug, styleIcon, ...rest }) => {
  // Debug
  //console.log("Debug shareBtn: ",)

  // FUNCTIONS
  // HANDLE SHARE CONTENT
  const handleShareContent = async (url, msg) => {
    // If empty args, return
    if (!url || !msg) return;
    // Try catch
    try {
      // Define variables
      const result = await Share.share({ url: url, message: msg });
      // If share action
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with activity type of result.activityType
          console.log("activityType: ", result.activityType);
        } else {
          console.log("shared!");
        } // close if
      } else if (result.action === Share.dismissedAction) {
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
