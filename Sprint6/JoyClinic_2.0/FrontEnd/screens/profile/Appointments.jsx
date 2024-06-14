import React, { useState, useContext, useEffect } from "react";
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Ionicons, FontAwesome6, FontAwesome, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import themeContext from "../../themes/themeContext";
import styles from '../../assets/styles/appointmentsStyles'
import ProfileContext from "../../hooks/ProfileContext";

const Tab = createBottomTabNavigator();

export default function Appointments() {

    {/*REDIRECCION DE BOTONES*/ }
    const navigation = useNavigation();

    const theme = useContext(themeContext)
    const { fetchCountCitasPaciente, fetchCountCitasDoctor, countCitasPaciente, countCitasDoctor, fetchCountDoctores, fetchCitas, citasAll, fetchDoctor, userDoctor } = useContext(ProfileContext);

    useEffect(() => {
        fetchCountCitasPaciente();
        fetchCountCitasDoctor();
        fetchCountDoctores();
        fetchCitas();
        fetchDoctor();
    }, []);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.theme }]}>
            {/*BODY*/}
            <ScrollView style={[styles.scroll, { backgroundColor: theme.theme }]} contentContainerStyle={styles.scrollContent}>
                {/*
                ======================
                D I V I E R T E T E
                ======================*/}
                {/*BOTON TITULO*/}
                <View style={[styles.botonesTitulo, { backgroundColor: theme.background }, { borderColor: theme.lineColor }]}>
                    <Text style={[styles.containerText, { color: theme.color }]}>{userDoctor.specialty}</Text>
                </View>
                {/*FILA DE BOTONES CON ICONO*/}
                <View style={[styles.divierte, { backgroundColor: theme.theme }, { borderColor: theme.lineColor }]}>
                    {citasAll && citasAll.map((cita, index) => (
                        <View key={index} style={[styles.fondoIconGame, { backgroundColor: theme.background }, { borderColor: theme.lineColor }]}>
                            <Text style={[styles.citaTitle, { color: theme.color }]}>{cita.title}</Text>
                            <Text style={[styles.citaDay, { color: theme.color }]}>{cita.day}</Text>
                            <Text style={[styles.citaFor, { color: theme.color }]}>{cita.for}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};


