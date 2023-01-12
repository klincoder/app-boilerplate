// Import resources
import React, { useEffect, useState } from "react";
import tw from "twrnc";

// Import custom files
import CustomButton from "./CustomButton";
import CustomIcon from "./CustomIcon";
import { appColors } from "../config/data";

// Component
const SaveBtn = ({ status, onPress, styleIcon, styleBtn, ...rest }) => {
  // Define state
  const [isSaved, setIsSaved] = useState(status);

  // Debug
  //console.log("Debug saveBtn: ", { status, isSaved });

  // FUNCTIONS
  // HANDLE CLICKED
  const handleClicked = () => {
    setIsSaved(!isSaved);
    onPress();
  }; // close fxn

  // SIDE EFFECTS
  // SET IS SAVED STATE
  useEffect(() => {
    setIsSaved(status);
  }, [status]);

  // Return component
  return (
    <CustomButton
      {...rest}
      isTouchable
      onPress={handleClicked}
      styleTouchable={styleBtn}
    >
      <CustomIcon
        {...rest}
        type="antDesign"
        name={isSaved ? "heart" : "hearto"}
        color={isSaved ? appColors?.primary : appColors?.black}
        style={styleIcon}
      />
    </CustomButton>
  ); // close return
}; // close component

// Export
export default SaveBtn;
