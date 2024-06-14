//Profile.jsx
import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, TouchableOpacity, Alert, FlatList, TextInput, ScrollView, Keyboard, Platform } from 'react-native';
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import themeContext from "../../themes/themeContext";
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import ProfileContext from '../../hooks/ProfileContext';
import styles from '../../assets/styles/profileStyles'
import config from "../settings/Config";

const ProfileDoctor = () => {
  const navigation = useNavigation();
  const { userDoctor, fetchDoctor, fetchEvents, count, fetchCountRegister, fetchCountEvents, fetchCountDoctores, countDoctors, countCitasDoctor, fetchCountCitasDoctor } = useContext(ProfileContext);
  const theme = useContext(themeContext)

  useEffect(() => {
    fetchDoctor();
    fetchEvents();
    fetchCountRegister();
    fetchCountEvents();
    fetchCountDoctores();
    fetchCountCitasDoctor();
  }, []);

  const redirecCalendario = () => {
    navigation.navigate('CalendarioDoctor');
  };
  return (
    <View style={[styles.container, { backgroundColor: theme.theme }, { borderColor: theme.lineColor }]}>
      <View style={[styles.header, { borderColor: theme.lineColor }]}>
        <View style={[styles.profileInfo, { borderColor: theme.lineColor }]}>
          <View style={[styles.textosProfile, { borderColor: theme.lineColor }]}>
            <View style={[styles.textName, { borderColor: theme.lineColor }]}>
              <Text style={[styles.username, { color: theme.color }]}>{userDoctor.name} {userDoctor.surname}</Text>
            </View>
            <Text style={[styles.bio, { color: theme.color }]}>{userDoctor.specialty}</Text>
          </View>
        </View>
        <View style={[styles.statsContainer, { borderColor: theme.lineColor }]}>
          <View style={[styles.stat, { backgroundColor: theme.theme }, { borderColor: theme.lineColor }]}>
            <Text style={[styles.statNumber, { color: theme.color }]}>{count}</Text>
            <Text style={[styles.statText, { color: theme.color }]}>Pacientes</Text>
          </View>
          <View style={[styles.stat, { borderColor: theme.lineColor }]}>
            <Text style={[styles.statNumber, { color: theme.color }]}>{countCitasDoctor}</Text>
            <Text style={[styles.statText, { color: theme.color }]}>Citas</Text>
          </View>
          <View style={[styles.stat, { borderColor: theme.lineColor }]}>
            <Text style={[styles.statNumber, { color: theme.color }]}>{countDoctors}</Text>
            <Text style={[styles.statText, { color: theme.color }]}>Doctores</Text>
          </View>
        </View>
      </View>
      <View style={[styles.buttonsContainer, { borderColor: theme.lineColor }]}>
        <TouchableOpacity style={[styles.buttonEditProfile, { backgroundColor: theme.background }, { borderColor: theme.lineColor }]} onPress={redirecCalendario}>
          <Text style={[styles.textButton, { color: theme.color }]}>Calendario</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.background }, { borderColor: theme.lineColor }]}>
          <Text style={[styles.textButton, { color: theme.color }]}>Compartir Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileDoctor;
