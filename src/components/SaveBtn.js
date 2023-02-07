// Import resources
import React, { useEffect, useState } from "react";

// Import custom files
import CustomButton from "./CustomButton";
import CustomIcon from "./CustomIcon";
import { tw } from "../config/data";

// Component
const SaveBtn = ({ isSaved, onPress, styleIcon, styleBtn, ...rest }) => {
  // Define state
  const [isClicked, setIsClicked] = useState(isSaved);

  // Debug
  //console.log("Debug saveBtn: ", isSaved);

  // FUNCTIONS
  // HANDLE IS CLICKED
  const handleIsClicked = () => {
    setIsClicked(!isClicked);
    onPress();
  }; // close fxn

  // SIDE EFFECTS
  // SET IS SAVED STATE
  useEffect(() => {
    setIsClicked(isSaved);
  }, [isSaved]);

  // Return component
  return (
    <CustomButton
      {...rest}
      isTouchable
      onPress={handleIsClicked}
      styleTouchable={styleBtn}
    >
      <CustomIcon
        {...rest}
        type="antDesign"
        name={isClicked ? "heart" : "hearto"}
        style={[styleIcon, isClicked ? tw`text-primary` : tw`text-black`]}
      />
    </CustomButton>
  ); // close return
}; // close component

// Export
export default SaveBtn;
