import React, { useState, useEffect, useContext } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { useColorScheme, View, StyleSheet, Image, Text, Alert, Switch } from 'react-native';
import { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import MenuInferior from './screens/MenuInferior';
import Dispositivos from './screens/Dispositivos';
import LoadingInicial from './screens/LoadingInicial';
import Bienvenida from './screens/Bienvenida';
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Funny from './screens/Funny';
import SocialNetworks from './screens/SocialNetworks';
import EditProfile from './screens/EditProfile';
import Calendario from './screens/Calendario';
import { Foundation } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Contacts from './screens/Contacts';
import Profile from './screens/Profile';
import Settings from './screens/Settings';
import { SafeAreaView } from 'react-native-safe-area-context';
import Notifications from './screens/Notifications';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventRegister } from 'react-native-event-listeners';
import themeContext from './themes/themeContext';
import ProfileContext from './screens/ProfileContext'; 
import ProfileProvider from './screens/ProfileProvider';
import Chats from './screens/Chats';
import { useTranslation } from 'react-i18next';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator(); 

function DrawerNavigator({ darkMode, setDarkMode }) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(require('./assets/images/foto_perfil/default.jpg'));
  const { userData, fetchData,  } = useContext(ProfileContext);
  const [fetchError, setFetchError] = useState(false);  
  const [iconColor, setIconColor] = useState(darkMode ? 'white' : 'black');
 
  const phoneIP = `http://192.168.1.33:8000/profile/`; 
  //const ip = 'http://192.168.17.8:8000/profile/';

  useEffect(() => {
    fetchData();
  }, []);

  const theme = useContext(themeContext);

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={darkMode ? styles.containerDark : styles.container}> 
            <Image
              source={userData.photo ? { uri: 'http://192.168.1.33:8000/' + userData.photo } : profileImage}
              style={styles.profileImage}
            />
            <Text style={[styles.name, { color: darkMode ? 'white' : 'black' }]}>
              {fetchError ? t('Nombre completo') : `${userData.name} ${userData.surname}`}
            </Text>
            <Text style={[styles.text, { color: darkMode ? 'white' : 'black' }]}>
              {fetchError ? t('Biografía') : userData.bio}
            </Text>
          </View>
          <DrawerItemList {...props} />
          <View style={styles.modoOscuro}>  
            {darkMode ? (
              <FontAwesome name="moon-o" size={24} color="white"/>
            ) : (
              <Ionicons name="sunny" size={24} color="black" />
            )}
            <Text style={[styles.switchText, { color: darkMode ? 'white' : 'black' }]}>{t('Modo Oscuro')}</Text>
            <Switch
              value={darkMode}
              onValueChange={(value) => {
                setDarkMode(value);
                EventRegister.emit('ChangeTheme', value);
              }}
            />
          </View>
        </SafeAreaView>
      )}
    >
      <Drawer.Screen 
        name={t('home')}
        component={StackNavigator}
        options={{
          drawerIcon: () => (
            <Foundation
              style={[styles.iconSearch, {color: theme.color}]}
              name="home" 
              size={24} 
              color="black"/>
          )
        }}/>
      <Drawer.Screen 
        name={t('Calendario')}
        component={Calendario}
        options={{
          drawerIcon: () => (
            <FontAwesome 
              style={[styles.iconSearch, {color: theme.color}]}
              name="calendar" 
              size={20} 
              color={iconColor} />
          )
        }}/>
      <Drawer.Screen 
        name={t('Perfil')}
        component={Profile}
        options={{
          drawerIcon: () => (
            <Ionicons 
              style={[styles.iconSearch, {color: theme.color}]}
              name="person" 
              size={24} 
              color="black" />
          )
        }}/>
      <Drawer.Screen 
        name={t('Notificaciones')}
        component={Notifications}
        options={{
          drawerIcon: () => (
            <Ionicons 
              style={[styles.iconSearch, {color: theme.color}]}
              name="notifications-outline" 
              size={24} 
              color="black"
              resizeMode='contain'/>
          )
        }}/>
      <Drawer.Screen
        style={styles.settings}
        name={t('Configuración')}
        component={Settings}
        options={{
          drawerIcon: () => (
            <Ionicons 
              style={[styles.iconSearch, {color: theme.color}]}
              name="cog-outline" 
              size={24} 
              color={iconColor} />
          )
        }}>
      </Drawer.Screen>
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
          options={{ headerShown : false}}
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
          <Stack.Screen
            name="Contacts"
            component={Contacts}
            options={{ headerShown: false}}
          />
          <Stack.Screen
            name="Chats"
            component={Chats}
            options={{ headerShown: false}}
          />
        </Stack.Navigator>
    );
}
  
export default function Navigation() {
  const currentTheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(currentTheme === 'dark');

  return (
    <NavigationContainer theme={darkMode ? DarkTheme : DefaultTheme}> 
      <DrawerNavigator darkMode={darkMode} setDarkMode={setDarkMode}/> 
    </NavigationContainer>
  );
}
  
const styles = StyleSheet.create({
  container: {
    height: 200,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'column'
  },
  containerDark: {
    height: 200,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'column',
    backgroundColor: '#222',
  },
  profileImage: {
    borderRadius: 1000,
    width: 100,
    height: 100,
  },
  name: {
    top: 10,
    fontSize: 17,
    fontWeight: '500',
  },
  text: { 
    top: 15,
    fontWeight: '200',
  }, 
  modoOscuro: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    bottom: 30,
    right: 1,
    width: 285, 
    paddingHorizontal: 30,
    marginTop: 300,
  },
  switchText: {
    fontSize: 15,
    fontWeight: '100',
    marginLeft: 10, 
  },
  iconSearch: {
    marginHorizontal: 5,
  },
});
