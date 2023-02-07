// Import resources
import React from "react";
import { BaseToast } from "react-native-toast-message";

// Import custom files
import CustomIcon from "../components/CustomIcon";
import { tw } from "./data";

// Define toast config
const toastConfig = {
  // Override success
  success: ({ text1, text2, props, ...rest }) => (
    <BaseToast
      {...rest}
      text1={text1}
      text2={text2}
      text2NumberOfLines={1}
      text1Style={tw`text-sm font-400 text-white font-regular`}
      text2Style={tw`text-base font-600 text-white font-medium`}
      style={tw`bg-success border-success h-20`}
      renderLeadingIcon={() => (
        <CustomIcon
          type="feather"
          name="check-circle"
          size={30}
          style={tw`text-white pl-5 self-center`}
        />
      )}
    />
  ), // close success
  // Define error
  error: ({ text1, text2, props, ...rest }) => (
    <BaseToast
      {...rest}
      text1={text1}
      text2={text2}
      text2NumberOfLines={1}
      text1Style={tw`text-sm font-400 text-white font-regular`}
      text2Style={tw`text-base font-600 text-white font-medium`}
      style={tw`bg-danger border-danger h-20`}
      renderLeadingIcon={() => (
        <CustomIcon
          type="antDesign"
          name="warning"
          size={30}
          style={tw`text-white pl-5 self-center`}
        />
      )}
    />
  ), // close error
  // Define info
  info: ({ text1, text2, props, ...rest }) => (
    <BaseToast
      {...rest}
      text1={text1}
      text2={text2}
      text2NumberOfLines={1}
      text1Style={tw`text-sm font-400 text-white font-regular`}
      text2Style={tw`text-base font-600 text-white font-medium`}
      style={tw`bg-secondary border-secondary h-20`}
      renderLeadingIcon={() => (
        <CustomIcon
          type="antDesign"
          name="infocirlceo"
          size={30}
          style={tw`text-white pl-5 self-center`}
        />
      )}
    />
  ), // close info
}; // close toast config

// Export
export default toastConfig;
