// Importa useState, useEffect, View, StyleSheet, TouchableOpacity, Text, Alert, Modal, TextInput, Button, FlatList, Calendar, moment, axios, useNavigation, AsyncStorage y DateTimePicker
import React, { useState, useEffect,useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert, Modal, TextInput, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventRegister} from 'react-native-event-listeners'
import themeContext from "../themes/themeContext";

const CalendarScreen = () => {
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventStart, setEventStart] = useState(new Date());
  const [eventEnd, setEventEnd] = useState(new Date());
  const navigation = useNavigation();
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const phoneIP = `http://192.168.1.33:8000/all_events/`;

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('El token no está disponible');
      }
  
      console.log('Obteniendo datos del perfil desde:', phoneIP);
      const response = await axios.get(phoneIP, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const eventData = response.data.reduce((acc, event) => {
        acc[event.id] = {  
          name: event.title, 
          start: event.start, 
          end: event.end,
          marked: true,
        };
        return acc;
      }, {});
      setEvents(eventData);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleDatePress = (date) => {
    setSelectedDate(date.dateString);
    // Setear la fecha seleccionada en el evento
    setEventStart(moment(date.dateString).startOf('day').toDate());
    setEventEnd(moment(date.dateString).endOf('day').toDate());
  };

  const handleAddEvent = () => {
    setModalVisible(true);
  };

  const redirectGetEvents = () => {
    navigation.navigate('Eventos', { selectedDate });
  };

  const handleSaveEvent = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('El token no está disponible');
      }

      const response = await axios.post('http://192.168.1.33:8000/add_event/', {
        title: eventName,
        start: moment(eventStart).format("YYYY-MM-DD HH:mm:ss"),
        end: moment(eventEnd).format("YYYY-MM-DD HH:mm:ss"),
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        fetchEvents();
        setModalVisible(false);
        setEventName('');
        setEventStart(new Date());
        setEventEnd(new Date());
      } else {
        Alert.alert('Error', 'No se pudo guardar el evento. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error saving event:', error);
      Alert.alert('Error', 'Hubo un error al guardar el evento. Por favor, inténtalo de nuevo.');
    }
  };

  const theme = useContext(themeContext)

  const [darkMode, setDarkMode] = useState(false)

  return (
    <View style = {[styles.container, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
      <Calendar
        current={moment().format('YYYY-MM-DD')}
        markedDates={{
          ...events,
          [selectedDate]: { selected: true, selectedColor: theme.color, backgroundColor: theme.background }, 
        }}
        onDayPress={(day) => handleDatePress(day)}
        style = {[styles.Calendar, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}
        theme={{
          calendarBackground: theme.background,
          textSectionTitleColor: theme.color, 
          selectedDayBackgroundColor:  theme.background, 
          selectedDayTextColor: theme.background,
          todayTextColor: theme.calendarTodayTextColor,
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#00adf5',
          selectedDotColor: theme.background,
          arrowColor: 'orange', 
          monthTextColor: theme.color, 
          indicatorColor: 'blue',
          textDayFontFamily: 'monospace',
          textMonthFontFamily: 'monospace',
          textDayHeaderFontFamily: 'monospace',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16
        }}
      />
      {selectedDate && (
        <View style = {[styles.actions, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
          <TouchableOpacity onPress={handleAddEvent} style = {[styles.button, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
            <Text style = {[styles.buttonText, {color:theme.color}]}>Agregar evento</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={redirectGetEvents} style = {[styles.button, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
            <Text style = {[styles.buttonText, {color:theme.color}]}>Mostrar eventos</Text>
          </TouchableOpacity>
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style = {[styles.centeredView, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
          <View style = {[styles.modalView, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
            <Text style = {[styles.modalText, {color:theme.color}]}>Ingrese el nombre del evento:</Text>
            <TextInput
              style = {[styles.textInput, {color:theme.color}]}
              value={eventName}
              onChangeText={(text) => setEventName(text)}
              placeholder="Nombre del evento"
              placeholderTextColor={theme.color}
            />
            <Text style = {[styles.modalText, {color:theme.color}]}>Seleccione la hora de inicio:</Text>
            <TouchableOpacity onPress={() => setShowStartPicker(true)}>
              <Text style = {[styles.timeText, {color:theme.color}]}>{moment(eventStart).format('HH:mm')}</Text>
            </TouchableOpacity>
            {showStartPicker && (
              <DateTimePicker
                value={eventStart}
                mode="time"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowStartPicker(false);
                  if (selectedDate) {
                    setEventStart(selectedDate);
                  }
                }}
              />
            )}
            <Text style = {[styles.modalText, {color:theme.color}]}>Seleccione la hora de fin:</Text>
            <TouchableOpacity onPress={() => setShowEndPicker(true)}>
              <Text style = {[styles.timeText, {color:theme.color}]}>{moment(eventEnd).format('HH:mm')}</Text>
            </TouchableOpacity>
            {showEndPicker && (
              <DateTimePicker
                value={eventEnd}
                mode="time"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowEndPicker(false);
                  if (selectedDate) {
                    setEventEnd(selectedDate);
                  }
                }}
              />
            )}
            <Button title="Guardar" onPress={handleSaveEvent} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'center', 
    top: 120,
    left: 0, 
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 10,
    fontWeight: '300',
    fontSize: 16,
    textAlign: 'center',
  },
  textInput: {
    height: 40,
    width: 200, 
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    backgroundColor: '#fffafa',
    marginBottom: 10,
    paddingLeft: 10,
  },
  timeText: {
    fontSize: 18,
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
});

export default CalendarScreen;
