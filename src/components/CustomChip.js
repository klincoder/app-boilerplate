// Import resources
import React from "react";
import { View } from "react-native";
import { Chip } from "@rneui/themed";
import tw from "twrnc";

// Import custom files
import twStyles from "../config/twStyles";
import { appColors, appFonts } from "../config/data";

// Component
const CustomChip = ({
  title,
  onPress,
  isSolid,
  styleContainer,
  styleTitle,
  ...rest
}) => {
  // Debug
  //console.log("Debug customChip: ", { isSolidType, type });

  // Return component
  return (
    <>
      {/** If isSolid */}
      {isSolid ? (
        <Chip
          {...rest}
          type="solid"
          title={title || "Title"}
          onPress={onPress}
          buttonStyle={tw`bg-[${appColors?.primary}]`}
          titleStyle={[styleTitle, tw`text-white`, twStyles?.fontBold]}
          containerStyle={[styleContainer, tw`border-[${appColors?.primary}]`]}
        />
      ) : (
        <Chip
          {...rest}
          type="outline"
          title={title || "Title"}
          onPress={onPress}
          titleStyle={[
            styleTitle,
            tw`text-[${appColors?.black}]`,
            twStyles?.fontBold,
          ]}
          containerStyle={[
            styleContainer,
            tw`border border-[${appColors?.lightGray}]`,
          ]}
        />
      )}
    </>
  ); // close return
}; // close component

// Export
export default CustomChip;
