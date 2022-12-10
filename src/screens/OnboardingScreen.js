// Import resources
import React from "react";
import { StatusBar, View } from "react-native";
import tw from "twrnc";
import { useRecoilValue } from "recoil";

// Import custom files
import routes from "./routes";
import CustomSafeView from "../components/CustomSafeView";
import CustomText from "../components/CustomText";
import CustomButton from "../components/CustomButton";
import CustomBgImage from "../components/CustomBgImage";
import CustomImage from "../components/CustomImage";
import CustomIcon from "../components/CustomIcon";
import useAppSettings from "../hooks/useAppSettings";
import { appOnboardingAtom } from "../recoil/atoms";
import { appColors, appFonts, appImages } from "../config/data";

// Component
const OnboardingScreen = () => {
  // Define state
  const onboardingSlides = useRecoilValue(appOnboardingAtom);

  // Define app settings
  const { navigation } = useAppSettings();

  // Debug
  //console.log("Debug onboardingScreen: ", onboardingSlides);

  // Return component
  return (
    <CustomSafeView>
      {/** BACKGROUND IMAGE */}
      <CustomBgImage isLink image={appImages?.onboarding}>
        {/** Overlay */}
        <View
          style={tw`absolute top-0 right-0 bottom-0 left-0 bg-white opacity-95`}
        />

        {/** MAIN CONTAINER */}
        <View style={tw`flex-1 justify-center px-6`}>
          {/**  Logo */}
          <CustomImage
            image={appImages?.logo}
            style={tw`w-20 h-20 mb-30 rounded-full`}
          />

          {/** COL 1 */}
          <View>
            {/** Heading */}
            <CustomText style={tw`text-4xl`}>
              Rent & drive any car in minutes.
            </CustomText>
          </View>

          {/** Button */}
          <View style={tw`mt-6`}>
            {/** Login */}
            <CustomButton
              isText
              type="button"
              onPress={() => navigation.navigate(routes.LOGIN)}
              styleText={tw`w-40`}
            >
              Login
            </CustomButton>

            {/** Register */}
            <CustomButton
              isText
              onPress={() => navigation.navigate(routes.REGISTER)}
              styleText={tw`mt-6`}
            >
              Not a member? Register
            </CustomButton>
          </View>
        </View>
      </CustomBgImage>
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default OnboardingScreen;
