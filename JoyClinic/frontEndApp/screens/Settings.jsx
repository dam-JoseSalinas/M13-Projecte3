import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, Image, ScrollView, Switch, useColorScheme } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { EventRegister} from 'react-native-event-listeners'
import themeContext from "../themes/themeContext";
import { FontAwesome } from '@expo/vector-icons';

export default function Settings(){ 
    const [text, setText] = useState('')
    const navigation = useNavigation();
    const [userData, setUserData] = useState({
        name: "",
        surname: "",
        bio: "",
        birth_date: new Date(), 
        city: "",
        country: "",
        photo: "",
      });
      
    const dispotivos = () => {
        navigation.navigate('Dispositivos')
    }
    const editProfile = () => {
        navigation.navigate('EditProfile')
    }
    const logout = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            console.log('Token antes de eliminar:', token);

            await AsyncStorage.removeItem('token');
            console.log('Token eliminado:', token);

            setUserData({
                name: "",
                surname: "",
                bio: "",
                birth_date: new Date(), 
                city: "",
                country: "",
                photo: "",
            });
            
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'LoginScreen' }],
                })
            );
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        } 
    };    

    const theme = useContext(themeContext)

    const [darkMode, setDarkMode] = useState(false)

    return (
        <SafeAreaView style = {[styles.container, {backgroundColor:theme.background}]}>
            <ScrollView style = {[styles.ScrollView, {backgroundColor:theme.background}]}>
            <View style = {[styles.content, {backgroundColor:theme.background}]}>
                    <Text style = {[styles.settings, {color:theme.color}]}>Configuración</Text>
                    <Text style = {[styles.cuenta, {color:theme.color}]}>Cuenta</Text>
                    <View style = {[styles.configPerfil, {backgroundColor:theme.background}]}>
                        <Ionicons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="person-circle-outline" 
                            size={24} 
                            resizeMode='contain' />
                        <View style={[{ flex: 1 ,backgroundColor:theme.background }]}>
                            <Text style = {[styles.gestorCuenta, {color:theme.color}]}>Gestor de cuenta</Text>
                            <Text style = {[styles.texto, {color:theme.color}]}>Datos personales, contraseñas, seguridad...</Text>
                        </View>
                        <MaterialIcons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="navigate-next" 
                            size={24} 
                            onPress={editProfile} />
                    </View>
                    <Text style = {[styles.informacion, {color:theme.color}]}>Información</Text>
                    <View style = {[styles.configNoti, {backgroundColor:theme.background}]}>
                        <Ionicons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="notifications-outline" 
                            size={24} 
                            resizeMode='contain' />
                        <View style={{ flex: 1 ,backgroundColor:theme.background}}>
                            <Text style = {[styles.gestorCuenta, {color:theme.color}]}>Notificaciones</Text>
                            <Text style = {[styles.texto, {color:theme.color}]}>Configuración de Notificaciones</Text>
                        </View>
                        <MaterialIcons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="navigate-next" 
                            size={24} />
                    </View>
                    <View style = {[styles.configInfo, {backgroundColor:theme.background}]}>
                        <Feather 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="activity" 
                            size={24} />
                        <View style={{ flex: 1 ,backgroundColor:theme.background}}>
                            <Text style = {[styles.gestorCuenta, {color:theme.color}]}>Tu actividad</Text>
                            <Text style = {[styles.texto, {color:theme.color}]}>Configuración de Actividad</Text>
                        </View>
                        <MaterialIcons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="navigate-next" 
                            size={24} />
                    </View>
                    <View style = {[styles.configInfo, {backgroundColor:theme.background}]}>
                        <EvilIcons 
                            style={[styles.iconSearch, {color: theme.color}]}                       
                            name="archive" 
                            size={24} />
                        <View style={{ flex: 1 ,backgroundColor:theme.background}}>
                            <Text style = {[styles.gestorCuenta, {color:theme.color}]}>Archivos</Text>
                            <Text style = {[styles.texto, {color:theme.color}]}>Configuración de Archivos</Text>
                        </View>
                        <MaterialIcons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="navigate-next" 
                            size={24} />
                    </View>
                    <View style = {[styles.configInfo, {backgroundColor:theme.background}]}>
                        <Entypo 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="back-in-time" 
                            size={24} />
                        <View style={{ flex: 1 ,backgroundColor:theme.background}}>
                            <Text style = {[styles.gestorCuenta, {color:theme.color}]}>Tiempo Transcurrido</Text>
                            <Text style = {[styles.texto, {color:theme.color}]}>Gestor de Tiempo Transcurrido</Text>
                        </View>
                        <MaterialIcons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="navigate-next" 
                            size={24} />
                    </View>
                    <View style = {[styles.configInfo, {backgroundColor:theme.background}]}>
                        <MaterialIcons
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="security" 
                            size={24} />
                        <View style={{ flex: 1 ,backgroundColor:theme.background}}>
                            <Text style = {[styles.gestorCuenta, {color:theme.color}]}>Seguridad</Text>
                            <Text style = {[styles.texto, {color:theme.color}]}>Configuración de Seguridad</Text>
                        </View>
                        <MaterialIcons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="navigate-next" 
                            size={24} />
                    </View>
                    <View style = {[styles.configInfo, {backgroundColor:theme.background}]}>
                        <Ionicons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="lock-closed-outline" 
                            size={24} />
                        <View style={{ flex: 1 ,backgroundColor:theme.background}}>
                            <Text style = {[styles.gestorCuenta, {color:theme.color}]}>Privacidad</Text>
                            <Text style = {[styles.texto, {color:theme.color}]}>Configuración de Privacidad</Text>
                        </View>
                        <MaterialIcons
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="navigate-next" 
                            size={24} />
                    </View>
                    <View style = {[styles.configNoti, {backgroundColor:theme.background}]}>
                        <Ionicons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="language" 
                            size={24} />
                        <View style={{ flex: 1 ,backgroundColor:theme.background}}>
                            <Text style = {[styles.gestorCuenta, {color:theme.color}]}>Idioma</Text>
                            <Text style = {[styles.texto, {color:theme.color}]}>Configuración del Idioma</Text>
                        </View>
                        <MaterialIcons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="navigate-next" 
                            size={24} />
                    </View>
                    <View style = {[styles.configInfo, {backgroundColor:theme.background}]}>
                        <FontAwesome6 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="universal-access" 
                            size={24} />
                        <View style={{ flex: 1 ,backgroundColor:theme.background}}>
                            <Text style = {[styles.gestorCuenta, {color:theme.color}]}>Accesibilidad</Text>
                            <Text style = {[styles.texto, {color:theme.color}]}>Configuración de Accesibilidad</Text>
                        </View>
                        <MaterialIcons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="navigate-next" 
                            size={24} />
                    </View>
                    <View style = {[styles.configInfo, {backgroundColor:theme.background}]}>
                        <Ionicons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="color-palette-outline" 
                            size={24} />
                        <View style={{ flex: 1 ,backgroundColor:theme.background}}>
                            <Text style = {[styles.gestorCuenta, {color:theme.color}]}>Apariencia</Text>
                            <Text style = {[styles.texto, {color:theme.color}]}>Configuración de Tema</Text>
                        </View>
                        <MaterialIcons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="navigate-next" 
                            size={24} />
                    </View>
                    <View style = {[styles.configInfo, {backgroundColor:theme.background}]}>
                        <MaterialIcons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="devices" 
                            size={24} />
                        <View style={{ flex: 1 ,backgroundColor:theme.background}}>
                            <Text style = {[styles.gestorCuenta, {color:theme.color}]}>Dispositivos</Text>
                            <Text style = {[styles.texto, {color:theme.color}]}>Configuración de Dispositivos</Text>
                        </View>
                        <MaterialIcons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="navigate-next" 
                            size={24} 
                            onPress={dispotivos}/>
                    </View>
                    <View style = {[styles.configInfo, {backgroundColor:theme.background}]}>
                        <MaterialIcons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="keyboard-voice" 
                            size={24} />
                        <View style={{ flex: 1 ,backgroundColor:theme.background}}>
                            <Text style = {[styles.gestorCuenta, {color:theme.color}]}>Voz</Text>
                            <Text style = {[styles.texto, {color:theme.color}]}>Configuración de Voz</Text>
                        </View>
                        <MaterialIcons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="navigate-next" 
                            size={24} />
                    </View>
                    <View style = {[styles.configInfo, {backgroundColor:theme.background}]}>
                        <AntDesign 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="camerao" 
                            size={24} />
                        <View style={{ flex: 1 ,backgroundColor:theme.background}}>
                            <Text style = {[styles.gestorCuenta, {color:theme.color}]}>Video</Text>
                            <Text style = {[styles.texto, {color:theme.color}]}>Configuración de Video</Text>
                        </View>
                        <MaterialIcons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="navigate-next" 
                            size={24}  />
                    </View>
                    <Text style = {[styles.cuenta, {color:theme.color}]}>Cerrar Sesión</Text>
                    <View style = {[styles.configPerfil, {backgroundColor:theme.background}]}>
                        <Ionicons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="exit-outline" 
                            size={24} 
                            //onPress={exit} 
                            />
                        <View style={{ flex: 1 ,backgroundColor:theme.background}}>
                            <Text style = {[styles.gestorCuenta, {color:theme.color}]}>Salir</Text>
                            <Text style = {[styles.texto, {color:theme.color}]}>Cierra la cuenta del dispositivo actual</Text>
                        </View>
                        <MaterialIcons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="navigate-next" 
                            size={24}
                            onPress={logout} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingTop: 22,
    },
    settings:{
        marginHorizontal: 23,
        marginBottom: 10,
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
    },
    search: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: '#d3d3d3',
        padding: 6,
        borderRadius: 20,
        width: '90%',
        borderWidth: 1,
    },
    textInput: {
        flex: 1,
        alignItems: 'center',
        padding: 0,
    },
    iconSearch: {
        marginLeft: "auto",
    },
    cuenta:{
        marginHorizontal: 15,
        marginTop: 10,
        fontWeight: 'bold',
        color: '#333',
    },
    configPerfil: {
        flexDirection: 'row',
        backgroundColor: '#f8f8ff',
        padding: 10,
        marginTop: 5,
        width: '100%',
        alignSelf: "center",
    },
    configNoti: {
        flexDirection: 'row',
        backgroundColor: '#f8f8ff',
        padding: 10,
        marginTop: 5,
        width: '100%',
        alignSelf: "center",
    },
    configInfo: {
        flexDirection: 'row',
        backgroundColor: '#f8f8ff',
        padding: 10,
        width: '100%',
        alignSelf: "center",
    },
    gestorCuenta: {
        marginHorizontal: 5,
        fontWeight: '600',
        fontSize: 14,
    },
    texto: {
        fontSize: 12,
        fontWeight: '200', 
        marginHorizontal: 6,
    },
    informacion :{
        marginHorizontal: 15,
        marginTop: 9,
        fontWeight: 'bold',
        color: '#333',
    },
    viewDarkMode :{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    iconsDarkMode:{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 10,
    },
    textDark:{
        flex: 1,
        flexDirection: "column",
        fontWeight: '600',
    }
})
