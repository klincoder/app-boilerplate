// Import resources
import React from "react";
import { Badge } from "@rneui/themed";

// Component
const CustomBadge = ({ children, ...rest }) => {
  // Return component
  return <Badge {...rest}>{children}</Badge>;
}; // close component

// Export
export default CustomBadge;
