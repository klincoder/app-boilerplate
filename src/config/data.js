// Import resources
import { Dimensions } from "react-native";
import { createTheme } from "@rneui/themed";
import tw from "twrnc";
import * as Application from "expo-application";

// Import custom files
import routes from "../screens/routes";
import logoImage from "../assets/logo.png";

// BASE URL
export const baseUrl = "https://klincoder.netlify.app";
//https://klincoder.com

// CURRENCY SYMBOL
export const currSymbol = { ngn: "₦", btc: "₿", usd: "$", gh: "₵" };

// COUNTRY FLAG URL
export const countryFlagUrl = "https://countryflagsapi.com/png";

// OTP DEFAULT TIMER
export const otpDefaultTimer = 59;

// JAVASCRIPT DATE
export const jsDate = new Date();

// Define screen info
export const screenInfo = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
  scale: Dimensions.get("window").scale,
  fontScale: Dimensions.get("window").fontScale,
};

// APP COLORS
export const appColors = {
  primary: "#313bac",
  secondary: "#161b50",
  accent: "#f9f871",
  danger: "#ff5252",
  success: "#198754",
  error: "#dc3545",
  info: "#0dcaf0",
  warning: "#FFC107",
  white: "#ffffff",
  black: "#000000",
  gray: "#808080",
  lightPrimary: "#3844c7",
  veryLightPrimary: "#6069d2",
  lightSecondary: "#1b2164",
  veryLightSecondary: "#212878",
  lightDanger: "#FF8080",
  veryLightDanger: "#FFB3B3",
  lightSuccess: "#24C278",
  veryLightSuccess: "#68E3AA",
  lightGray: "#f5f5f5",
  lightBlack: "#333333",
};

// APP FONTS
export const appFonts = {
  regular: "Montserrat-Regular",
  medium: "Montserrat-Medium",
  light: "Montserrat-Light",
  thin: "Montserrat-Thin",
};

// APP IMAGES
export const appImages = {
  logo: logoImage,
  general: "https://placehold.co/600x400.png",
  avatar:
    "https://firebasestorage.googleapis.com/v0/b/klincoder-dev.appspot.com/o/avatar-default.png?alt=media&token=589b5b52-2bf3-42e1-994c-e89d1d203f9f",
  bankTransfer:
    "https://firebasestorage.googleapis.com/v0/b/bulkahia-dev.appspot.com/o/bank-transfer.png?alt=media&token=47cb143a-8909-46d4-9123-9004eb09efbf",
  creditCard:
    "https://firebasestorage.googleapis.com/v0/b/bulkahia-dev.appspot.com/o/credit-card.png?alt=media&token=aa6bbc9b-37ee-413d-8150-649de975edef",
  onboarding:
    "https://firebasestorage.googleapis.com/v0/b/rentdrive-dev.appspot.com/o/speedometer-g33aa6cb3b_1920.jpg?alt=media&token=698a7fc7-50e1-4f2c-9e95-d51af126d420",
  onboarding2:
    "https://firebasestorage.googleapis.com/v0/b/klin-courier-dev.appspot.com/o/pexels-mizuno-k-13432001.jpg?alt=media&token=f94e5b20-4a75-4dc3-b7b3-2bbce9ca26b3",
  location:
    "https://firebasestorage.googleapis.com/v0/b/klincoder-dev.appspot.com/o/location.png?alt=media&token=805e5f4c-2a44-4bc9-95b9-096c392707ef",
  payment:
    "https://firebasestorage.googleapis.com/v0/b/klincoder-dev.appspot.com/o/payment-image.png?alt=media&token=9ed7178a-10f1-4bfd-ba60-88a97cadd954",
};

// APP THEME
export const appTheme = createTheme({
  components: {
    mode: "light",
    lightColors: {
      primary: appColors?.primary,
    },
    darkColors: {
      primary: appColors?.black,
    },
    // Button: {
    //   titleStyle: { fontFamily: appFonts?.medium },
    // },
  },
});

// APP REGEX
export const appRegex = {
  phone: /^(?:\d{11})$/,
  numberDecimal: /^\d*(\.\d+)?$/,
  fiveDecimalPlaces: /^\d*(\.\d{1,5})?$/,
  digitsOnly: /^[0-9]+$/,
  cannotStartWithZero: /^(?:[1-9]\d*|0)$/,
};

