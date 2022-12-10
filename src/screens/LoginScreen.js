// Import resources
import React from "react";
import { ScrollView, View } from "react-native";
import tw from "twrnc";

// Import custom files
import CustomSafeView from "../components/CustomSafeView";
import CustomText from "../components/CustomText";
import FormLogin from "../components/FormLogin";
import useAppSettings from "../hooks/useAppSettings";
import CustomButton from "../components/CustomButton";
import CustomIcon from "../components/CustomIcon";
import { appColors, appFonts } from "../config/data";

// Component
const LoginScreen = () => {
  // Define app settings
  const { navigation } = useAppSettings();

  // Debug
  //console.log("Debug loginScreen: ",);

  // Return component
  return (
    <CustomSafeView statusBg={appColors?.primary}>
      {/** MAIN CONTAINER */}
      <View style={tw`flex-1 bg-[${appColors?.primary}]`}>
        {/** TITLE */}
        <View style={tw`flex-row py-12 items-center justify-center`}>
          {/** Back button */}
          <CustomButton
            isTouchable
            onPress={() => navigation.goBack()}
            styleTouchable={tw`mr-5 p-2 rounded-full bg-[${appColors?.secondary}]`}
          >
            {/** Icon */}
            <CustomIcon
              type="ionIcons"
              icon="chevron-back"
              size={24}
              color={appColors?.primary}
            />
          </CustomButton>

          {/** Text */}
          <CustomText
            style={[
              tw`text-4xl text-white text-center`,
              { fontFamily: appFonts?.medium },
            ]}
          >
            Login
          </CustomText>
        </View>

        {/** Form */}
        <View style={tw`flex-1 p-5 rounded-t-3xl bg-[${appColors?.white}]`}>
          <FormLogin />
        </View>
      </View>
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default LoginScreen;
