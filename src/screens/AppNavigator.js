// Import resources
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Import custom files
import { globalScreenOptions } from "../config/data";
import OnboardingScreen from "../screens/OnboardingScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import PasswordRecoveryScreen from "../screens/PasswordRecoveryScreen";
import HomeNavigator from "../screens/HomeNavigator";
import MyProfileScreenEdit from "../screens/MyProfileScreenEdit";
import SupportScreen from "./SupportScreen";
import SettingsScreen from "./SettingsScreen";
import NotificationsScreen from "./NotificationsScreen";

// Create navigator
const Stack = createStackNavigator();

// Component
const AppNavigator = ({ userID }) => {
  // Define appStackList
  const appStackList = [
    {
      name: "HomeNavigator",
      component: HomeNavigator,
      options: { headerShown: false },
    },
    {
      name: "MyProfileScreenEdit",
      component: MyProfileScreenEdit,
      options: { headerTitle: "Edit Profile" },
    },
    {
      name: "SupportScreen",
      component: SupportScreen,
      options: { headerTitle: "Support" },
    },
    {
      name: "SettingsScreen",
      component: SettingsScreen,
      options: { headerTitle: "Settings" },
    },
    {
      name: "NotificationsScreen",
      component: NotificationsScreen,
      options: { headerTitle: "Notifications" },
    },
  ];

  // Define authStackList
  const authStackList = [
    {
      name: "OnboardingScreen",
      component: OnboardingScreen,
      options: { headerShown: false },
    },
    {
      name: "LoginScreen",
      component: LoginScreen,
      options: { headerShown: false },
    },
    {
      name: "RegisterScreen",
      component: RegisterScreen,
      options: { headerShown: false },
    },
    {
      name: "PasswordRecoveryScreen",
      component: PasswordRecoveryScreen,
      options: { headerShown: false },
    },
  ];

  // Debug
  //console.log("Debug appNavigator: ", );

  // Return component
  // Screens to hide bottom tab
  return (
    <Stack.Navigator
      initialRouteName="OnboardingScreen"
      screenOptions={globalScreenOptions}
    >
      <>
        {/** If userID */}
        {userID ? (
          <>
            {/** Loop appStackList */}
            {appStackList?.map((item, index) => (
              <Stack.Screen
                key={item?.name + index + 1}
                name={item?.name}
                component={item?.component}
                options={item?.options}
              />
            ))}
          </>
        ) : (
          <>
            {/** Loop authStackList */}
            {authStackList?.map((item, index) => (
              <Stack.Screen
                key={item?.name + index + 1}
                name={item?.name}
                component={item?.component}
                options={item?.options}
              />
            ))}
          </>
        )}
      </>
    </Stack.Navigator>
  ); // close return
}; // close component

// Export
export default AppNavigator;
