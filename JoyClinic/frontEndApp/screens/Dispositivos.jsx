import React, { useState,useContext }  from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { EventRegister} from 'react-native-event-listeners'
import themeContext from "../themes/themeContext";

export default function Dispositivos(){

    const theme = useContext(themeContext)

    const [darkMode, setDarkMode] = useState(false)

    return (
        <SafeAreaView style = {[styles.container, {backgroundColor:theme.background}]}>
            <View style = {[styles.content, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                <Text style = {[styles.info, {color:theme.color}]}>En el apartado de dispositivos, puedes ver los dipositivos en los que se encuentra la aplicación. Cuando se agregue un nuevo dispositivo, aparecerá aquí mismo.</Text>
                <Text style = {[styles.texto, {color:theme.color}]}>Todos los dispositivos</Text>
                <View style = {[styles.dispositivos, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                    <MaterialIcons 
                        name="phone-android" 
                        size={24} 
                        color={theme.color} />
                    <AntDesign 
                        name="apple1" 
                        size={24} 
                        color={theme.color} />
                    <View style = {[styles.dentroTexto, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Text style = {[styles.textoDispositivo, {color:theme.color}]}>iOS</Text>
                        <Text style = {[styles.textoDispositivo, {color:theme.color}]}>Barcelona, Catalonia, Barcelona, Spain</Text>
                    </View>
                </View>
                <View style = {[styles.dispositivos, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                    <MaterialIcons 
                        name="phone-android" 
                        size={24} 
                        color={theme.color} />
                    <AntDesign 
                        name="android1" 
                        size={24} 
                        color={theme.color} />
                    <View style = {[styles.dentroTexto, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Text style = {[styles.textoDispositivo, {color:theme.color}]}>Android</Text>
                        <Text style = {[styles.textoDispositivo, {color:theme.color}]}>Barcelona, Catalonia, Barcelona, Spain</Text>
                    </View>
                </View>
                <View style = {[styles.dispositivos, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                    <MaterialIcons 
                        name="phone-android" 
                        size={24} 
                        color={theme.color} />
                    <AntDesign 
                        name="android1" 
                        size={24} 
                        color={theme.color} />
                    <View style = {[styles.dentroTexto, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Text style = {[styles.textoDispositivo, {color:theme.color}]}>Android</Text>
                        <Text style = {[styles.textoDispositivo, {color:theme.color}]}>Barcelona, Catalonia, Barcelona, Spain</Text>
                    </View>
                </View>
                <View style = {[styles.dispositivos, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                    <MaterialIcons 
                        name="phone-android" 
                        size={24} 
                        color={theme.color} />
                    <AntDesign 
                        name="android1" 
                        size={24} 
                        color={theme.color} />
                    <View style = {[styles.dentroTexto, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Text style = {[styles.textoDispositivo, {color:theme.color}]}>Android</Text>
                        <Text style = {[styles.textoDispositivo, {color:theme.color}]}>Barcelona, Catalonia, Barcelona, Spain</Text>
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
