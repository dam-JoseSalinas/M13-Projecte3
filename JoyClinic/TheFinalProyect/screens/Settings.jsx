import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default function Settings(){
    const [text, setText] = useState('')
    const navigation = useNavigation();
    const dispotivos = () => {
        navigation.navigate('Dispositivos')
    }
    const editProfile = () => {
        navigation.navigate('EditProfile')
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.content}>
                    <Text style={styles.settings}>Configuración</Text>
                    <View style={styles.search}>
                        <TextInput 
                            style={styles.textInput}
                            placeholder="Buscador"
                            onChangeText={newText => setText(newText)}
                            defaultValue={text}
                        />
                        <Ionicons 
                            style={styles.iconSearch}
                            name="search"
                            size={24}
                            color="black"/>
                    </View>
                    <Text style={styles.cuenta}>Cuenta</Text>
                    <View style={styles.configPerfil}>
                        <Ionicons 
                            name="person-circle-outline" 
                            size={24} 
                            color="black"
                            resizeMode='contain' />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.gestorCuenta}>Gestor de cuenta</Text>
                            <Text style={styles.texto}>Datos personales, contraseñas, seguridad...</Text>
                        </View>
                        <MaterialIcons 
                            name="navigate-next" 
                            size={24} 
                            color="black"
                            onPress={editProfile} />
                    </View>
                    <Text style={styles.informacion}>Información</Text>
                    <View style={styles.configNoti}>
                        <Ionicons 
                            name="notifications-outline" 
                            size={24} 
                            color="black"
                            resizeMode='contain' />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.gestorCuenta}>Notificaciones</Text>
                            <Text style={styles.texto}>Configuración de Notificaciones</Text>
                        </View>
                        <MaterialIcons 
                            name="navigate-next" 
                            size={24} 
                            color="black" />
                    </View>
                    <View style={styles.configInfo}>
                        <Feather 
                            name="activity" 
                            size={24} 
                            color="black" />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.gestorCuenta}>Tu actividad</Text>
                            <Text style={styles.texto}>Configuración de Actividad</Text>
                        </View>
                        <MaterialIcons 
                            name="navigate-next" 
                            size={24} 
                            color="black" />
                    </View>
                    <View style={styles.configInfo}>
                        <EvilIcons 
                            name="archive" 
                            size={24} 
                            color="black" />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.gestorCuenta}>Archivos</Text>
                            <Text style={styles.texto}>Configuración de Archivos</Text>
                        </View>
                        <MaterialIcons 
                            name="navigate-next" 
                            size={24} 
                            color="black" />
                    </View>
                    <View style={styles.configInfo}>
                        <Entypo 
                            name="back-in-time" 
                            size={24} 
                            color="black" />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.gestorCuenta}>Tiempo Transcurrido</Text>
                            <Text style={styles.texto}>Gestor de Tiempo Transcurrido</Text>
                        </View>
                        <MaterialIcons 
                            name="navigate-next" 
                            size={24} 
                            color="black" />
                    </View>
                    <View style={styles.configInfo}>
                        <MaterialIcons 
                            name="security" 
                            size={24} 
                            color="black" />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.gestorCuenta}>Seguridad</Text>
                            <Text style={styles.texto}>Configuración de Seguridad</Text>
                        </View>
                        <MaterialIcons 
                            name="navigate-next" 
                            size={24} 
                            color="black" />
                    </View>
                    <View style={styles.configInfo}>
                        <Ionicons 
                            name="lock-closed-outline" 
                            size={24} 
                            color="black" />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.gestorCuenta}>Privacidad</Text>
                            <Text style={styles.texto}>Configuración de Privacidad</Text>
                        </View>
                        <MaterialIcons 
                            name="navigate-next" 
                            size={24} 
                            color="black" />
                    </View>
                    <Text style={styles.informacion}>Ajustes de la aplicación</Text>
                    <View style={styles.configNoti}>
                        <Ionicons 
                            name="language" 
                            size={24} 
                            color="black" />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.gestorCuenta}>Idioma</Text>
                            <Text style={styles.texto}>Configuración del Idioma</Text>
                        </View>
                        <MaterialIcons 
                            name="navigate-next" 
                            size={24} 
                            color="black" />
                    </View>
                    <View style={styles.configInfo}>
                        <FontAwesome6 
                            name="universal-access" 
                            size={24} 
                            color="black" />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.gestorCuenta}>Accesibilidad</Text>
                            <Text style={styles.texto}>Configuración de Accesibilidad</Text>
                        </View>
                        <MaterialIcons 
                            name="navigate-next" 
                            size={24} 
                            color="black" />
                    </View>
                    <View style={styles.configInfo}>
                        <Ionicons 
                            name="color-palette-outline" 
                            size={24} 
                            color="black" />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.gestorCuenta}>Apariencia</Text>
                            <Text style={styles.texto}>Configuración de Tema</Text>
                        </View>
                        <MaterialIcons 
                            name="navigate-next" 
                            size={24} 
                            color="black" />
                    </View>
                    <View style={styles.configInfo}>
                        <MaterialIcons 
                            name="devices" 
                            size={24} 
                            color="black" />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.gestorCuenta}>Dispositivos</Text>
                            <Text style={styles.texto}>Configuración de Dispositivos</Text>
                        </View>
                        <MaterialIcons 
                            name="navigate-next" 
                            size={24} 
                            color="black" 
                            onPress={dispotivos}/>
                    </View>
                    <View style={styles.configInfo}>
                        <MaterialIcons 
                            name="keyboard-voice" 
                            size={24} 
                            color="black" />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.gestorCuenta}>Voz</Text>
                            <Text style={styles.texto}>Configuración de Voz</Text>
                        </View>
                        <MaterialIcons 
                            name="navigate-next" 
                            size={24} 
                            color="black" />
                    </View>
                    <View style={styles.configInfo}>
                        <AntDesign 
                            name="camerao" 
                            size={24} 
                            color="black" />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.gestorCuenta}>Video</Text>
                            <Text style={styles.texto}>Configuración de Video</Text>
                        </View>
                        <MaterialIcons 
                            name="navigate-next" 
                            size={24} 
                            color="black" />
                    </View>
                    <Text style={styles.cuenta}>Cerrar Sesión</Text>
                    <View style={styles.configPerfil}>
                        <Ionicons 
                            name="exit-outline" 
                            size={24} 
                            color="black" />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.gestorCuenta}>Salir</Text>
                            <Text style={styles.texto}>Cierra la cuenta del dispositivo actual</Text>
                        </View>
                        <MaterialIcons 
                            name="navigate-next" 
                            size={24} 
                            color="black" />
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
})
