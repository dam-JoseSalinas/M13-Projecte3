import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, Image, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { format } from 'date-fns';

export default function EditProfile() {
  const [username, setUsername] = useState("");
  const [surname, setSurname] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [code, setCode] = useState("");
  const [bio, setBio] = useState("");

  const changeProfileImage = () => {};

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      setBirthdate(formattedDate);
    }
    setShowDatePicker(Platform.OS === 'ios');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>EDITAR PERFIL</Text>
      <View style={styles.headerInfo}>
        <TouchableOpacity onPress={changeProfileImage}>
          <View style={styles.profileImageContainer}>
            <Image
              source={require('../assets/images/foto_perfil/sebas2.jpg')}
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
            value={username}
            onChangeText={setUsername}
            placeholder="Nombre"
          />
          <TextInput
            style={styles.inputNames}
            value={surname}
            onChangeText={setSurname}
            placeholder="Apellido"
          />
        </View>
      </View>
      <View style={styles.textFieldsContainer}>
        <TextInput
          style={styles.input}
          value={number}
          onChangeText={setNumber}
          placeholder="Número"
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry={true}
        />
        <View style={styles.date}>
          <TextInput
            style={styles.inputFecha}
            value={birthdate}
            placeholder="Cumpleaños (yyyy-mm-dd)"
            keyboardType="numeric"
            editable={false} 
          />
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={birthdate ? new Date(birthdate) : new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
        <View style={styles.viewAddress}>
          <TextInput
            style={styles.inputAddres}
            value={address}
            onChangeText={setAddress}
            placeholder="Dirección"
          />
          <TextInput
            style={styles.inputCode}
            value={code}
            onChangeText={setCode}
            placeholder="Código Postal"
          />
        </View>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
          placeholder="Ciudad"
        />
        <TextInput
          style={styles.input}
          value={country}
          onChangeText={setCountry}
          placeholder="País"
        />
        <TextInput
          style={styles.bioInput}
          value={bio}
          onChangeText={setBio}
          placeholder="Biografía"
          multiline={true}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
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
  inputFecha:{
    alignSelf: "flex-start",
    marginHorizontal: 10,
    width: '65%',
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    backgroundColor: '#f8f8f8',
    marginBottom: 10,
    paddingLeft: 10,
  },
  date: {
    flexDirection: "row",
  },
  viewAddress: {
    flexDirection: "row",
    justifyContent: "space-around",
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
    //alignSelf: "center",
    width: '20%',
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    backgroundColor: '#f8f8f8',
    marginBottom: 10,
    paddingLeft: 10,
  },
});
