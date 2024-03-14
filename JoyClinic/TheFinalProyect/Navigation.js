import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import Inicio from "./screens/Inicio";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import TabGroup from './screens/TabGroup';
import Funny from './screens/Funny';
import SocialNetworks from './screens/SocialNetworks';
import { useColorScheme } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createStackNavigator();

export default function Navigation() {
  const currentTheme = useColorScheme();
  const theme = currentTheme === 'dark' ? DarkTheme : DefaultTheme;
  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Inicio"
          component={Inicio}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="TabGroup"
          component={TabGroup}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Funny"
          component={Funny}
          //options={{ headerShown: false}}
        />
        <Stack.Screen
          name="SocialNetworks"
          component={SocialNetworks}
          //options={{ headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
