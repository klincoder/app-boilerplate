// Import resources
import React, { useState } from "react";
import { View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

// Import custom files
import CustomText from "./CustomText";
import CustomListItem from "./CustomListItem";
import CustomHelperText from "./CustomHelperText";
import { tw, jsDate } from "../config/data";
import { handleDayJsFormat, handleJsDateAddDays } from "../config/functions";

// Component
const CustomDatePicker = ({
  label,
  value,
  onValueChange,
  leftIconType,
  leftIconName,
  errMsg,
  helperText,
  minDate,
  maxDate,
  styleContainer,
  ...rest
}) => {
  // Define state
  const [showDate, setShowDate] = useState(false);
  const [dateVal, setDateVal] = useState(new Date());
  const [isSelected, setIsSelected] = useState(false);

  // Define variables
  const tomorrow = handleJsDateAddDays(jsDate, 1);
  const tomorrowMax = handleJsDateAddDays(jsDate, 30);
  const dateStr = isSelected
    ? handleDayJsFormat(dateVal, 1)
    : value
    ? handleDayJsFormat(value, 1)
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
    onValueChange(selectedDate);
    setDateVal(selectedDate);
  }; // close fxn

  // Return component
  return (
    <View style={[tw`mb-3`, styleContainer]}>
      {/** Label */}
      {label && (
        <CustomText style={tw`mb-1 mx-1 font-medium`}>{label}</CustomText>
      )}

      {/** Date picker */}
      <CustomListItem
        {...rest}
        hideDivider
        title={dateStr}
        onPress={handleShowDate}
        leftIconType={leftIconType}
        leftIconName={leftIconName || "calendar"}
        styleContainer={tw`mx-1 border`}
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
