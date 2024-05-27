import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, SafeAreaView, Alert, TouchableOpacity, TextInput, Image, ScrollView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import themeContext from "../themes/themeContext";
import ProfileContext from "./ProfileContext";

export default function EditProfile() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [profileImage, setProfileImage] = useState(require('../assets/images/foto_perfil/default.jpg'));
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const phoneIP = 'http://192.168.1.33:8000/updateProfile/';
  const { userData, fetchData, setUserData} = useContext(ProfileContext);
  const theme = useContext(themeContext);

  const updateProfileData = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('El token no está disponible');
      }

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

      const response = await fetch(phoneIP, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (response.ok) {
        console.log("updateProfileData: Success");
        return true; 
      } else {
        const errorData = await response.json();
        console.error('Error Data:', errorData); 
        throw new Error('Error updating user data');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Hubo un problema al actualizar los datos del usuario.');
      return false; 
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAndNavigate = async () => {
    const success = await updateProfileData();
    if (success) {
      console.log("Navigating to Profile");
      navigation.navigate('Profile');
    } else {
      console.log("Failed to update data");
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
    if (pickerResult.assets[0].uri === true) {
      return;
    }

    setProfileImage({ uri: pickerResult.uri });
    setUserData(prevData => ({ ...prevData, photo: pickerResult.uri }));
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || userData.birth_date;
    setShowDatePicker(Platform.OS === 'ios');
    const formattedDate = currentDate.toISOString().split('T')[0];
    setUserData(prevData => ({ ...prevData, birth_date: formattedDate }));
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.background}, {borderColor:theme.lineColor}]}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>EDITAR PERFIL</Text>
        <View style={styles.line}></View>
        <View style={styles.headerInfo}>
          <TouchableOpacity onPress={changeProfileImage}>
            <View style={styles.profileImageContainer}>
              <Image
                source={userData.photo ? { uri: 'http://192.168.1.33:8000/' + userData.photo } : profileImage}
                style={styles.profileImage}
              />
              <View style={styles.editIconContainer}>
                <AntDesign name="edit" size={24} color="black" />
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.nameContainer}>
            <TextInput
              style={styles.inputNames}
              value={userData.name}
              onChangeText={text => setUserData(prevData => ({ ...prevData, name: text }))}
              placeholder="Nombre"
            />
            <TextInput
              style={styles.inputNames}
              value={userData.surname}
              onChangeText={text => setUserData(prevData => ({ ...prevData, surname: text }))}
              placeholder="Apellido"
            />
          </View>
        </View>
        <View style={styles.textFieldsContainer}>
          <View style={styles.viewNumber}>
            <TextInput
              style={styles.inputEmail}
              value={userData.email}
              onChangeText={text => setUserData(prevData => ({ ...prevData, email: text }))}
              placeholder="Email"
            />
            <TextInput
              style={styles.inputNumber}
              value={userData.number}
              onChangeText={text => setUserData(prevData => ({ ...prevData, number: text }))}
              placeholder="Número"
            />
          </View>
          <TextInput
            style={styles.input}
            value={userData.psw}
            onChangeText={text => setUserData(prevData => ({ ...prevData, psw: text }))}
            placeholder="Password"
            secureTextEntry={true}
          />
          <View style={styles.date}>
            <TextInput
              style={styles.inputFecha}
              value={userData.birth_date ? format(new Date(userData.birth_date), "yyyy-MM-dd") : ""}
              placeholder="Fecha de nacimiento"
            />
            <View style={styles.datePickerContainer}>
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <Text style={styles.textFecha}>Seleccionar fecha</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={userData.birth_date ? new Date(userData.birth_date) : new Date()}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
            </View>
          </View>
          <View style={styles.viewAddress}>
            <TextInput
              style={styles.inputAddres}
              value={userData.address}
              onChangeText={text => setUserData(prevData => ({ ...prevData,  address: text }))}
              placeholder="Dirección"
            />
            <TextInput
              style={styles.inputCode}
              value={userData.postal_code}
              onChangeText={text => setUserData(prevData => ({ ...prevData, postal_code: text }))}
              placeholder="Código Postal"
            />
          </View>
          <View style={styles.viewNumber}>
            <TextInput
              style={styles.inputAddres}
              value={userData.city}
              onChangeText={text => setUserData(prevData => ({ ...prevData, city: text }))}
              placeholder="Ciudad"
            />
            <TextInput
              style={styles.inputCode}
              value={userData.country}
              onChangeText={text => setUserData(prevData => ({ ...prevData, country: text }))}
              placeholder="País"
            />
          </View>
          <TextInput
            style={styles.bioInput}
            value={userData.bio}
            onChangeText={text => setUserData(prevData => ({ ...prevData, bio: text }))}
            placeholder="Biografía"
            multiline={true}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={fetchAndNavigate}>
            <Text style={[styles.buttonText]}>Guardar</Text>
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
    width: 271,
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
