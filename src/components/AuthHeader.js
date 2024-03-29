// Import resources
import React from "react";
import { View } from "react-native";

// Import custom files
import CustomText from "./CustomText";
import useAppSettings from "../hooks/useAppSettings";
import CustomIcon from "./CustomIcon";
import { tw } from "../config/data";

// Component
const AuthHeader = ({ title }) => {
  // Define app settings
  const { navigation } = useAppSettings();

  // Debug
  //console.log("Debug authHeader: ",)

  // Return component
  return (
    <View style={tw`flex-row py-12 pt-20 items-center justify-center`}>
      <CustomIcon
        type="ionIcons"
        name="chevron-back"
        onPress={() => navigation.goBack()}
        style={tw`text-primary mr-5 p-2 rounded-full bg-accent`}
      />
      <CustomText style={tw`text-4xl text-white font-medium`}>
        {title || "Title"}
      </CustomText>
    </View>
  ); // close return
}; // close component

// Export
export default AuthHeader;
