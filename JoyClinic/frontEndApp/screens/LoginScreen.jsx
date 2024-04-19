import React, { useState } from 'react';
import { StatusBar, Alert } from 'react-native'; 
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 

const Tab = createBottomTabNavigator(); 

export default function Login() {

    const [email, setEmail] = useState('');
    const [psw , setPsw] = useState('');
    const navigation = useNavigation();
/*
    const handleLogin = () => {
        if (email && password) {
            navigation.navigate('MenuInferior');
        } else {
            Alert.alert('Error', 'Por favor, completa todos los campos');
        }
    };
*/
    const handleLogin = () =>{
        if (email && psw) {
            fetch('http:/10.0.2.2:8000/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    psw: psw,
                }),
            })
            .then(response => {
                if(response.ok) {
                    navigation.navigate('MenuInferior');
                } else {
                    response.text().then(errorMessage => {
                        Alert.alert(errorMessage)
                    })
                }
            })
        }
    }

    const handleRegisterPress = () => {
        navigation.navigate('RegisterScreen');
    };

    const handleGuestPress = () => {
        navigation.navigate('MenuInferior')
    }

    return (
        <SafeAreaView 
            style={styles.container}>
            <View 
                style={styles.content}>
                <Image
                    source={require('../assets/images/Logo/logoBlanco.png')}
                    style={styles.logo}
                    resizeMode='contain'/>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}/>
                <TextInput
                    placeholder="Password"
                    value={psw}
                    onChangeText={text => setPsw(text)}
                    secureTextEntry={true}
                    style={styles.input}/>
                
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.buttonLog} 
                        onPress={handleLogin}>
                        <Text>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.buttonReg} 
                        onPress={handleRegisterPress}>
                        <Text>Register</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.buttonGuest} onPress={handleGuestPress}>
                    <Text>Guest</Text>
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
