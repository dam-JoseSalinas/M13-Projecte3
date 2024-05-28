import React, { useState,useContext } from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { EventRegister} from 'react-native-event-listeners'
import themeContext from "../themes/themeContext";
import { useTranslation } from 'react-i18next';

export default function SocialNetworks(){
    const theme = useContext(themeContext)
    const { t } = useTranslation();
    const [darkMode, setDarkMode] = useState(false)

    return (
        <SafeAreaView style = {[styles.container, {backgroundColor:theme.background}]}>
            {/*BODY*/}
            <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
                {/*
                ======================
                REDES SOCIALES
                ======================*/}
                {/*BOTON TITULO*/}
                <View style = {[styles.botonesTitulo, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                    <Text style = {[styles.containerText, {color:theme.color}]}>{t('Redes Sociales')}</Text> 
                </View>
                {/*FILA DE BOTONES CON ICONO*/}
                <View style = {[styles.divierte, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]} >
                    <TouchableOpacity style = {[styles.fondoIconGame, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Entypo 
                            name="instagram" 
                            size={50} color= {theme.color} 
                            style={styles.insta}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoIconMusic, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Entypo 
                            name="twitter" 
                            size={50} 
                            color= {theme.color} 
                            style={styles.twitter}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoIconMusic, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Entypo 
                            name="facebook" 
                            size={50} 
                            color= {theme.color} 
                            style={styles.facebook}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoIconGame, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <FontAwesome
                            name="whatsapp" 
                            size={55} 
                            color= {theme.color} />
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoIconMusic, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <FontAwesome 
                            name="telegram" 
                            size={50} 
                            color= {theme.color} />
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoIconMovie, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Ionicons 
                            name="game-controller-outline" 
                            size={50} color= {theme.color} 
                            style={styles.game} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    /*para: SAFE AREA VIEW*/
    container: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
    },

    /*para: SCROLL VIEW*/
    scroll:{
        width: '100%',
    },
    scrollContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    /*para: BOTONES TITULOS*/
    botonesTitulo: {
        alignItems: 'center',
        backgroundColor: '#d3d3d3', 
        padding: 20, 
        borderRadius: 20, 
        marginTop: 20, 
        width: '80%',
        borderWidth: 1,
    },

    containerText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "black"
    },

    divierte: {
        flexDirection: "row", // Ahora es una fila
        flexWrap: "wrap", // Envolver los elementos en múltiples líneas
        justifyContent: "space-between", 
        backgroundColor: '#d3d3d3', 
        padding: 20, 
        borderRadius: 20, 
        marginTop: 20, 
        width: '80%',
        borderWidth: 1,
    },

    fondoIconMovie: {
        backgroundColor: "#fff",
        padding: 9,
        paddingHorizontal: 14,
        borderRadius: 25,
        borderWidth: 1,
    },

    game:{
        
    },

    fondoIconMusic: {
        backgroundColor: "#fff",
        padding: 9,
        borderRadius: 25,
        borderWidth: 1,
    },

    music: {
        
    },

    fondoIconGame: {
        backgroundColor: "#fff",
        padding: 9,
        borderRadius: 25,
        borderWidth: 1,
    },

    movie: {
        
    },

    fondoIconInsta: {
        backgroundColor: "#fff",
        padding: 9,
        borderRadius: 25,
        marginRight: "auto",
        borderWidth: 1,
    },

    insta:{
     
    },

    fondoIconTwitter: {
        backgroundColor: "#fff",
        padding: 9,
        borderRadius: 25,
        borderWidth: 1,
    },

    twitter: {
       
    },

    fondoIconFacebok: {
        backgroundColor: "#fff",
        padding: 9,
        borderRadius: 25,
        marginLeft: "auto",
        borderWidth: 1,
    },

    facebook: {
    },

    fondoIconReddit: {
        backgroundColor: "#fff",
        padding: 9,
        borderRadius: 25,
        marginRight: "auto",
        borderWidth: 1,
    },
    reddit:{
        
    },
    fondoIconSlideshare: {
        backgroundColor: "#fff",
        padding: 9,
        borderRadius: 25,
        borderWidth: 1,
    },
    slide:{

    },
    fondoIconStack: {
        backgroundColor: "#fff",
        padding: 9,
        borderRadius: 25,
        marginLeft: "auto",
        borderWidth: 1,
        paddingHorizontal: 13,
    },
    stack: {
        
    },
    fondoNewsPaper:{
        backgroundColor: "#fff",
        padding: 9,
        borderRadius: 25,
        marginRight: "auto",
        borderWidth: 1,
    },
    newsPaper:{

    },
    fondoDesignNews: {
        backgroundColor: "#fff",
        padding: 9,
        borderRadius: 25,
        borderWidth: 1,
    },
    designNews:{

    },
    fondoHacker : {
        backgroundColor: "#fff",
        padding: 9,
        borderRadius: 25,
        marginLeft: "auto",
        borderWidth: 1,
        paddingHorizontal: 13,
    },
    fondoYouTube: {
        backgroundColor: "#fff",
        padding: 9,
        borderRadius: 25,
        borderWidth: 1,
    },
    fondoDiscord: {
        backgroundColor: "#fff",
        padding: 9,
        borderRadius: 25,
        borderWidth: 1,
    },
    fondoWhats: {
        backgroundColor: "#fff",
        padding: 9,
        borderRadius: 25,
        borderWidth: 1,
        paddingHorizontal: 15,
    }
})


