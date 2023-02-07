// Import resources
import axios from "axios";
import dayjs from "dayjs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjsUTC from "dayjs/plugin/utc";
import dayjsRelativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(dayjsUTC);
dayjs.extend(dayjsRelativeTime);

// Import custom files
import { baseUrl } from "./data";
import { doc, fireDB, getDoc, handleGetDocs } from "./firebase";

// VARIABLES
// FUNCTIONS
// HANDLE GET SITE INFO
export const handleGetSiteInfo = async () => {
  // Define ref
  const docRef = doc(fireDB, "app_settings", "general_settings");
  const docSnap = await getDoc(docRef);
  const docData = docSnap.exists() ? docSnap.data() : null;
  return { name: docData?.app_name, noReply: docData?.support_email_reply };
}; // close fxn

// HANDLE SEND EMAIL
export const handleSendEmail = async (newMsg, api) => {
  // If empty args, return
  if (!newMsg || !api?.api || !api?.tempID) return null;
  // Define variables
  const siteInfo = await handleGetSiteInfo();
  let defaultMsg = {
    role: "user",
    toName: "",
    toEmail: "",
    fromName: siteInfo?.name || "Klincoder",
    fromEmail: siteInfo?.noReply || "noreply@klincoder.com",
    year: handleDayJsFormat(null, 3),
    date: handleDayJsFormat(null, 1),
  };
  const finalMsg = { ...defaultMsg, ...newMsg };
  // Return and await response
  return await axios({
    method: "POST",
    url: `${baseUrl}/api/${api?.api}`,
    data: { msg: finalMsg, tempID: api?.tempID },
  }).then((res) => {
    return res?.data;
  }); // close return
}; // close fxn

// HANDLE RANDOM CODE
export const handleRandomCode = (val) => {
  val = Number(val);
  // Switch
  switch (val) {
    case 6:
      return Math.floor(Math.random() * 999999 + 1);
    case 10:
      return Math.floor(1000 + Math.random() * 9000000000);
    default:
      return Math.floor(1000 + Math.random() * 9000);
  } // close switch
}; // close fxn

// HANDLE RANDOM STRING
export const handleRandomString = (val) => {
  val = Number(val);
  // Switch
  switch (val) {
    case 10:
      return Math.random().toString(36).slice(2, 12);
    default:
      return Math.random().toString(36).slice(2, 8);
  } // close switch
}; // close fxn

// HANDLE FIND ID
export const handleFindId = (objArr, rowID) => {
  // If empty args, return
  if (!objArr || !rowID) return;
  const result = objArr?.find((i) => i?.id === rowID);
  if (result) {
    return result;
  } else {
    return {};
  } // close if
}; // close fxn

// HANDLE FILTER ID
export const handleFilterId = (objArr, rowID) => {
  // If empty args, return
  if (!objArr || !rowID) return;
  const result = objArr?.filter((i) => i?.id === rowID);
  if (result?.length > 0) {
    return result;
  } else {
    return [];
  } // close if
}; // close fxn

// HANDLE FILTER STATUS
export const handleFilterStatus = (objArr, status) => {
  // If empty args, return
  if (!objArr) return;
  status = status || "active";
  const result = objArr?.filter((i) => i?.status === status);
  if (result?.length > 0) {
    return result;
  } else {
    return [];
  } // close if
}; // close fxn

// HANDLE FILTER USER ID
export const handleFilterUserId = (objArr, userID) => {
  // If empty args, return
  if (!objArr || !userID) return;
  const result = objArr?.filter((i) => i?.user_id === userID);
  if (result?.length > 0) {
    return result;
  } else {
    return [];
  } // close if
}; // close fxn

// HANDLE FILTER SELLER ID
export const handleFilterSellerId = (objArr, sellerID) => {
  // If empty args, return
  if (!objArr || !sellerID) return;
  const result = objArr?.filter((i) => i?.seller_id === sellerID);
  if (result?.length > 0) {
    return result;
  } else {
    return [];
  } // close if
}; // close fxn

// HANDLE FILTER CATEGORY & STATUS
export const handleFilterCategory = (objArr, category, status) => {
  // If empty args, return
  if (!objArr || !category) return;
  status = status || "active";
  const result = objArr?.filter(
    (i) => i?.category === category && i?.status === status
  );
  if (result?.length > 0) {
    return result;
  } else {
    return [];
  } // close if
}; // close fxn

