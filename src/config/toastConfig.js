// Import resources
import React from "react";
import { BaseToast } from "react-native-toast-message";
import tw from "twrnc";

// Import custom files
import CustomIcon from "../components/CustomIcon";
import { appColors } from "./data";

// Define toast config
const toastConfig = {
  // Override success
  success: ({ text1, text2, props, ...rest }) => (
    <BaseToast
      {...rest}
      style={{
        backgroundColor: appColors?.success,
        borderLeftColor: appColors?.success,
        //height: 80,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 12,
        fontWeight: "400",
        color: "white",
      }}
      text2Style={{
        fontSize: 18,
        fontWeight: "600",
        color: "white",
      }}
      text1={text1}
      text2={text2}
      renderLeadingIcon={() => (
        <CustomIcon
          type="feather"
          icon="check-circle"
          size={30}
          style={tw`self-center pl-3 text-white`}
        />
      )}
    />
  ), // close success
  // Define error
  error: ({ text1, text2, props, ...rest }) => (
    <BaseToast
      {...rest}
      style={{
        backgroundColor: appColors?.danger,
        borderLeftColor: appColors?.danger,
        //height: 120,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 12,
        fontWeight: "400",
        color: "white",
      }}
      text2Style={{
        fontSize: 18,
        fontWeight: "600",
        color: "white",
      }}
      text1={text1}
      text2={text2}
      renderLeadingIcon={() => (
        <CustomIcon
          type="ionIcons"
          icon="warning"
          size={30}
          style={tw`self-center pl-3 text-white`}
        />
      )}
    />
  ), // close error
  // Define info
  info: ({ text1, text2, props, ...rest }) => (
    <BaseToast
      {...rest}
      style={{
        backgroundColor: appColors?.secondary,
        borderLeftColor: appColors?.secondary,
        //height: 120,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 12,
        fontWeight: "400",
        color: "black",
      }}
      text2Style={{
        fontSize: 18,
        fontWeight: "600",
        color: "black",
      }}
      text1={text1}
      text2={text2}
      renderLeadingIcon={() => (
        <CustomIcon
          type="antDesign"
          icon="infocirlce"
          size={30}
          style={tw`self-center pl-3`}
        />
      )}
    />
  ), // close info
}; // close toast config

// Export
export default toastConfig;
