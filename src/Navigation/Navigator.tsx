import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StartScreen from '../Auth/StartScreen';
import SingIn from '../Auth/SingIn';
import VerifyEmail from '../Auth/VerifyEmail';
import Registration from '../Auth/Registration';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from '../Screens/profile/ProfileScreen';
import {
  ActivityIndicator,
  Image,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import MyData from '../Screens/profile/MyData';
import ArrowLeft from '../assets/ArrowLeft';
import ChangeEmail from '../Screens/profile/ChangeEmail';
import HelpScreen from '../Screens/help/HelpScreen';
import ScanScreen from '../Screens/scan/ScanScreen';
import HistoryScreen from '../Screens/notices/HistoryScreen';
import DocsScreen from '../Screens/docs/DocsScreen';
import Help from '../assets/Help';
import BottomProfile from '../assets/BottomProfile';
import Bell from '../assets/Bell';
import Doc from '../assets/Doc';
import Scan from '../assets/Scan';
import DocDetail from '../Screens/docs/DocDetail';
import DocDetailScan from '../Screens/docs/DocDetailScan';
import SettingScreen from '../Screens/profile/SettingScreen';
import ChangePassword from '../Auth/ChangePassword';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../store/AuthContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const CustomHeaderLeft = ({navigation}: any) => (
  <TouchableOpacity onPress={() => navigation.goBack()}>
    <ArrowLeft />
  </TouchableOpacity>
);

const MainTabNavigator = () => {
  return (
    <View
      style={{
        backgroundColor: 'rgba(21, 20, 34, 1)',
        flex: 1,
      }}>
      <Tab.Navigator
        // tabBar={()=>(<View></View>)}
        // sceneContainerStyle={{
        //   backgroundColor: 'red',
        // }}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            let iconColor = focused ? '#76C0FA' : '#8A85CC';
            let iconComponent;
            if (route.name === 'HelpScreen') {
              iconComponent = <Help color={iconColor} />;
            } else if (route.name === 'MyProfile') {
              iconComponent = <BottomProfile color={iconColor} />;
            } else if (route.name === 'Scan') {
               // @ts-ignore
              iconComponent = <Scan color={iconColor} />;
            } else if (route.name === 'History') {
              iconComponent = <Bell color={iconColor} />;
            } else if (route.name === 'Docs') {
              iconComponent = <Doc color={iconColor} />;
            }

            return (
              <View style={{alignItems: 'center'}}>
                {iconComponent}
                {focused && route.name !== 'Scan' && (
                  <View
                    style={{
                      position: 'absolute',
                      width: 24,
                      borderBottomLeftRadius: 4,
                      borderBottomRightRadius: 4,
                      height: 2,
                      backgroundColor: '#76C0FA',
                      marginTop: -11,
                    }}
                  />
                )}
              </View>
            );
          },
          tabBarStyle: {
            backgroundColor: '#2A2840',
            height: 80,
            paddingBottom: 20,
            elevation: 0,
            // border: '1px solid red',
            // borderColor:  'red',
            borderWidth: 0.5,
            borderColor: 'rgba(138, 133, 204, 0.5)',
            width: '101%',
            marginLeft: -2,
            borderTopStartRadius: 20, // Увеличьте ширину линии, если таб активен
            borderTopEndRadius: 20,
            borderTopWidth: 1, // Увеличьте ширину линии, если таб активен
            // borderTopColor: '#76C0FA', // Выберите цвет линии
          },

          tabBarActiveTintColor: '#76C0FA',
          tabBarInactiveTintColor: '#8A85CC',
        })}>
        <Tab.Screen
          name="HelpScreen"
          component={HelpScreen}
          options={{
            headerTitleAlign: 'center',
            tabBarLabel: 'Help',
            headerTitle: 'Frequently asked questions',
            headerStyle: {
              backgroundColor: 'rgba(21, 20, 34, 1)',
            },
            headerTintColor: '#FFFFFF',
            headerShadowVisible: false,
          }}
        />
        <Tab.Screen
          name="MyProfile"
          component={ProfileScreen}
          options={{
            headerTitleAlign: 'center',
            tabBarLabel: 'Profile',
            headerTitle: 'My profile',
            headerStyle: {
              backgroundColor: 'rgba(21, 20, 34, 1)',
            },
            headerTintColor: '#FFFFFF',
            headerShadowVisible: false,
          }}
        />
        <Tab.Screen
          name="Scan"
          component={ScanScreen}
          options={{
            headerTitleAlign: 'center',
            tabBarLabel: '',
            headerStyle: {
              backgroundColor: 'rgba(21, 20, 34, 1)',
            },
            headerTintColor: '#FFFFFF',
            headerShadowVisible: false,
          }}
        />
        <Tab.Screen
          name="History"
          component={DocsScreen}
          options={{
            headerTitleAlign: 'center',
            tabBarLabel: 'History',
            headerTitle: 'History',
            headerStyle: {
              backgroundColor: 'rgba(21, 20, 34, 1)',
            },
            headerTintColor: '#FFFFFF',
            headerShadowVisible: false,
          }}
          listeners={({navigation}) => ({
            focus: () => {
              navigation.setParams({activeTab: 'history'});
            },
          })}
        />
        <Tab.Screen
          name="Docs"
          component={DocsScreen}
          listeners={({navigation}) => ({
            focus: () => {
              navigation.setParams({activeTab: 'docs'});
            },
          })}
          options={{
            headerTitleAlign: 'center',
            tabBarLabel: 'Docs',
            headerTitle: 'My documents',
            headerStyle: {
              backgroundColor: 'rgba(21, 20, 34, 1)',
            },
            headerTintColor: '#FFFFFF',
            headerShadowVisible: false,
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const AppNavigator = () => {
  //@ts-ignore
  const {token} = useAuth();
  console.log(token);

  const [loading, setLoading] = useState(true);
  const [initialRouteName, setInitialRouteName] = useState('Start'); // Default to 'Start'

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setInitialRouteName('MainTabs');
      } else {
        setInitialRouteName('Start');
      }
    };

    checkToken().finally(() => setLoading(false));
  }, []);

  return loading ? (
    <ActivityIndicator />
  ) : (
    <NavigationContainer>
      <StatusBar backgroundColor="rgba(21, 20, 34, 1)" />
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SingIn"
          component={SingIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Scan"
          component={ScanScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VerifyEmail"
          component={VerifyEmail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Registration}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MainTabs"
          component={MainTabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyData"
          component={MyData}
          options={({navigation}) => ({
            headerTitle: 'My data',
            headerLeft: () => <CustomHeaderLeft navigation={navigation} />,
            headerStyle: {
              backgroundColor: 'rgba(21, 20, 34, 1)',
            },
            headerTintColor: '#FFFFFF',
            headerShadowVisible: false,
          })}
        />
        <Stack.Screen
          name="ChangeEmail"
          component={ChangeEmail}
          options={({navigation}) => ({
            headerTitle: 'Change email',
            headerLeft: () => <CustomHeaderLeft navigation={navigation} />,
            headerStyle: {
              backgroundColor: 'rgba(21, 20, 34, 1)',
            },
            headerTintColor: '#FFFFFF',
            headerShadowVisible: false,
          })}
        />
        <Stack.Screen
          name="DocDetail"
          component={DocDetail}
          options={({navigation}) => ({
            headerTitle: 'My document',
            headerLeft: () => <CustomHeaderLeft navigation={navigation} />,
            headerStyle: {
              backgroundColor: 'rgba(21, 20, 34, 1)',
            },
            headerTintColor: '#FFFFFF',
            headerShadowVisible: false,
          })}
        />
        <Stack.Screen
          name="DocDetailScan"
          component={DocDetailScan}
          options={({navigation}) => ({
            headerTitle: 'My document',
            headerLeft: () => <CustomHeaderLeft navigation={navigation} />,
            headerStyle: {
              backgroundColor: 'rgba(21, 20, 34, 1)',
            },
            headerTintColor: '#FFFFFF',
            headerShadowVisible: false,
          })}
        />
        <Stack.Screen
          name="Settings"
          component={SettingScreen}
          options={({navigation}) => ({
            headerTitle: 'Settings',
            headerLeft: () => <CustomHeaderLeft navigation={navigation} />,
            headerStyle: {
              backgroundColor: 'rgba(21, 20, 34, 1)',
            },
            headerTintColor: '#FFFFFF',
            headerShadowVisible: false,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
