// Import resources
import React, { useState } from "react";
import { View } from "react-native";
import tw from "twrnc";
import DateTimePicker from "@react-native-community/datetimepicker";

// Import custom files
import CustomText from "./CustomText";
import CustomListItem from "./CustomListItem";
import CustomHelperText from "./CustomHelperText";
import { appFonts, jsDate } from "../config/data";
import { handleDateAddDays, handleFormatDate } from "../config/functions";

// Component
const CustomDatePicker = ({
  label,
  title,
  leftIconType,
  leftIconName,
  minDate,
  maxDate,
  onChangeDate,
  styleContainer,
  helperText,
  errMsg,
  ...rest
}) => {
  // Define state
  const [showDate, setShowDate] = useState(false);
  const [dateVal, setDateVal] = useState(new Date());
  const [isSelected, setIsSelected] = useState(false);

  // Define variables
  const tomorrow = handleDateAddDays(jsDate, 1);
  const tomorrowMax = handleDateAddDays(jsDate, 30);
  const dateStr = isSelected
    ? handleFormatDate(dateVal, 1)
    : title
    ? handleFormatDate(title, 1)
    : "Click to pick date";

  // Debug
  //console.log("Debug customDatePicker: ",)

  // FUNCTIONS
  // HANDLE SHOW DATE
  const handleShowDate = () => {
    setShowDate(true);
  }; // close fxn

  // HANDLE CHANGE DATE
  const handleChangeDate = (e, selectedDate) => {
    setShowDate(false);
    setIsSelected(true);
    onChangeDate(selectedDate);
    setDateVal(selectedDate);
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

      {/** Date picker */}
      <CustomListItem
        {...rest}
        isLink
        hideDivider
        title={dateStr}
        onPressLink={handleShowDate}
        leftIconType={leftIconType}
        leftIconName={leftIconName || "calendar"}
        containerStyle={tw`mx-3 border rounded-lg`}
      />

      {/** Helper text */}
      <CustomHelperText visible={helperText} title={helperText} />

      {/** Error message */}
      <CustomHelperText isError visible={errMsg} title={errMsg} />

      {/** MODAL */}
      {showDate && (
        <DateTimePicker
          mode="date"
          value={dateVal}
          onChange={handleChangeDate}
          minimumDate={minDate || tomorrow}
          maximumDate={maxDate || tomorrowMax}
        />
      )}
    </View>
  ); // close return
}; // close component

// Export
export default CustomDatePicker;
