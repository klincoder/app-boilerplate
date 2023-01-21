// Import resources
import React from "react";
import { Badge } from "@rneui/themed";
import tw from "twrnc";

// Import custom files
import twStyles from "../config/twStyles";

// Component
const CustomBadge = ({ title, status, styleContainer, styleText, ...rest }) => {
  // Return component
  return (
    <Badge
      {...rest}
      value={title}
      status={status || "primary"}
      containerStyle={styleContainer}
      textStyle={[styleText, twStyles?.fontBold]}
    />
  );
}; // close component

// Export
export default CustomBadge;
