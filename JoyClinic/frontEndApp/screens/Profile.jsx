import React, {useState, useEffect}from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from '@react-navigation/native';


const Profile = () => {
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(require('../assets/images/foto_perfil/default.jpg'));
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    bio: "",
    birth_date: new Date(), 
    city: "",
    country: "",
    photo: "",  
  }); 
 
  {/*Editrofile*/}
  const redirectEditProfile = () => {
    navigation.navigate('EditProfile');
  }
  const phoneIP = `http://192.168.1.33:8000/api/v1/registros/1/`;

  const fetchData = async () => {
    try {
      console.log('Fetching data from:', phoneIP); 
      const response = await fetch(phoneIP);
      if (response.ok) {
        const data = await response.json();
        console.log('User data received:', data); 
        setUserData(data);
        if (data.photo) {
          setProfileImage({ uri: data.photo }); 
        }
      } else {
        throw new Error('Error fetching user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error); 
      Alert.alert('Error', 'Hubo un problema al obtener los datos del usuario.');
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <Image
            source={userData.photo ? { uri: userData.photo } : profileImage}
            style={styles.profileImage}/>
          <View style={styles.textosProfile}>
            <View styles={styles.textName}>
              <Text style={styles.username}>{userData.name} {userData.surname}</Text>
            </View>
            <Text style={styles.bio}>{userData.bio}</Text>
            <View style={styles.locationContainer}>
              <Entypo 
                name="location-pin" 
                size={15} 
                color="black" />
              <Text style={styles.locationText}>{userData.country}</Text>
              <Text style={styles.locationText}>{userData.city}</Text>
            </View>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>100</Text>
            <Text style={styles.statText}>Personales</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>10</Text>
            <Text style={styles.statText}>Hospital</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>13</Text>
            <Text style={styles.statText}>Favoritos</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.buttonEditProfile} onPress={redirectEditProfile}>
          <Text style={styles.textButton}>Editar Perfil</Text>
        </TouchableOpacity>    
        <TouchableOpacity style={styles.button}>
          <Text style={styles.textButton}>Compartir Perfil</Text>
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
  textName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    borderRadius: 1000,
    width: 40,
    height: 40,
  },
  textosProfile: {
    flex: 1,
    marginLeft: 40,
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
});

export default Profile;
