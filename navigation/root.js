import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TabNav } from "./TabNav";
import { StatusBar } from "expo-status-bar";
import DetailScreen from "../screens/Detail";
import RegisterScreen from "../screens/Register";
import SplashScreen from "../components/Splash";
import homeStore from "../store/homeStore";

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { fetchCoins, fetchBtcUsd } = homeStore();

  useEffect(() => {
    fetchCoins();
  }, []);

  useEffect(() => {
    fetchBtcUsd();
  }, []);

  useEffect(() => {
    console.log("setIsLoading");
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return (
      <>
        <StatusBar hidden />
        <SplashScreen />
      </>
    );
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: true,
            headerShadowVisible: false,
            headerStyle: { backgroundColor: "#eee" },
            headerTitleAlign: "center",
            title: "CRYPTEM",
            headerTintColor: "#cda540",
          }}
        >
          <Stack.Screen name="Cryptem" component={TabNav} />
          <Stack.Screen options={{ title: "Details" }} name="Detail" component={DetailScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default RootNavigation;
