// Import resources
import React, { useLayoutEffect } from "react";
import { FlatList, View } from "react-native";
import tw from "twrnc";

// Import custom files
import CustomSafeView from "../components/CustomSafeView";
import CustomText from "../components/CustomText";
import useAppSettings from "../hooks/useAppSettings";
import useAuthState from "../hooks/useAuthState";
import useProductState from "../hooks/useProductState";
import CategoryItem from "../components/CategoryItem";

// Component
const CategoriesScreen = () => {
  // Define app settings
  const { navigation, isMounted } = useAppSettings();

  // Define state
  const { user } = useAuthState();
  const { activeCat } = useProductState();

  // Debug
  //console.log("Debug categoriesScreen: ",);

  // SIDE EFFECTS
  // SCREEN LAYOUT
  useLayoutEffect(() => {
    // On mount
    isMounted.current = true;
    // Set screen options
    navigation.setOptions({
      headerShowm: true,
      headerTitleAlign: "left",
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
  }, [navigation, isMounted]);

  // Return component
  return (
    <CustomSafeView style={tw`px-3`}>
      {/** SECTION - FLATLIST */}
      <FlatList
        data={activeCat}
        keyExtractor={(i) => i?.id}
        initialNumToRender={12}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <CategoryItem isRow rowData={item} />}
      />
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default CategoriesScreen;
