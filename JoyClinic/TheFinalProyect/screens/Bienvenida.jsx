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
                    onPress={redirectHome}>
                    <Text>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
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
    width: 100,
    height: 100,
  },
});
