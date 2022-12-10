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
import { useAuthContext } from "../context/AuthContext";
import { fireDB, doc, collection, getDoc, getDocs } from "../config/firebase";
import {
  internetConnAtom,
  appOnboardingAtom,
  networkDataAtom,
} from "../recoil/atoms";

// Ccomponent
const AppWrapper = () => {
  // Define auth context
  const { user } = useAuthContext();
  const userID = user?.id;

  // Define state
  const [appIsReady, setAppIsReady] = useState(false);
  const [internetConn, setInternetConn] = useRecoilState(internetConnAtom);
  const setNetworkDataAtom = useSetRecoilState(networkDataAtom);
  const setAppOnboardingAtom = useSetRecoilState(appOnboardingAtom);

  // Define app settings
  const { isMounted } = useAppSettings();

  // Debug
  //console.log("Debug appWrapper: ", { userID, appIsReady });

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
  // LISTEN TO NETWORK STATUS
  useEffect(() => {
    // Check network status
    const unsubscribe = NetInfo.addEventListener((state) => {
      // Define variables
      const status = state.isConnected && state.isInternetReachable;
      setInternetConn(status);
      setNetworkDataAtom(state);
      //console.log("Debug netInfoTEST 2: ", { status });
    });
    // Clean up
    return unsubscribe();
  }, []);

  // SIDE EFFECTS
  // LISTEN TO USER ID AND,
  // DELAY SPLASH SCREEN
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
        // Load custom fonts
        await handleGetCustomFonts();
        // Gt app onboarding
        const appOnboardingRef = collection(fireDB, "appOnboarding");
        const appOnboardingSnap = await getDocs(appOnboardingRef);
        const appOnboardingSize = appOnboardingSnap.size;
        const appOnboardingData =
          appOnboardingSize > 0
            ? appOnboardingSnap.docs.map((doc) => {
                return doc.data();
              })
            : [];
        // Set atom
        setAppOnboardingAtom(appOnboardingData);
      } catch (err) {
        console.log("Debug appWrapper: ", err.message);
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
