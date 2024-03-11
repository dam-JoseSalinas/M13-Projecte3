import React, { useState } from 'react';
import { StatusBar, Alert } from 'react-native'; 
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 

const Tab = createBottomTabNavigator(); 

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = () => {
        if (email && password) {
            navigation.navigate('TabGroup');
        } else {
            Alert.alert('Error', 'Por favor, completa todos los campos');
        }
    };

    const handleRegisterPress = () => {
        navigation.navigate('RegisterScreen');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Image
                    source={require('/Users/Sebastian/Documents/DAM/M12-13/Proyecto final/M13_Projecte2/TheFinalProyect/Logo/logoBlanco.png')}
                    style={styles.logo}
                    resizeMode='contain'
                />
                {/*<Text style={styles.title}>JoyClinic</Text>*/}
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={true}
                    style={styles.input}
                />
                <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
                    <Text>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonRegister} onPress={handleRegisterPress}>
                    <Text>Register</Text>
                </TouchableOpacity>
                <StatusBar style="auto" />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: "#000",
    },
    content: {
        flex: 1,
        alignItems: "center",
        //justifyContent: "center",
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
    buttonLogin: {
        backgroundColor: '#d3d3d3',
        padding: 15,
        //marginTop: 30,
        borderRadius: 15,
        width: 150, 
        alignItems: 'center', 
    },
    buttonRegister: {
        backgroundColor: '#d3d3d3',
        padding: 15,
        marginTop: 10,
        borderRadius: 15,
        width: 150, 
        alignItems: 'center', 
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fffafa',
        width: 150,
        borderRadius: 10,
        
    }
});
