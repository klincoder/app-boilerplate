// Import resources
import React, { useState } from "react";
import { View } from "react-native";
import tw from "twrnc";
import { useFormikContext } from "formik";
import DateTimePicker from "@react-native-community/datetimepicker";

// Import custom files
import CustomText from "./CustomText";
import CustomListItem from "./CustomListItem";
import CustomHelperText from "./CustomHelperText";
import { appColors, appFonts, jsDate } from "../config/data";
import { handleDateAddDays, handleFormatDate } from "../config/functions";

// Component
const CustomDatePickerForm = ({
  name,
  label,
  leftIconName,
  minDate,
  maxDate,
  helperText,
  styleContainer,
  ...rest
}) => {
  // Define state
  const [showDate, setShowDate] = useState(false);

  // Define formik context
  const { values, errors, touched, setFieldTouched, setFieldValue } =
    useFormikContext();

  // Define variables
  const dateVal = values[name] || new Date();
  const dateStr = handleFormatDate(dateVal, 1);
  const tomorrow = handleDateAddDays(jsDate, 1);
  const tomorrowMax = handleDateAddDays(jsDate, 30);

  // Debug
  //console.log("Debug customDatePickerForm: ",);

  // FUNCTIONS
  // HANDLE SHOW DATE
  const handleShowDate = () => {
    setShowDate(true);
  }; // close fxn

  // HANDLE CHANGE DATE
  const handleChangeDate = (e, selectedDate) => {
    setShowDate(false);
    setFieldValue(name, selectedDate);
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
        title={dateStr || "Pick date"}
        onPressLink={handleShowDate}
        lconName={leftIconName || "calendar"}
        containerStyle={tw`mx-3 border rounded-lg`}
        onBlur={() => setFieldTouched(name)}
      />

      {/** Helper text */}
      {helperText && (
        <CustomHelperText
          title={helperText}
          visible={helperText}
          style={tw`text-[${appColors?.gray}]`}
        />
      )}

      {/** Error message */}
      <CustomHelperText isError title={errors[name]} visible={touched[name]} />

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
export default CustomDatePickerForm;
