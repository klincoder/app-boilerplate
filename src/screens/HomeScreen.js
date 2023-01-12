// Import resources
import React, { useLayoutEffect } from "react";
import { FlatList, View } from "react-native";
import tw from "twrnc";

// Import custom files
import routes from "./routes";
import useAppSettings from "../hooks/useAppSettings";
import CustomSafeView from "../components/CustomSafeView";
import CustomText from "../components/CustomText";
import useAuthState from "../hooks/useAuthState";

// Component
const HomeScreen = () => {
  // Define app settings
  const { navigation, isMounted } = useAppSettings();

  // Define state
  const { user } = useAuthState();

  // Debug
  //console.log("Debug homeScreen: ",);

  // SIDE EFFECTS
  // SCREEN LAYOUT
  useLayoutEffect(() => {
    // On mount
    isMounted.current = true;

    // Set screen options
    navigation.setOptions({
      headerTitleAlign: "left",
      //headerShown: true,
      headerTitle: "Home",
      headerRight: () => (
        <View style={tw`flex flex-row pr-5`}>
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
    <CustomSafeView style={tw`px-3`}>
      {/** SECTION */}
      <View style={tw`flex-1 items-center justify-center`}>
        <CustomText>HomeScreen</CustomText>
      </View>
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default HomeScreen;
