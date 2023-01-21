// Import resources
import React, { useLayoutEffect } from "react";
import { View } from "react-native";
import tw from "twrnc";

// Import custom files
import CustomSafeView from "../components/CustomSafeView";
import CustomText from "../components/CustomText";
import useAppSettings from "../hooks/useAppSettings";
import useAuthState from "../hooks/useAuthState";

// Component
const MyOrdersScreenDetails = () => {
  // Define app settings
  const { navigation, isMounted } = useAppSettings();

  // Define state
  const { userID } = useAuthState();

  // Debug
  //console.log("Debug myOrdersScreenDetails: ",);

  // SIDE EFFECTS
  // SCREEN LAYOUT
  useLayoutEffect(() => {
    // On mount
    isMounted.current = true;
    // Set screen options
    navigation.setOptions({
      headerTitleAlign: "left",
      headerRight: () => (
        <View style={tw`flex flex-row pr-4`}>
          <CustomText>Right Text</CustomText>
        </View>
      ), // close header right
    }); // close navigation
    // Clean up
    return () => {
      isMounted.current = false;
    };
  }, [navigation, isMounted]);

  // Return component
  return (
    <CustomSafeView style={tw`px-4`}>
      {/** MAIN CONTAINER */}
      <View style={tw`flex-1 items-center justify-center`}>
        <CustomText>MyOrdersScreenDetails</CustomText>
      </View>
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default MyOrdersScreenDetails;
