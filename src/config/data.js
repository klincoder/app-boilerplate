// Import resources
import { Dimensions } from "react-native";
import { createTheme } from "@rneui/themed";
import tw from "twrnc";
import * as Application from "expo-application";

// Import custom files
import routes from "../screens/routes";
import logo from "../assets/logo.png";
import logoIcon from "../assets/icon.png";
import visa from "../assets/images/visa.png";
import mastercard from "../assets/images/mastercard.png";
import verve from "../assets/images/verve.png";
import mtnMomo from "../assets/images/mtn-momo.jpg";
import bankTransfer from "../assets/images/bank-transfer.jpg";
import {
  PAYSTACK_DEV_PUBLIC_KEY,
  PAYSTACK_DEV_SECRET_KEY,
  PAYSTACK_PROD_PUBLIC_KEY,
  PAYSTACK_PROD_SECRET_KEY,
} from "@env";

// BASE URL
export const baseUrl = "https://klinstore.netlify.app";

// IS PROD ENVIRONMENT
export const isProdEnv = process.env.NODE_ENV === "production";

// CURRENCY SYMBOL
export const currSymbol = { ng: "₦", btc: "₿", usd: "$", gh: "₵" };

// COUNTRY FLAG URL
export const countryFlagUrl = "https://countryflagsapi.com/png";

// OTP DEFAULT TIMER
export const otpDefaultTimer = 59;

// JAVASCRIPT DATE
export const jsDate = new Date();

// ACTION SETTINGS
export const actionSettings = {
  url: `${baseUrl}/login`,
  // iOS: {
  //   bundleId: "com.example.klincoder",
  // },
  // android: {
  //   packageName: "com.example.klincoder",
  //   installApp: true,
  //   minimumVersion: "12",
  // },
  //handleCodeInApp: false,
  //dynamicLinkDomain: 'custom.page.link'
};

// APP COLORS
export const appColors = {
  primary: "#313bac",
  secondary: "#11143c",
  accent: "#f9f871",
  success: "#198754",
  danger: "#ff5252",
  info: "#0dcaf0",
  warning: "#ffc107",
  error: "#dc3545",
  white: "#ffffff",
  black: "#000000",
  gray: "#9ca3af",
  lightDanger: "#ff8080",
  veryLightDanger: "#ffb3b3",
  lightSuccess: "#24c278",
  veryLightSuccess: "#68e3aa",
  lightGray: "#f3f4f6",
  veryLightGray: "#f4f4f4",
  lightBlack: "#333333",
  lightPrimary: "#6069d2", // Light primary
  veryLightPrimary: "#afb4e9",
  lightSecondary: "#1c2163",
  veryLightSecondary: "#272e8b",
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
  logo: logo,
  logoIcon: logoIcon,
  general: "https://placehold.co/600x400.png",
  avatar:
    "https://firebasestorage.googleapis.com/v0/b/klincoder-dev.appspot.com/o/avatar-default.png?alt=media&token=589b5b52-2bf3-42e1-994c-e89d1d203f9f",
  bankTransfer:
    "https://firebasestorage.googleapis.com/v0/b/bulkahia-dev.appspot.com/o/bank-transfer.png?alt=media&token=47cb143a-8909-46d4-9123-9004eb09efbf",
  creditCard:
    "https://firebasestorage.googleapis.com/v0/b/bulkahia-dev.appspot.com/o/credit-card.png?alt=media&token=aa6bbc9b-37ee-413d-8150-649de975edef",
  onboarding:
    "https://firebasestorage.googleapis.com/v0/b/klincoder-dev.appspot.com/o/app-onboarding-default.png?alt=media&token=c51ac96f-cdec-47a6-bc21-1a9b0c989fb2",
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
  generalSucc: "Action successful 👍", // Success
  linkSentSucc: "We sent your verification link. Check your inbox or spam 👍",
  otpSentSucc: "We sent your OTP code. Check your inbox or spam 👍",
  loginSucc: "Login successful 👍",
  registerSucc: "Account created. Login 👍",
  passRecoverySucc: "Password recovery successful 👍",
  passResetSucc: "Password reset successful. Login 👍",
  logoutSucc: "Logout successful 👍",
  verifyEmailSucc: "Email address verified 👍",
  userExistSucc: "User already exist 👍",
  paymentSucc: "Payment successful 👍",
  cartSucc: "Added to cart 👍",
  logoutConfirm: "Are you sure you want to logout? 🤔", // Error
  generalErr: "internal error. Please contact support 😔",
  isRequiredAll: "All fields are required 😔",
  inValidCred: "Invalid credentials 😔",
  otpSentErr: "Failed to send OTP. Try again 😔",
  otpVerifyErr: "Invalid code 😔",
  authActionErr: "Authentication failed 😔",
  userExistErr: "User not found 😔",
  paymentErr: "Payment failed 😔",
  loginErr: "Login Required 😔",
  cartErr: "Removed from cart 😔",
};

// API ROUTES
export const apiRoutes = {
  otpEmail: { api: "mailjet-email", tempID: 4468134 },
  verifyEmail: { api: "mailjet-email", tempID: 4469644 },
  passRecovery: { api: "mailjet-email", tempID: 4470092 },
  profileChange: { api: "mailjet-email", tempID: 4471756 },
  welcome: { api: "mailjet-email", tempID: 4471793 },
  login: { api: "mailjet-email", tempID: 4471814 },
  newUser: { api: "mailjet-email", tempID: 4471824 },
  contactForm: { api: "mailjet-email", tempID: 1 }, // Empty
  newsletter: { api: "mailjet-email", tempID: 1 },
  tranx: { api: "mailjet-email", tempID: 1 },
  order: { api: "mailjet-email", tempID: 1 },
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

// PAYSTACK CONFIG
export const paystackConfig = {
  public: isProdEnv ? PAYSTACK_PROD_PUBLIC_KEY : PAYSTACK_DEV_PUBLIC_KEY,
  secret: isProdEnv ? PAYSTACK_PROD_SECRET_KEY : PAYSTACK_DEV_SECRET_KEY,
};

// LOCAL STORAGE KEYS
export const localKeys = {
  cart: "klinStoreCart",
  address: "klinStoreAddr",
  isSlides: "isKlinStoreSlides",
};

/*************
  DATA
**************/
// ACCOUNT LIST
export const accountList = [
  {
    title: "Settings",
    leftIconType: "materialCommunityIcons",
    leftIconName: "cog-outline",
    isLink: true,
    link: routes.SETTINGS,
  },
  {
    title: "Contact Support",
    leftIconType: "fontAwesome",
    leftIconName: "support",
    isLink: true,
    link: routes.SUPPORT,
  },
  {
    title: `Version (${Application.nativeApplicationVersion})`,
    slug: "app-version",
    leftIconType: "octIcons",
    leftIconName: "versions",
  },
  {
    title: "Logout",
    leftIconType: "materialIcons",
    leftIconName: "logout",
    isLogout: true,
  },
];

// PAYMENT METHOD LIST
export const paymentMethodList = [
  {
    id: "123",
    title: "Pay Now",
    description: "Reserved unitl end date expires",
    image: appImages?.creditCard,
    slug: "pay-now",
  },
  {
    id: "456",
    title: "Pay on Pickup",
    description: "1hr reservation limit",
    image: appImages?.creditCard,
    slug: "pay-on-delivery",
  },
];

// GENDER LIST
export const genderList = ["Male", "Female", "Prefer not to say"];

// PAYMENT LOGOS
export const paymentLogos = [visa, mastercard, verve, mtnMomo, bankTransfer];
