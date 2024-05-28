// ProfileContext.js
import React, { useState } from 'react';
import {Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment'
import ProfileContext from './ProfileContext';

const ProfileProvider = ({ children }) => {
  const phoneIP = `http://192.168.1.33:8000/profile/`;
  const [profileImage, setProfileImage] = useState(require('../assets/images/foto_perfil/perfil.jpeg'));
  const [fetchError, setFetchError] = useState(false);  
  const [count, setCount] = useState([])
  const [countEvents, setCountEvents] = useState(null);
  const [events, setEvents] = useState([]);
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    number: "",
    email: "",
    psw: "",
    bio: "",
    birth_date: new Date(), 
    address: "",
    city: "",
    country: "",
    postal_code: "",
    photo: "",
  });
  const [usersData, setUsersData] = useState({
    user: {
      name: "",
      surname: "",
      number: "",
      email: "",
      psw: "",
      bio: "",
      birth_date: new Date(), 
      address: "",
      city: "",
      country: "",
      postal_code: "",
      photo: "",
    },
    registros: []
  });

  const fetchData = async () => {
    try { 
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        //throw new Error('El token no está disponible');
      }

      const response = await fetch(phoneIP, {
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
            //throw new Error('El token no está disponible');
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
        //console.error('Error fetching events:', error);
    }
  };

  const fetchRegistros = async () => {
    try {
      const response = await fetch('http://192.168.1.33:8000/api/v1/registros/', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        setUsersData(prevUserData => ({
          ...prevUserData,
          registros: data
        }));
      } else {
        throw new Error('Error al obtener los registros');
      }
    } catch (error) {
      console.error('Error fetching registros:', error);
    }
  };

  const fetchCountRegister = async () => {
    try {
      const response = await fetch('http://192.168.1.33:8000/count', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCount(data)
      } else {

      }
    }catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Hubo un problema al obtener los datos de los registros.');
    };
  }

  const fetchCountEvents = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        //throw new Error('El token no está disponible');
      }
  
      const response = await fetch('http://192.168.1.33:8000/events/', { 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        setCountEvents(data)
      } else {

      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Hubo un problema al obtener los datos de los eventos.');
    }
  };


  return (
    <ProfileContext.Provider value={{ userData, events, usersData, count, countEvents, setCountEvents, setCount, setUsersData, setUserData, setEvents, fetchData, fetchEvents, fetchRegistros, fetchCountRegister, fetchCountEvents }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
