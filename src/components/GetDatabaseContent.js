// Import resources
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

// Import custom files
import useAppSettings from "../hooks/useAppSettings";
import useAuthState from "../hooks/useAuthState";
import {
  allUsersAtom,
  userSavedAtom,
  appSettingsAtom,
  userOrdersAtom,
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
  const setUserSavedAtom = useSetRecoilState(userSavedAtom); // User
  const setUserOrdersAtom = useSetRecoilState(userOrdersAtom);
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

    // LISTEN TO APP SETTINGS
    const appSettingsRef = collection(fireDB, "app_settings");
    onSnapshot(appSettingsRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return doc.data();
      }); // close data
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

    // IF USERID
    if (userID) {
      // LISTEN TO USER SAVED
      const userSavedRef = query(
        collection(fireDB, "users", userID, "saved"),
        orderBy("date_created", "desc")
      );
      onSnapshot(userSavedRef, (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return doc.data();
        }); // close data
        setUserSavedAtom(data);
      });

      // LISTEN TO USER ORDERS
      const userOrdersRef = query(
        collection(fireDB, "users", userID, "orders"),
        orderBy("date_created", "desc")
      );
      onSnapshot(userOrdersRef, (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return doc.data();
        }); // close data
        setUserOrdersAtom(data);
      });
    } // close if

    // Clean up
    return () => {
      isMounted.current = false;
    };
  }, [
    isMounted,
    userID,
    setAllUsersAtom,
    setUserSavedAtom,
    setUserOrdersAtom,
    setAppSettingsAtom,
  ]);

  // Return component
  return null;
}; // close component

// Export
export default GetDatabaseContent;
