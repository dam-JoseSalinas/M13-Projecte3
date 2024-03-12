import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, SectionList, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Profile(){
    const [text, setText] = useState('');
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.search}>
                    <TextInput style={styles.textInput}
                        placeholder="Buscador"
                        onChangeText={newText => setText(newText)}
                        defaultValue={text}
                    />
                    <Ionicons style={styles.iconSearch} name="search" size={24} color="black" />
                </View>
                <View style={styles.fondoNombre}>
                    <View style={styles.foto}></View>
                    <Text style={styles.nombre}>Nombre Completo</Text>
                </View>
                <Text style={styles.contactos}>Contactos</Text>
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
                        <View style={styles.contacto}>
                            <Ionicons name={`${item.icon}-circle-sharp`} size={24} color="black" />
                            <Text style={styles.contactoNombre}>{item.name}</Text>
                        </View>
                    )}
                    renderSectionHeader={({ section }) => (
                        <Text style={styles.sectionHeader}>{section.title}</Text>
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
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#d3d3d3',
        padding: 1,
        borderRadius: 20,
        marginTop: 20,
        width: '80%',
        alignSelf: "center"
    },
    searchInput: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconSearch: {
        marginLeft: "auto"
    },
    textInput: {
        top: 10,
    },
    fondoNombre: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#d3d3d3',
        padding: 20,
        borderRadius: 30,
        marginTop: 20,
        width: '80%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
    },
    foto: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 100,
        marginRight: 20,
    },
    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    contactos: {
        justifyContent: "center",
        alignItems: 'center',
        padding: 20,
        borderRadius: 20,
        //backgroundColor: '#d3d3d3',
        marginBottom: 10,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    contacto: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
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
