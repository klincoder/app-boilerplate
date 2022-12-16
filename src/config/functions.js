// Import resources
import axios from "axios";
import dayjs from "dayjs";
import dayjsUTC from "dayjs/plugin/utc";
dayjs.extend(dayjsUTC);

// Import custom files
import { baseUrl } from "./data";

// VARIABLES
export const randomCode4 = Math.floor(1000 + Math.random() * 9000);
export const randomCode6 = Math.floor(Math.random() * 999999 + 1);
export const randomCode10 = Math.floor(1000 + Math.random() * 9000000000);
export const randomStr6 = Math.random().toString(36).slice(2, 3);

// FUNCTIONS
// HANDLE SEND EMAIL
export const handleSendEmail = async (
  role,
  toName,
  toEmail,
  msg,
  api,
  fromName,
  fromEmail
) => {
  // If empty args, return
  if (!role || !toName || !toEmail || !msg || !api || !fromName) return;
  // Return and await response
  return await axios({
    method: "POST",
    url: `${baseUrl}/api/${api}`,
    data: {
      role: role,
      toName: toName,
      toEmail: toEmail,
      msg: msg,
      fromName: fromName || "Bulkahia",
      fromEmail: fromEmail || "support@bulkahia.com",
      footerName: `${fromName} Team`,
    },
  }).then((apiRes) => {
    return apiRes;
  }); // close return
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
  return randomCode6?.toString();
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
  const prefixFinal = prefix || "BA";
  const result = prefixFinal + randomStr6.toUpperCase() + randomCode6;
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
      color = "bg-success";
      break;
    case "success":
      color = "bg-success";
      break;
    case "approved":
      color = "bg-success";
      break;
    case "paid":
      color = "bg-success";
      break;
    case "pending":
      color = "bg-secondary";
      break;
    case "processing":
      color = "bg-secondary";
      break;
    case "completed":
      color = "bg-dark";
      break;
    default:
      color = "bg-danger";
      break;
  } // close switch
  // Return
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
  if (!date1 || !date2) return null;
  date1 = dayjs(date1);
  date2 = dayjs(date2);
  unit = unit || "day";
  const result = date2?.diff(date1, unit);
  return result;
}; // close fxn

// HANDLE DAYJS FORMAT
export const handleDayJsFormat = (dateVal, formatType) => {
  // If empty args, return
  if (!dateVal) return;
  // Define variables
  let result;
  // Switch formatType
  switch (formatType) {
    case 1:
      result = dayjs.utc(dateVal).format("MMM D, YYYY");
      break;
    case 2:
      result = dayjs.utc(dateVal).format("MMM D, YYYY h:mm A");
      break;
    case 3:
      result = dayjs.utc(dateVal).format("YYYY-MM-DD");
      break;
    case 4:
      result = dayjs.utc(dateVal).format("h:mm A");
      break;
    case 5:
      result = dayjs(dateVal).format("DD MMM");
      break;
    case 6:
      result = dayjs(dateVal).format("HH:mm");
      break;
    default:
      result = dayjs.utc(dateVal).format();
      break;
  } // close switch
  // Retuurn
  return result;
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
