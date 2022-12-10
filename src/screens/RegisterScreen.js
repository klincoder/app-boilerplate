// Import resources
import React from "react";
import { ScrollView, View } from "react-native";
import tw from "twrnc";

// Import custom files
import CustomSafeView from "../components/CustomSafeView";
import FormRegister from "../components/FormRegister";
import CustomText from "../components/CustomText";
import CustomButton from "../components/CustomButton";
import CustomIcon from "../components/CustomIcon";
import useAppSettings from "../hooks/useAppSettings";
import { appColors, appFonts } from "../config/data";

// Component
const RegisterScreen = () => {
  // Define app settings
  const { navigation } = useAppSettings();

  // Debug
  //console.log("Debug registerScreen: ",)

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
            Register
          </CustomText>
        </View>

        {/** FORM */}
        <View style={tw`flex-1 p-5 rounded-t-3xl bg-[${appColors?.white}]`}>
          <FormRegister />
        </View>
      </View>
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default RegisterScreen;
