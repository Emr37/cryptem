import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TabNav } from "./TabNav";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: true,
            headerShadowVisible: true,
            headerStyle: { backgroundColor: "#eee" },
            headerTitleAlign: "center",
            title: "CRYPTEM",
            headerTintColor: "#cda540",
          }}
        >
          <Stack.Screen name="Cryptem" component={TabNav} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default RootNavigation;
