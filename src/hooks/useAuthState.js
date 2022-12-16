// Import resources
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

// Import custom files
import routes from "../screens/routes";
import useAppSettings from "./useAppSettings";
import useCustomToastState from "./useCustomToastState";
import { allUsersAtom, userAtom } from "../recoil/atoms";
import { alertMsg, appImages, baseUrl, currSymbol } from "../config/data";
import {
  handleFormatNumber,
  handleIsPositiveNum,
  handleSliceString,
} from "../config/functions";
import {
  createUserWithEmailAndPassword,
  fireAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "../config/firebase";

// Component
const useAuthState = () => {
  // Define state
  const [user, setUser] = useRecoilState(userAtom);
  const allUsers = useRecoilValue(allUsersAtom);

  // Define app settings
  const { navigation } = useAppSettings();

  // Define toast
  const toast = useCustomToastState();

  // Define variables
  const userID = user?.id;
  const username = user?.username;
  const userFullName = user?.fullName;
  const userEmail = user?.email;
  const userPhone = user?.phone;
  const usernameFormat = handleSliceString(username, 0, 12);
  const userAvatar = user?.avatar || appImages?.avatar;
  const userPushStatus = user?.pushStatus;
  const userWalletBal = user?.walletBal;
  const userWalletBalFormat = handleFormatNumber(userWalletBal);
  const isPositiveWallet = handleIsPositiveNum(userWalletBal);
  const walletBalFormat = `${currSymbol?.ng}${
    userWalletBal > 0 ? userWalletBalFormat : "0.00"
  }`;
  const userEarningsBal = 0;
  const userEarningsBalFormat = handleFormatNumber(userEarningsBal);
  const earningsBalFormat = `${currSymbol?.ng}${
    userEarningsBal > 0 ? userEarningsBalFormat : "0.00"
  }`;
  const actionCodeSettings = {
    url: baseUrl,
  };

  // Debug
  //console.log("Debug useAuthState: ", );

  // FUNCTIONS
  // HANDLE EMAIL EXIST
  const handleEmailExist = (emailAddr) => {
    // If empty args, return
    if (!emailAddr) return;
    // Filter emailAddr
    const filterEmailAddr = allUsers?.filter(
      (item) => item?.emailAddress === emailAddr
    );
    const isValid = filterEmailAddr?.length > 0;
    const data = filterEmailAddr[0];
    return { isValid, data };
  }; // close fxn

  // HANDLE USERNAME EXIST
  const handleUsernameExist = (username) => {
    // If empty args, return
    if (!username) return;
    // Filter username
    const filterUsername = allUsers?.filter(
      (item) => item?.username === username
    );
    const isValid = filterUsername?.length > 0;
    const data = filterUsername[0];
    return { isValid, data };
  }; // close fxn

  // HANDLE REGISTER
  const handleRegister = async (username, email, pass) => {
    // If empty arg, return
    if (!username || !email || !pass) return;
    return await createUserWithEmailAndPassword(fireAuth, email, pass).then(
      async (res) => {
        // Send verification link
        await sendEmailVerification(res.user, actionCodeSettings);
        await updateProfile(res.user, { displayName: username });
      }
    ); // close return
  }; // close fxn

  // HANDLE LOGIN
  const handleLogin = async (email, pass) => {
    // If empty arg, return
    if (!email || !pass) return;
    return await signInWithEmailAndPassword(fireAuth, email, pass);
  }; // close fxn

  // HANDLE LOGOUT
  const handleLogout = async () => {
    // Return await response
    return await signOut(fireAuth).then(() => {
      // Set user
      setUser(null);
      toast.success(alertMsg?.logoutSucc);
      navigation.replace(routes.ONBOARDING);
    }); // close return
  }; // close fxn

  // HANDLE SEND EMAIL VERIFY LINK
  const handleSendEmailVerifyLink = async (currUser) => {
    // If empty args, return
    if (!currUser) return;
    return await sendEmailVerification(currUser, actionCodeSettings);
  }; // close fxn

  // HANDLE SEND PASSWORD RESET LINK
  const handleSendPassResetLink = async (currUser, emailAddr) => {
    // If empty args, return
    if (!currUser || !emailAddr) return;
    return await sendPasswordResetEmail(
      currUser,
      emailAddr,
      actionCodeSettings
    ); // close return
  }; // close fxn

  // HANDLE IS SUPER ADMIN
  const handleIsSuperAdmin = (username) => {
    // If empty args, return
    if (!username) return;
    return username?.toLowerCase() === "klincoder";
  }; // close fxn

  // HANDLE VERIFY WALLET TRANSACTION
  const handleVerifyWalletTranx = (amt) => {
    // If empty args, return
    if (typeof amt !== "number") return;
    const isValidAmt = userWalletBal > amt ? true : false;
    const result = isPositiveWallet && isValidAmt ? true : false;
    return result;
  }; // close fxn

  // Return component
  return {
    userID,
    username,
    userFullName,
    userEmail,
    userPhone,
    usernameFormat,
    userAvatar,
    userPushStatus,
    userWalletBal,
    walletBalFormat,
    earningsBalFormat,
    setUser,
    handleRegister,
    handleLogin,
    handleLogout,
    handleEmailExist,
    handleUsernameExist,
    handleIsSuperAdmin,
    handleSendEmailVerifyLink,
    handleSendPassResetLink,
    handleVerifyWalletTranx,
  }; // close return
}; // close component

// Export
export default useAuthState;
