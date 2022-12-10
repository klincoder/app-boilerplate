// Import resources
import React from "react";
import { View } from "react-native";
import tw from "twrnc";
import { Chip } from "@rneui/themed";

// Import custom files
import { appColors, appFonts } from "../config/data";

// Component
const CustomChip = ({
  isSolid,
  title,
  onPress,
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
          titleStyle={[
            styleTitle,
            tw`text-white`,
            { fontFamily: appFonts?.medium },
          ]}
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
            tw`text-[${appColors?.primary}]`,
            { fontFamily: appFonts?.medium },
          ]}
          containerStyle={[
            styleContainer,
            tw`border border-[${appColors?.lightPrimary}]`,
          ]}
        />
      )}
    </>
  ); // close return
}; // close component

// Export
export default CustomChip;
