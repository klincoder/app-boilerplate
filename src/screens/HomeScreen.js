// Import resources
import React from "react";
import { View } from "react-native";
import tw from "twrnc";

// Import custom files
import useAppSettings from "../hooks/useAppSettings";
import CustomSafeView from "../components/CustomSafeView";
import CustomText from "../components/CustomText";
import FormTest from "../components/FormTest";

// Component
const HomeScreen = () => {
  // Define app settings
  const { navigation, isMounted } = useAppSettings();

  // Debug
  //console.log("Debug homeScreen: ",);

  // Return component
  return (
    <CustomSafeView style={tw`px-3 pt-3`}>
      {/** MAIN CONTAINER */}
      {/* <View style={tw`flex-1 items-center justify-center`}>
        <CustomText>HomeScreen</CustomText>
      </View> */}

      {/** FORM TEST */}
      <FormTest />
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default HomeScreen;
