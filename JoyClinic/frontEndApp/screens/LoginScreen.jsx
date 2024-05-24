import React, { useState,useContext } from 'react';
import { StatusBar, Alert } from 'react-native'; 
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { EventRegister} from 'react-native-event-listeners'
import themeContext from "../themes/themeContext";

const Login = () => {
    
    const [email, setEmail] = useState('');
    const [psw , setPsw] = useState('');
    const navigation = useNavigation();
    //const ip = 'http://192.168.17.8:8000/login/';
    const phoneIP = 'http://192.168.1.33:8000/login/';
    const [id, setId] = useState(0)
    
    const handleLogin = async () => {
        if (email && psw) {
            try {
                const response = await fetch(phoneIP, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        psw: psw,
                    }),
                });
    
                if (response.ok) {
                    const data = await response.json();
                    const token = data.token;
    
                    await AsyncStorage.setItem("token", token);
                    
                    navigation.dispatch(
                        CommonActions.reset({
                          index: 0,
                          routes: [{ name: 'MenuInferior' }], 
                        })
                    );
                } else {
                    const errorMessage = await response.text();
                    Alert.alert(errorMessage.split(":")[1].split("\"")[1]);
                }
            } catch (error) {

                console.error('Error en el inicio de sesión:', error);
                Alert.alert('Error', 'Ha ocurrido un error en el inicio de sesión. Por favor, inténtalo de nuevo más tarde.');
            }
        }
    };

    const handleRegisterPress = () => {
        navigation.navigate('RegisterScreen');
    };

    const handleGuestPress = () => {
        navigation.navigate('MenuInferior')
    }

    const theme = useContext(themeContext)

    const [darkMode, setDarkMode] = useState(false)
    
    return (
        <SafeAreaView 
        style = {[styles.container, {backgroundColor:theme.background}]}>
            <View 
                style = {[styles.content, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                <Image
                    source={require('../assets/images/Logo/logoBlanco.png')}
                    style={styles.logo}
                    resizeMode='contain'/>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style = {styles.input}/>
                <TextInput
                    placeholder="Password"
                    value={psw}
                    onChangeText={text => setPsw(text)}
                    secureTextEntry={true}
                    style = {styles.input}/>
                
                <View style = {[styles.buttonContainer, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                    <TouchableOpacity 
                        style = {[styles.buttonLog, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]} 
                        onPress={handleLogin}>
                        <Text style = {[ {color:theme.color}]}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style = {[styles.buttonReg, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]} 
                        onPress={handleRegisterPress}>
                        <Text style = {[ {color:theme.color}]}>Register</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity 
                    style = {[styles.buttonGuest, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}
                    onPress={handleGuestPress}>
                    <Text style = {[ {color:theme.color}]}>Guest</Text>
                </TouchableOpacity>
                <StatusBar style="auto" />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center"
    },
    content: {
        flex: 1,
        alignItems: "center",
        paddingTop: 100,
    },
    title: {
        fontSize: 30,
        fontFamily: "System",
        color: "#fff",
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    buttonLog: {
        backgroundColor: '#d3d3d3',
        padding: 15,
        marginTop: 10,
        borderRadius: 15,
        width: 150, 
        alignItems: 'center',
        marginRight: 10,
        borderWidth: 1,
    },
    buttonReg: {
        backgroundColor: '#d3d3d3',
        padding: 15,
        marginTop: 10,
        borderRadius: 15,
        width: 150, 
        alignItems: 'center',
        borderWidth: 1,
    },
    buttonGuest: {
        backgroundColor: '#d3d3d3',
        padding: 15,
        marginTop: 10,
        borderRadius: 15,
        width: 310, 
        alignItems: 'center',
        top: 10, 
        borderWidth: 1,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fffafa',
        width: 310,
        borderRadius: 10,     
    },
});

Login.id = 0;

export default Login;
