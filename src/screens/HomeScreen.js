// Import resources
import React, { useLayoutEffect, useState } from "react";
import { FlatList, View } from "react-native";
import tw from "twrnc";

// Import custom files
import routes from "./routes";
import twStyles from "../config/twStyles";
import useAppSettings from "../hooks/useAppSettings";
import CustomSafeView from "../components/CustomSafeView";
import useAuthState from "../hooks/useAuthState";
import CustomText from "../components/CustomText";

// Component
const HomeScreen = () => {
  // Define app settings
  const { navigation, isMounted } = useAppSettings();

  // Define state
  const { userID } = useAuthState();

  // Debug
  // console.log("Debug homeScreen: ",);

  // Return component
  return (
    <CustomSafeView style={tw`px-4`}>
      {/** MAIN CONTAINER */}
      <View style={tw`flex-1 items-center justify-center`}>
        <CustomText>HomeScreen</CustomText>
      </View>
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default HomeScreen;
