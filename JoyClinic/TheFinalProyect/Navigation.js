import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { 
  NavigationContainer, 
  DefaultTheme,
  DarkTheme } from "@react-navigation/native";
import Bienvenida from './screens/Bienvenida';
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MenuInferior from './screens/MenuInferior';
import Funny from './screens/Funny';
import SocialNetworks from './screens/SocialNetworks';
import { useColorScheme } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoadingIncial from './screens/LoadingInicial';
import Profile from './screens/Contacts';


const Stack = createStackNavigator();

/*Componente secundario de navegación que deberia estar en carpeta components*/
export default function Navigation() {
  const currentTheme = useColorScheme();
  const theme = currentTheme === 'dark' ? DarkTheme : DefaultTheme;
  const DrawerLateralMenu = createDrawerNavigator();

  return (
    /*Duelve navegador entre componenetes*/
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        {/*LoadingInicial*/}
        <Stack.Screen
          name="LoadingInicial"
          component={LoadingIncial}
          options={{ headerShown: false }}/>
        {/*Bienvenida*/}
        <Stack.Screen
          name="Bienvenida"
          component={Bienvenida}
          options={{ headerShown: false }} />
        
        {/*login*/}
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }} />
        
        {/*register*/}
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }} 
        />

        {/*menu inferior*/}
        <Stack.Screen
          name="MenuInferior"
          component={MenuInferior}
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
        <Stack.Screen
          name="UserProfile"
          component={Profile}
          //options={{ headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
