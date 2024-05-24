import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, FlatList, TextInput, ScrollView } from 'react-native';
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { EventRegister} from 'react-native-event-listeners'
import themeContext from "../themes/themeContext";
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';


const Profile = () => {
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedStartDate, setEditedStartDate] = useState(new Date());
  const [editedEndDate, setEditedEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [profileImage, setProfileImage] = useState(require('../assets/images/foto_perfil/perfil.jpeg'));
  const [userData, setUserData] = useState({
    name: "",
    surname: "", 
    bio: "",
    birth_date: new Date(),
    city: "",
    country: "",
    photo: "",
  });
 
  const redirecCalendario = () => {
    navigation.navigate('Calendario');
  };

  const phoneIP = `http://192.168.1.33:8000/profile/`;
  const ip = 'http://192.168.17.8:8000/profile/'; 
  const image = 'http://192.168.17.8:8000';

  const fetchData = async () => {
    try { 
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('El token no está disponible');
      }

      const response = await fetch(ip, {
        method: "GET",
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

  const fetchEvents = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            throw new Error('El token no está disponible');
        } 

        const response = await axios.get('http://192.168.17.8:8000/all_events/', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, 
            },
        });

        const formattedEvents = response.data.map(event => ({
            ...event,
            start: moment(event.start, "MM/DD/YYYY, HH:mm:ss").toDate(),
            end: moment(event.end, "MM/DD/YYYY, HH:mm:ss").toDate(),
        }));
        setEvents(formattedEvents);
    } catch (error) {
        console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchEvents(); 
  }, []);

  const handleEditEvent = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            throw new Error('El token no está disponible');
        }

        const formattedStartDate = moment(editedStartDate).format("YYYY-MM-DD HH:mm:ss");
        const formattedEndDate = moment(editedEndDate).format("YYYY-MM-DD HH:mm:ss");

        const response = await axios.put(`http://192.168.17.8:8000/update/${editingEvent.id}/`, {
            title: editedTitle,
            start: formattedStartDate,
            end: formattedEndDate,
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            Alert.alert('Evento actualizado correctamente');
            fetchEvents();
            setEditingEvent(null);
            setEditedTitle('');
        } else {
            console.error('Error updating event:', response.data);
        }
    } catch (error) {
        console.error('Error updating event:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        }
    }
  };

  const handleCancelEdit = () => {
    setEditingEvent(null);
    setEditedTitle('');
  };

  const handleDeleteEvent = async (eventId) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            throw new Error('El token no está disponible');
        }

        const response = await axios.delete(`http://192.168.17.8:8000/remove/${eventId}/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            setEvents(events.filter(event => event.id !== eventId));
            Alert.alert('Evento eliminado correctamente');
        } else {
            console.error('Error deleting event:', response.data);
        }
    } catch (error) {
        console.error('Error deleting event:', error);
    }
  };
  
  const redirectEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const theme = useContext(themeContext)

  const [darkMode, setDarkMode] = useState(false)

  const renderItem = ({ item }) => {
    if (editingEvent && editingEvent.id === item.id) {
        return (
            <View style = {[styles.editContainer, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                <TextInput
                    style = {[styles.editInput, {color:theme.color}, {backgroundColor:theme.background}]}
                    value={editedTitle}
                    onChangeText={setEditedTitle}
                    placeholder="Nuevo título"
                    placeholderTextColor={theme.color}
                />
                <View style = {[styles.dateTimeContainer, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                    <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
                        <Text style = {[styles.dateTimeText, {color:theme.color}]}>Seleccionar fecha y hora de inicio</Text>
                    </TouchableOpacity>
                    {showStartDatePicker && (
                        <DateTimePicker
                            value={editedStartDate}
                            mode="datetime"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShowStartDatePicker(false);
                                if (selectedDate) {
                                    setEditedStartDate(selectedDate);
                                }
                            }}
                        />
                    )}
                </View>
                <View style = {[styles.dateTimeContainer, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                    <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
                        <Text style = {[styles.dateTimeText, {color:theme.color}]}>Seleccionar fecha y hora de fin</Text>
                    </TouchableOpacity>
                    {showEndDatePicker && (
                        <DateTimePicker
                            value={editedEndDate}
                            mode="datetime"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShowEndDatePicker(false);
                                if (selectedDate) {
                                    setEditedEndDate(selectedDate);
                                }
                            }}
                        />
                    )}
                </View>
                <View style = {[styles.buttonContainer, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                    <TouchableOpacity onPress={handleEditEvent} style = {[styles.saveButton, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Text style = {[styles.buttonText, {color:theme.color}]}>Guardar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleCancelEdit} style = {[styles.cancelButton, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Text style = {[styles.buttonText, {color:theme.color}]}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    } else {
        return (
            <View style = {[styles.eventItem, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                <View style = {[styles.eventDetails, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                    <Text style = {[styles.eventTitle, {color:theme.color}]}>{item.title}</Text>
                    <Text style = {[styles.eventDate, {color:theme.color}]}>
                        {`Fecha de inicio: ${moment(item.start).format("DD/MM/YYYY HH:mm")}`}
                    </Text>
                    <Text style = {[styles.eventDate, {color:theme.color}]}>
                        {`Fecha de finalización: ${moment(item.end).format("DD/MM/YYYY HH:mm")}`}
                    </Text>
                </View>
                <View style = {[styles.buttonContainer, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                    <TouchableOpacity onPress={() => setEditingEvent(item)}>
                        <Text style = {[styles.editButton, {color:theme.color}]}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteEvent(item.id)}>
                        <Text style = {[styles.deleteButton, {color:theme.color}]}>Borrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
  };  

  return (
    <ScrollView style = {[styles.ScrollView, {backgroundColor:theme.background}]}>
      <View style = {[styles.container, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
        <View style = {[styles.header, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
          <View style = {[styles.profileInfo, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
            <Image
              source={userData.photo ? { uri: 'http://192.168.17.8:8000/' + userData.photo } : profileImage}
              style = {[styles.profileImage, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}/>
            <View style = {[styles.textosProfile, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
              <View style = {[styles.textName, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                <Text style = {[styles.username, {color:theme.color}]}>{userData.name} {userData.surname}</Text>
              </View>
              <Text style = {[styles.bio, {color:theme.color}]}>{userData.bio}</Text>
              <View style = {[styles.locationContainer, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                <Entypo 
                  name="location-pin" 
                  size={15} 
                  color= {theme.color} />
                <Text style = {[styles.locationText, {color:theme.color}]}>{userData.country}</Text>
                <Text style = {[styles.locationText, {color:theme.color}]}>{userData.city}</Text>
              </View>
            </View>
          </View>
          <View style = {[styles.statsContainer, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
            <View style = {[styles.stat, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
              <Text style = {[styles.statNumber, {color:theme.color}]}>100</Text>
              <Text style = {[styles.statText, {color:theme.color}]}>Personales</Text>
            </View>
            <View style = {[styles.stat, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
              <Text style = {[styles.statNumber, {color:theme.color}]}>10</Text>
              <Text style = {[styles.statText, {color:theme.color}]}>Hospital</Text>
            </View>
            <View style = {[styles.stat, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
              <Text style = {[styles.statNumber, {color:theme.color}]}>13</Text>
              <Text style = {[styles.statText, {color:theme.color}]}>Favoritos</Text>
            </View>
          </View>
        </View>
        <View style = {[styles.buttonsContainer, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
          <TouchableOpacity style = {[styles.buttonEditProfile, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]} onPress={redirectEditProfile}>
            <Text style = {[styles.textButton, {color:theme.color}]}>Editar Perfil</Text>
          </TouchableOpacity>    
          <TouchableOpacity style = {[styles.button, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
            <Text style = {[styles.textButton, {color:theme.color}]}>Compartir Perfil</Text>
          </TouchableOpacity> 
        </View>
        <TouchableOpacity 
          style={[styles.styleCalendario, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}
          onPress={redirecCalendario}>
          <Text style = {[styles.textButton, {color:theme.color}]}>Calendario</Text>
        </TouchableOpacity>
        <Text style = {[styles.title, {color:theme.color}]}>Todos los Eventos</Text>
          <View style={styles.containerlist}>
          <FlatList
            data={[userData, ...events]}
            renderItem={({ item, index }) => {
              if (index === 0) {
                // Renderizar el perfil
                return (
                  <View>
                    {/* Contenido del perfil */} 
                  </View>
                );
              } else {
                // Renderizar eventos
                return renderItem({ item });
              }
            }}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={[styles.containerFlalist, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}
            scrollEnabled={false}
          />
          </View>  
      </View>
    </ScrollView>
    
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
  styleCalendario: {
    marginVertical: 10,
    alignSelf: 'center',
    backgroundColor: '#d3d3d3',
    padding: 10,
    width: '93%', 
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '300', 
    alignSelf: 'center',
  },
  header2: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  flatList: {
    width: '100%',
  },
  eventItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
  },
  eventTitle: {
      fontSize: 18,
      flex: 1,
  },
  editButton: {
      color: 'black',
      marginLeft: 10,
      fontWeight: '200',
  },
  deleteButton: {
      color: 'black',
      marginLeft: 10,
      fontWeight: '200'
  },
  cancelButton: {
      color: 'gray',
      marginLeft: 10,
  },
  eventDate: {
      fontSize: 16,
      color: '#666',
  },
  eventDetails: {
      flex: 1,
  },
  buttonContainer: {
      flexDirection: 'row',
  },
  editContainer: {
      padding: 10,
      marginBottom: 10, 
      borderWidth: 1,
      borderColor: '#ccc', 
      borderRadius: 5,
  },
  editInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 5,
      marginBottom: 10,
  },
  dateTimeContainer: {
      marginBottom: 10,
  },
  dateTimeText: {
      color: 'black',
      fontWeight: '300',
  },
  buttonText: {
      color: 'black',
      textAlign: 'center',
  },
  saveButton: {
      backgroundColor: '#d3d3d3',
      padding: 10,
      width: '25%',
      borderRadius: 10,
      borderWidth: 1,
      marginHorizontal: 10,
  },
  cancelButton: {
      backgroundColor: '#d3d3d3',
      padding: 10,
      width: '25%',
      borderRadius: 10,
      borderWidth: 1,
    },
  containerlist: {
    marginHorizontal: 15,
  }
});

export default Profile;