// GLOBAL SCREEN OPTIONS
export const globalScreenOptions = {
  headerTintColor: "black",
  //headerTitleAlign: "center",
  headerTitleStyle: { color: "black", fontFamily: appFonts?.medium },
  headerStyle: {
    backgroundColor: `${appColors?.white}`,
    elevation: 0,
    shadowOpacity: 0,
  },
};

// ALERT MESSAGE
export const alertMsg = {
  generalErr: "Internal error. Please contact support.",
  generalSucc: "Action successful 👍",
  loginSucc: "Login successful 👍",
  loginErr: "Invalid credentials",
  regSucc: "Registration successful",
  isRequired: "All fields are required",
  isValidUser: "User already exist",
  inValidUser: "User not found",
  otpSent: "Otp sent successfully",
  otpErr: "Invalid code",
  profileSucc: "Profile updated",
  passRecoverySucc: "Password recovery successful",
  logoutConfirm: "Confirm logout",
  logoutSucc: "Logout successful",
  paymentSucc: "Payment successful",
  paymentErr: "Payment failed",
  emailExistErr: "Email address already exist",
  usernameExistErr: "Username not available",
  linkSentSucc: "We sent your verification link. Check your inbox or spam.",
};

// API ROUTES
export const apiRoutes = {
  otp: "mailjet-otp",
  welcome: "mailjet-welcome",
  login: "mailjet-login",
  newUser: "mailjet-new-user",
  passChange: "mailjet-pass-change",
  profileChange: "mailjet-profile-change",
};

/*************
  DATA
**************/
// ACCOUNT LIST
export const accountList = [
  {
    id: "123",
    title: "Edit Profile",
    leftIconType: "antDesign",
    leftIconName: "edit",
    slug: "edit-profile",
    isLink: true,
    link: routes.EDIT_PROFILE,
  },
  {
    id: "456",
    title: "Notifications",
    leftIconType: "feather",
    leftIconName: "bell",
    slug: "notifications",
    isLink: false,
  },
  {
    id: "789",
    title: "Customer Support",
    leftIconType: "fontAwesome",
    leftIconName: "support",
    slug: "customer-support",
    isLink: false,
  },
  {
    id: "1011",
    title: `Version (${Application.nativeApplicationVersion})`,
    leftIconType: "octIcons",
    leftIconName: "versions",
    slug: "app-version",
    isLink: false,
  },
];

// HOME CAROUSEL
export const homeCarousel = [
  "https://firebasestorage.googleapis.com/v0/b/rentdrive-dev.appspot.com/o/car-3.jpg?alt=media&token=a9ef5024-d0b0-4233-8c81-538fcbd8b9d8",
  "https://firebasestorage.googleapis.com/v0/b/rentdrive-dev.appspot.com/o/car-4.jpg?alt=media&token=fca1a04d-b218-4338-863f-11a0242bf558",
];

