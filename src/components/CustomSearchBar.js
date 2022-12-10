// Import resources
import React from "react";
import { View } from "react-native";
import { SearchBar } from "@rneui/themed";
import tw from "twrnc";

// Import custom files
import CustomText from "./CustomText";

// Component
const CustomSearchBar = ({
  value,
  onChangeText,
  placeholder,
  styleContainer,
  ...rest
}) => {
  // Debug
  //console.log("Debug customSearchBar: ",)

  // Return component
  return (
    <View style={styleContainer}>
      <SearchBar
        {...rest}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || "Search..."}
      />
    </View>
  ); // close return
}; // close component

// Export
export default CustomSearchBar;