// HANDLE FILTER KYC
export const handleFilterKyc = (objArr, category, status) => {
  // If empty args, return
  if (!objArr || !category) return [];
  status = status || "pending";
  const result = objArr?.filter(
    (i) => i?.category === category && i?.status === status
  );
  if (result?.length > 0) {
    return result;
  } else {
    return [];
  } // close if
}; // close fxn

// HANDLE SLICE STRING
export const handleSliceString = (strInput, sliceFrom, sliceTo, holder) => {
  // If !strInput
  if (!strInput || !sliceTo) return;
  // Define variables
  let result;
  holder = holder || "...";
  // If strInput
  if (strInput?.length > sliceTo) {
    result = `${strInput?.slice(sliceFrom, sliceTo)}${holder}`;
  } else {
    result = strInput;
  } // close if
  // Return
  return result;
}; // close fxn

// HANDLE SELECT BULK ITEM
export const handleSelectBulkItem = (itemID, objArr) => {
  // If empty args, return
  if (!itemID || !objArr) return null;
  // Define tempArr
  let tempArr = objArr?.map((item) => {
    if (itemID === item?.id) {
      return { ...item, isChecked: !item?.isChecked };
    } // close if
    // Return item
    return item;
  }); // close get item
  // Define variables
  // let selectedItem = objArr?.filter((item) => item?.isChecked);
  // Return
  return tempArr;
  //return { getItem, selectedItem };
}; // close if

// HANDLE SELECT BULK ITEM STRING
export const handleSelectBulkItemStr = (objArr) => {
  // If empty args, return null
  if (!objArr) return null;
  // Get all keys
  const allKeys = objArr?.map((obj) => {
    return obj?.key;
  });
  const result = allKeys?.join(", ");
  // Return
  return result;
}; // close fxn

// HANDLE UPPERCASE FIRST LETTER
export const handleUppercaseFirst = (stringInput) => {
  // If typeof stringInput != string
  if (typeof stringInput != "string") return "";
  return stringInput.charAt(0).toUpperCase() + stringInput.slice(1);
}; // close fxn

// HANDLE FORMAT NUMBER
export const handleFormatNumber = (value, decimal) => {
  // Define variables
  let result;
  decimal = decimal || 0;
  // If value > 0
  if (value > 0) {
    result = parseFloat(value)
      .toFixed(decimal)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  } else {
    result = 0;
  } // close if
  // Return
  return result;
}; // close fxn

// HANDLE TEXTAREA PHONE NUMBERS
export const handleTextareaPhoneNumbers = (values) => {
  // Define variables
  // Split textarea values to array and trim it
  const trimPhone = values?.split(/[\r?\n,]+/).map((item) => item.trim());
  // Filter empty values from keywords array
  const filterPhone = trimPhone.filter((a) => a);
  // Remove duplicates
  const uniquePhone = [...new Set(filterPhone)];
  // Define phoneArr
  const phoneArr = uniquePhone?.map((item) => item.replace("0", "+234"));
  // Finally... replace first character with 234
  const finalPhone = uniquePhone
    ?.map((item) => item.replace("0", "+234"))
    .join(", ");
  // Count phone
  const finalPhoneCount = uniquePhone?.length;
  // Check if each phoneNum === 11
  const isValidPhone = uniquePhone?.every((item) => {
    if (item?.length === 11) {
      return true;
    } else {
      return false;
    } // close if
  }); // close isValidPhone
  // Return
  return { finalPhone, finalPhoneCount, isValidPhone, phoneArr };
}; // close fxn

// GENERATE USERNAME FROM EMAIL ADDRESS
export const handleGenUsername = (email) => {
  // If data type is string
  if (typeof email === "string") {
    return email.split("@")[0];
  } else {
    return null;
  } // close if
}; // close fxn

// HANDLE GENERATE OTP CODE
export const handleGenOtpCode = () => {
  // Define code - random 6 digit numbers
  const randomCode = handleRandomCode(6);
  return randomCode?.toString();
}; // close fxn

// SAMPLE - HANDLE FORM SELECT ITEMS
export const handleFormSelectItems = (objArr) => {
  // If !obj, return
  if (!objArr || typeof objArr != "object") return;
  // Define result
  let result = [];
  // Loop objArr and generate new objArr
  objArr?.map((item) => {
    result.push({
      label: item.name,
      value: item.slug,
      image: "",
      fee: item.receiveFee,
    });
  });
  // Return
  return result;
}; // close fxn

