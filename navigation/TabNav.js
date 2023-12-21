import { TabIcon } from "../constants/icons";
import OtherScreen from "../screens/Other";
import MainScreen from "../screens/Main";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dimensions } from "react-native";
import AllCoinsScreen from "../screens/AllCoins";
import WalletScreen from "../screens/Wallet";
import LoginScreen from "../screens/Login";
import authStore from "../store/authStore";

const Tab = createBottomTabNavigator();

const { height } = Dimensions.get("window");

export const TabNav = () => {
  const { auth, user } = authStore();

  console.log("TabNav", auth);
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: {
            height: 32,
            borderLeftWidth: 2,
            borderBottomWidth: 2,
            borderTopWidth: 0.5,
            borderRightWidth: 0.5,
            borderColor: "#aaa",
            borderRadius: 25,
          },

          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 20, fontWeight: "600", color: "#cda540" },

          tabBarHideOnKeyboard: true,
          tabBarVisibilityAnimationConfig: "show",
          tabBarShowLabel: false,
          tabBarStyle: {
            height: height / 16,
            backgroundColor: "#eee",
            alignItems: "center",
          },
        }}
        initialRouteName="Anasayfa"
      >
        <Tab.Screen
          name="Map"
          component={AllCoinsScreen}
          options={{
            tabBarIcon: ({ focused }) => <TabIcon color={"#cda540"} size={focused ? 48 : 32} name={focused ? "list" : "list-outline"} />,
          }}
        />
        <Tab.Screen
          name="Anasayfa"
          component={MainScreen}
          options={{
            tabBarIcon: ({ focused }) => <TabIcon color={"#cda540"} size={focused ? 48 : 32} name={focused ? "home" : "home-outline"} />,

            title: "Popular",
          }}
        />

        {auth.currentUser ? (
          <Tab.Screen
            name="Wallet"
            component={WalletScreen}
            options={{
              tabBarIcon: ({ focused }) => <TabIcon color={"#cda540"} size={focused ? 48 : 32} name={focused ? "wallet" : "wallet-outline"} />,
            }}
          />
        ) : (
          <Tab.Screen
            name="Wallet"
            component={LoginScreen}
            options={{
              tabBarIcon: ({ focused }) => <TabIcon color={"#cda540"} size={focused ? 48 : 32} name={focused ? "wallet" : "wallet-outline"} />,
            }}
          />
        )}
      </Tab.Navigator>
    </>
  );
};
