import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import axios from 'axios';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Eventos = () => {
    const navigation = useNavigation();
    const [events, setEvents] = useState([]);
    const [editingEvent, setEditingEvent] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedStartDate, setEditedStartDate] = useState(new Date());
    const [editedEndDate, setEditedEndDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    const redirecCalendario = () => {
        navigation.navigate('Calendario');
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                throw new Error('El token no está disponible');
            } 

            const response = await axios.get('http://192.168.1.33:8000/all_events/', {
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

    const handleEditEvent = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                throw new Error('El token no está disponible');
            }

            const formattedStartDate = moment(editedStartDate).format("YYYY-MM-DD HH:mm:ss");
            const formattedEndDate = moment(editedEndDate).format("YYYY-MM-DD HH:mm:ss");

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

    const renderItem = ({ item }) => {
        if (editingEvent && editingEvent.id === item.id) {
            return (
                <View style={styles.editContainer}>
                    <TextInput
                        style={styles.editInput}
                        value={editedTitle}
                        onChangeText={setEditedTitle}
                        placeholder="Nuevo título"
                    />
                    <View style={styles.dateTimeContainer}>
                        <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
                            <Text style={styles.dateTimeText}>Seleccionar fecha y hora de inicio</Text>
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
                    <View style={styles.dateTimeContainer}>
                        <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
                            <Text style={styles.dateTimeText}>Seleccionar fecha y hora de fin</Text>
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
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={handleEditEvent} style={styles.saveButton}>
                            <Text style={styles.buttonText}>Guardar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleCancelEdit} style={styles.cancelButton}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.eventItem}>
                    <View style={styles.eventDetails}>
                        <Text style={styles.eventTitle}>{item.title}</Text>
                        <Text style={styles.eventDate}>
                            {`Fecha de inicio: ${moment(item.start).format("DD/MM/YYYY HH:mm")}`}
                        </Text>
                        <Text style={styles.eventDate}>
                            {`Fecha de finalización: ${moment(item.end).format("DD/MM/YYYY HH:mm")}`}
                        </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => setEditingEvent(item)}>
                            <Text style={styles.editButton}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDeleteEvent(item.id)}>
                            <Text style={styles.deleteButton}>Borrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Todos los Eventos</Text>
            <TouchableOpacity 
                style={styles.styleCalendario}
                onPress={redirecCalendario}>
                <Text>Calendario</Text>
            </TouchableOpacity>
            <FlatList
                data={events}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                style={styles.flatList}
            />
        </View>
    );
};
 
const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '300', 
        marginBottom: 20,
        alignSelf: 'center',
    },
    styleCalendario: {
        alignSelf: 'center',
        backgroundColor: '#d3d3d3',
        padding: 10,
        width: '85%', 
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
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
});

export default Eventos;
