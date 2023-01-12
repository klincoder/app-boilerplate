// Import resources
import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { useRecoilState, useSetRecoilState } from "recoil";
import NetInfo from "@react-native-community/netinfo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

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
} from "../config/firebase";

// Ccomponent
const AppWrapper = () => {
  // Define user
  const [currSession, setCurrSession] = useRecoilState(userAtom);
  const userID = currSession?.id;

  // Define state
  const [appIsReady, setAppIsReady] = useState(false);
  const [internetConn, setInternetConn] = useRecoilState(internetConnAtom);
  const setNetworkDataAtom = useSetRecoilState(networkDataAtom);
  const setAppOnboardingAtom = useSetRecoilState(appOnboardingAtom);

  // Define app settings
  const { isMounted } = useAppSettings();

  // Debug
  //console.log("Debug appWrapper: ", userID);

  // FUNCTIONS
  // HANDLE GET CUSTOM FONTS
  const handleGetCustomFonts = async () => {
    await Font.loadAsync({
      // Load from a static resource
      "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
      "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
      "Montserrat-Light": require("../assets/fonts/Montserrat-Light.ttf"),
      "Montserrat-Thin": require("../assets/fonts/Montserrat-Thin.ttf"),
      "Lato-Regular": require("../assets/fonts/Lato-Regular.ttf"),
      "Lato-Bold": require("../assets/fonts/Lato-Bold.ttf"),
      "Lato-Light": require("../assets/fonts/Lato-Light.ttf"),
      "Lato-Thin": require("../assets/fonts/Lato-Thin.ttf"),
    }); // close loadSync
  }; // close fxn

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
          setCurrSession(currUserObj);
        });
      } else {
        setCurrSession(null);
        //console.log("Debug appWrapper 1: ", currUser);
      } // close if
    }); // close unsubscribe
    // Clean up
    return () => unsubscribe();
  }, [userID, setCurrSession]);

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
        // GET CUSTOM FONTS
        await handleGetCustomFonts();
        // GET APP ONBOARDING SLIDES
        const appOnboardingRef = doc(fireDB, "app_settings", "slides");
        const appOnboardingSnap = await getDoc(appOnboardingRef);
        const appOnboardingData = appOnboardingSnap.exists()
          ? appOnboardingSnap.data()
          : null;
        setAppOnboardingAtom(appOnboardingData);
      } catch (err) {
        //console.log("Debug appWrapper: ", err.message);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      } // close try catch
    })(); // close fxn
    // Clean up
    return () => {
      isMounted.current = false;
    };
  }, [isMounted, internetConn, userID]);

  // HIDE SPLASH SCREEN ON LAYOUT ROOT VIEW
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    } // Clsoe if
  }, [appIsReady]);

  // If !appIsReady
  if (!appIsReady) {
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
