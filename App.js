// Import resources
import React from "react";
import { LogBox } from "react-native";
import Toast from "react-native-toast-message";
import { NavigationContainer } from "@react-navigation/native";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "@rneui/themed";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

// Import custom files
import toastConfig from "./src/config/toastConfig";
import AppWrapper from "./src/components/AppWrapper";
import GetDatabaseContent from "./src/components/GetDatabaseContent";
import { AuthContextProvider } from "./src/context/AuthContext";
import { appTheme } from "./src/config/data";

// Component
const App = () => {
  // Hide Async storage
  LogBox.ignoreLogs([
    "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
    "Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android as it keeps the timer module awake, and timers can only be called when the app is in the foreground. See https://github.com/facebook/react-native/issues/12981 for more info.",
    "Duplicate atom key 'appSettingsAtom'. This is a FATAL ERROR in production. But it is safe to ignore this warning if it occurred because ofhot module replacement.",
  ]);

  // Debug
  //console.log("Debug app:", )

  // Return component
  return (
    <RecoilRoot>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider theme={appTheme}>
          <NavigationContainer>
            <AuthContextProvider>
              <BottomSheetModalProvider>
                {/** Status bar */}
                <StatusBar
                  style="light"
                  //barStyle={statusBg ? "light-content" : "dark-content"}
                  //backgroundColor={statusBg || appColors?.white}
                />

                {/** App wrapper */}
                <AppWrapper />

                {/** Get database content */}
                <GetDatabaseContent />

                {/** Toast notifications */}
                <Toast config={toastConfig} />
              </BottomSheetModalProvider>
            </AuthContextProvider>
          </NavigationContainer>
        </ThemeProvider>
      </GestureHandlerRootView>
    </RecoilRoot>
  ); // close return
}; // close component

// Export
export default App;
