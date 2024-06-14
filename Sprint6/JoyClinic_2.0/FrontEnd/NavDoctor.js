import React, { useState, useEffect, useContext } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme, DarkTheme, useNavigation } from "@react-navigation/native";
import { View, Image, Text, Switch } from 'react-native';
import { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { Foundation, FontAwesome, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EventRegister } from 'react-native-event-listeners';
import ProfileContext from './hooks/ProfileContext';
import styles from './assets/styles/navigationStyle';
import Calendario from './screens/profile/Calendario';
import Profile from './screens/profile/Profile';
import Notifications from './screens/profile/Notifications';
import Settings from './screens/settings/Settings';
import Bienvenida from './screens/welcome/Bienvenida';
import Login from './screens/welcome/Login';
import Register from './screens/welcome/Register';
import LoadingInicial from './screens/welcome/LoadingInicial';
import MenuInferior from './components/MenuInferior'
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import themeContext from './themes/themeContext'
import Funny from './screens/navigation/Funny'
import SocialNetworks from './screens/navigation/SocialNetworks';
import Dispositivos from './screens/navigation/Dispositivos';
import Chats from './screens/navigation/Chats'
import EditProfile from './screens/profile/EditProfile'
import config from './screens/settings/Config';
import MenuInferior2 from './components/MenuInferior2';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const getIconColor = (darkMode) => {
    return darkMode ? 'white' : 'black';
};

export default function Nav() {
    const currentTheme = useColorScheme();

    const [darkMode, setDarkMode] = useState(currentTheme === 'dark');

    const toggleColorScheme = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    useEffect(() => {
        EventRegister.addEventListener('ChangeTheme', toggleColorScheme);
        return () => {
            EventRegister.removeEventListener('ChangeTheme', toggleColorScheme);
        };
    }, []);

    return (
        <NavigationContainer theme={darkMode ? DarkTheme : DefaultTheme}>
            <DrawerNavigator darkMode={darkMode} />
        </NavigationContainer>
    );
}

function DrawerNavigator({ darkMode }) {
    
    const [user, setUser] = useState({});

    const theme = useContext(themeContext) 
    const { colorScheme, toggleColorScheme } = useColorScheme();
    const [profileImage, setProfileImage] = useState(require('./assets/images/foto_perfil/default.jpg'));
    const { userData, fetchData, fetchDoctor, userDoctor } = useContext(ProfileContext);
    const [fetchError, setFetchError] = useState(false);

    useEffect(() => {
        fetchData();
        fetchDoctor();
    }, []);

    const doctor = userDoctor.email.split('@')[1];

    if(doctor === 'joyclinc.es'){

        console.log(userData);

    }

    return (
        <Drawer.Navigator
            drawerContent={(props) => (
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={darkMode ? styles.containerDark : styles.container}>
                        <Text style={[styles.name, { color: theme.color }]}>
                            {fetchError ? 'Nombre completo' : `${userDoctor.name} ${userDoctor.surname}` }
                        </Text>
                        <Text style={[styles.text, { color: theme.color }]}>
                            {fetchError ? 'Biografía' : userDoctor.specialty}
                        </Text>
                    </View>
                    <DrawerItemList {...props} />
                    <View style={styles.modoOscuro}>
                        {darkMode ? (
                            <FontAwesome name="moon-o" size={24} color="white" />
                        ) : (
                            <Ionicons name="sunny" size={24} color="black" />
                        )}
                        <Text style={styles.switchText}>Modo Oscuro</Text>

                        <Switch
                            value={colorScheme == 'dark'}
                            onValueChange={(value) => {
                                toggleColorScheme();
                                EventRegister.emit('ChangeTheme', value);
                            }}
                        />
                    </View>
                </SafeAreaView>
            )}
        >
            <Drawer.Screen
                name="Home"
                component={StackNavigator}
                options={{
                    drawerIcon: () => (
                        <Foundation
                            style={styles.iconSearch}
                            name="home"
                            size={24}
                            color={getIconColor(darkMode)}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="Calendario"
                component={Calendario}
                options={{
                    drawerIcon: () => (
                        <FontAwesome
                            style={styles.iconSearch}
                            name="calendar"
                            size={20}
                            color={getIconColor(darkMode)}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="Perfil"
                component={Profile}
                options={{
                    drawerIcon: () => (
                        <Ionicons
                            style={styles.iconSearch}
                            name="person"
                            size={24}
                            color={getIconColor(darkMode)}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="Notificaciones"
                component={Notifications}
                options={{
                    drawerIcon: () => (
                        <Ionicons
                            style={styles.iconSearch}
                            name="notifications-outline"
                            size={24}
                            color={getIconColor(darkMode)}
                            resizeMode="contain"
                        />
                    ),
                }}
            />
            <Drawer.Screen
                style={styles.settings}
                name="Configuración"
                component={Settings}
                options={{
                    drawerIcon: () => (
                        <Ionicons
                            style={styles.iconSearch}
                            name="cog-outline"
                            size={24}
                            color={getIconColor(darkMode)}
                        />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}

function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="LoadingInicial"
                component={LoadingInicial}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Bienvenida"
                component={Bienvenida}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='MenuInferior'
                component={MenuInferior}
                options={{ headerShown: false}}
            />
            <Stack.Screen
                name='Funny'
                component={Funny}
                options={{ headerShown: false}}
            />
            <Stack.Screen
                name='SocialNetworks'
                component={SocialNetworks}
                options={{ headerShown: false}}
            />
            <Stack.Screen
                name="UserProfile"
                component={Profile}
                options={{ headerShown: false}}
            />
            <Stack.Screen
                name='EditProfile'
                component={EditProfile}
                options={{ headerShown: false}}
            />
            <Stack.Screen
                name='Dispositivos'
                component={Dispositivos}
                options={{ headerShown: false}}
            />
            <Stack.Screen
                name="Chats"
                component={Chats}
                options={{ headerShown: false}}
            />
            <Stack.Screen
                name='MenuInferior2'
                component={MenuInferior2}
                options={{ headerShown: false}}
            />
        </Stack.Navigator>
    );
}
