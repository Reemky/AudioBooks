import React, { useState, useEffect, useContext } from "react";
import { EventRegister } from "react-native-event-listeners";
import themeContext from "./config/themeContext";
import theme from "./config/Themes";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Onboardingscreen from "./src/screens/OnboardingScreen";
import Loginscreen from "./src/screens/LoginScreen";
import Registerscreen from "./src/screens/RegisternScreen";
import Homescreen from "./src/screens/HomeScreen";
import Resetscreen from "./src/screens/ResetScreen";
import Buttonscreen from "./src/screens/ButtonScreen";
import Libraryscreen from "./src/screens/LibraryScreen";
import Playingscreen from "./src/screens/PlayingScreen";
import Explorescreen from "./src/screens/ExploreScreen";
import OTPscreen from "./src/screens/OTPScreen";
import OTPFinishscreen from "./src/screens/OTPScreenFinish";


import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function HomeTabs() {
  const theme = useContext(themeContext);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      // tabBarOptions={{ showLabel: false }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Library") {
            iconName = focused ? "ios-library" : "ios-library-outline";
          } else if (route.name === "Playing") {
            iconName = focused
              ? "ios-musical-notes"
              : "ios-musical-notes-outline";
          } else if (route.name === "Explore") {
            iconName = focused ? "ios-search" : "ios-search-outline";
          }

          let iconSize;
          iconSize = focused ? 26 : 22;

          return <Ionicons name={iconName} size={iconSize} color={color} />;
        },
        tabBarActiveTintColor: theme.txtColorPrimary,
        tabBarInactiveTintColor: "#bebebe",
        tabBarShowLabel: false,
        //Tab bar styles can be added here
        tabBarStyle: {
          borderRadius: 5,
          backgroundColor: theme.bgColor,
          height: 90,
          width: "100%",
          position: "absolute",
          paddingBottom: 15,
        },
        tabBarLabelStyle: { paddingBottom: 3 },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Homescreen}
        options={{ headerShown: false }}

      />

      <Tab.Screen
        name="Explore"
        component={Explorescreen}
        options={{ headerShown: false }}

      />
      <Tab.Screen
        name="Playing"
        component={Playingscreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Library"
        component={Libraryscreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
export default function App() {
  const [mode, setMode] = useState(false);
  useEffect(() => {
    let eventListener = EventRegister.addEventListener(
      "changeTheme",
      (data) => {
        setMode(data);
      }
    );
    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  });

  return (
    <themeContext.Provider value={mode === true ? theme.dark : theme.light}>
      <NavigationContainer>
        <Stack.Navigator
          headerMode="none"
          initialRouteName="Onboarding"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Loginscreen} />

          <Stack.Screen name="Onboarding" component={Onboardingscreen} />

          <Stack.Screen name="Register" component={Registerscreen} />

          <Stack.Screen name="Reset" component={Resetscreen} />

          <Stack.Screen
            name="Homepg"
            component={HomeTabs}
          />

          <Stack.Screen name="Playing" component={Playingscreen} />

          <Stack.Screen name="Library" component={Libraryscreen} />

          <Stack.Screen name="Explore" component={Explorescreen} />

          <Stack.Screen name="Button" component={Buttonscreen} />
          
          <Stack.Screen name="OTP" component={OTPscreen} />
          
          <Stack.Screen name="OTPFinish" component={OTPFinishscreen} />
        
        </Stack.Navigator>
      </NavigationContainer>
    </themeContext.Provider>
  );
}
