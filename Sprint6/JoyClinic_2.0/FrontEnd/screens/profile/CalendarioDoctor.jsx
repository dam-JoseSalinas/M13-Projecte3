import React, { useState, useEffect, useContext } from 'react';
import styles from '../../assets/styles/calendarioStyles';
import { View, TouchableOpacity, Text, Alert, Modal, TextInput, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import themeContext from '../../themes/themeContext';
import ProfileContext from '../../hooks/ProfileContext';
import config from '../settings/Config';

const CalendarioDoctor = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [eventName, setEventName] = useState('');
    const [eventStart, setEventStart] = useState(new Date());
    const [eventEnd, setEventEnd] = useState(new Date());
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    const { fetchCitas } = useContext(ProfileContext);
    const navigation = useNavigation();
    const theme = useContext(themeContext);
  
    useEffect(() => {
      // Aquí puedes agregar llamadas adicionales necesarias al cargar el componente
    }, []);
  
    const handleDatePress = (date) => {
      setSelectedDate(date.dateString);
      setEventStart(moment(date.dateString).startOf('day').toDate());
      setEventEnd(moment(date.dateString).endOf('day').toDate());
    };
  
    const handleAddAppointment = () => {
      setModalVisible(true);
    };
  
    const handleSaveAppointment = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          if (!token) {
            throw new Error('El token no está disponible');
          }
      
          const formattedDay = moment(eventStart).format("YYYY-MM-DDTHH:mm:ss"); // Formato ISO 8601
      
          const response = await axios.post(config.loginAPI + 'agregar_cita/', {
            title: eventName,
            day: formattedDay,
          }, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
      
          if (response.status === 201) {
            fetchCitas(); // Actualiza la lista de citas después de crear una nueva
            setModalVisible(false); // Cierra el modal después de guardar la cita
            setEventName(''); // Limpia el campo de nombre del evento
            setEventStart(new Date()); // Reinicia la fecha de inicio del evento
          } else if (response.status === 409) {
            Alert.alert('Error', 'Este doctor ya tiene una cita en esta fecha y hora.');
          } else {
            Alert.alert('Error', 'No se pudo guardar la cita. Por favor, inténtalo de nuevo.');
          }
        } catch (error) {
          console.error('Error saving appointment:', error);
          Alert.alert('Error', 'Hubo un error al guardar la cita. Por favor, inténtalo de nuevo.');
        }
      };
      
  
    return (
      <View style={[styles.container, { backgroundColor: theme.theme }, { borderColor: theme.lineColor }]}>
        <Calendar
          current={moment().format('YYYY-MM-DD')}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: 'gray', backgroundColor: theme.background },
          }}
          onDayPress={(day) => handleDatePress(day)}
          style={[styles.Calendar, { backgroundColor: theme.theme }, { borderColor: theme.lineColor }]}
          theme={{
            calendarBackground: { backgroundColor: theme.theme },
            textSectionTitleColor: theme.color,
            selectedDayBackgroundColor: theme.color,
            selectedDayTextColor: theme.color,
            todayTextColor: theme.color,
            dayTextColor: theme.color,
            textDisabledColor: theme.color,
            selectedDotColor: theme.color,
            textDayFontColor: theme.color,
            textDayHeaderFontColor: theme.color,
          }}
        />
        {selectedDate && (
          <View style={[styles.actions, { backgroundColor: theme.theme }, { borderColor: theme.lineColor }]}>
            <TouchableOpacity onPress={handleAddAppointment} style={[styles.button, { backgroundColor: theme.background }, { borderColor: theme.lineColor }]}>
              <Text style={[styles.buttonText, { color: theme.color }]}>Agregar cita</Text>
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
          <View style={[styles.centeredView, { backgroundColor: theme.background }, { borderColor: theme.lineColor }]}>
            <View style={[styles.modalView, { backgroundColor: theme.background }, { borderColor: theme.lineColor }]}>
              <Text style={[styles.modalText, { color: theme.color }]}>Ingrese el nombre de la cita:</Text>
              <TextInput
                style={[styles.textInput, { color: theme.color }]}
                value={eventName}
                onChangeText={(text) => setEventName(text)}
                placeholder="Nombre de la cita"
                placeholderTextColor={theme.color}
              />
              <Text style={[styles.modalText, { color: theme.color }]}>Seleccione la hora de inicio:</Text>
              <TouchableOpacity onPress={() => setShowStartPicker(true)}>
                <Text style={[styles.timeText, { color: theme.color }]}>{moment(eventStart).format('HH:mm')}</Text>
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
              <Button title="Guardar" onPress={handleSaveAppointment} />
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  
  export default CalendarioDoctor;