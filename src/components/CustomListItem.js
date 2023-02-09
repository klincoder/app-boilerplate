// Import resources
import React from "react";
import { ListItem } from "@rneui/themed";

// Import custom files
import CustomIcon from "./CustomIcon";
import CustomImage from "./CustomImage";
import { tw } from "../config/data";

// Component
const CustomListItem = ({
  isSelected,
  title,
  description,
  checkedVal,
  onPress,
  onPressChecked,
  leftImage,
  leftIconType,
  leftIconName,
  leftIconSize,
  rightContent,
  hideDivider,
  styleContainer,
  styleLeftImage,
  styleLeftIcon,
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
      onPress={onPress}
      bottomDivider={showDivider}
      disabledStyle={tw`opacity-50`}
      containerStyle={[
        styleContainer,
        tw`rounded-lg`,
        isSelected && tw`border-l-4 border-primary`,
      ]}
    >
      {/** COL 1 - IMAGE, CHECKBOX, ICON */}
      {/** IF IS SELECTED */}
      {isSelected ? (
        <CustomIcon
          type="feather"
          name="check-circle"
          size={24}
          style={tw`text-primary`}
        />
      ) : (
        <>
          {/** Left image */}
          {leftImage && (
            <CustomImage
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
              type={leftIconType || "antDesign"}
              name={leftIconName || "pluscircleo"}
              size={leftIconSize}
              style={styleLeftIcon || tw`text-black`}
            />
          )}
        </>
      )}

      {/** COL 2 - CONTENT */}
      <ListItem.Content>
        {/** Title */}
        <ListItem.Title numberOfLines={1} style={tw`font-medium`}>
          {title || "ListItem"}
        </ListItem.Title>

        {/** Description */}
        {description && (
          <ListItem.Subtitle numberOfLines={1} style={tw`font-regular`}>
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
