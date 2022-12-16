// Import resources
import { Dimensions } from "react-native";
import { createTheme } from "@rneui/themed";
import tw from "twrnc";
import * as Application from "expo-application";

// Import custom files
import routes from "../screens/routes";
import logoImage from "../assets/logo.png";
import logoIconImage from "../assets/icon.png";

// BASE URL
export const baseUrl = "https://klincoder.netlify.app";
//https://klincoder.com

// CURRENCY SYMBOL
export const currSymbol = { ng: "₦", btc: "₿", usd: "$", gh: "₵" };

// COUNTRY FLAG URL
export const countryFlagUrl = "https://countryflagsapi.com/png";

// OTP DEFAULT TIMER
export const otpDefaultTimer = 59;

// JAVASCRIPT DATE
export const jsDate = new Date();

// APP COLORS
export const appColors = {
  primary: "#bf211e",
  secondary: "#6e1311",
  accent: "#f9dc5c",
  danger: "#ff5252",
  success: "#198754",
  error: "#dc3545",
  info: "#0dcaf0",
  warning: "#FFC107",
  white: "#ffffff",
  black: "#000000",
  gray: "#808080",
  lightPrimary: "#dd2622",
  veryLightPrimary: "#e3514f",
  lightSecondary: "#841715",
  veryLightSecondary: "#9a1a18",
  lightDanger: "#FF8080",
  veryLightDanger: "#FFB3B3",
  lightSuccess: "#24C278",
  veryLightSuccess: "#68E3AA",
  lightGray: "#dddddd",
  veryLightGray: "#f4f4f4",
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
  logoIcon: logoIconImage,
  general: "https://placehold.co/600x400.png",
  avatar:
    "https://firebasestorage.googleapis.com/v0/b/klincoder-dev.appspot.com/o/avatar-default.png?alt=media&token=589b5b52-2bf3-42e1-994c-e89d1d203f9f",
  bankTransfer:
    "https://firebasestorage.googleapis.com/v0/b/bulkahia-dev.appspot.com/o/bank-transfer.png?alt=media&token=47cb143a-8909-46d4-9123-9004eb09efbf",
  creditCard:
    "https://firebasestorage.googleapis.com/v0/b/bulkahia-dev.appspot.com/o/credit-card.png?alt=media&token=aa6bbc9b-37ee-413d-8150-649de975edef",
  onboarding:
    "https://firebasestorage.googleapis.com/v0/b/klincoder-dev.appspot.com/o/football-bg-1.png?alt=media&token=275fa523-40b8-4d5f-81b6-32655914276e",
  onboarding2:
    "https://firebasestorage.googleapis.com/v0/b/klin-courier-dev.appspot.com/o/pexels-mizuno-k-13432001.jpg?alt=media&token=f94e5b20-4a75-4dc3-b7b3-2bbce9ca26b3",
  location:
    "https://firebasestorage.googleapis.com/v0/b/klincoder-dev.appspot.com/o/location.png?alt=media&token=805e5f4c-2a44-4bc9-95b9-096c392707ef",
  payment:
    "https://firebasestorage.googleapis.com/v0/b/klincoder-dev.appspot.com/o/payment-image.png?alt=media&token=9ed7178a-10f1-4bfd-ba60-88a97cadd954",
  globe:
    "https://firebasestorage.googleapis.com/v0/b/klincoder-dev.appspot.com/o/globe-image.png?alt=media&token=4089539c-690b-437d-95e5-62c5ebdbfbce",
};

// APP THEME
export const appTheme = createTheme({
  mode: "light",
  lightColors: {
    primary: appColors?.primary,
    background: appColors?.white,
  },
  darkColors: {
    primary: appColors?.black,
  },
  components: {
    DialogLoading: {
      color: appColors?.primary,
    },
    Chip: {
      buttonStyle: tw`border-black`,
    },
    Text: {
      h1Style: {
        fontFamily: appFonts?.medium,
      },
      h2Style: {
        fontFamily: appFonts?.medium,
      },
      h3Style: {
        fontFamily: appFonts?.medium,
      },
      h4Style: {
        fontFamily: appFonts?.medium,
      },
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

// ALERT MESSAGE
export const alertMsg = {
  generalErr: "Internal error. Please contact support 😔",
  generalSucc: "Action successful 👍",
  loginSucc: "Login successful 👍",
  loginErr: "Invalid credentials 😔",
  regSucc: "Registration successful 👍",
  isRequired: "All fields are required 😔",
  isValidUser: "User already exist 😔",
  inValidUser: "User not found 😔",
  otpSent: "Otp sent successfully 👍",
  otpErr: "Invalid code 😔",
  profileSucc: "Profile updated 👍",
  passRecoverySucc: "Password recovery successful 👍",
  logoutConfirm: "Confirm logout",
  logoutSucc: "Logout successful 👍",
  paymentSucc: "Payment successful 👍",
  paymentErr: "Payment failed 😔",
  emailExistErr: "Email address already exist 😔",
  usernameExistErr: "Username not available 😔",
  linkSentSucc: "We sent your verification link. Check your inbox or spam 👍",
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

// GLOBAL SCREEN OPTIONS
export const globalScreenOptions = {
  headerTintColor: "black",
  //headerTitleAlign: "center",
  headerTitleStyle: { color: "black", fontFamily: appFonts?.medium },
  headerStyle: {
    backgroundColor: appColors?.white,
    elevation: 0,
    shadowOpacity: 0,
  },
};

// SCREEN INFO
export const screenInfo = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
  scale: Dimensions.get("window").scale,
  fontScale: Dimensions.get("window").fontScale,
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
