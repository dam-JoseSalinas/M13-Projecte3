import React, {useState, useEffect}from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { useColorScheme, View, StyleSheet, Image, Text, TouchableOpacity, Alert } from 'react-native';
import { DrawerItemList, createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
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
import Eventos from './screens/Eventos';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(require('./assets/images/foto_perfil/default.jpg'));
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    bio: "",
    birth_date: new Date(), 
    city: "",
    country: "",
    photo: "",
  });

  const ip = 'http://10.0.2.2:8000/api/v1/registros/1/';
  const phoneIP = 'http://192.168.1.33:8000/api/v1/registros/1/';

  const fetchData = async () => {
    try {
      const response = await fetch(phoneIP || ip);
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        if (data.photo) {
          setProfileImage({ uri: data.photo });
        }
      } else {
        throw new Error('Error fetching user data');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Hubo un problema al obtener los datos del usuario.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Drawer.Navigator
      drawerContent={
        (props) => {
          return (
            <SafeAreaView>
              <View style={styles.container}> 
                <Image
                  source={userData.photo ? { uri: userData.photo } : profileImage}
                  style={styles.profileImage}/>
                  <Text style={styles.name}>
                    {userData.name} {userData.surname}
                  </Text>
                  <Text style={styles.text}>
                    {userData.bio}
                  </Text>
              </View> 
              <DrawerItemList {...props}/>
            </SafeAreaView>
          )
        }}>
      <Drawer.Screen 
        name="Home" 
        component={StackNavigator}
        options={{
          drawerIcon: () => (
            <Foundation 
              name="home" 
              size={24} 
              color="black"/>
          )
        }}/>
      <Drawer.Screen 
        name="Calendario" 
        component={Calendario}
        options={{
          drawerIcon: () => (
            <FontAwesome 
              name="calendar" 
              size={20} 
              color="black" />
          )
        }}/>
        <Drawer.Screen 
          name="Perfil"
          component={Profile}
          options={{
            drawerIcon: () => (
              <Ionicons 
                name="person" 
                size={24} 
                color="black" />
            )
          }}/>
          <Drawer.Screen 
            name="Notificaciones"
            component={Notifications}
            options={{
              drawerIcon: () => (
                <Ionicons 
                  name="notifications-outline" 
                  size={24} 
                  color="black"
                  resizeMode='contain'/>
              )
            }}/>
            <Drawer.Screen
            style={styles.settings}
            name="Configurarión"
            component={Settings}
            options={{
              drawerIcon: () => (
                <Ionicons 
                  name="cog-outline" 
                  size={24} 
                  color="black" />
              )
            }}/>
            <Drawer.Screen 
            name="Salir"
            component={LoginScreen}
            options={{
              drawerIcon: () => (
                <Ionicons 
                  name="exit-outline" 
                  size={24} 
                  color={"black"} />
              )
            }}/>
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
        <Stack.Screen
          name="Contacts"
          component={Contacts}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="Eventos"
          component={Eventos}
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
const styles = StyleSheet.create({
  container: {
    height: 200,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'column'
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
});