import React, { useState, useContext, useEffect, useMemo } from 'react';
import { Text, View, SafeAreaView, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import themeContext from "../../themes/themeContext";
import { useNavigation } from '@react-navigation/native';
import ProfileContext from '../../hooks/ProfileContext';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../assets/styles/contactsStyles';
import config from '../settings/Config';

export default function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [docs, setDocs] = useState([]);
    const [text, setText] = useState('');
    const navigation = useNavigation();
    const { userData, usersData, fetchData } = useContext(ProfileContext);
    const [profileImage, setProfileImage] = useState(require('../../assets/images/foto_perfil/default.jpg'));
    const theme = useContext(themeContext);

    useEffect(() => {
        fetchRegistros();
        fetchData();
        fetchDoctores();
    }, []);

    const fetchRegistros = async () => {
        try {
            const response = await fetch(config.loginAPI + 'api/v1/registros/', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                setContacts(data);
            } else {
                throw new Error('Error al obtener los registros');
            }
        } catch (error) {
            console.error('Error fetching registros:', error);
        }
    };

    const fetchDoctores = async () => {
        try {
            const response = await fetch(config.loginAPI + 'api/v1/doctores/', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                setDocs(data);
            } else {
                throw new Error('Error al obtener los doctores');
            }
        } catch (error) {
            console.error('Error fetching doctores:', error);
        }
    };

    const redirectChats = () => {
        navigation.navigate('Chats');
    };

    const filteredContacts = useMemo(() => {
        const allContacts = [...contacts, ...docs]; // Combinar contactos generales y doctores
        return allContacts.filter(contact => {
            const fullName = `${contact.name} ${contact.surname}`.toLowerCase();
            const nameMatches = fullName.includes(text.toLowerCase());
            const isCurrentUser = contact.id === userData.id;
            return nameMatches && !isCurrentUser;
        });
    }, [contacts, docs, text, usersData]);

    const sections = useMemo(() => {
        const sectionsMap = filteredContacts.reduce((acc, item) => {
            const [lastName] = item.name.split(' ').reverse();
            return Object.assign(acc, {
                [lastName[0]]: [...(acc[lastName[0]] || []), item],
            });
        }, {});
        return Object.entries(sectionsMap)
            .map(([letter, items]) => ({
                letter,
                items,
            }))
            .sort((a, b) => a.letter.localeCompare(b.letter));
    }, [filteredContacts]);

    console.log('Filtered Contacts:', filteredContacts); // Verificar la salida en la consola para depurar

    return (
        <SafeAreaView style={[{ backgroundColor: theme.theme }, { flex: 1 }]}>
            <View style={[styles.search, { backgroundColor: theme.theme }, { borderColor: theme.lineColor }]}>
                <TextInput
                    style={[styles.textInput, { color: theme.color }, { backgroundColor: theme.input }]}
                    placeholder='Buscador'
                    onChangeText={newText => setText(newText)}
                    defaultValue={text}
                    placeholderTextColor={theme.color}
                />
                <Ionicons
                    style={[styles.iconSearch, { backgroundColor: theme.theme }, { borderColor: theme.lineColor }]}
                    name="search"
                    size={24}
                    color={theme.color} />
            </View>
            <View style={[styles.fondoNombre, { backgroundColor: theme.background }, { borderColor: theme.lineColor }]}>
                <View style={[styles.foto, { backgroundColor: theme.background }, { borderColor: theme.lineColor }]}>
                    <Image
                        source={userData.photo ? { uri: config.loginAPI + userData.photo } : profileImage}
                        style={[styles.profileImage, { backgroundColor: theme.background }, { borderColor: theme.lineColor }]} />
                </View>
                <View>
                    <Text style={[styles.nombre, { color: theme.color }]}>
                        {userData.name} {userData.surname}
                    </Text>
                    <Text style={[styles.nombre, { color: theme.color }]}>
                        {userData.email}
                    </Text>
                </View>
            </View>
            <View style={styles.header}>
                <Text style={[styles.title, { color: theme.color }]}>Contacts</Text>
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {sections.map(({ letter, items }) => (
                    <View style={styles.section} key={letter}>
                        <Text style={[styles.sectionTitle, { color: theme.color }]}>{letter}</Text>
                        <View style={styles.sectionItems}>
                            {items.map(({ img, name, surname, email, phone }, index) => {
                                return (
                                    <View key={index} style={styles.cardWrapper}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                redirectChats()
                                            }}>
                                            <View style={styles.card}>
                                                {img ? (
                                                    <Image
                                                        alt=""
                                                        resizeMode="cover"
                                                        source={img ? { uri: config.loginAPI + img } : profileImage}
                                                        style={styles.cardImg} />
                                                ) : (
                                                    <View style={[styles.cardImg, styles.cardAvatar]}>
                                                        <Text style={[styles.cardAvatarText]}>{name[0]}</Text>
                                                    </View>
                                                )}
                                                <View style={styles.cardBody}>
                                                    <Text style={[styles.cardTitle, { color: theme.color }]}>{name} {surname}</Text>
                                                    <Text style={[styles.cardTitle, { color: theme.color }]}>{email}</Text>
                                                    <Text style={[styles.cardPhone, { color: theme.color }]}>{phone}</Text>
                                                </View>
                                                <View style={styles.cardAction}>
                                                    <FeatherIcon
                                                        color="#9ca3af"
                                                        name="chevron-right"
                                                        size={22} />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}
