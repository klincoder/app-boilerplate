// Import resources
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

// Import custom files
import useAppSettings from "../hooks/useAppSettings";
import useAuthState from "../hooks/useAuthState";
import { handleFilterUserId } from "../config/functions";
import {
  appSettingsAtom,
  allUsersAtom,
  allSavedAtom,
  userSavedAtom,
} from "../recoil/atoms";
import {
  fireDB,
  doc,
  collection,
  getDoc,
  getDocs,
  where,
  query,
  orderBy,
  onSnapshot,
  collectionGroup,
} from "../config/firebase";

// Component
const GetDatabaseContent = () => {
  // Define auth context
  const { userID } = useAuthState();

  // Define app settings
  const { isMounted } = useAppSettings();

  // Define state
  const setAllUsersAtom = useSetRecoilState(allUsersAtom); // All
  const setAllSavedAtom = useSetRecoilState(allSavedAtom);
  const setUserSavedAtom = useSetRecoilState(userSavedAtom); // User
  const setAppSettingsAtom = useSetRecoilState(appSettingsAtom); // Others

  // SIDE EFFECTS
  // API CALLS
  // useEffect(() => {
  //   // On mount
  //   isMounted.current = true;
  //   // IIFE
  //   (async () => {
  //     // Debug
  //     //console.log("Debug getDatabaseContentAPI: ",);
  //   })(); // close fxn
  //   // Clean up
  //   return () => {isMounted.current = false};
  // }, []);

  // SIDE EFFECTS
  // LISTEN TO DATABASE
  useEffect(() => {
    // On mount
    isMounted.current = true;

    // LISTEN TO APP SETTINGS - GENERAL
    const appSettingsRef = doc(fireDB, "app_settings", "general_settings");
    onSnapshot(appSettingsRef, (snapshot) => {
      const data = snapshot.exists() ? snapshot.data() : "";
      setAppSettingsAtom(data);
    });

    // LISTEN TO ALL USERS
    const allUsersRef = collection(fireDB, "users");
    onSnapshot(allUsersRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return doc.data();
      }); // close data
      setAllUsersAtom(data);
    });

    // LISTEN TO ALL SAVED
    const allSavedRef = query(
      collectionGroup(fireDB, "saved"),
      orderBy("date_created", "desc")
    );
    onSnapshot(allSavedRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return doc.data();
      }); // close data
      const getUserInfo = handleFilterUserId(data, userID);
      setAllSavedAtom(data);
      setUserSavedAtom(getUserInfo);
    });

    // Clean up
    return () => {
      isMounted.current = false;
    };
  }, [
    isMounted,
    userID,
    setAllUsersAtom,
    setAllSavedAtom,
    setUserSavedAtom,
    setAppSettingsAtom,
  ]);

  // Return component
  return null;
}; // close component

// Export
export default GetDatabaseContent;
