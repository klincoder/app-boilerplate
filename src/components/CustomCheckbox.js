// Import resources
import React from "react";
import { View } from "react-native";
import { CheckBox, ListItem } from "@rneui/themed";
import tw from "twrnc";

// Import custom files
import CustomListItem from "./CustomListItem";
import CustomText from "./CustomText";

// Component
const CustomCheckbox = ({ isNormal, title, checked, onPress, ...rest }) => {
  // Define variables
  title = title || "Checkbox";

  // Debug
  //console.log("Debug customCheckbox: ",)

  // Return component
  return (
    <>
      {/** IS NORMAL */}
      {isNormal ? (
        <CheckBox
          {...rest}
          checked={checked}
          onPress={onPress}
          title={<CustomText style={tw`pl-3`}>{title}</CustomText>}
        />
      ) : (
        <CustomListItem
          {...rest}
          isNormal
          hideDivider
          title={title}
          rightIcon={<ListItem.CheckBox checked={checked} onPress={onPress} />}
        />
      )}
    </>
  ); // close return
}; // close component

// Export
export default CustomCheckbox;
