// Import resources
import React, { useCallback, useRef, useState, useMemo } from "react";
import { View } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { BottomSheetView } from "@gorhom/bottom-sheet";

// Import custom files
import KeyboardAvoidWrapper from "./KeyboardAvoidWrapper";
import useAppSettings from "../hooks/useAppSettings";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import CustomRadio from "./CustomRadio";
import CustomSwitch from "./CustomSwitch";
import CustomDatePicker from "./CustomDatePicker";
import CustomSelect from "./CustomSelect";
import CustomListItem from "./CustomListItem";
import CustomTimePicker from "./CustomTimePicker";
import CustomCheckbox from "./CustomCheckbox";
import CustomAlertModal from "./CustomAlertModal";
import useAlertState from "../hooks/useAlertState";
import { tw, genderList, paymentMethodList } from "../config/data";
import { handleAddItemToArr } from "../config/functions";

// Component
const FormTest = () => {
  // Define app settings
  const { navigation } = useAppSettings();

  // Define state
  const [hidePass, setHidePass] = useState(true);

  // Define ref
  const paymentMethodRef = useRef(null);

  // Define snaps
  const snaps = useMemo(
    () => ({
      full: ["75%"],
      half: ["50%"],
      small: ["35%"],
    }),
    []
  );

  // Define alert
  const alert = useAlertState();

  // FORM CONFIG
  // Initial values
  const initialValues = {
    fullName: "",
    emailAddr: "",
    pass: "",
    gender: "",
    courses: [],
    allowPush: false,
    dateOfBirth: "",
    timeOfBirth: "",
    paymentMethod: "",
  };

  // Validate
  const validate = Yup.object().shape({
    fullName: Yup.string().required("Required").min(3, "Too short"),
    emailAddr: Yup.string().required("Required").email("Invalid email address"),
    pass: Yup.string().required("Required").min(8, "Too short"),
    gender: Yup.string().required("Required"),
    allowPush: Yup.boolean().oneOf([true], "Must be selected"),
    dateOfBirth: Yup.string().required("Required"),
    paymentMethod: Yup.object().required("Required").nullable(),
    courses: Yup.array()
      .required("Required")
      .min(1, "At least 1")
      .max(3, "At most 3"),
  });

  // Form state
  const {
    control,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
    trigger,
    setValue,
    watch,
    reset,
  } = useForm({
    mode: "all",
    defaultValues: initialValues,
    resolver: yupResolver(validate),
  }); // close form state

  // Define variables
  const formVal = watch();
  const paymentMethodSnap = useMemo(() => ["30%"], []);
  const coursesVal = formVal?.courses;
  const courseList = [
    { id: "123", title: "HTML", slug: "html" },
    { id: "456", title: "CSS", slug: "css" },
    { id: "789", title: "JavaScript", slug: "js" },
    { id: "1011", title: "React", slug: "react" },
    { id: "1213", title: "Nextjs", slug: "nextjs" },
    { id: "1415", title: "React Native", slug: "react-native" },
    { id: "1617", title: "Firebase", slug: "firebase" },
  ];

  // Debug
  //console.log("Debug formTest: ", errors?.paymentMethod?.message);

  // FUNCTIONS
  // HANDLE OPEN SHEET
  const handleOpenSheet = useCallback((val) => {
    // Switch val
    switch (val) {
      case "payment_method":
        paymentMethodRef.current?.present();
        break;
    } // close switch
  }, []); // close fxn

  // HANDLE CLOSE SHEET
  const handleCloseSheet = useCallback((val) => {
    // Switch val
    switch (val) {
      case "payment_method":
        paymentMethodRef.current?.close();
        break;
    } // close switch
  }, []); // close fxn

  // HANDLE SUBMIT FORM
  const handleSubmitForm = (values) => {
    // Debug
    console.log("Debug submitForm: ", values);
  }; // close fxn

  // Return component
  return (
    <KeyboardAvoidWrapper>
      {/** Spinner */}
      <CustomAlertModal isSpinner visible={alert.loading || isSubmitting} />

      {/** Alert modal */}
      <CustomAlertModal
        visible={alert.visible}
        hideDialog={alert.hideAlert}
        cancelAction={alert.hideAlert}
        content={alert.message}
        cancelText="Close"
      />

      {/** Full name */}
      <CustomInput
        name="fullName"
        control={control}
        label="Full Name"
        placeholder="Full name"
        leftIconName="user"
        autoCapitalize="words"
      />

      {/** Email Address */}
      <CustomInput
        name="emailAddr"
        control={control}
        label="Email Address"
        placeholder="Enter email address"
        leftIconType="feather"
        leftIconName="mail"
        autoCapitalize="none"
        keyboardType="email-address"
        helperText="We'll send a confirmation link"
      />

      {/** Password */}
      <CustomInput
        name="pass"
        control={control}
        label="Password"
        placeholder="Password"
        leftIconName="lock"
        rightIconType="feather"
        rightIconName={hidePass ? "eye" : "eye-off"}
        rightIconOnPress={() => setHidePass(!hidePass)}
        secureTextEntry={hidePass}
        autoCapitalize="none"
      />

      {/** Gender */}
      <CustomRadio
        name="gender"
        label="Gender"
        data={genderList}
        value={formVal?.gender}
        errMsg={errors?.gender?.message}
        onPress={(val) => {
          setValue("gender", val);
          trigger("gender");
        }}
      />

      {/** Courses */}
      <CustomCheckbox
        isObjArr
        name="courses"
        label="Choose Courses"
        data={courseList}
        value={formVal?.courses}
        errMsg={errors?.courses?.message}
        onPress={(val) => {
          const itemID = val?.id;
          const itemToAdd = handleAddItemToObjArr(coursesVal, itemID, val);
          //const itemToAdd = handleAddItemToArr(coursesVal, val);
          setValue("courses", itemToAdd);
          trigger("courses");
        }}
      />

      {/** Allow push */}
      <CustomSwitch
        name="allowPush"
        label="Allow Push?"
        value={formVal?.allowPush}
        errMsg={errors?.allowPush?.message}
        onValueChange={(val) => {
          setValue("allowPush", val);
          trigger("allowPush");
        }}
      />

      {/** Date of birth */}
      <CustomDatePicker
        name="dateOfBirth"
        label="Date of Birth"
        value={formVal?.dateOfBirth}
        leftIconType="fontAwesome"
        leftIconName="calendar-check-o"
        errMsg={errors?.dateOfBirth?.message}
        onValueChange={(val) => {
          setValue("dateOfBirth", val);
          trigger("dateOfBirth");
        }}
      />

      {/** Time of birth */}
      <CustomTimePicker
        name="timeOfBirth"
        label="Time of Birth"
        value={formVal?.timeOfBirth}
        leftIconType="fontAwesome"
        leftIconName="calendar-check-o"
        errMsg={errors?.timeOfBirth?.message}
        onValueChange={(val) => {
          setValue("timeOfBirth", val);
          trigger("timeOfBirth");
        }}
      />

      {/** Payment method */}
      <CustomSelect
        name="paymentMethod"
        label="Payment Method"
        value={formVal?.paymentMethod?.title}
        leftIconType="antDesign"
        leftIconName="creditcard"
        onPress={handleOpenSheet("payment_method")}
        errMsg={errors?.paymentMethod?.message}
        sheetRef={paymentMethodRef}
        snapPoints={paymentMethodSnap}
        sheetContent={
          <BottomSheetView>
            {paymentMethodList?.map((item) => (
              <CustomListItem
                key={item?.id}
                title={item?.title}
                description={item?.description}
                leftImage={item?.image}
                isSelected={formVal?.paymentMethod?.slug === item?.slug}
                onPress={() => {
                  handleCloseSheet("payment_method");
                  setValue("paymentMethod", item);
                  trigger("paymentMethod");
                }}
              />
            ))}
          </BottomSheetView>
        }
      />

      {/** Submit futton */}
      <CustomButton
        isNormal
        title="Submit"
        onPress={handleSubmit(handleSubmitForm)}
        disabled={!isValid || isSubmitting}
      />

      {/** TEST BUTTON */}
      {/* <CustomButton
        isNormal
        title="Set Value"
        type="outline"
        onPress={() => setValue("allowPush", true)}
      /> */}
    </KeyboardAvoidWrapper>
  ); // close return
}; // close component

// Export
export default FormTest;
