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

// ALL SAVED ATOM
export const allSavedAtom = atom({
  key: "allSavedAtom",
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

/**********************
  OTHERS
**********************/
// APP SETTINGS ATOM
export const appSettingsAtom = atom({
  key: "appSettingsAtom",
  default: null,
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
