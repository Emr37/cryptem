import { TabIcon } from "../constants/icons";
import OtherScreen from "../screens/Other";
import MainScreen from "../screens/Main";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dimensions } from "react-native";
import AllCoinsScreen from "../screens/AllCoins";
import WalletScreen from "../screens/Wallet";

const Tab = createBottomTabNavigator();

const { height } = Dimensions.get("window");

export const TabNav = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: true,

          tabBarStyle: {
            height: height / 12,
            backgroundColor: "#eee",
            position: "absolute",
          },
        }}
        initialRouteName="Anasayfa"
      >
        <Tab.Screen
          name="Kripto Borsası"
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
          }}
        />

        <Tab.Screen
          name="Cüzdan"
          component={WalletScreen}
          options={{
            tabBarIcon: ({ focused }) => <TabIcon color={"#cda540"} size={focused ? 48 : 32} name={focused ? "wallet" : "wallet-outline"} />,
          }}
        />
      </Tab.Navigator>
    </>
  );
};
