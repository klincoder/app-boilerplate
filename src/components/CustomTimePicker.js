// Import resources
import React, { useState } from "react";
import { View } from "react-native";
import tw from "twrnc";
import DateTimePicker from "@react-native-community/datetimepicker";

// Import custom files
import CustomText from "./CustomText";
import CustomListItem from "./CustomListItem";
import { appColors, appFonts, newDate } from "../config/data";
import { handleFormatDate } from "../config/functions";

// Component
const CustomTimePicker = ({
  label,
  title,
  leftIconType,
  leftIconName,
  minTime,
  maxTime,
  onChangeTime,
  sheetRef,
  snapPoints,
  styleContainer,
  ...rest
}) => {
  // Define state
  const [showTime, setShowTime] = useState(false);
  const [timeVal, setTimeVal] = useState(new Date());
  const [isSelected, setIsSelected] = useState(false);

  // Define variables
  const timeStr = isSelected
    ? handleFormatDate(timeVal, 4)
    : title
    ? handleFormatDate(title, 4)
    : "Click to pick time";

  // Debug
  //console.log("Debug customTimePicker: ",)

  // FUNCTIONS
  // HANDLE SHOW TIME
  const handleShowTime = () => {
    setShowTime(true);
  }; // close fxn

  // HANDLE CHANGE TIME
  const handleChangeTime = (e, selectedTime) => {
    setShowTime(false);
    setIsSelected(true);
    onChangeTime(selectedTime);
    setTimeVal(selectedTime);
  }; // close fxn

  // Return component
  return (
    <View style={[tw`mb-3`, styleContainer]}>
      {/** Label */}
      {label && (
        <CustomText style={[tw`mb-1 mx-3`, { fontFamily: appFonts?.medium }]}>
          {label}
        </CustomText>
      )}

      {/** Time picker */}
      <CustomListItem
        {...rest}
        isLink
        hideDivider
        title={timeStr || "Pick time"}
        onPressLink={handleShowTime}
        leftIconType={leftIconType}
        leftIconName={leftIconName || "clockcircleo"}
        containerStyle={tw`mx-3 border rounded-lg`}
      />

      {/** MODAL */}
      {showTime && (
        <DateTimePicker
          mode="time"
          value={dateVal}
          onChange={handleChangeTime}
        />
      )}
    </View>
  ); // close return
}; // close component

// Export
export default CustomTimePicker;
