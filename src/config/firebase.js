// Import resources
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

// Import custom files
import { isProdEnv } from "./data";
import {
  FIREBASE_DEV_API_KEY, // Dev
  FIREBASE_DEV_AUTH_DOMAIN,
  FIREBASE_DEV_PROJECT_ID,
  FIREBASE_DEV_STORAGE_BUCKET,
  FIREBASE_DEV_MESSAGING_SENDER_ID,
  FIREBASE_DEV_APP_ID,
  FIREBASE_DEV_MEASUREMENT_ID,
  FIREBASE_PROD_API_KEY, // Prod
  FIREBASE_PROD_AUTH_DOMAIN,
  FIREBASE_PROD_PROJECT_ID,
  FIREBASE_PROD_STORAGE_BUCKET,
  FIREBASE_PROD_MESSAGING_SENDER_ID,
  FIREBASE_PROD_APP_ID,
  FIREBASE_PROD_MEASUREMENT_ID,
} from "@env";

// VARIABLES
// DEV CONFIG
const devConfig = {
  apiKey: FIREBASE_DEV_API_KEY,
  authDomain: FIREBASE_DEV_AUTH_DOMAIN,
  projectId: FIREBASE_DEV_PROJECT_ID,
  storageBucket: FIREBASE_DEV_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_DEV_MESSAGING_SENDER_ID,
  appId: FIREBASE_DEV_APP_ID,
  measurementId: FIREBASE_DEV_MEASUREMENT_ID,
};

// PROD CONFIG
const prodConfig = {
  apiKey: FIREBASE_PROD_API_KEY,
  authDomain: FIREBASE_PROD_AUTH_DOMAIN,
  projectId: FIREBASE_PROD_PROJECT_ID,
  storageBucket: FIREBASE_PROD_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_PROD_MESSAGING_SENDER_ID,
  appId: FIREBASE_PROD_APP_ID,
  measurementId: FIREBASE_PROD_MEASUREMENT_ID,
};

// FINAL CONFIG
const finalConfig = isProdEnv ? prodConfig : devConfig;

// INITIALZE APP
// Check app initialzation
const app = getApps().length > 0 ? getApp() : initializeApp(finalConfig);

// Define firebase services
const fireDB = getFirestore(app);
const fireAuth = getAuth(app);
const fireStorage = getStorage(app);

// FUNCTIONS
// HANDLE GET DOCS
const handleGetDocs = async (docRef) => {
  // If empty args, return
  if (!docRef) return;
  const docSnap = await getDocs(docRef);
  const docData =
    docSnap.size > 0
      ? docSnap.docs.map((doc) => {
          return doc.data();
        })
      : [];
  return docData;
}; // close fxn

// HANDLE GET DOC
const handleGetDoc = async (docRef) => {
  // If empty args, return
  if (!docRef) return;
  const docSnap = await getDoc(docRef);
  const docData = docSnap.exists() ? docSnap.data() : null;
  return docData;
}; // close fxn

// Export
export {
  fireDB, // Services
  fireAuth,
  fireStorage,
  devConfig,
  prodConfig,
  finalConfig,
  onAuthStateChanged, // Auth
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset,
  applyActionCode,
  signOut,
  doc, // Database
  collection,
  collectionGroup,
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
  ref, // Storage
  uploadBytesResumable,
  getDownloadURL,
  handleGetDocs, // Functions
  handleGetDoc,
};
