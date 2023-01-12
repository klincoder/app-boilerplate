// Import resources
import React from "react";
import { ListItem } from "@rneui/themed";
import tw from "twrnc";

// Import custom files
import CustomIcon from "./CustomIcon";
import CustomImage from "./CustomImage";
import { appColors, appFonts } from "../config/data";

// Component
const CustomListItem = ({
  title,
  description,
  checkedVal,
  onPress,
  onPressChecked,
  leftImage,
  leftIconType,
  leftIconName,
  rightContent,
  hideDivider,
  isSelected,
  styleContainer,
  styleLeftImage,
  ...rest
}) => {
  // Define variables
  const showDivider = (isSelected || hideDivider) === true ? false : true;

  // Debug
  //console.log("Debug customListItem: ",)

  // Return component
  return (
    <ListItem
      {...rest}
      bottomDivider={showDivider}
      onPress={onPress}
      containerStyle={[
        styleContainer,
        tw`rounded-lg`,
        isSelected && tw`border border-[${appColors?.primary}]`,
      ]}
    >
      {/** COL 1 - IMAGE, CHECKBOX, ICON */}
      {/** Left image */}
      {leftImage && (
        <CustomImage
          isLink
          image={leftImage}
          style={styleLeftImage || tw`w-5 h-5 rounded-full`}
        />
      )}

      {/** Checkbox */}
      {onPressChecked && (
        <ListItem.CheckBox checked={checkedVal} onPress={onPressChecked} />
      )}

      {/** Left icon name */}
      {leftIconName && (
        <CustomIcon
          size={24}
          type={leftIconType || "antDesign"}
          name={leftIconName || "pluscircleo"}
          style={tw`text-[${appColors?.lightBlack}]`}
        />
      )}

      {/** COL 2 - CONTENT */}
      <ListItem.Content>
        {/** Title */}
        <ListItem.Title
          numberOfLines={1}
          style={[{ fontFamily: appFonts?.medium }]}
        >
          {title || "ListItem"}
        </ListItem.Title>

        {/** Description */}
        {description && (
          <ListItem.Subtitle
            numberOfLines={2}
            style={[{ fontFamily: appFonts?.regular }]}
          >
            {description}
          </ListItem.Subtitle>
        )}
      </ListItem.Content>

      {/** COL 3 - RIGHT CONTENT */}
      {rightContent && rightContent}
    </ListItem>
  ); // close return
}; // close component

// Export
export default CustomListItem;
