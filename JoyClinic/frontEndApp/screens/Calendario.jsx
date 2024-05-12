import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert, Modal, TextInput, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import axios from 'axios';

const CalendarScreen = () => {
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [eventName, setEventName] = useState('');

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

  const handleSaveEvent = async () => {
    try {
      const response = await axios.post('http://192.168.1.33:8000/add_event/', {
        title: eventName,
        start: moment(selectedDate).format("YYYY-MM-DD HH:mm:ss"),
        end: moment(selectedDate).format("YYYY-MM-DD HH:mm:ss"),
      });
  
      if (response.status === 200) {
        fetchEvents();
        setModalVisible(false);
        setEventName('');
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
          textSectionTitleColor: '#000000', // Color del texto del título del mes
          selectedDayBackgroundColor: '#00adf5', 
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: 'orange', // Color de los indicadores de cambio de mes
          monthTextColor: '#000000', // Color del texto del título del mes
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
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Ingrese el nombre del evento:</Text>
            <TextInput
              style={styles.textInput}
              value={eventName}
              onChangeText={(text) => setEventName(text)}
              placeholder="Nombre del evento"
            />
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendar: {
    width: '100%',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
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
  buttonText: {
    fontWeight: '300',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    top: 100,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
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
  textInput: {
    top: 10,
    height: 40,
    width: 150, 
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    backgroundColor: '#fffafa',
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default CalendarScreen;
