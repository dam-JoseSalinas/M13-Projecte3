import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, SectionList, Image, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import themeContext from "../themes/themeContext"
import { useNavigation } from '@react-navigation/native';
import ProfileContext from './ProfileContext';

export default function Contacts() {
    const [text, setText] = useState('');
    const theme = useContext(themeContext);
    const { userData, usersData, fetchRegistros } = useContext(ProfileContext);
    const [profileImage, setProfileImage] = useState(require('../assets/images/foto_perfil/perfil.jpeg'));
    const navigation = useNavigation();

    const redirectChats = () => {
        navigation.navigate('Chats');
    };

    useEffect(() => {
        fetchRegistros();
    }, []);

    const filteredContacts = usersData.registros.filter(user => {
        const fullName = `${user.name} ${user.surname}`.toLowerCase();
        const nameMatches = fullName.includes(text.toLowerCase());
        const isCurrentUser = user.id === userData.id;
        return nameMatches && !isCurrentUser;
    });

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={[styles.content, { backgroundColor: theme.background }, { borderColor: theme.lineColor }]}>
                <View style={[styles.search, { backgroundColor: theme.background }, { borderColor: theme.lineColor }]}>
                    <TextInput
                        style={[styles.textInput, { color: theme.color }, { backgroundColor: theme.background }]}
                        placeholder="Buscador"
                        onChangeText={newText => setText(newText)}
                        defaultValue={text}
                        placeholderTextColor={theme.color}
                    />
                    <Ionicons
                        style={[styles.iconSearch, { backgroundColor: theme.background }, { borderColor: theme.lineColor }]}
                        name="search"
                        size={24}
                        color={theme.color} />
                </View>
                <View style={[styles.fondoNombre, { backgroundColor: theme.background }, { borderColor: theme.lineColor }]}>
                    <View style={[styles.foto, { backgroundColor: theme.background }, { borderColor: theme.lineColor }]}>
                        <Image
                            source={userData.photo ? { uri: 'http://192.168.1.33:8000/' + userData.photo } : profileImage}
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
                <Text style={[styles.contactos, { color: theme.color }]}>Contactos</Text>
                <SectionList
                    sections={[
                        { title: '', data: filteredContacts.map(({ name, surname }) => ({ name, surname })) || [] }
                    ]}
                    renderItem={({ item }) => (
                        <View style={[styles.contacto, { backgroundColor: theme.background }, { borderColor: theme.lineColor }]}>
                            <Ionicons name="person-circle-sharp" size={24} color={theme.color} />
                            <Text style={[styles.contactoNombre, { color: theme.color }]}>{item.name} {item.surname}</Text>
                            <TouchableOpacity style={styles.chat} onPress={redirectChats}>
                                <Ionicons name="chatbubble-outline" size={24} color={theme.color} />
                            </TouchableOpacity>
                        </View>
                    )}
                    renderSectionHeader={({ section }) => (
                        <Text style={[styles.sectionHeader, { color: theme.color }, { backgroundColor: theme.background }]}>{section.title}</Text>
                    )}
                    keyExtractor={(item, index) => `basicListEntry-${index}`}
                />
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: { 
        flex: 1,
        paddingTop: 22,
    },
    search: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center',
        alignSelf: "center",
        backgroundColor: '#d3d3d3',
        padding: 6,
        borderRadius: 20,
        width: '90%',
        borderWidth: 1,
    },
    iconSearch: {
        marginLeft: "auto"
    },
    textInput: {
        flex: 1,
        alignItems: 'center',
        padding: 0,
    },
    fondoNombre: {
        flexDirection: 'row',
        backgroundColor: '#d3d3d3',
        padding: 10,
        borderRadius: 30,
        marginTop: 20,
        width: '90%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
        alignSelf: "center",
        borderWidth: 1,
    },
    foto: {
        padding: 10,
    },
    fotoPerfil: {
        marginLeft: "auto",
    },
    nombre: {
        fontSize: 17,
        fontWeight: '500',
        color: '#333',
        flex: 1,
    },
    contactos: {
        justifyContent: "center",
        alignItems: 'center',
        padding: 20,
        marginBottom: 10,
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
    },
    contacto: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    call: {
        marginLeft: 7,
    },
    chat: {
        marginLeft: "auto"
    },
    contactoFoto: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    contactoNombre: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    profileImage: {
        borderRadius: 1000,
        width: 40,
        height: 40,
    },
});
