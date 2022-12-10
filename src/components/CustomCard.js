// Import resources
import React from "react";
import { Card } from "react-native-paper";

// Component
const CustomCard = ({ children, cardActions, ...rest }) => {
  // Return component
  return (
    <Card {...rest}>
      {/** Card content */}
      <Card.Content>{children}</Card.Content>
      {/** Card actions */}
      {cardActions && <Card.Actions>{cardActions}</Card.Actions>}
    </Card>
  ); // close return
}; // close component

// Export
export default CustomCard;
