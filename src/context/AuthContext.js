// Import resources
import React, { createContext, useState, useEffect, useContext } from "react";
import { useRecoilValue } from "recoil";

// Import custom files
import routes from "../screens/routes";
import useAppSettings from "../hooks/useAppSettings";
import useCustomToastState from "../hooks/useCustomToastState";
import { alertMsg, appImages, baseUrl } from "../config/data";
import { allUsersAtom } from "../recoil/atoms";
import { handleDayJsFormat } from "../config/functions";
import {
  fireAuth,
  fireDB,
  createUserWithEmailAndPassword,
  doc,
  onAuthStateChanged,
  onSnapshot,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
  applyActionCode,
} from "../config/firebase";

// Create context
const AuthContext = createContext({});

// Create context hook
export const useAuthContext = () => useContext(AuthContext);

// Create context provider
export const AuthContextProvider = ({ children }) => {
  // Define state
  const allUsers = useRecoilValue(allUsersAtom);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Define app settings
  const { navigation } = useAppSettings();

  // Define toast
  const toast = useCustomToastState();

  // Define variables
  const userID = user?.id;
  const username = user?.username;
  const userAvatar = user?.avatar || appImages?.avatar;
  const userPushStatus = user?.pushStatus;
  const actionCodeSettings = {
    url: baseUrl,
  };

  // Debug
  //console.log("Debug authContext: ", user);

  // FUNCTONS
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
    );
  }; // close fxn

  // HANDLE LOGIN
  const handleLogin = async (email, pass) => {
    // If empty arg, return
    if (!email || !pass) return;
    return await signInWithEmailAndPassword(fireAuth, email, pass);
  }; // close fxn

  // HANDLE LOGOUT
  const handleLogout = async () => {
    // Set user
    setUser(null);
    await signOut(fireAuth);
    toast.success(alertMsg?.logoutSucc);
    navigation.replace(routes.ONBOARDING);
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
    );
  }; // close fxn

  // HANDLE VERIFY EMAIL
  const handleVerifyEmail = async (actionCode) => {
    // If empty args, return
    if (!actionCode) return;
    return await applyActionCode(fireAuth, actionCode);
  }; // close fxn

  // HANDLE IS SUPER ADMIN
  const handleIsSuperAdmin = (username) => {
    // If empty args, return
    if (!username) return;
    return username?.toLowerCase() === "klincoder";
  }; // close fxn

  // SIDE EFFECTS
  // LISTEN TO AUTH STATE
  useEffect(() => {
    // On mount
    const unsubscribe = onAuthStateChanged(fireAuth, (currUser) => {
      // If currUser
      if (currUser?.emailVerified) {
        const userInfoRef = doc(fireDB, "users", currUser?.uid);
        onSnapshot(userInfoRef, (snapshot) => {
          // Define variables
          const dbUser = snapshot.data();
          const currUserObj = {
            id: currUser?.uid,
            email: currUser?.email,
            username: currUser?.displayName,
            emailVerified: currUser?.emailVerified,
            avatar: currUser?.photoURL,
            lastLogin: handleDayJsFormat(currUser?.metadata?.lastSignInTime, 2),
            fullName: dbUser?.fullName,
            role: dbUser?.role,
            phone: dbUser?.phoneNumber,
            pushStatus: dbUser?.pushStatus,
          };
          // Set user
          setUser(currUserObj);
        });
      } else {
        setUser(null);
        //console.log("Debug authContextUser 3: ", currUser);
      } // close if
      // Set loading
      setLoading(false);
    });
    // Clean up
    return () => {
      unsubscribe();
    };
  }, []);

  // Return provider
  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        userID,
        username,
        userAvatar,
        userPushStatus,
        setUser,
        handleRegister,
        handleLogin,
        handleLogout,
        handleEmailExist,
        handleUsernameExist,
        handleIsSuperAdmin,
        handleSendEmailVerifyLink,
        handleSendPassResetLink,
        handleVerifyEmail,
      }}
    >
      {/** If loading */}
      {loading ? null : <>{children}</>}
    </AuthContext.Provider>
  ); // close return
}; // close provider

// Export
export default AuthContext;
