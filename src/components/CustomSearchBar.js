// Import resources
import React from "react";
import { View } from "react-native";
import { SearchBar } from "@rneui/themed";
import tw from "twrnc";

// Import custom files
import CustomText from "./CustomText";

// Component
const CustomSearchBar = ({ value, onChangeText, placeholder, ...rest }) => {
  // Debug
  //console.log("Debug customSearchBar: ",)

  // Return component
  return (
    <SearchBar
      {...rest}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder || "Search..."}
      inputContainerStyle={tw`px-2 rounded-lg bg-white`}
      containerStyle={tw`p-0 mx-3 border-white w-11/12 bg-transparent`}
    />
  ); // close return
}; // close component

// Export
export default CustomSearchBar;
