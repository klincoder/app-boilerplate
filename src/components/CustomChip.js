// Import resources
import React from "react";
import { View } from "react-native";
import { Chip } from "@rneui/themed";

// Import custom files
import { tw } from "../config/data";

// Component
const CustomChip = ({
  title,
  onPress,
  isSolid,
  styleButton,
  styleContainer,
  styleTitle,
  ...rest
}) => {
  // Debug
  //console.log("Debug customChip: ",);

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
          buttonStyle={styleButton || tw`bg-primary`}
          titleStyle={styleTitle || tw`text-white font-medium`}
          containerStyle={styleContainer || tw`border-primary`}
        />
      ) : (
        <Chip
          {...rest}
          type="outline"
          title={title || "Title"}
          onPress={onPress}
          buttonStyle={styleButton}
          titleStyle={[styleTitle, tw`text-black font-medium`]}
          containerStyle={[styleContainer, tw`border border-lightGray`]}
        />
      )}
    </>
  ); // close return
}; // close component

// Export
export default CustomChip;
