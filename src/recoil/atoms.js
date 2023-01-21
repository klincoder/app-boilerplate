// Import resources
import { atom } from "recoil";

/**********************
  ALL
**********************/
// ALL USERS ATOM
export const allUsersAtom = atom({
  key: "allUsersAtom",
  default: [],
});

/**********************
  USER
**********************/
// USER ATOM
export const userAtom = atom({
  key: "userAtom",
  default: null,
});

// USER SAVED ATOM
export const userSavedAtom = atom({
  key: "userSavedAtom",
  default: [],
});

/**********************
  OTHERS
**********************/
// APP SETTINGS ATOM
export const appSettingsAtom = atom({
  key: "appSettingsAtom",
  default: [],
});

// APP ONBOARDING ATOM
export const appOnboardingAtom = atom({
  key: "appOnboardingAtom",
  default: [],
});

// INTERNET CONN ATOM
export const internetConnAtom = atom({
  key: "internetConnAtom",
  default: true,
});

// NETWORK DATA ATOM
export const networkDataAtom = atom({
  key: "networkDataAtom",
  default: null,
});