// CARS LIST
export const carsList = [
  {
    id: "123",
    userID: "123456",
    title: "Lexus RX 350 2017 Red",
    description:
      "Lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum.",
    location: "Accra",
    body: "suv",
    brand: "lexus",
    brandModel: "rx350",
    color: "red",
    condition: "ghanaian used",
    dateCreated: "2022-09-25T01:49:41Z",
    dateUpdated: "2022-09-25T01:49:41Z",
    engineSize: "2500 cc",
    fuel: "petrol",
    images: [
      "https://pictures-ghana.jijistatic.com/23759174_MTYwMC0xNTY4LTY3YmZiMjNiZjU.webp",
      "https://pictures-ghana.jijistatic.com/23759167_MTYwMC0xNDIwLWI2ODljNTc2ZWQ.webp",
      "https://pictures-ghana.jijistatic.com/23759176_MTYwMC0yMTM0LWRhMmE0OGVlM2M.webp",
      "https://pictures-ghana.jijistatic.com/23759177_MTYwMC0yMTM0LTc0M2EzZmI5ODg.webp",
      "https://pictures-ghana.jijistatic.com/23759182_MTYwMC0yMTM0LTk5NDQyNTZiMDA.webp",
      "https://pictures-ghana.jijistatic.com/23759173_MTYwMC0yMTM0LTM0NGRlMmQ4Njk.webp",
    ],
    mileage: 1530,
    registered: true,
    price: 300,
    priceType: "daily",
    seats: 4,
    slug: "lexus-rx-350-2017-red",
    status: "active",
    transmission: "automatic",
    year: 2017,
    withDriver: true,
  },
  {
    id: "456",
    userID: "123456789",
    title: "Audi S5 2021 Gray",
    description:
      "Lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum.",
    location: "Kumasi",
    body: "salon",
    brand: "audi",
    brandModel: "beige",
    color: "gray",
    condition: "foreign used",
    dateCreated: "2022-10-15T18:28:07Z",
    dateUpdated: "2022-10-15T18:28:07Z",
    engineSize: "1800 cc",
    fuel: "petrol",
    images: [
      "https://pictures-ghana.jijistatic.com/25003466_MTAwMC03NTAtYTg5NDQ0ZGI1OQ.webp",
      "https://pictures-ghana.jijistatic.com/25003471_MTAwMC03NTAtZmMzMDFkMzg3ZQ.webp",
      "https://pictures-ghana.jijistatic.com/25003472_MTAwMC03NTAtZmEyOGY2MTljNw.webp",
    ],
    mileage: 3548,
    registered: true,
    price: 450,
    priceType: "daily",
    seats: 4,
    slug: "honda-accord-2015-beige",
    status: "active",
    transmission: "automatic",
    year: 2015,
  },
  {
    id: "789",
    userID: "123456789",
    title: "Honda Accord 2019 Red",
    description:
      "Lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum.",
    location: "Kumasi",
    body: "salon",
    brand: "honda",
    brandModel: "beige",
    color: "gray",
    condition: "foreign used",
    dateCreated: "2022-10-15T18:28:07Z",
    dateUpdated: "2022-10-15T18:28:07Z",
    engineSize: "1800 cc",
    fuel: "petrol",
    images: [
      "https://pictures-ghana.jijistatic.com/25459078_ODEwLTEwODAtNjJmMGRhM2NkNQ.webp",
      "https://pictures-ghana.jijistatic.com/25459079_ODEwLTEwODAtZWVjMjYzYzRlNw.webp",
      "https://pictures-ghana.jijistatic.com/25459082_MTA4MC04MTAtZDQ5OTUxZTUwNA.webp",
      "https://pictures-ghana.jijistatic.com/25459083_ODEwLTEwODAtY2Y4ZWJlMWViOQ.webp",
    ],
    mileage: 3548,
    registered: true,
    price: 450,
    priceType: "daily",
    seats: 4,
    slug: "honda-accord-2015-beige",
    status: "active",
    transmission: "automatic",
    year: 2015,
  },
  {
    id: "1011",
    userID: "123456789",
    title: "Mercedes-Benz C300 2018 Gray",
    description:
      "Lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum.",
    location: "Kumasi",
    body: "salon",
    brand: "mercedes-benz",
    brandModel: "beige",
    color: "red",
    condition: "foreign used",
    dateCreated: "2022-10-15T18:28:07Z",
    dateUpdated: "2022-10-15T18:28:07Z",
    engineSize: "1800 cc",
    fuel: "petrol",
    images: [
      "https://pictures-ghana.jijistatic.com/22865399_MTYwMC0yMTM0LWYyZWExYmZmOWU.webp",
      "https://pictures-ghana.jijistatic.com/22867280_MTYwMC0xMjAwLWI3NDUyOTRjMDk.webp",
      "https://pictures-ghana.jijistatic.com/22865396_MTYwMC0xMjAwLTczZmRlNmJlN2M.webp",
    ],
    mileage: 3548,
    registered: true,
    price: 450,
    priceType: "daily",
    seats: 4,
    slug: "honda-accord-2015-beige",
    status: "active",
    transmission: "automatic",
    year: 2015,
  },
  {
    id: "1213",
    userID: "123456789",
    title: "Toyota Corolla S 2004 Silver",
    description:
      "Lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum.",
    location: "Kumasi",
    body: "salon",
    brand: "toyota",
    brandModel: "beige",
    color: "red",
    condition: "foreign used",
    dateCreated: "2022-10-15T18:28:07Z",
    dateUpdated: "2022-10-15T18:28:07Z",
    engineSize: "1800 cc",
    fuel: "petrol",
    images: [
      "https://pictures-ghana.jijistatic.com/25964011_NjIwLTY1MS03YTMxOTI4MjM1.webp",
      "https://pictures-ghana.jijistatic.com/25964012_NjE0LTY4MC03NDEyZTdjODZj.webp",
      "https://pictures-ghana.jijistatic.com/25964010_NjIwLTc0MS02ZmRlMzlkOTMz.webp",
    ],
    mileage: 3548,
    registered: true,
    price: 450,
    priceType: "daily",
    seats: 4,
    slug: "honda-accord-2015-beige",
    status: "active",
    transmission: "automatic",
    year: 2015,
  },
  {
    id: "1415",
    userID: "123456789",
    title: "Toyota RAV4 LE AWD (2.5L 4cyl 6A) 2017 Blue",
    description:
      "Lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum.",
    location: "Kumasi",
    body: "salon",
    brand: "toyota",
    brandModel: "beige",
    color: "red",
    condition: "foreign used",
    dateCreated: "2022-10-15T18:28:07Z",
    dateUpdated: "2022-10-15T18:28:07Z",
    engineSize: "1800 cc",
    fuel: "petrol",
    images: [
      "https://pictures-ghana.jijistatic.com/26307019_OTAwLTEyMDAtODY1ZmIyODAzNA.webp",
      "https://pictures-ghana.jijistatic.com/26307041_MTUwMC0xMTI1LThjNjgxMjE4YTM.webp",
      "https://pictures-ghana.jijistatic.com/26307046_MTUwMC0xMTI1LTI5MmYxOTE2MjM.webp",
      "https://pictures-ghana.jijistatic.com/26307047_MTUwMC0xMTI1LWM0NjcxMjg1ZTg.webp",
      "https://pictures-ghana.jijistatic.com/26307037_OTAwLTEyMDAtOTI1YTAzMjFmYg.webp",
    ],
    mileage: 3548,
    registered: true,
    price: 450,
    priceType: "daily",
    seats: 4,
    slug: "honda-accord-2015-beige",
    status: "active",
    transmission: "automatic",
    year: 2015,
  },
];

