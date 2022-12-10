// Import resources
import React from "react";
import { View } from "react-native";
import tw from "twrnc";

// Import custom files
import routes from "./routes";
import useAppSettings from "../hooks/useAppSettings";
import CustomSafeView from "../components/CustomSafeView";
import CustomText from "../components/CustomText";

// Component
const HomeScreen = () => {
  // Define app settings
  const { navigation, isMounted } = useAppSettings();

  // Debug
  //console.log("Debug homeScreen: ", withDriver);

  // Return component
  return (
    <CustomSafeView>
      {/** MAIN CONTAINER */}
      <View style={tw`flex-1 items-center justify-center`}>
        <CustomText>HomeScreen</CustomText>
      </View>
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default HomeScreen;
