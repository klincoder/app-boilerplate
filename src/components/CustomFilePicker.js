// Import resources
import React from "react";
import { View } from "react-native";
import tw from "twrnc";

// Import custom files
import CustomText from "./CustomText";
import CustomListItem from "./CustomListItem";
import CustomHelperText from "./CustomHelperText";
import { appFonts } from "../config/data";

// Component
const CustomFilePicker = ({
  label,
  title,
  leftIconType,
  leftIconName,
  onPress,
  helperText,
  errMsg,
  ...rest
}) => {
  // Debug
  //console.log("Debug customFilePicker: ",)

  // Return component
  return (
    <View style={tw`mb-3`}>
      {/** Label */}
      {label && (
        <CustomText style={[tw`mb-1 mx-3`, { fontFamily: appFonts?.medium }]}>
          {label}
        </CustomText>
      )}

      {/** Input */}
      <CustomListItem
        {...rest}
        isLink
        hideDivider
        title={title || `Choose ${label?.toLowerCase()}`}
        containerStyle={tw`mx-3 border rounded-lg`}
        leftIconType={leftIconType}
        leftIconName={leftIconName || "arrowright"}
        onPressLink={onPress}
      />

      {/** Helper text */}
      <CustomHelperText visible={helperText} title={helperText} />

      {/** Error message */}
      <CustomHelperText isError visible={errMsg} title={errMsg} />
    </View>
  ); // close return
}; // close component

// Export
export default CustomFilePicker;
