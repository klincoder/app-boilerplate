// Import resources
import React from "react";
import { View } from "react-native";
import { SearchBar } from "@rneui/themed";
import tw from "twrnc";

// Import custom files
import CustomText from "./CustomText";
import twStyles from "../config/twStyles";
import { tw, appColors } from "../config/data";

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
      inputStyle={tw`font-medium`}
      inputContainerStyle={tw`rounded-lg bg-white border-white`}
      containerStyle={tw`p-0 m-0 bg-white border-white`}
      disabledInputStyle={tw`bg-lightGray`}
    />
  ); // close return
}; // close component

// Export
export default CustomSearchBar;
