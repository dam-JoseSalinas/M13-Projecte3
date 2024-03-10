import React from 'react';
import { StatusBar, Alert } from 'react-native'; 
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Inicio() {

  const navigation = useNavigation();

  const timer = setTimeout(() => {
    navigation.navigate('LoginScreen');
  }, 3000);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('/Users/Sebastian/Documents/DAM/M12-13/Proyecto final/M13_Projecte2/TheFinalProyect/Logo/logoNegro.png')}
          style={styles.logo}
          resizeMode='contain'
        />
        {/*<Text style={styles.title}>JoyClinic</Text>*/}
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
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
