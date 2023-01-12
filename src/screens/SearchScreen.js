// Import resources
import React, { useLayoutEffect, useState } from "react";
import { ScrollView, View, FlatList } from "react-native";
import tw from "twrnc";

// Import custom files
import twStyles from "../config/twStyles";
import CustomSafeView from "../components/CustomSafeView";
import CustomText from "../components/CustomText";
import useAppSettings from "../hooks/useAppSettings";
import useAuthState from "../hooks/useAuthState";
import { appColors } from "../config/data";

// Component
const SearchCarsScreen = () => {
  // Define app settings
  const { navigation, isMounted } = useAppSettings();

  // Define state
  const { user } = useAuthState();
  const [searchVal, setSearchVal] = useState("");

  // Debug
  //console.log("Debug searchCarsScreen: ",);

  // SIDE EFFECTS
  // SCREEN LAYOUT
  useLayoutEffect(() => {
    // On mount
    isMounted.current = true;

    // Set screen options
    navigation.setOptions({
      headerTitleAlign: "left",
      headerShown: true,
      headerTitle: "Search",
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
    <CustomSafeView>
      {/** SECTION */}
      <View style={tw`flex-1 items-center justify-center`}>
        <CustomText>SearchScreen</CustomText>
      </View>
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default SearchCarsScreen;
