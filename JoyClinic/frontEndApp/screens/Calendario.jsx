// Importa useState, useEffect, View, StyleSheet, TouchableOpacity, Text, Alert, Modal, TextInput, Button, FlatList, Calendar, moment, axios, useNavigation y DateTimePicker
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert, Modal, TextInput, Button, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CalendarScreen = () => {
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventStart, setEventStart] = useState(new Date());
  const [eventEnd, setEventEnd] = useState(new Date());
  const [eventList, setEventList] = useState([]);
  const navigation = useNavigation();
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://192.168.1.33:8000/all_events/');
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
  };

  const handleAddEvent = () => {
    setModalVisible(true);
  };

  const redirectGetEvents = () => {
    navigation.navigate('Eventos', { selectedDate });
  };

  const handleSaveEvent = async () => {
    try {
      const response = await axios.post('http://192.168.1.33:8000/add_event/', {
        title: eventName,
        start: moment(eventStart).format("YYYY-MM-DD HH:mm:ss"),
        end: moment(eventEnd).format("YYYY-MM-DD HH:mm:ss"),
      });
  
      if (response.status === 200) {
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

  return (
    <View style={styles.container}>
      <Calendar
        current={'2024-05-01'}
        markedDates={{
          ...events,
          [selectedDate]: { selected: true, selectedColor: 'black' }, 
        }}
        onDayPress={(day) => handleDatePress(day)}
        style={styles.calendar}
        theme={{
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#000000', 
          selectedDayBackgroundColor: '#00adf5', 
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: 'orange', 
          monthTextColor: '#000000', 
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
        <View style={styles.actions}>
          <TouchableOpacity onPress={handleAddEvent} style={styles.button}>
            <Text style={styles.buttonText}>Agregar evento</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={redirectGetEvents} style={styles.button}>
            <Text style={styles.buttonText}>Mostrar eventos</Text>
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
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Ingrese el nombre del evento:</Text>
            <TextInput
              style={styles.textInput}
              value={eventName}
              onChangeText={(text) => setEventName(text)}
              placeholder="Nombre del evento"
            />
            <Text style={styles.modalText}>Seleccione la hora de inicio:</Text>
            <TouchableOpacity onPress={() => setShowStartPicker(true)}>
              <Text style={styles.timeText}>{moment(eventStart).format('HH:mm')}</Text>
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
            <Text style={styles.modalText}>Seleccione la hora de fin:</Text>
            <TouchableOpacity onPress={() => setShowEndPicker(true)}>
              <Text style={styles.timeText}>{moment(eventEnd).format('HH:mm')}</Text>
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
    backgroundColor: '#d3d3d3',
    padding: 10,
    width: '35%',
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    fontWeight: '300',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
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
