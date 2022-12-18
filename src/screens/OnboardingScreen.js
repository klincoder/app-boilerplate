// Import resources
import React from "react";
import { View } from "react-native";
import tw from "twrnc";
import { useRecoilValue } from "recoil";

// Import custom files
import routes from "./routes";
import twStyles from "../config/twStyles";
import CustomSafeView from "../components/CustomSafeView";
import CustomText from "../components/CustomText";
import CustomButton from "../components/CustomButton";
import CustomBgImage from "../components/CustomBgImage";
import CustomImage from "../components/CustomImage";
import useAppSettings from "../hooks/useAppSettings";
import { appOnboardingAtom } from "../recoil/atoms";
import { appImages } from "../config/data";

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
          style={tw`absolute top-0 right-0 bottom-0 left-0 bg-white opacity-90`}
        />

        {/** MAIN CONTAINER */}
        <View style={tw`flex-1 justify-center px-6`}>
          {/**  Logo */}
          <CustomImage
            image={appImages?.logo}
            resizeMode="contain"
            style={tw`w-15 h-15 mb-25`}
          />

          {/** COL 1 - HEADING */}
          <View>
            <CustomText style={[tw`text-4xl`, twStyles?.fontBold]}>
              The fastest way to launch your app in 48hrs.
            </CustomText>
          </View>

          {/** COL 2 - BUTTONS */}
          <View style={tw`mt-6`}>
            {/** Login */}
            <CustomButton
              isNormal
              title="Login"
              onPress={() => navigation.navigate(routes.LOGIN)}
              styleNormalButton={tw`w-40 mb-2.5`}
            />

            {/** Register */}
            <CustomButton
              isText
              title="Not a member? Register"
              onPress={() => navigation.navigate(routes.REGISTER)}
            />
          </View>
        </View>
      </CustomBgImage>
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default OnboardingScreen;
