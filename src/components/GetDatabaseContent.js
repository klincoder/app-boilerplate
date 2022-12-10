// Import resources
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

// Import custom files
import useAppSettings from "../hooks/useAppSettings";
import { useAuthContext } from "../context/AuthContext";
import { appSettingsAtom, allUsersAtom } from "../recoil/atoms";
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
  const { userID } = useAuthContext();

  // Define app settings
  const { isMounted } = useAppSettings();

  // Define state
  const setAppSettingsAtom = useSetRecoilState(appSettingsAtom);
  const setAllUsersAtom = useSetRecoilState(allUsersAtom); // All

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
    const appSettingsRef = doc(fireDB, "appSettings", "generalSettings");
    onSnapshot(appSettingsRef, (snapshot) => {
      // Define data
      const data = snapshot.exists() ? snapshot.data() : "";
      // Set atom
      setAppSettingsAtom(data);
    });

    // LISTEN TO ALL USERS
    const allUsersRef = collection(fireDB, "users");
    onSnapshot(allUsersRef, (snapshot) => {
      // Define data
      const data = snapshot.docs.map((doc) => {
        return doc.data();
      });
      // Set atom
      setAllUsersAtom(data);
    });

    // Clean up
    return () => {
      isMounted.current = false;
    };
  }, [isMounted, userID, setAppSettingsAtom, setAllUsersAtom]);

  // Return component
  return null;
}; // close component

// Export
export default GetDatabaseContent;
