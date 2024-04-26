import React from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function Dispositivos(){
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.info}>En el apartado de dispositivos, puedes ver los dipositivos en los que se encuentra la aplicación. Cuando se agregue un nuevo dispositivo, aparecerá aquí mismo.</Text>
                <Text style={styles.texto}>Todos los dispositivos</Text>
                <View style={styles.dispositivos}>
                    <MaterialIcons 
                        name="phone-android" 
                        size={24} 
                        color="black" />
                    <AntDesign 
                        name="apple1" 
                        size={24} 
                        color="black" />
                    <View styles={styles.dentroTexto}>
                        <Text style={styles.textoDispositivo}>iOS</Text>
                        <Text style={styles.textoDispositivo}>Barcelona, Catalonia, Barcelona, Spain</Text>
                    </View>
                </View>
                <View style={styles.dispositivos}>
                    <MaterialIcons 
                        name="phone-android" 
                        size={24} 
                        color="black" />
                    <AntDesign 
                        name="android1" 
                        size={24} 
                        color="black" />
                    <View styles={styles.dentroTexto}>
                        <Text style={styles.textoDispositivo}>Android</Text>
                        <Text style={styles.textoDispositivo}>Barcelona, Catalonia, Barcelona, Spain</Text>
                    </View>
                </View>
                <View style={styles.dispositivos}>
                    <MaterialIcons 
                        name="phone-android" 
                        size={24} 
                        color="black" />
                    <AntDesign 
                        name="android1" 
                        size={24} 
                        color="black" />
                    <View styles={styles.dentroTexto}>
                        <Text style={styles.textoDispositivo}>Android</Text>
                        <Text style={styles.textoDispositivo}>Barcelona, Catalonia, Barcelona, Spain</Text>
                    </View>
                </View>
                <View style={styles.dispositivos}>
                    <MaterialIcons 
                        name="phone-android" 
                        size={24} 
                        color="black" />
                    <AntDesign 
                        name="android1" 
                        size={24} 
                        color="black" />
                    <View styles={styles.dentroTexto}>
                        <Text style={styles.textoDispositivo}>Android</Text>
                        <Text style={styles.textoDispositivo}>Barcelona, Catalonia, Barcelona, Spain</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        alignItems: 'flex-start',
        marginHorizontal: 15,
        top: 15,
    },
    info: {
        fontWeight: "200"
    },
    texto: {
        top: 20,
        fontSize: 15,
        fontWeight: "700"
    },
    dispositivos: {
        flexDirection: "row",
        alignSelf: "center",
        top: 30,
        padding: 25,
        backgroundColor: '#d3d3d3',
        borderRadius: 20,
        width: "95%",
        marginTop: 15,
        borderWidth: 1,
    },
    dentroTexto: {
        padding: 10,
    },
    textoDispositivo: {
        marginHorizontal: 10,
        fontSize: 12,
        fontWeight: '300',
    },
})
