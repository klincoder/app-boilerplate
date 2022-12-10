// Import resources
import React, { useLayoutEffect } from "react";
import { ScrollView, View } from "react-native";
import tw from "twrnc";

// Import custom files
import routes from "./routes";
import CustomSafeView from "../components/CustomSafeView";
import CustomListItem from "../components/CustomListItem";
import LogoutBtn from "../components/LogoutBtn";
import useAppSettings from "../hooks/useAppSettings";
import CustomImage from "../components/CustomImage";
import { useAuthContext } from "../context/AuthContext";
import { accountList, appColors } from "../config/data";

// Component
const ProfileScreen = () => {
  // Define auth context
  const { userID, username, userAvatar } = useAuthContext();

  // Define app settings
  const { navigation, isMounted } = useAppSettings();

  // Debug
  //console.log("Debug profileScreen: ", );

  // SIDE EFFECTS
  // SCREEN LAYOUT
  useLayoutEffect(() => {
    // On mount
    isMounted.current = true;
    // Set screen options
    navigation.setOptions({
      headerTitle: "Account", //handleSliceString(username, 0, 12),
      headerTitleAlign: "left",
      headerRight: () => <LogoutBtn styleContainer={tw`mr-4`} />,
    }); // close navigation
    // Clean up
    return () => {
      isMounted.current = false;
    };
  }, [navigation, username]);

  // Return component
  return (
    <CustomSafeView>
      {/** MAIN CONTAINER */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <>
          {/** Avatar color background */}
          <View style={tw`p-15 bg-[${appColors?.primary}]`}></View>

          {/** AVATAR CONTAINER */}
          <View style={tw`items-center mt-[-60]`}>
            {/** Avatar */}
            <CustomImage
              isLink
              image={userAvatar}
              style={tw`w-25 h-25 rounded-full bg-white`}
            />
          </View>

          {/** ACCOUNT LIST CONTAINER */}
          <View style={tw`pt-4 px-2`}>
            {/** Loop data */}
            {accountList?.map((item) => {
              // If item isLink
              if (item?.isLink) {
                return (
                  <CustomListItem
                    isLink
                    key={item?.id}
                    title={item?.title}
                    leftIconType={item?.leftIconType}
                    leftIconName={item?.leftIconName}
                    onPressLink={() => navigation.navigate(item?.link)}
                    containerStyle={tw`py-5`}
                  />
                ); // close return
              } else {
                return (
                  <CustomListItem
                    isNormal
                    key={item?.id}
                    title={item?.title}
                    leftIconType={item?.leftIconType}
                    leftIconName={item?.leftIconName}
                    containerStyle={tw`py-5`}
                  />
                ); // close return
              } // close if
            })}
          </View>
        </>
      </ScrollView>
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default ProfileScreen;
