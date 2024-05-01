import React , { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput,Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';


export default function EditProfile(){

    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("");

    const changeProfileImage = () => {
    };

    return (
        <View style={styles.container}>
        <View style={styles.header}>
        <View style={styles.profileInfo}>
        <TouchableOpacity onPress={changeProfileImage}>
            <Image
              source={require('../assets/images/foto_perfil/sebas2.jpg')}
              style={styles.profileImage}/>
            <View style={styles.editIconContainer}>
              <AntDesign name="edit" size={24} color="black" />
            </View>
          </TouchableOpacity>
          <View style={styles.textosProfile}>
          <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Nombre de usuario"
            />
            <TextInput
              style={styles.input}
              value={bio}
              onChangeText={setBio}
              placeholder="Biografía"
            />
           
              <TextInput
                style={styles.input}
                value={location}
                onChangeText={setLocation}
                placeholder="Ubicación"
              />
           
            <TextInput
              style={styles.input}
              value={bio}
              onChangeText={setBio}
              placeholder="Contraseña"
            />
            <TextInput
              style={styles.input}
              value={bio}
              onChangeText={setBio}
              placeholder="Repetir Contraseña"
            />
          </View>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.buttonEditProfile}>
          <Text style={styles.textButton}>Guardar</Text>
        </TouchableOpacity>    
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  profileInfo: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  profileImage: {
    borderRadius: 1000,
    width: 80,
    height: 80,
  },
  textosProfile: {
    marginTop: 160,
    marginLeft: -80,
    flex: 1,
  },
  editButton: {
    alignSelf: 'flex-end',
  },
  editText: {
    fontSize: 16,
    color: '#3498db',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bio: {
    fontSize: 15,
    marginBottom: 2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 5,
    fontSize: 15,
  },
  
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statText: {
    fontSize: 16,
    color: '#777777',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  buttonEditProfile: {
    backgroundColor: '#d3d3d3',
    padding: 10,
    width: '45%',
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#d3d3d3',
    padding: 10,
    width: '45%',
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
  },
  textButton: {
    fontWeight: '300',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    backgroundColor: '#fffafa',
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,

},
});