// HANDLE GENERATE TRANX REFERENCE
export const handleGenTranxRef = (prefix) => {
  // Define variables
  const prefixFinal = prefix || "KC";
  const randomCode = handleRandomCode(6);
  const randomStr = handleRandomString(6);
  const result = prefixFinal + randomStr.toUpperCase() + randomCode;
  return result;
}; // close fxn

// HANDLE STATUS COLOR
export const handleStatusColor = (status) => {
  // If empty args, return
  if (!status || typeof status != "string") return "";
  // Define variable
  let color;
  // Switch status
  switch (status) {
    case "active":
      color = `bg-success`;
      break;
    case "success":
      color = `bg-success`;
      break;
    case "approved":
      color = `bg-success`;
      break;
    case "paid":
      color = `bg-success`;
      break;
    case "pending":
      color = `bg-warning`;
      break;
    case "processing":
      color = `bg-warning`;
      break;
    case "completed":
      color = `bg-black`;
      break;
    default:
      color = `bg-danger`;
      break;
  } // close switch
  return color;
}; // close fxn

// HANDLE SUM TRANX AMT
export const handleSumTranxAmt = (objArr, itemName) => {
  // If !objArr or objArr != object, return
  if (!itemName || !objArr || objArr != "object") return;
  // Loop objArr - convert objArr to arr
  const convertObjArrToArr = objArr?.map((obj) => {
    return obj?.itemName;
  });
  // Sum arr value
  const sumArrValue = convertObjArrToArr?.reduce((a, b) => {
    return a + b;
  }, 0);
  // Return
  return sumArrValue;
}; // close funx

// HANDLE REMOVE OBJ PROP - SINGLE
export const handleRemoveObjProp = (
  propKey,
  { [propKey]: propValue, ...rest }
) => rest;

// HANDLE REMOVE OBJ PROP - BULK
export const handleBulkRemoveObjProp = (obj, ...keys) => {
  return keys?.length
    ? handleBulkRemoveObjProp(handleRemoveObjProp(keys?.pop(), obj), ...keys)
    : obj;
}; // close fxn

// HANDLE IS EMPTY FORM
export const handleIsEmptyForm = (obj, propsToRemove) => {
  // if typeof obj !== object, return
  if (typeof obj !== "object" || !propsToRemove) return;
  // Define variables
  let isEmpty, test;
  // Define newObj - remove propsToRemove properties
  const newObj = handleRemoveObjPropBulk(obj, ...propsToRemove);
  // Define objVal - get values from obj
  const objVal = Object.values(newObj);
  // Check if any objVal is empty
  isEmpty = objVal.includes("");
  test = newObj;
  // Return
  return isEmpty;
}; // close fxn

// HANDLE TITLE CASE
export const handleTitleCase = (strVal) => {
  // If !strVal return
  if (!strVal) return;
  // Convert strVal to lowercase and split each word
  const finalStrVal = strVal?.toLowerCase()?.split(" ");
  // Loop finalStrVal and capitalize each word
  for (var i = 0; i < finalStrVal?.length; i++) {
    finalStrVal[i] =
      finalStrVal[i].charAt(0).toUpperCase() + finalStrVal[i].slice(1);
  } // close loop
  // Return
  return finalStrVal?.join(" ");
}; // close fxn

// HANDLE IS POSTIVE NUMBER
export const handleIsPositiveNum = (val) => {
  // Define variables
  val = val || 0;
  // Check balance
  if (Math?.sign(val) !== -1) {
    return true;
  } else {
    return false;
  } // close if
}; // close fxn

// HANDLE JAVASCRIPT DATE ADD DAYS
export const handleJsDateAddDays = (dateVal, days) => {
  // If empty args, return
  if (!dateVal || typeof days !== "number") return null;
  let result = new Date(dateVal);
  result.setDate(result.getDate() + days);
  return result;
}; // close fxn

// HANDLE DAYJS DIFFERENCE
export const handleDayJsDiff = (date1, date2, unit) => {
  // If empty args, return
  if (!date1 || !date2) return 0;
  date1 = dayjs(date1);
  date2 = dayjs(date2);
  unit = unit || "day";
  const result = date2?.diff(date1, unit);
  return result;
}; // close fxn

// HANDLE DAYJS IS AFTER
export const handleDayJsIsAfter = (date) => {
  // If empty args, return
  if (!date) return false;
  return dayjs().isAfter(dayjs(date));
}; // close fxn

// HANDLE DAYJS FROM NOW
export const handleDayJsFromNow = (date, isSuffix) => {
  // If empty args, return
  if (!date) return;
  isSuffix = isSuffix || false;
  return dayjs(date).fromNow(isSuffix);
}; // close fxn

