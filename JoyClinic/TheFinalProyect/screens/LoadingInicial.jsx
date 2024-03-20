import React from 'react';
import { StatusBar, Alert } from 'react-native'; 
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoadingIncial() {

  const navigation = useNavigation();
  /*const timer = setTimeout(
    () => {navigation.navigate('LoginScreen');},
    3000);*/
  setTimeout(
    () => {navigation.navigate('Bienvenida');},
    300)

  return (
    <SafeAreaView
      style={styles.container}>
      <View 
        style={styles.content}>
        <Image
          source={require('../Logo/logoBlanco.png')}
          style={styles.logo}
          resizeMode='contain'/>
        <StatusBar
          style="auto"
          animated={true}
          backgroundColor="#61dafb"/>
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
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
});
