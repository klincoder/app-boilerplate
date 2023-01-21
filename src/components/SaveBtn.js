// Import resources
import React, { useEffect, useState } from "react";
import tw from "twrnc";

// Import custom files
import CustomButton from "./CustomButton";
import CustomIcon from "./CustomIcon";
import { appColors } from "../config/data";

// Component
const SaveBtn = ({ isSaved, onPress, styleIcon, styleBtn, ...rest }) => {
  // Define state
  const [clickedState, setClickedState] = useState(isSaved);

  // Debug
  //console.log("Debug saveBtn: ", isSaved);

  // FUNCTIONS
  // HANDLE CLICKED
  const handleClicked = () => {
    setClickedState(!clickedState);
    onPress();
  }; // close fxn

  // SIDE EFFECTS
  // SET IS SAVED STATE
  useEffect(() => {
    setClickedState(isSaved);
  }, [isSaved]);

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
        name={clickedState ? "heart" : "hearto"}
        color={clickedState ? appColors?.primary : appColors?.black}
        style={styleIcon}
      />
    </CustomButton>
  ); // close return
}; // close component

// Export
export default SaveBtn;
