// Import resources
import React from "react";
import { ListItem, Avatar } from "@rneui/themed";
import tw from "twrnc";

// Import custom files
import CustomIcon from "./CustomIcon";
import CustomButton from "./CustomButton";
import { appColors, appFonts } from "../config/data";

// Component
const CustomListItem = ({
  isNormal,
  isLink,
  title,
  description,
  checked,
  leftImage,
  leftIconType,
  leftIconName,
  rightIcon,
  onPressLink,
  onPressChecked,
  hideDivider,
  styleLinkContainer,
  ...rest
}) => {
  // Define variables
  const showDivider = hideDivider === true ? false : true;

  // Debug
  //console.log("Debug customListItem: ",)

  // Return component
  return (
    <>
      {/** IS NORMAL*/}
      {isNormal && (
        <ListItem bottomDivider={showDivider} {...rest}>
          {/** COL 1 */}
          {/** If leftImage */}
          {leftImage && (
            <Avatar
              source={{ uri: leftImage }}
              avatarStyle={tw`rounded-full`}
            />
          )}

          {/** If onPressChecked */}
          {onPressChecked && (
            <ListItem.CheckBox checked={checked} onPress={onPressChecked} />
          )}

          {/** If leftIconName */}
          {leftIconName && (
            <CustomIcon
              size={24}
              type={leftIconType || "antDesign"}
              name={leftIconName || "pluscircleo"}
              style={tw`text-[${appColors?.lightBlack}]`}
            />
          )}

          {/** COL 2 */}
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

          {/** Right icon */}
          {rightIcon && rightIcon}
        </ListItem>
      )}

      {/** IS LINK */}
      {isLink && (
        <CustomButton
          isTouchable
          onPress={onPressLink}
          styleTouchable={styleLinkContainer}
        >
          <ListItem {...rest} bottomDivider={showDivider}>
            {/** COL 1 */}
            {/** If leftImage */}
            {leftImage && (
              <Avatar
                source={{ uri: leftImage }}
                avatarStyle={tw`rounded-lg`}
                size={24}
              />
            )}

            {/** If leftIconName */}
            {leftIconName && (
              <CustomIcon
                size={24}
                type={leftIconType || "antDesign"}
                name={leftIconName || "pluscircleo"}
                style={tw`text-[${appColors?.lightBlack}]`}
              />
            )}

            {/** COL 2 */}
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

            {/** Right icon */}
            {/* {rightIcon && rightIcon} */}
            {/* <ListItem.Chevron size={32} /> */}
          </ListItem>
        </CustomButton>
      )}
    </>
  ); // close return
}; // close component

// Export
export default CustomListItem;