// CAR BRANDS LIST
export const carBrandList = [
  { id: "123", title: "All", image: appImages?.bankTransfer },
  { id: "456", title: "Lexus", image: appImages?.bankTransfer },
  { id: "789", title: "Audi", image: appImages?.bankTransfer },
  { id: "1011", title: "Honda", image: appImages?.bankTransfer },
  { id: "1213", title: "Mercedes-Benz", image: appImages?.bankTransfer },
  { id: "1415", title: "Toyota", image: appImages?.bankTransfer },
  // { id: "1617", title: "Kia", image: appImages?.bankTransfer },
  // { id: "1819", title: "Nissan", image: appImages?.bankTransfer },
  // { id: "2021", title: "Ford", image: appImages?.bankTransfer },
  // { id: "2223", title: "Hyundai", image: appImages?.bankTransfer },
  // { id: "2425", title: "BMW", image: appImages?.bankTransfer },
  // { id: "2627", title: "Chevrolet", image: appImages?.bankTransfer },
];

// TEST LIST
export const testList = [
  {
    id: "123",
    title: "Amy Farha",
    description: "1 Vice President lorep ipsum lorep ipsum lorep ipsum.",
    image: appImages?.creditCard,
  },
  {
    id: "456",
    title: "Chris Jackson",
    description: "3 Vice Chairman lorep ipsum lorep ipsum lorep ipsum.",
    image: appImages?.bankTransfer,
  },
  {
    id: "789",
    title: "Caleb Obodefula",
    description: "3 Vice Chairman lorep ipsum lorep ipsum lorep ipsum.",
    image: appImages?.general,
  },
];

// LOCATION LIST
export const locationList = [
  {
    id: "123",
    title: "Accra Metropolitan",
    image: appImages?.location,
  },
  {
    id: "456",
    title: "Kumasi",
    image: appImages?.location,
  },
  {
    id: "789",
    title: "Cape Coast",
    image: appImages?.location,
  },
];

// PAYMENT METHOD LIST
export const paymentMethodList = [
  {
    id: "123",
    title: "Pay on Pickup",
    description: "1hr reservation limit",
    image: appImages?.payment,
  },
  {
    id: "456",
    title: "Pay Now",
    description: "Reserved unitl end date expires",
    image: appImages?.payment,
  },
];
