import React, { useContext, useEffect } from "react";
import { View, SafeAreaView, Text, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import themeContext from "../../themes/themeContext";
import { useNavigation } from '@react-navigation/native';
import ProfileContext from '../../hooks/ProfileContext';
import styles from '../../assets/styles/appointmentsStyles';

export default function Search() {
    const navigation = useNavigation();
    const theme = useContext(themeContext);
    const { citasAll, fetchAllCitas, countCitasAll } = useContext(ProfileContext);

    useEffect(() => {
        fetchAllCitas();
    }, []);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.theme }]}>
            <ScrollView style={[styles.scroll, { backgroundColor: theme.theme }]} contentContainerStyle={styles.scrollContent}>
                {/* Título */}
                <View style={[styles.botonesTitulo, { backgroundColor: theme.background }, { borderColor: theme.lineColor }]}>
                    <Text style={[styles.containerText, { color: theme.color }]}>Citas</Text>
                </View>
                {/* Lista de citas */}
                <View style={[styles.divierte, { backgroundColor: theme.theme }, { borderColor: theme.lineColor }]}>
                    {countCitasAll.length === 0 ? (
                        <ActivityIndicator size="large" color={theme.color} />
                    ) : (
                        countCitasAll.map((cita, index) => (
                            <View key={index} style={[styles.fondoIconGame, { backgroundColor: theme.background }, { borderColor: theme.lineColor }]}>
                                <Text style={[styles.citaTitle, { color: theme.color }]}>{cita.name}</Text>
                                <Text style={[styles.citaDay, { color: theme.color }]}>{cita.day}</Text>
                                <Text style={[styles.citaFor, { color: theme.color }]}>{cita.for}</Text>
                                <Text style={[styles.citaFor, { color: theme.color }]}>{cita.of}</Text>
                            </View>
                        ))
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
