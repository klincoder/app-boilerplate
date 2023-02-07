// Import resources
import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import custom files
import CustomIcon from "../components/CustomIcon";
import CustomText from "../components/CustomText";
import HomeScreen from "../screens/HomeScreen";
import AccountNavigator from "./AccountNavigator";
import { tw } from "../config/data";

// Create bottom nav object
const Tab = createBottomTabNavigator();

// Component
const HomeNavigator = () => {
  // Define tabScreenList
  const tabScreenList = [
    {
      name: "HomeScreen",
      component: HomeScreen,
      iconType: "ionIcons",
      iconName: "home-outline",
      iconNameActive: "home",
      label: "Home",
    },
    {
      name: "AccountNavigator",
      component: AccountNavigator,
      iconType: "fontAwesome5",
      iconName: "user",
      iconNameActive: "user-alt",
      label: "Account",
    },
  ];

  // Return component
  // Screens for visible bottom tab
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false, // Header
        headerTitleStyle: tw`text-black font-medium`,
        tabBarStyle: tw`pb-1`, // Tab
        tabBarShowLabel: false,
      }}
    >
      {/** Loop tabScreenList */}
      {tabScreenList?.map((item, index) => (
        <Tab.Screen
          key={`tabs-${index + 1}`}
          name={item?.name}
          component={item?.component}
          options={{
            tabBarLabel: ({ focused, color, position }) => (
              <CustomText
                style={[
                  tw`text-xs font-regular`,
                  focused ? tw`text-primary` : `text-[${color}]`,
                ]}
              >
                {item?.label}
              </CustomText>
            ), // close label
            tabBarIcon: ({ focused, color, size }) => (
              <View>
                <CustomIcon
                  size={size}
                  type={item?.iconType}
                  name={focused ? item?.iconNameActive : item?.iconName}
                  style={[tw`mt-1`, focused ? tw`text-primary` : color]}
                />
                {item?.name === "CartScreen" && cartLen > 0 && (
                  <CustomBadge
                    title={cartLen}
                    styleContainer={tw`absolute z-10 -top-1 -right-2`}
                    styleText={tw`text-xs`}
                  />
                )}
              </View>
            ), // close icon
          }}
        />
      ))}
    </Tab.Navigator>
  ); // close return
}; // close component

// Export component
export default HomeNavigator;
