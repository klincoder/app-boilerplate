// Import resources
import React, { useLayoutEffect } from "react";
import { ScrollView, View } from "react-native";

// Import custom files
import routes from "./routes";
import CustomSafeView from "../components/CustomSafeView";
import CustomListItem from "../components/CustomListItem";
import LogoutBtn from "../components/LogoutBtn";
import useAppSettings from "../hooks/useAppSettings";
import CustomImage from "../components/CustomImage";
import useAuthState from "../hooks/useAuthState";
import CustomAlertModal from "../components/CustomAlertModal";
import useAlertState from "../hooks/useAlertState";
import { tw, accountList, alertMsg } from "../config/data";

// Component
const AccountScreen = () => {
  // Define app settings
  const { navigation, isMounted } = useAppSettings();

  // Define state
  const { user, handleLogout } = useAuthState();

  // Define alert
  const alert = useAlertState();

  // Debug
  //console.log("Debug accountScreen: ", );

  // SIDE EFFECTS
  // SCREEN LAYOUT
  useLayoutEffect(() => {
    // On mount
    isMounted.current = true;
    // Set screen options
    navigation.setOptions({
      headerTitleAlign: "left",
      headerTitle: user?.usernameFormat,
      headerRight: () => {
        <View style={tw`flex flex-row pr-5`}>
          <LogoutBtn />
        </View>;
      }, // close header right
    }); // close navigation
    // Clean up
    return () => {
      isMounted.current = false;
    };
  }, [isMounted, user?.usernameFormat]);

  // Return component
  return (
    <CustomSafeView styleStatusBar="light">
      {/** Alert modal */}
      <CustomAlertModal
        visible={alert.visible}
        hideDialog={alert.hideAlert}
        content={alert.message}
        onCancel={alert.hideAlert}
        onConfirm={async () => {
          alert.hideAlert();
          await handleLogout();
        }}
      />

      {/** SCROLL VIEW */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/** Avatar color background */}
        <View style={tw`p-15 bg-primary`}></View>

        {/** AVATAR CONTAINER */}
        <View style={tw`items-center mt-[-60]`}>
          {/** Avatar */}
          <CustomImage
            isLink
            image={user?.avatar}
            style={tw`w-25 h-25 rounded-full bg-white`}
          />
        </View>

        {/** ACCOUNT LIST CONTAINER */}
        <View style={tw`pt-4 px-3`}>
          {/** Loop data */}
          {accountList?.map((item, index) => (
            <CustomListItem
              key={`accountList${index}`}
              title={item?.title}
              leftIconType={item?.leftIconType}
              leftIconName={item?.leftIconName}
              styleContainer={tw`py-5`}
              disabled={item?.isLogout && !user?.id}
              onPress={() => {
                if (item?.isLink) {
                  navigation.navigate(item?.link);
                } else if (item?.isLogout) {
                  alert.showAlert(alertMsg?.logoutConfirm);
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
export default AccountScreen;
