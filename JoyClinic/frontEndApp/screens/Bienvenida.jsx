import React, { useState, useEffect,useContext } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Login from './LoginScreen';
import { EventRegister} from 'react-native-event-listeners'
import themeContext from "../themes/themeContext";
import { useTranslation } from 'react-i18next';

export default function Bienvenida() {

  const navigation = useNavigation();
  //navigation.navigate('LoginScreen');
  
  const redirectHome = () => {
    navigation.navigate('MenuInferior')
  }
  const redirectoLogin = () => {
    navigation.navigate('LoginScreen')
  }

  const theme = useContext(themeContext)

  const [darkMode, setDarkMode] = useState(false)

  const { t } = useTranslation();

  return (
    <SafeAreaView
    style = {[styles.container, {backgroundColor:theme.background}]}>
      <View 
        style = {[styles.content, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
        <Image
            source={require('../assets/images/Logo/logoBlanco.png')}
            style={styles.logo}
            resizeMode='contain'/>
            <View>
                <TouchableOpacity
                    style = {[styles.buttonHome, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}
                    onPress={redirectHome}>
                    <Text style = {[{color:theme.color}]}>{t('home')}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style = {[styles.buttonLogin, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}
                    onPress={redirectoLogin}>
                    <Text style = {[{color:theme.color}]}>{t('Login?')}</Text>
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
