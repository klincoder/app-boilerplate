// Import resources
import React from "react";
import { ScrollView, View } from "react-native";
import tw from "twrnc";

// Import custom files
import twStyles from "../config/twStyles";
import CustomText from "./CustomText";
import CustomHelperText from "./CustomHelperText";
import CustomButton from "./CustomButton";
import CustomIcon from "./CustomIcon";
import CustomImage from "./CustomImage";
import useFilePickerState from "../hooks/useFilePickerState";
import { appColors } from "../config/data";

// Component
const CustomFilePicker = ({
  label,
  value,
  onPress,
  onPressRemove,
  leftIconType,
  leftIconName,
  helperText,
  errMsg,
  ...rest
}) => {
  // Define state
  const { handleRemoveFile } = useFilePickerState();

  // Debug
  //console.log("Debug customFilePicker: ",)

  // Return component
  return (
    <View style={tw`mb-3 mx-3`}>
      {/** Label */}
      {label && (
        <CustomText style={[tw`mb-1`, twStyles?.fontBold]}>{label}</CustomText>
      )}

      {/** Input */}
      <View style={tw`flex flex-row`}>
        {/** Button */}
        <CustomButton
          isTouchable
          onPress={onPress}
          styleTouchable={tw`p-3 mr-2 w-12 rounded-full bg-[${appColors?.primary}]`}
        >
          <CustomIcon type="antDesign" name="plus" color={appColors?.white} />
        </CustomButton>

        {/** Files */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {value?.map((item) => (
            <View key={item?.assetId}>
              {/** Image */}
              <CustomImage
                isLink
                image={item?.uri}
                style={tw`w-12 h-12 mx-1 rounded-full`}
              />
              {/** Remove icon */}
              <CustomIcon
                type="antDesign"
                name="close"
                size={20}
                color={appColors?.primary}
                style={tw`absolute z-10 top-0 right-0`}
                onPress={() => {
                  const newArr = handleRemoveFile(value, item?.assetId);
                  onPressRemove(newArr);
                }}
              />
            </View>
          ))}
        </ScrollView>
      </View>

      {/** Helper text */}
      <CustomHelperText visible={helperText} title={helperText} />

      {/** Error message */}
      <CustomHelperText isError visible={errMsg} title={errMsg} />
    </View>
  ); // close return
}; // close component

// Export
export default CustomFilePicker;
