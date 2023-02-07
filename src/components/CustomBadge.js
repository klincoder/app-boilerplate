// Import resources
import React from "react";
import { Badge } from "@rneui/themed";

// Import custom files
import { tw } from "../config/data";

// Component
const CustomBadge = ({ title, status, styleContainer, styleText, ...rest }) => {
  // Return component
  return (
    <Badge
      {...rest}
      value={title}
      status={status || "error"}
      containerStyle={styleContainer}
      textStyle={[styleText, tw`font-medium`]}
    />
  ); // close return
}; // close component

// Export
export default CustomBadge;
