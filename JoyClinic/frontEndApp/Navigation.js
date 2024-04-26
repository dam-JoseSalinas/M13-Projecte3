import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { useColorScheme } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MenuInferior from './screens/MenuInferior';
import Dispositivos from './screens/Dispositivos';
import LoadingInicial from './screens/LoadingInicial';
import Bienvenida from './screens/Bienvenida';
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Funny from './screens/Funny';
import SocialNetworks from './screens/SocialNetworks';
import Profile from './screens/Contacts';
import EditProfile from './screens/EditProfile';
import Calendario from './screens/Calendario';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={StackNavigator} />
      <Drawer.Screen name="Calendario" component={Calendario}/>
    </Drawer.Navigator>
  );
}

function StackNavigator() {
  return (
    <Stack.Navigator>
        {/*LoadingInicial*/}
        <Stack.Screen
          name="LoadingInicial"
          component={LoadingInicial}
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
          options={{ headerShown: false }} />
        <Stack.Screen
          name="Funny"
          component={Funny}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="SocialNetworks"
          component={SocialNetworks}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="UserProfile"
          component={Profile}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="Dispositivos"
          component={Dispositivos}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ headerShown: false}}
        />
      </Stack.Navigator>
  );
}

export default function Navigation() {
  const currentTheme = useColorScheme();
  const theme = currentTheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={theme}>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
