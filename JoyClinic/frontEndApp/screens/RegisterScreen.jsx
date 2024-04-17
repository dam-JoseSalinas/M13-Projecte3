import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Register() {
    const [username, setUsername] = useState('');
    const [userlastname, setUserLastname] = useState('')
    const [number, setNumber] = useState('')
    const [email, setEmail] = useState('')
    const [confirmEmail, setConfirEmail] = useState('')
    const [password, setPassword] = useState('');
    const [psw, setPsw] = useState('') 
    const navigation = useNavigation();
    /*
    const handleRegister = () => {
        if (username && password && userlastname && number && email && confirmEmail && psw) {
            navigation.navigate('MenuInferior');
        } else {
            Alert.alert('Error', 'Por favor, completa todos los campos');
        }
    };
    */
    const handleRegister = () => {
        if (username && password && userlastname && number && email && confirmEmail && psw) {
            fetch('http://10.0.2.2:8000/registro/api/v1/registros/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: username,
                    surname: userlastname,
                    number: number,
                    email: email,
                    email2: confirmEmail,
                    psw: password,
                    pwd2: psw,
                }),
            })
            .then(response => {
                if (response.ok) {
                    navigation.navigate('MenuInferior');
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
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>
                    Registro de usuarios
                </Text>
                <TextInput
                    placeholder='Nombre'
                    value={username}
                    onChangeText={text => setUsername(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Apellido'
                    value={userlastname}
                    onChangeText={text => setUserLastname(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Número'
                    value={number}
                    keyboardType='number-pad'
                    onChangeText={text => setNumber(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Confirmar Email'
                    value={confirmEmail}
                    onChangeText={text => setConfirEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Contraseña'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={true}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Confirmar Contraseña'
                    value={psw}
                    onChangeText={text => setPsw(text)}
                    secureTextEntry={true}
                    style={styles.input}
                />
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text>Register</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    content: {
        width: '90%', 
        paddingTop: 20,
    },
    title: {
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'System',
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
