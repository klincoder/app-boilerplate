// Import resources
import React from "react";
import { Badge } from "@rneui/themed";
import tw from "twrnc";

// Component
const CustomBadge = ({ title, status, styleContainer, styleText, ...rest }) => {
  // Return component
  return (
    <Badge
      {...rest}
      value={title}
      status={status || "error"}
      containerStyle={styleContainer}
      textStyle={styleText}
    />
  );
}; // close component

// Export
export default CustomBadge;
