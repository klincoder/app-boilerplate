// Import resources
import React from "react";
import { View, Share } from "react-native";
import tw from "twrnc";

// Import custom files
import CustomText from "./CustomText";
import useAppSettings from "../hooks/useAppSettings";
import CustomButton from "./CustomButton";
import CustomIcon from "./CustomIcon";
import { useAuthContext } from "../context/AuthContext";
import { baseUrl } from "../config/data";

// Component
const ShareIcon = ({ title, slug }) => {
  // Define auth context
  const { user } = useAuthContext();

  // Define app settings
  const { isMounted } = useAppSettings();

  // Debug
  //console.log("Debug shareIcon: ",)

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
      console.log("Debug shareIcon: ", err.message);
    } // close try catch
  }; // close fxn

  // Return component
  return (
    <CustomButton isTouchable onPress={handleShareContent}>
      <CustomIcon type="antDesign" icon="sharealt" size={24} />
    </CustomButton>
  ); // close return
}; // close component

// Export
export default ShareIcon;
