// Import resources
import React from "react";
import { View } from "react-native";
import tw from "twrnc";

// Import custom files
import twStyles from "../config/twStyles";
import CustomText from "./CustomText";
import useAppSettings from "../hooks/useAppSettings";
import CustomIcon from "./CustomIcon";
import { appColors } from "../config/data";

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
        color={appColors?.primary}
        onPress={() => navigation.goBack()}
        style={tw`mr-5 p-2 rounded-full bg-[${appColors?.accent}]`}
      />
      <CustomText style={[tw`text-4xl text-white`, twStyles?.fontBold]}>
        {title || "Title"}
      </CustomText>
    </View>
  ); // close return
}; // close component

// Export
export default AuthHeader;
