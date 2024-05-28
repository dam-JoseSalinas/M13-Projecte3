//Profile.jsx
import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, FlatList, TextInput, ScrollView, Keyboard, Platform } from 'react-native';
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import themeContext from "../themes/themeContext";
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import ProfileProvider from "./ProfileProvider";
import ProfileContext from "./ProfileContext";
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [editingEvent, setEditingEvent] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedStartDate, setEditedStartDate] = useState(new Date());
  const [editedEndDate, setEditedEndDate] = useState(new Date());  
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const { userData, events, fetchData, fetchEvents, setEvents, setUserData } = useContext(ProfileContext);
  const [profileImage, setProfileImage] = useState(require('../assets/images/foto_perfil/perfil.jpeg'));
  const phoneIP = `http://192.168.1.33:8000/profile/`;
  //const ip = 'http://192.168.17.8:8000/profile/'; 
  const theme = useContext(themeContext) 
  const [darkMode, setDarkMode] = useState(false);
    
  const redirecCalendario = () => {
    navigation.navigate('Calendario');
  };
  
  const handleEditEvent = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            throw new Error('El token no está disponible');
        }

        // Formatear las fechas
        const formattedStartDate = moment(editedStartDate).format("YYYY-MM-DD HH:mm:ss");
        const formattedEndDate = moment(editedEndDate).format("YYYY-MM-DD HH:mm:ss"); 

        // Ocultar el teclado
        Keyboard.dismiss();

        const response = await axios.put(`http://192.168.1.33:8000/update/${editingEvent.id}/`, {
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

  const handleDeleteEvent = async (eventId) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            throw new Error('El token no está disponible');
        }
 
        const response = await axios.delete(`http://192.168.1.33:8000/remove/${eventId}/`, {
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

  const handleDateStartChange = (event, selectedDate) => {
    const currentDate = selectedDate || editedStartDate;
    setShowStartDatePicker(Platform.OS === 'ios');
    setEditedStartDate(currentDate);
  };
 
  const handleDateEndChange = (event, selectedDate) => {
      const currentDate = selectedDate || editedEndDate;
      setShowEndDatePicker(Platform.OS === 'ios');
      setEditedEndDate(currentDate);
  };

  useEffect(() => {
    fetchData();
    fetchEvents(); 
  }, []);

  const handleCancelEdit = () => {
    setEditingEvent(null);
    setEditedTitle('');
  };
  
  const redirectEditProfile = () => {
    navigation.navigate('EditProfile');
  };
  
  const renderItem = ({ item }) => {
    if (editingEvent && editingEvent.id === item.id) {
        return (
            <View style = {[styles.editContainer, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                <TextInput
                    style = {[styles.editInput, {color:theme.color}, {backgroundColor:theme.background}]}
                    value={editedTitle}
                    onChangeText={setEditedTitle}
                    placeholder={t('Nuevo título')}
                    placeholderTextColor={theme.color}
                />
                <View style = {[styles.dateTimeContainer, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                    <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
                        <Text style = {[styles.dateTimeText, {color:theme.color}]}>{t('Seleccionar fecha y hora de inicio')}</Text>
                    </TouchableOpacity>
                    {showStartDatePicker && (
                      <DateTimePicker
                        testID="dateTimePicker"
                          value={editedStartDate || new Date()}
                          mode="date"
                          display="default"
                          onChange={handleDateStartChange}
 
                      />
                    )}
                </View>
                <View style = {[styles.dateTimeContainer, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                    <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
                        <Text style = {[styles.dateTimeText, {color:theme.color}]}>{t('Seleccionar fecha y hora de fin')}</Text>
                    </TouchableOpacity>
                    {showEndDatePicker && (
                      <DateTimePicker
                          testID="dateTimePicker"
                          value={editedEndDate || new Date()}
                          mode="date"
                          display="default"
                          onChange={handleDateEndChange}
                      />
                    )}
 
                </View>
                <View style = {[styles.buttonContainer, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                    <TouchableOpacity onPress={handleEditEvent} style = {[styles.saveButton, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Text style = {[styles.buttonText, {color:theme.color}]}>{t('Guardar')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleCancelEdit} style = {[styles.cancelButton, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Text style = {[styles.buttonText, {color:theme.color}]}>{t('Cancelar')}</Text>
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
                        {`${t('Fecha de inicio:')} ${moment(item.start).format("DD/MM/YYYY HH:mm")}`}
                    </Text>
                    <Text style = {[styles.eventDate, {color:theme.color}]}>
                        {`${t('Fecha de finalización:')} ${moment(item.end).format("DD/MM/YYYY HH:mm")}`}
                    </Text>
                </View>
                <View style = {[styles.buttonContainer, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                    <TouchableOpacity onPress={() => setEditingEvent(item)}>
                        <Text style = {[styles.editButton, {color:theme.color}]}>{t('Editar')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteEvent(item.id)}>
                        <Text style = {[styles.deleteButton, {color:theme.color}]}>{t('Borrar')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
  };  

  return (
    
      <View style = {[styles.container, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
        <View style = {[styles.header, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
          <View style = {[styles.profileInfo, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
            <Image
              source={userData.photo ? { uri: 'http://192.168.1.33:8000/' + userData.photo } : profileImage}
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
              <Text style = {[styles.statText, {color:theme.color}]}>{t('Personales')}</Text>
            </View>
            <View style = {[styles.stat, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
              <Text style = {[styles.statNumber, {color:theme.color}]}>10</Text>
              <Text style = {[styles.statText, {color:theme.color}]}>{t('Hospital')}</Text>
            </View>
            <View style = {[styles.stat, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
              <Text style = {[styles.statNumber, {color:theme.color}]}>13</Text>
              <Text style = {[styles.statText, {color:theme.color}]}>{t('Favoritos')}</Text>
            </View>
          </View>
        </View>
        <View style = {[styles.buttonsContainer, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
          <TouchableOpacity style = {[styles.buttonEditProfile, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]} onPress={redirectEditProfile}>
            <Text style = {[styles.textButton, {color:theme.color}]}>{t('EDITAR PERFIL')}</Text>
          </TouchableOpacity>    
          <TouchableOpacity style = {[styles.button, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
            <Text style = {[styles.textButton, {color:theme.color}]}>{t('Compartir Perfil')}</Text>
          </TouchableOpacity> 
        </View>
        <TouchableOpacity 
          style={[styles.styleCalendario, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}
          onPress={redirecCalendario}>
          <Text style = {[styles.textButton, {color:theme.color}]}>{t('Calendario')}</Text>
        </TouchableOpacity>
        <Text style = {[styles.title, {color:theme.color}]}>{t('Todos los Eventos')}</Text>
        <ScrollView style = {[styles.ScrollView, {backgroundColor:theme.background}]}>
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
        </ScrollView>
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
