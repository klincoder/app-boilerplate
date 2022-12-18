// Import resources
import React from "react";
import { View } from "react-native";
import tw from "twrnc";

// Import custom files
import twStyles from "../config/twStyles";
import CustomText from "./CustomText";
import CustomListItem from "./CustomListItem";
import CustomBottomSheet from "./CustomBottomSheet";
import CustomHelperText from "./CustomHelperText";

// Component
const CustomSelect = ({
  label,
  value,
  leftIconName,
  onPress,
  sheetRef,
  snapPoints,
  sheetContent,
  helperText,
  errMsg,
  ...rest
}) => {
  // Debug
  //console.log("Debug customSelect: ",)

  // Return component
  return (
    <View style={tw`mb-3`}>
      {/** Label */}
      {label && (
        <CustomText style={[tw`mb-1 mx-3`, twStyles?.fontBold]}>
          {label}
        </CustomText>
      )}

      {/** Input */}
      <CustomListItem
        {...rest}
        isLink
        hideDivider
        title={value || `Choose ${label?.toLowerCase()}`}
        styleContainer={tw`mx-3 border`}
        leftIconName={leftIconName || "arrowright"}
        onPress={onPress}
      />

      {/** Helper text */}
      <CustomHelperText visible={helperText} title={helperText} />

      {/** Error message */}
      <CustomHelperText isError visible={errMsg} title={errMsg} />

      {/** Modal */}
      <CustomBottomSheet {...rest} ref={sheetRef} snapPoints={snapPoints}>
        {sheetContent}
      </CustomBottomSheet>
    </View>
  ); // close return
}; // close component

// Export
export default CustomSelect;
