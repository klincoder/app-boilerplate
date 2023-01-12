// Import resources
import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import tw from "twrnc";

// Import custom files
import twStyles from "../config/twStyles";
import CustomIcon from "../components/CustomIcon";
import CustomText from "../components/CustomText";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "./SearchScreen";
import CartScreen from "./CartScreen";
import SavedScreen from "./SavedScreen";
import AccountScreen from "./AccountScreen";
import { appColors, appFonts } from "../config/data";

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
      name: "SearchScreen",
      component: SearchScreen,
      iconType: "feather",
      iconName: "search",
      iconNameActive: "search",
      label: "Search",
    },
    {
      name: "CartScreen",
      component: CartScreen,
      iconType: "materialCommunityIcons",
      iconName: "cart-outline",
      iconNameActive: "cart",
      label: "Cart",
    },
    {
      name: "SavedScreen",
      component: SavedScreen,
      iconType: "ionIcons",
      iconName: "bookmark-outline",
      iconNameActive: "bookmark",
      label: "Saved",
    },
    {
      name: "AccountScreen",
      component: AccountScreen,
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
        headerTitleStyle: { color: "black", fontFamily: appFonts?.medium },
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
                  tw`text-xs`,
                  twStyles?.fontRegular,
                  focused
                    ? tw`text-[${appColors?.primary}]`
                    : `text-[${color}]`,
                ]}
              >
                {item?.label}
              </CustomText>
            ),
            tabBarIcon: ({ focused, color, size }) => (
              <CustomIcon
                size={size}
                type={item?.iconType}
                name={focused ? item?.iconNameActive : item?.iconName}
                color={focused ? appColors?.primary : color}
                style={tw`mt-1`}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  ); // close return
}; // close component

// Export component
export default HomeNavigator;
