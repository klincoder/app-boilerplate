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
import useAuthState from "../hooks/useAuthState";
import { accountList, appColors } from "../config/data";

// Component
const ProfileScreen = () => {
  // Define auth context
  const { userID, username, userAvatar, usernameFormat } = useAuthState();

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
      headerTitle: usernameFormat, //"Account",
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
      {/** SCROLL VIEWR */}
      <ScrollView showsVerticalScrollIndicator={false}>
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
        <View style={tw`pt-4 px-3`}>
          {/** Loop data */}
          {accountList?.map((item) => (
            <CustomListItem
              key={item?.id}
              title={item?.title}
              leftIconType={item?.leftIconType}
              leftIconName={item?.leftIconName}
              styleContainer={tw`py-5`}
              onPress={() => {
                if (item?.isLink) {
                  navigation.navigate(item?.link);
                } // close if
              }}
            />
          ))}
        </View>
      </ScrollView>
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default ProfileScreen;
