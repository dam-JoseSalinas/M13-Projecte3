import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Login from './LoginScreen';

export default function Bienvenida() {

  const navigation = useNavigation();
  //navigation.navigate('LoginScreen');
  
  const redirectHome = () => {
    navigation.navigate('MenuInferior')
  }
  const redirectoLogin = () => {
    navigation.navigate('LoginScreen')
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
            <View>
                <TouchableOpacity
                    style={styles.buttonHome} 
                    onPress={redirectHome}>
                    <Text>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonLogin}
                    onPress={redirectoLogin}>
                    <Text>Login?</Text>
                </TouchableOpacity>
            </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  content: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
  },

  logo: {
    width: 200,
    height: 300,
  },
  buttonHome: {
    backgroundColor: '#d3d3d3',
    padding: 15,
    marginTop: 10,
    borderRadius: 15,
    width: 150,   
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
  },
  buttonLogin: {
    backgroundColor: '#d3d3d3',
    padding: 15,
    marginTop: 10,
    borderRadius: 15,
    width: 150,   
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
  }
});
