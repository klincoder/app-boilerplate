// Import resources
import Constants from "expo-constants";
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset,
  applyActionCode,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  collectionGroup,
  doc,
  onSnapshot,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  increment,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

// VARIABLES
// DEV CONFIG
const devConfig = {
  apiKey: Constants.manifest?.extra?.fireDevApiKey,
  authDomain: Constants.manifest?.extra?.fireDevAuthDomain,
  projectId: Constants.manifest?.extra?.fireDevProjectId,
  storageBucket: Constants.manifest?.extra?.fireDevStorageBucket,
  messagingSenderId: Constants.manifest?.extra?.fireDevMsgSenderId,
  appId: Constants.manifest?.extra?.fireDevAppId,
};

// PROD CONFIG
const prodConfig = {
  apiKey: Constants.manifest?.extra?.fireDevApiKey,
  authDomain: Constants.manifest?.extra?.fireDevAuthDomain,
  projectId: Constants.manifest?.extra?.fireDevProjectId,
  storageBucket: Constants.manifest?.extra?.fireDevStorageBucket,
  messagingSenderId: Constants.manifest?.extra?.fireDevMsgSenderId,
  appId: Constants.manifest?.extra?.fireDevAppId,
};

// INITIALZE APP
// Check app initialzation
const app = getApps().length > 0 ? getApp() : initializeApp(devConfig);

// Define firebase services
const fireDB = getFirestore(app);
const fireAuth = getAuth(app);
const fireStorage = getStorage(app);

// Export
export {
  fireDB,
  fireAuth,
  fireStorage,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset,
  applyActionCode,
  signOut,
  collection,
  collectionGroup,
  doc,
  onSnapshot,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  increment,
  arrayUnion,
  serverTimestamp,
  ref,
  uploadBytesResumable,
  getDownloadURL,
};