// HANDLE DAYJS FORMAT
export const handleDayJsFormat = (dateVal, num, formatVal) => {
  // Define variables
  dateVal = dateVal || undefined;
  formatVal = formatVal || "YYYY";
  // Switch num
  switch (num) {
    case 1:
      return dayjs.utc(dateVal).format("MMM D, YYYY");
    case 2:
      return dayjs.utc(dateVal).format("MMM D, YYYY h:mm A");
    case 3:
      return dayjs.utc(dateVal).format(formatVal);
    default:
      return dayjs.utc(dateVal).format();
  } // close switch
}; // close fxn

// HANDLE DAYSJS ADD DAYS
export const handleDayJsAddDays = (val, units) => {
  // If empty args, return
  if (!val) return null;
  units = units || "days";
  const result = dayjs().add(val, units);
  const resultFormat = handleDayJsFormat(result);
  return resultFormat;
}; // close fxn

// HANDLE ITEM IS IN OBJECT ARRAY
export const handleItemIsInObjArr = (objArr, id) => {
  // If empty args, return
  if (!objArr || !id) return false;
  const checkIItem = objArr?.filter((i) => i?.id === id);
  const isValid = checkIItem?.length > 0;
  return isValid;
}; // close fxn

// HANDLE ITEM IS IN ARRAY
export const handleItemIsInArr = (arr, val) => {
  // If empty args, return
  if (!arr || !val) return false;
  return arr?.includes(val);
}; // close fxn

// HANDLE ADD ITEM TO OBJECT ARRAY
export const handleAddItemToObjArr = (objArr, id, currItem) => {
  // If empty args, return
  if (!objArr || !id || !currItem) return [];
  // Check if item in objArr
  const objArrLen = objArr?.length;
  const isInObjArr = handleItemIsInObjArr(objArr, id);
  const newArr = isInObjArr
    ? objArr?.filter((i) => i?.id !== id)
    : [...objArr, currItem];
  // If objArrLen
  if (objArrLen > 0) {
    if (isInObjArr) {
      return newArr;
    } else {
      return newArr;
    } // close if
  } else {
    return newArr;
  } // close if
}; // close fxn

// HANDLE ADD ITEM TO ARRAY
export const handleAddItemToArr = (arr, currItem) => {
  // If empty args, return
  if (!arr || !currItem) return [];
  // Check if item in array
  const arrLen = arr?.length;
  const isInArr = handleItemIsInArr(arr, currItem);
  const newArr = isInArr
    ? arr?.filter((i) => i !== currItem)
    : [...arr, currItem];
  // If arrLen
  if (arrLen > 0) {
    if (isInArr) {
      return newArr;
    } else {
      return newArr;
    } // close if
  } else {
    return newArr;
  } // close if
}; // close fxn

// HANDLE GET SAVED ITEM
export const handleGetSavedItem = (objArr, id) => {
  // If empty args, return
  if (!objArr || !id) return null;
  const getData = objArr?.filter((i) => i?.data?.id === id);
  const isValid = getData?.length > 0;
  const data = getData?.[0];
  return { isValid, data };
}; // close fxn

// HANDLE GET INFO BY ID
export const handleGetInfoById = (objArr, id) => {
  // If empty args, return
  if (!objArr || !id) return null;
  const getData = objArr?.filter((i) => i?.id === id);
  const isValid = getData?.length > 0;
  const data = getData?.[0];
  return { isValid, data };
}; // close fxn

// HANDLE FIREADMIN ACTIONS
export const handleFireAdminAction = async (email, action) => {
  // If empty args, return
  if (!email || !action) return null;
  return await axios({
    method: "POST",
    url: `${baseUrl}/api/fireadmin`,
    data: { action, email },
  }).then((res) => {
    return res?.data;
  }); // close return
}; // close fxn

// HANDLE IS SUPER ADMIN
export const handleIsSuperAdmin = (username) => {
  // If empty args, return
  if (!username) return;
  return username?.toLowerCase() === "klincoder";
}; // close fxn

// HANDLE HASH VAL
export const handleHashVal = async (val, action, hashedVal) => {
  // If empty args, return
  if (!val || !action) return null;
  return await axios({
    method: "POST",
    url: `${baseUrl}/api/hash-val`,
    data: { val, action, hashedVal },
  }).then((res) => {
    return res?.data;
  }); // close return
}; // close fxn
