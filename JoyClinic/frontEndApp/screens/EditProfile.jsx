import React, { useState, useEffect,useContext } from "react";
import { StyleSheet, Text, View, SafeAreaView, Alert, TouchableOpacity, TextInput, Image, ScrollView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'; 
import { EventRegister} from 'react-native-event-listeners'
import themeContext from "../themes/themeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from 'react-i18next';

export default function EditProfile() {
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    number: "",
    email: "",
    psw: "",
    bio: "",
    birth_date: new Date(), 
    address: "",
    city: "",
    country: "",
    postal_code: "",
    photo: "",
  });

  const [profileImage, setProfileImage] = useState(require('../assets/images/foto_perfil/sebas2.jpg'));

  const navigation = useNavigation();
  const phoneIP = 'http://192.168.1.33:8000/api/v1/registros/1/';
  //const ip = 'http://192.168.17.8:8000/api/v1/registros/';

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      if(!token) {
        throw new Error('El token no está disponible');
      }
    
      const response = await fetch(phoneIP, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

        if (response.ok) {
          const data = await response.json();

          setUserData(data);
          if (data.photo) {
            setProfileImage({ uri: data.photo });
          }
        } else {
          throw new Error('Error fetching user data');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Hubo un problema al obtener los datos del usuario.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const changeProfileImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync(); 
    if (permissionResult.granted === false) {
      Alert.alert('Permiso necesario', 'Se necesita permiso para acceder a la galería.'); 

      return;
    }
  
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setProfileImage({ uri: pickerResult.uri });
    setUserData(prevData => ({ ...prevData, photo: pickerResult.uri }));
  };  

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditProfile = async () => {
    const formData = new FormData();
    formData.append('name', userData.name);
    formData.append('surname', userData.surname);
    formData.append('number', userData.number);
    formData.append('email', userData.email);
    formData.append('psw', userData.psw);
    formData.append('bio', userData.bio);
    formData.append('birth_date', userData.birth_date);
    formData.append('address', userData.address);
    formData.append('city', userData.city);
    formData.append('country', userData.country);
    formData.append('postal_code', userData.postal_code);
    if (userData.photo) {
      const photoUriParts = userData.photo.split('.');
      const photoFileType = photoUriParts[photoUriParts.length - 1];
      const photoFile = {
        uri: userData.photo,
        name: `photo.${photoFileType}`,
        type: `image/${photoFileType}`,
      };
      formData.append('photo', photoFile);
    }
  
    try {
      const response = await fetch(phoneIP, {
        method: 'PUT',
        body: formData,
      });
      if (response.ok) {
        navigation.navigate('Profile');
      } else {
        const errorMessage = await response.text();
        Alert.alert(errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Hubo un problema durante la actualización del perfil. Por favor, inténtalo de nuevo.');
    }
  };
  
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || userData.birth_date;
    setShowDatePicker(Platform.OS === 'ios');
    const formattedDate = currentDate.toISOString().split('T')[0];
    setUserData(prevData => ({ ...prevData, birth_date: formattedDate }));
  };  

  const theme = useContext(themeContext)

  const [darkMode, setDarkMode] = useState(false)

  const { t } = useTranslation();

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
      <ScrollView contentContainerStyle={[styles.scrollViewContent, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
        <Text style = {[styles.title, {color:theme.color}]}>{t('EDITAR PERFIL')}</Text>
        <View style = {[styles.line, {color:theme.color}]}></View>
        <View style = {[styles.headerInfo, {color:theme.color}]}>
          <TouchableOpacity onPress={changeProfileImage}>
            <View style={styles.profileImageContainer}>
              <Image
                source={profileImage}
                style = {[styles.profileImage, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}
              />
              <View style = {[styles.editIconContainer, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                <AntDesign name="edit" size={24} color= {theme.color} />
              </View>
            </View>
          </TouchableOpacity>

          <View style = {[styles.nameContainer, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
          <TextInput
              style = {[styles.inputNames, {color:theme.color}, {backgroundColor:theme.background}]}
              value={userData.name}
              onChangeText={text => setUserData(prevData => ({ ...prevData, name: text }))}
              placeholder={t('Nombre')}
              placeholderTextColor={theme.color}
            />
            <TextInput
              style = {[styles.inputNames, {color:theme.color}, {backgroundColor:theme.background}]}
              value={userData.surname}
              onChangeText={text => setUserData(prevData => ({ ...prevData, surname: text }))}
              placeholder={t('Apellido')}
              placeholderTextColor={theme.color}
            />
          </View>
        </View>
        <View style = {[styles.textFieldsContainer, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
          <View style = {[styles.viewNumber, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
            <TextInput
              style = {[styles.inputEmail, {color:theme.color},, {backgroundColor:theme.background}]}
              value={userData.email}
              onChangeText={text => setUserData(prevData => ({ ...prevData, email: text }))}
              placeholder="Email"
              placeholderTextColor={theme.color}
            />
            <TextInput
              style = {[styles.inputNumber, {color:theme.color},, {backgroundColor:theme.background}]}
              value={userData.number}
              onChangeText={text => setUserData(prevData => ({ ...prevData, number: text }))}
              placeholder={t('Número')}
              placeholderTextColor={theme.color}
            />
          </View>
          <TextInput
            style = {[styles.input, {color:theme.color}, {backgroundColor:theme.background}]}
            value={userData.psw}
            onChangeText={text => setUserData(prevData => ({ ...prevData, psw: text }))}
            placeholder={t('Contraseña')}
            placeholderTextColor={theme.color}
            secureTextEntry={true}
          />
          <View style = {[styles.date, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
            <TextInput
              style = {[styles.inputFecha, {color:theme.color}, {backgroundColor:theme.background}]}
              value={userData.birth_date ? format(new Date(userData.birth_date), "yyyy-MM-dd") : ""}
              placeholder={t('Fecha de nacimiento')}
              placeholderTextColor={theme.color}
            />
            <View style = {[styles.datepickerContainer, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <Text style = {[styles.textFecha, {color:theme.color}]}>{t('Seleccionar fecha')}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={userData.birth_date ? new Date(userData.birth_date) : new Date()}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                  themeVariant={theme.theme}
                />
              )}
            </View>
          </View>
          <View style = {[styles.viewAddress, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
            <TextInput
              style = {[styles.inputAddres, {color:theme.color}, {backgroundColor:theme.background}]}
              value={userData.address}
              onChangeText={text => setUserData(prevData => ({ ...prevData, address: text }))}
              placeholder={t('Dirección')}
              placeholderTextColor={theme.color}
            />
             <TextInput
              style = {[styles.inputCode, {color:theme.color}, {backgroundColor:theme.background}]}
              value={userData.postal_code}
              onChangeText={text => setUserData(prevData => ({ ...prevData, postal_code: text }))}
              placeholder={t('Código Postal')}
              placeholderTextColor={theme.color}
            />
          </View>
          <View style={styles.viewNumber}>
          <TextInput
              style = {[styles.inputAddres, {color:theme.color}, {backgroundColor:theme.background}]}
              value={userData.city}
              onChangeText={text => setUserData(prevData => ({ ...prevData, city: text }))}
              placeholder={t('Ciudad')}
              placeholderTextColor={theme.color}
            />
            <TextInput
              style = {[styles.inputCode, {color:theme.color}, {backgroundColor:theme.background}]}
              value={userData.country}
              onChangeText={text => setUserData(prevData => ({ ...prevData, country: text }))}
              placeholder={t('País')}
              placeholderTextColor={theme.color}
            />
          </View>
          <TextInput
            style = {[styles.bioInput, {color:theme.color}, {backgroundColor:theme.background}]}
            value={userData.bio}
            onChangeText={text => setUserData(prevData => ({ ...prevData, bio: text }))}
            placeholder={t('Biografía')}
            placeholderTextColor={theme.color}
            multiline={true}
          />
        </View>
        <View style = {[styles.buttonContainer, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
          <TouchableOpacity style = {[styles.button, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]} onPress={handleEditProfile}>
            <Text style = {[styles.buttonText, {color:theme.color}]}>{t('Guardar')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    top: 10,
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 20,
    color: '#333',
    textShadowColor: '#888',
  },   
  viewNumber: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 4,
  },
  nameContainer: {
    marginLeft: 20,
  },
  textFieldsContainer: {
    marginTop: 20,
  },
  inputNames: {
    alignSelf: "center",
    width: 305,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    backgroundColor: '#f8f8f8',
    marginBottom: 10,
    paddingLeft: 10,
  },
  input: {
    alignSelf: "center",
    width: '95%',
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    backgroundColor: '#f8f8f8',
    marginBottom: 10,
    paddingLeft: 10,
  },
  bioInput: {
    alignSelf: "center",
    height: 100,
    width: '95%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    backgroundColor: '#f8f8f8',
    marginBottom: 10,
    paddingLeft: 10,
    paddingTop: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#d3d3d3',
    padding: 10,
    width: '45%',
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
  },
  date: {
    flexDirection: "row",
  },
  viewAddress: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  inputFecha: {
    marginLeft: 10,
    width: '65%',
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    backgroundColor: '#f8f8f8',
    marginBottom: 10,
    paddingLeft: 10,
  },
  inputAddres: {
    width: '65%',
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    backgroundColor: '#f8f8f8',
    marginBottom: 10,
    paddingLeft: 10,
  },
  inputCode: {
    width: '25%',
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    backgroundColor: '#f8f8f8',
    marginBottom: 10,
    paddingLeft: 10,
  },
  line: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  inputNumber: {
    alignSelf: "center",
    width: '30%',
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    backgroundColor: '#f8f8f8',
    marginBottom: 10,
    paddingLeft: 10,
  },
  inputEmail: {
    alignSelf: "center",
    width: '60%',
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    backgroundColor: '#f8f8f8',
    marginBottom: 10,
    paddingLeft: 10,
  },
  textFecha: {
    marginHorizontal: 10,
    color: Platform.OS === 'ios' ? '#888' : '', 
  }
});
