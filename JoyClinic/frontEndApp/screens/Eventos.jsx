import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import moment from 'moment';

const Eventos = ({ route }) => {
    const { selectedDate } = route.params;
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, [selectedDate]);

    const fetchEvents = async () => {
        try {
            const response = await axios.get(`http://192.168.1.33:8000/all_events/?date=${selectedDate}`);
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleEditEvent = async (eventId) => {
        try {
            // Aquí haces la solicitud para actualizar el evento con el ID dado
            const response = await axios.put(`http://192.168.1.33:8000/update/${eventId}/`);
            if (response.status === 200) {
                Alert.alert('Evento actualizado correctamente');
                // Actualizas la lista de eventos
                fetchEvents();
            } else {
                console.error('Error updating event:', response.data);
            }
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            // Aquí haces la solicitud para eliminar el evento con el ID dado
            const response = await axios.delete(`http://192.168.1.33:8000/remove/${eventId}/`);
            if (response.status === 200) {
                // Eliminas el evento de la lista de eventos
                setEvents(events.filter(event => event.id !== eventId));
                Alert.alert('Evento eliminado correctamente');
            } else {
                console.error('Error deleting event:', response.data);
            }
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.eventItem}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <TouchableOpacity onPress={() => handleEditEvent(item.id)}>
                <Text style={styles.editButton}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteEvent(item.id)}>
                <Text style={styles.deleteButton}>Borrar</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Eventos del {moment(selectedDate).format("DD/MM/YYYY")}</Text>
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
        fontWeight: 'bold',
        marginBottom: 20,
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
        color: 'blue',
        marginLeft: 10,
    },
    deleteButton: {
        color: 'red',
        marginLeft: 10,
    },
});

export default Eventos;
