import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartScreen from "../Auth/StartScreen";
import SingIn from "../Auth/SingIn";
import VerifyEmail from "../Auth/VerifyEmail";
import Registration from "../Auth/Registration";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../Screens/profile/ProfileScreen";
import { StatusBar, TouchableOpacity } from "react-native";
import MyData from "../Screens/profile/MyData";
import ArrowLeft from "../assets/ArrowLeft";
import ChangeEmail from "../Screens/profile/ChangeEmail";
import HelpScreen from "../Screens/help/HelpScreen";
import ScanScreen from "../Screens/scan/ScanScreen";
import HistoryScreen from "../Screens/notices/HistoryScreen";
import DocsScreen from "../Screens/docs/DocsScreen";
import Help from "../assets/Help";
import BottomProfile from "../assets/BottomProfile";
import Bell from "../assets/Bell";
import Doc from "../assets/Doc";
import Scan from "../assets/Scan";
import DocDetail from "../Screens/docs/DocDetail";
import SettingScreen from "../Screens/profile/SettingScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const CustomHeaderLeft = ({ navigation }: any) => (
  <TouchableOpacity onPress={() => navigation.goBack()}>
    <ArrowLeft />
  </TouchableOpacity>
);

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name === "HelpScreen") {
            return focused ? <Help color="#76C0FA" /> : <Help color="#8A85CC" />;
          } else if (route.name === "MyProfile") {
            return focused ? <BottomProfile color="#76C0FA" /> : <BottomProfile color="#8A85CC" />;
          } else if (route.name === "Scan") {
            return <Scan />;
          } else if (route.name === "History") {
            return focused ? <Bell color="#76C0FA" /> : <Bell color="#8A85CC" />;
          } else if (route.name === "Docs") {
            return focused ? <Doc color="#76C0FA" /> : <Doc color="#8A85CC" />;
          }
        },
        tabBarStyle: {
          backgroundColor: "#2A2840",
          // borderRadius: 14,
          borderTopWidth: 0,
          elevation: 0
        },

        tabBarActiveTintColor: "#76C0FA",
        tabBarInactiveTintColor: "#8A85CC"

      })}
    >
      <Tab.Screen
        name="HelpScreen"
        component={HelpScreen}
        options={{
          tabBarLabel: "Help",
          headerTitle: "Frequently asked questions",
          headerStyle: {
            backgroundColor: "#000000"
          },
          headerTintColor: "#FFFFFF",
          headerShadowVisible: false
        }}
      />
      <Tab.Screen
        name="MyProfile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          headerTitle: "My profile",
          headerStyle: {
            backgroundColor: "#000000"
          },
          headerTintColor: "#FFFFFF",
          headerShadowVisible: false
        }}
      />
      <Tab.Screen
        name="Scan"
        component={ScanScreen}
        options={{
          tabBarLabel: "",
          headerStyle: {
            backgroundColor: "#000000"
          },
          headerTintColor: "#FFFFFF",
          headerShadowVisible: false
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarLabel: "History",
          headerTitle: "History",
          headerStyle: {
            backgroundColor: "#000000"
          },
          headerTintColor: "#FFFFFF",
          headerShadowVisible: false
        }}
      />
      <Tab.Screen
        name="Docs"
        component={DocsScreen}
        options={{
          tabBarLabel: "Docs",
          headerTitle: "My documents",
          headerStyle: {
            backgroundColor: "#000000"
          },
          headerTintColor: "#FFFFFF",
          headerShadowVisible: false
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#000" />
      <Stack.Navigator>
        <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SingIn" component={SingIn} options={{ headerShown: false }} />
        <Stack.Screen name="VerifyEmail" component={VerifyEmail} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Registration} options={{ headerShown: false }} />
        <Stack.Screen name="MainTabs" component={MainTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen
          name="MyData"
          component={MyData}
          options={({ navigation }) => ({
            headerTitle: "My data",
            headerLeft: () => <CustomHeaderLeft navigation={navigation} />,
            headerStyle: {
              backgroundColor: "#000000"
            },
            headerTintColor: "#FFFFFF",
            headerShadowVisible: false
          })}
        />
        <Stack.Screen
          name="ChangeEmail"
          component={ChangeEmail}
          options={({ navigation }) => ({
            headerTitle: "Change email",
            headerLeft: () => <CustomHeaderLeft navigation={navigation} />,
            headerStyle: {
              backgroundColor: "#000000"
            },
            headerTintColor: "#FFFFFF",
            headerShadowVisible: false
          })}
        />
        <Stack.Screen
          name="DocDetail"
          component={DocDetail}
          options={({ navigation }) => ({
            headerTitle: "My document",
            headerLeft: () => <CustomHeaderLeft navigation={navigation} />,
            headerStyle: {
              backgroundColor: "#000000"
            },
            headerTintColor: "#FFFFFF",
            headerShadowVisible: false
          })}
        />
        <Stack.Screen
          name="Settings"
          component={SettingScreen}
          options={({ navigation }) => ({
            headerTitle: "Settings",
            headerLeft: () => <CustomHeaderLeft navigation={navigation} />,
            headerStyle: {
              backgroundColor: "#000000"
            },
            headerTintColor: "#FFFFFF",
            headerShadowVisible: false
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
