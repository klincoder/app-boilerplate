// Import resources
import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { useRecoilState, useSetRecoilState } from "recoil";
import NetInfo from "@react-native-community/netinfo";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import custom files
import AppNavigator from "../screens/AppNavigator";
import NoInternetScreen from "../screens/NoInternetScreen";
import useAppSettings from "../hooks/useAppSettings";
import { handleDayJsFormat } from "../config/functions";
import {
  internetConnAtom,
  appOnboardingAtom,
  networkDataAtom,
  userAtom,
  userSavedAtom,
} from "../recoil/atoms";
import {
  fireDB,
  doc,
  collection,
  getDoc,
  getDocs,
  fireAuth,
  onAuthStateChanged,
  onSnapshot,
  handleGetDoc,
  handleGetDocs,
  query,
  where,
  orderBy,
} from "../config/firebase";

// Ccomponent
const AppWrapper = () => {
  // Define app settings
  const { isMounted } = useAppSettings();

  // Define auth
  const [user, setUser] = useRecoilState(userAtom);
  const userID = user?.id;

  // Define fonts
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Light": require("../assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Thin": require("../assets/fonts/Montserrat-Thin.ttf"),
  });

  // Define state
  const [appIsReady, setAppIsReady] = useState(false); // Normal
  const [internetConn, setInternetConn] = useRecoilState(internetConnAtom); // Atoms
  const setNetworkDataAtom = useSetRecoilState(networkDataAtom);
  const setAppOnboardingAtom = useSetRecoilState(appOnboardingAtom);
  const setUserSavedAtom = useSetRecoilState(userSavedAtom);

  // Debug
  //console.log("Debug appWrapperTOP: ",);

  // SIDE EFFECTS
  // LISTEN TO AUTH STATE
  useEffect(() => {
    // On mount
    const unsubscribe = onAuthStateChanged(fireAuth, (currUser) => {
      // If currUser
      if (currUser?.emailVerified) {
        const getUserRef = doc(fireDB, "users", currUser?.uid);
        onSnapshot(getUserRef, (snapshot) => {
          // Define variables
          const dbUser = snapshot.data();
          const currUserObj = {
            id: currUser?.uid,
            email: currUser?.email,
            username: currUser?.displayName,
            emailVerified: currUser?.emailVerified,
            avatar: currUser?.photoURL,
            lastLogin: handleDayJsFormat(currUser?.metadata?.lastSignInTime, 2),
            fullName: dbUser?.full_name,
            role: dbUser?.role,
            phone: dbUser?.phone_number,
            pushStatus: dbUser?.push_status,
          };
          // Set user
          setUser(currUserObj);
        });
      } else {
        setUser(null);
        //console.log("Debug appWrapper 1: ", currUser);
      } // close if
    }); // close unsubscribe
    // Clean up
    return () => unsubscribe();
  }, [userID, setUser]);

  // SIDE EFFECTS
  // LISTEN TO NETWORK STATUS
  useEffect(() => {
    // Check network status
    const unsubscribe = NetInfo.addEventListener((state) => {
      // Define variables
      const status = state.isConnected && state.isInternetReachable;
      setInternetConn(status);
      setNetworkDataAtom(state);
      //console.log("Debug netInfoTEST 2: ", { status });
    }); // close unsubscribe
    // Clean up
    return () => unsubscribe();
  }, []);

  // SIDE EFFECTS
  // HANDLE SPLASH SCREEN DELAY
  useEffect(() => {
    // On mount
    isMounted.current = true;
    // If empty args, return
    if (!internetConn) return;
    // IIFE
    (async () => {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();

        // GET DATA
        // Get slides
        const slidesRef = doc(fireDB, "app_settings", "slides");
        const slidesData = await handleGetDoc(slidesRef);
        setAppOnboardingAtom(slidesData?.app_onboarding);

        // IF USERID
        if (userID) {
          // Get user saved
          const userSavedRef = query(
            collection(fireDB, "users", userID, "saved"),
            orderBy("date_created", "desc")
          );
          const userSavedData = await handleGetDocs(userSavedRef);
          setUserSavedAtom(userSavedData);
        } // close if
      } catch (err) {
        //console.log("Debug appWrapper: ", err.message);
      } finally {
        // Set appIsReady
        setAppIsReady(true);
      } // close try catch
    })(); // close fxn
    // Clean up
    return () => {
      isMounted.current = false;
    };
  }, [isMounted, internetConn]);

  // HIDE SPLASH SCREEN ON LAYOUT ROOT VIEW
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontsLoaded) {
      await SplashScreen.hideAsync();
    } // Clsoe if
  }, [appIsReady, fontsLoaded]);

  // If !appIsReady
  if (!appIsReady || !fontsLoaded) {
    return null;
  } // close if

  // Return component
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {internetConn ? <AppNavigator userID={userID} /> : <NoInternetScreen />}
    </View>
  ); // close return
}; // close component

// Export
export default AppWrapper;
