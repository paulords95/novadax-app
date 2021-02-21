import React from "react";
import { Image, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Landing from "../pages/Landing";
import Wallet from "../pages/Wallet";
import KeyPage from "../pages/KeyPage";

import homeBtn from "../../assets/home-btn.png";
import walletBtn from "../../assets/wallet-btn.png";
import keyBtn from "../../assets/key-btn.png";

function HomeScreen() {
  return <Landing />;
}

function WalletScreen() {
  return <Wallet />;
}

const KeyScreen = () => {
  return <KeyPage />;
};

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused;
              return (
                <View
                  style={{
                    backgroundColor: focused ? "#4C66AB" : "transparent",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: "37%",
                    paddingVertical: 35,
                    marginTop: 15,
                    borderTopLeftRadius: 5,
                    borderRadius: 5,
                    marginLeft: 2,
                  }}
                >
                  <Image source={homeBtn} style={{ width: 30, height: 30 }} />
                </View>
              );
            } else if (route.name === "Wallet") {
              iconName = focused;
              return (
                <View
                  style={{
                    backgroundColor: focused ? "#4C66AB" : "transparent",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: "37%",
                    paddingVertical: 35,
                    borderRadius: 5,
                    marginTop: 15,
                  }}
                >
                  <Image source={walletBtn} style={{ width: 30, height: 30 }} />
                </View>
              );
            } else if (route.name === "Keys") {
              iconName = focused;
              return (
                <View
                  style={{
                    backgroundColor: focused ? "#4C66AB" : "transparent",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: "37%",
                    paddingVertical: 35,
                    marginTop: 15,
                    borderRadius: 5,
                    marginRight: 2,
                  }}
                >
                  <Image source={keyBtn} style={{ width: 30, height: 30 }} />
                </View>
              );
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: "transparent",
          inactiveTintColor: "transparent",
          style: {
            height: 70,
            backgroundColor: "#743095",
            borderColor: "#743095",
            bottom: 5,
          },
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Wallet" component={WalletScreen} />
        <Tab.Screen name="Keys" component={KeyScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
