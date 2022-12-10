// Import resources
import React from "react";
import { Divider } from "@rneui/themed";
import tw from "twrnc";

// Import custom files
import { appColors } from "../config/data";

// Component
const CustomDivider = ({ style, ...rest }) => {
  // Return component
  return <Divider {...rest} style={style || tw`my-3`} />; // close return
}; // close component

// Export
export default CustomDivider;
