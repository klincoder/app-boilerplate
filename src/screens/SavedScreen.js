// Import resources
import React, { useLayoutEffect } from "react";
import { FlatList, View } from "react-native";
import { useRecoilValue } from "recoil";
import tw from "twrnc";

// Import custom files
import CustomSafeView from "../components/CustomSafeView";
import useAppSettings from "../hooks/useAppSettings";
import useAuthState from "../hooks/useAuthState";
import CustomAlertMsg from "../components/CustomAlertMsg";
import CustomText from "../components/CustomText";
import { userSavedAtom } from "../recoil/atoms";

// Component
const SavedScreen = () => {
  // Define app settings
  const { navigation, isMounted } = useAppSettings();

  // Define state
  const { user } = useAuthState();
  const userSaved = useRecoilValue(userSavedAtom);

  // Define variables
  const userSavedLen = userSaved?.length;

  // Debug
  //console.log("Debug savedScreen: ",);

  // SIDE EFFECTS
  // SCREEN LAYOUT
  useLayoutEffect(() => {
    // On mount
    isMounted.current = true;

    // Set screen options
    navigation.setOptions({
      headerTitleAlign: "left",
      headerShown: true,
      headerTitle: "Saved",
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
      {/** IF NO DATA */}
      {userSavedLen < 1 ? (
        <CustomAlertMsg />
      ) : (
        <FlatList
          data={userSaved}
          keyExtractor={(item) => item?.id}
          initialNumToRender={24}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          // ListEmptyComponent={<CustomAlertMsg />}
          // renderItem={({ item }) => (
          //   <CarItem showSaveBtn rowData={item?.data} />
          // )}
        />
      )}
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default SavedScreen;
