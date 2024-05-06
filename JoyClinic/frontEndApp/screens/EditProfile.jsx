import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Alert, TouchableOpacity, TextInput, Image, ScrollView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'; 

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
  const ip = 'http://10.0.2.2:8000/api/v1/registros/1/';
  const phoneIP = 'http://192.168.1.33:8000/api/v1/registros/1/';

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

  const fetchData = async () => {
  try {
    const response = await fetch(phoneIP || ip);
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
      const response = await fetch(phoneIP || ip, {
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>EDITAR PERFIL</Text>
        <View style={styles.line}></View>
        <View style={styles.headerInfo}>
          <TouchableOpacity onPress={changeProfileImage}>
            <View style={styles.profileImageContainer}>
              <Image
                source={profileImage}
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
              onChangeText={text => setUserData(prevData => ({ ...prevData, address: text }))}
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
          <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
            <Text style={styles.buttonText}>Guardar</Text>
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
    fontFamily: 'Georgia',
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
