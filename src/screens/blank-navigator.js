// Import resources
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Import screens or custom files
import HomeScreen from "./HomeScreen";
import { globalScreenOptions } from "../config/data";

// Create stack navigator object
const Stack = createStackNavigator();

// Component
const BlankNavigator = () => {
  // Define stackList
  const stackList = [
    {
      name: "HomeScreen",
      component: HomeScreen,
      options: { headerTitle: "Blank Navigator" },
    },
  ];

  // Return component
  return (
    <Stack.Navigator screenOptions={globalScreenOptions}>
      <>
        {/** Loop stackList */}
        {stackList?.map((item, index) => (
          <Stack.Screen
            key={item?.name + index + 1}
            name={item?.name}
            component={item?.component}
            options={item?.options}
          />
        ))}
      </>
    </Stack.Navigator>
  ); // close return
}; // close component

// Export
export default BlankNavigator;
