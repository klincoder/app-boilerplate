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
const CustomTimePickerForm = ({
  name,
  label,
  leftIconName,
  helperText,
  styleContainer,
  ...rest
}) => {
  // Define state
  const [showTime, setShowTime] = useState(false);

  // Define formik context
  const { values, errors, touched, setFieldTouched, setFieldValue } =
    useFormikContext();

  // Define variables
  const timeVal = values[name] || new Date();
  const timeStr = handleFormatDate(timeVal, 4);

  // Debug
  //console.log("Debug customTimePickerForm: ", );

  // FUNCTIONS
  // HANDLE SHOW TIME
  const handleShowTime = () => {
    setShowTime(true);
  }; // close fxn

  // HANDLE CHANGE TIME
  const handleChangeTime = (e, selectedTime) => {
    setShowTime(false);
    setFieldValue(name, selectedTime);
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
        title={timeStr || "Pick time"}
        onPressLink={handleShowTime}
        lconName={leftIconName || "clockcircleo"}
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
      {showTime && (
        <DateTimePicker
          mode="time"
          value={timeVal}
          onChange={handleChangeTime}
        />
      )}
    </View>
  ); // close return
}; // close component

// Export
export default CustomTimePickerForm;
