// Import resources
import React, { useLayoutEffect } from "react";
import { View } from "react-native";

// Import custom files
import CustomSafeView from "../components/CustomSafeView";
import CustomText from "../components/CustomText";
import useAppSettings from "../hooks/useAppSettings";
import useAuthState from "../hooks/useAuthState";
import { tw } from "../config/data";

// Component
const SupportScreen = () => {
  // Define app settings
  const { navigation, isMounted } = useAppSettings();

  // Define state
  const { user } = useAuthState();

  // Debug
  //console.log("Debug supportScreen: ",);

  // SIDE EFFECTS
  // SCREEN LAYOUT
  useLayoutEffect(() => {
    // On mount
    isMounted.current = true;
    // Set screen options
    navigation.setOptions({
      //headerTitleAlign: "center",
      // headerRight: () => (
      //   <View style={tw`flex flex-row pr-5`}>
      //     <CustomText>Right Text</CustomText>
      //   </View>
      // ), // close header right
    }); // close navigation
    // Clean up
    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  // Return component
  return (
    <CustomSafeView style={tw`px-4`}>
      {/** MAIN CONTAINER */}
      <View style={tw`flex-1 items-center justify-center`}>
        <CustomText>SupportScreen</CustomText>
      </View>
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default SupportScreen;
