// Import resources
import { useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

// Import custom files
import routes from "../screens/routes";
import useAppSettings from "./useAppSettings";
import useAlertState from "./useAlertState";
import { allUsersAtom, userAtom } from "../recoil/atoms";
import { alertMsg, apiRoutes, appImages, baseUrl } from "../config/data";
import {
  handleFireAdminAction,
  handleSendEmail,
  handleSliceString,
} from "../config/functions";
import {
  createUserWithEmailAndPassword,
  fireAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "../config/firebase";

// Component
const useAuthState = () => {
  // Define state
  const [currSession, setCurrSession] = useRecoilState(userAtom);
  const allUsers = useRecoilValue(allUsersAtom);

  // Define app settings
  const { navigation } = useAppSettings();

  // Define alert
  const alert = useAlertState();

  // Define variables
  const userID = currSession?.id;
  const user = {
    id: currSession?.id,
    name: currSession?.fullName,
    username: currSession?.username,
    email: currSession?.email,
    phone: currSession?.phone,
    avatar: currSession?.avatar || appImages?.avatar,
    pushStatus: currSession?.pushStatus,
    usernameFormat: handleSliceString(currSession?.username, 0, 12),
  };

  // Debug
  //console.log("Debug useAuthState: ", allUsers?.length);

  // FUNCTIONS
  // HANDLE USER EXIST
  const handleUserExist = (val) => {
    // If empty args, return
    if (!val) return;
    // Filter users
    const filterData = allUsers?.filter(
      (i) => i?.email_address === val || i?.username === val
    );
    const isValid = filterData?.length > 0;
    const data = filterData?.[0];
    return { isValid, data };
  }; // close fxn

  // HANDLE SEND VERIFY EMAIL LINK
  const handleSendVerifyEmailLink = async (username, email) => {
    // If empty arg, return
    if (!username || !email) return;
    const verifyLink = await handleFireAdminAction(email, "verify-email");
    const emailMsg = { toName: username, toEmail: email, link: verifyLink };
    return await handleSendEmail(emailMsg, apiRoutes?.verifyEmail);
  }; // close fxn

  // HANDLE SEND PASSWORD RESET LINK
  const handleSendPasswordResetLink = async (username, email) => {
    // If empty args, return
    if (!username || !email) return;
    // Send password reset email
    const verifyLink = await handleFireAdminAction(email, "pass-reset");
    const emailMsg = { toName: username, toEmail: email, link: verifyLink };
    return await handleSendEmail(emailMsg, apiRoutes?.passRecovery);
  }; // close fxn

  // HANDLE LOGIN
  const handleLogin = async (email, pass) => {
    // If empty arg, return
    if (!email || !pass) return;
    return await signInWithEmailAndPassword(fireAuth, email, pass);
  }; // close fxn

  // HANDLE REGISTER
  const handleRegister = async (username, email, pass) => {
    // If empty arg, return
    if (!username || !email || !pass) return;
    return await createUserWithEmailAndPassword(fireAuth, email, pass).then(
      async (res) => {
        // Send verify pass email
        await handleSendVerifyEmailLink(username, email);
        await updateProfile(res.user, { displayName: username });
      }
    ); // close return
  }; // close fxn

  // HANDLE LOGOUT
  const handleLogout = async () => {
    // Return await response
    return await signOut(fireAuth).then(() => {
      setCurrSession(null);
      alert.success(alertMsg?.logoutSucc);
      navigation.replace(routes.ONBOARDING);
    }); // close return
  }; // close fxn

  // Return component
  return {
    user,
    userID,
    setCurrSession,
    handleUserExist,
    handleSendVerifyEmailLink,
    handleSendPasswordResetLink,
    handleLogin,
    handleRegister,
    handleLogout,
  }; // close return
}; // close component

// Export
export default useAuthState;
