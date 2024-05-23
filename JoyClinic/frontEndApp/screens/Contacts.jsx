import React, {useState,useContext} from 'react';
import { StyleSheet, Text, View, SafeAreaView, SectionList, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EventRegister} from 'react-native-event-listeners'
import themeContext from "../themes/themeContext";


export default function Contacts(){
    const [text, setText] = useState('');

    const theme = useContext(themeContext)

    const [darkMode, setDarkMode] = useState(false)

    return (
        <SafeAreaView style = {[styles.container, {backgroundColor:theme.background}]}>
            <View style = {[styles.content, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                <View style = {[styles.search, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                    <TextInput 
                        style = {[styles.textInput, {color:theme.color}, {backgroundColor:theme.background}]}
                        placeholder="Buscador"
                        onChangeText={newText => setText(newText)}
                        defaultValue={text}
                        placeholderTextColor={theme.color}
                    />
                    <Ionicons 
                        style = {[styles.iconSearch, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}
                        name="search" 
                        size={24} 
                        color={theme.color} />
                </View>
                <View style = {[styles.fondoNombre, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                    <View style = {[styles.foto, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}></View>
                    <Ionicons 
                        style = {[styles.fotoPerfil, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]} 
                        name="person" size={24} 
                        color={theme.color}  />
                    <Text style = {[styles.nombre, {color:theme.color}]}>Nombre Completo</Text>
                </View>
                <Text style = {[styles.contactos, {color:theme.color}]}>Contactos</Text>
                <SectionList
                    sections={[
                        { title: 'A', data: 
                        [{ name: 'Alice', icon: 'person' }, 
                        { name: 'Amy', icon: 'person' }, 
                        { name: 'Anna', icon: 'person' }] },
                        { title: 'A', data: 
                        [{ name: 'Alice', icon: 'person' }, 
                        { name: 'Amy', icon: 'person' }, 
                        { name: 'Anna', icon: 'person' }] },
                        { title: 'A', data: 
                        [{ name: 'Alice', icon: 'person' }, 
                        { name: 'Amy', icon: 'person' }, 
                        { name: 'Anna', icon: 'person' }] },
                        { title: 'A', data: 
                        [{ name: 'Alice', icon: 'person' }, 
                        { name: 'Amy', icon: 'person' }, 
                        { name: 'Anna', icon: 'person' }] },
                        { title: 'A', data: 
                        [{ name: 'Alice', icon: 'person' }, 
                        { name: 'Amy', icon: 'person' }, 
                        { name: 'Anna', icon: 'person' }] },
                        { title: 'A', data: 
                        [{ name: 'Alice', icon: 'person' }, 
                        { name: 'Amy', icon: 'person' }, 
                        { name: 'Anna', icon: 'person' }] },
                        { title: 'A', data: 
                        [{ name: 'Alice', icon: 'person' }, 
                        { name: 'Amy', icon: 'person' }, 
                        { name: 'Anna', icon: 'person' }] },
                        { title: 'A', data: 
                        [{ name: 'Alice', icon: 'person' }, 
                        { name: 'Amy', icon: 'person' }, 
                        { name: 'Anna', icon: 'person' }] },
                        { title: 'A', data: 
                        [{ name: 'Alice', icon: 'person' }, 
                        { name: 'Amy', icon: 'person' }, 
                        { name: 'Anna', icon: 'person' }] },
                    ]}
                    renderItem={({ item }) => (
                        <View style = {[styles.contacto, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                            <Ionicons name={`${item.icon}-circle-sharp`} size={24} color={theme.color}  />
                            <Text style = {[styles.contactoNombre, {color:theme.color}]}>{item.name}</Text>
                            <Ionicons name="chatbubble-outline" size={24} color={theme.color}  style={styles.chat}/>
                            <Ionicons name="call-outline" size={24} color={theme.color}  style={styles.call}/>
                        </View>
                    )}
                    renderSectionHeader={({ section }) => (
                        <Text style = {[styles.sectionHeader, {color:theme.color},{backgroundColor:theme.background}]}>{section.title}</Text>
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
        padding: 20,
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
        padding: 20,
    },
    fotoPerfil:{
        marginLeft: "auto",
    },
    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginRight: 160,
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
});
