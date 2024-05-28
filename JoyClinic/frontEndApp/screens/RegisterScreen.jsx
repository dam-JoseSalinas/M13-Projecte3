import React, { useState,useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, Alert, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { EventRegister} from 'react-native-event-listeners'
import themeContext from "../themes/themeContext";
import { useTranslation } from 'react-i18next';

export default function Register() {
    const { t } = useTranslation();
    const [username, setUsername] = useState('');
    const [userlastname, setUserLastname] = useState('')
    const [number, setNumber] = useState('')
    const [email, setEmail] = useState('')
    const [psw, setPsw] = useState('') 
    const navigation = useNavigation();
    //const ip = 'http://192.168.17.8:8000/api/v1/registros/';
    const phoneIP = 'http://192.168.1.33:8000/api/v1/registros/';
    const handleRegister = () => {
        if (username && psw && userlastname && number && email) {
            fetch(phoneIP, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: username,
                    surname: userlastname,
                    number: number,
                    email: email,
                    psw: psw,

                }),
            })
            .then(response => {
                if (response.ok) {
                    Alert.alert("Creación de cuenta exitosa")
                    navigation.navigate('LoginScreen');
                } else {
                    // Si la respuesta no es exitosa, mostramos el mensaje del response
                    response.text().then(errorMessage => {
                        Alert.alert(errorMessage.split(":")[1].split("\"")[1]);
                    })
                }
            })
            .catch(error => {
                console.error('Error:', error);
                Alert.alert('Error', 'Hubo un problema durante el registro. Por favor, inténtalo de nuevo.');
            });
        } else {
            Alert.alert('Error', 'Por favor, completa todos los campos');
        }
    };

    const theme = useContext(themeContext)

    const [darkMode, setDarkMode] = useState(false)
    
    return (
        <SafeAreaView style = {[styles.container, {backgroundColor:theme.background}]}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style = {[styles.content, {backgroundColor:theme.background}]} contentContainerStyle={styles.scrollContent}>
                    <Text style = {[styles.title, {color:theme.color}]}>
                        Registro de usuarios
                    </Text>
                    <Image
                        source={require('../assets/images/Logo/logoBlanco.png')}
                        style={styles.logo}
                        resizeMode='contain'/>
                    <TextInput
                        placeholder={t('Nombre')}
                        value={username}
                        onChangeText={text => setUsername(text)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder={t('Apellido')}
                        value={userlastname}
                        onChangeText={text => setUserLastname(text)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder={t('Número')}
                        value={number}
                        keyboardType='number-pad'
                        onChangeText={text => setNumber(text)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder={t('Email')}
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.input}
                    />

                    <TextInput
                        placeholder={t('Contraseña')}
                        value={psw}
                        onChangeText={text => setPsw(text)}
                        secureTextEntry={true}
                        style={styles.input}
                    />
                    <TouchableOpacity style = {[styles.button, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]} onPress={handleRegister}>
                        <Text style = {[{color:theme.color}]}>{t('Register')}</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    logo: {
        alignSelf: 'center',
        width: 200,
        height: 200,
        marginBottom: 15,
    },
    content: {
        width: '90%', 
        paddingTop: 20,
    },
    title: {
        fontWeight: '200',
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'System',
        fontSize: 20,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'gray',
        backgroundColor: '#fffafa',
        marginBottom: 10,
        paddingLeft: 10,
    },
    button: {
        backgroundColor: '#d3d3d3', 
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 20,
        borderWidth: 1,
    },
});
