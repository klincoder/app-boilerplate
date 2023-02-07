// Import resources
import React from "react";
import { View } from "react-native";

// Import custom files
import CustomText from "./CustomText";
import useAppSettings from "../hooks/useAppSettings";
import CustomIcon from "./CustomIcon";
import { tw } from "../config/data";

// Component
const PaymentLogos = () => {
  // Define app settings
  const { navigation } = useAppSettings();

  // Debug
  //console.log("Debug paymentLogos: ",)

  // Return component
  return (
    <View style={tw`flex flex-row items-center justify-center mt-1`}>
      {/** Icon */}
      <CustomIcon
        type="feather"
        name="lock"
        size={14}
        style={tw`mr-1 text-gray`}
      />

      {/** Secured by */}
      <CustomText style={tw`text-xs uppercase text-gray font-medium`}>
        Secured by Paystack
      </CustomText>
    </View>
  ); // close return
}; // close component

// Export
export default PaymentLogos;
