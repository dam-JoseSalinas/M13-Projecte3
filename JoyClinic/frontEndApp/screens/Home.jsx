import React, { useState,useContext } from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { FontAwesome6 } from '@expo/vector-icons';
import { err } from "react-native-svg";
import { EventRegister} from 'react-native-event-listeners'
import themeContext from "../themes/themeContext";
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator(); 

export default function Home() {
    {/*REDIRECCION DE BOTONES*/}
    const navigation = useNavigation();

    {/*diviertete*/}
    const redirectHaveFun = () => {
        navigation.navigate('Funny');
    }
    {/*redes sociales*/}
    const redirectSocial = () => {
        navigation.navigate('SocialNetworks');
    }
    const openTwitter = () => {
        const twitterUrl = 'twitter:';
    
        Linking.canOpenURL(twitterUrl).then(supported => {
            if (supported) {
                return Linking.openURL(twitterUrl);
            } else {
                return Linking.openURL('https://twitter.com/');
            }}).catch(err => console.error('Error al abrir Twitter:', err));
    };
    const openInstagram = () => {
        const instagramUrl = 'instagram:';
        
        Linking.canOpenURL(instagramUrl).then(supported => {
            if(supported) {
                return Linking.openURL(instagramUrl);
            } else {
                return Linking.openURL('https://instagram.com/');
            }}).catch(err => console.error('Error al abrir Instagram:', err));
    };
    const openFacebook = () => {
        const facebookUrl = 'facebook:';

        Linking.canOpenURL(facebookUrl).then(supported => {
            if(supported){
                return Linking.openURL(facebookUrl);
            } else {
                return Linking.openURL('https://facebook.com/');
            }}).catch(err => console.err('Error al abrir Facebook', err)); 
    };
    const openDiscord = () => {
        const discordUrl = 'discord:';
    
        Linking.canOpenURL(discordUrl).then(supported => {
            if(supported){
                return Linking.openURL(discordUrl); 
            } else {
                return Linking.openURL('https://discord.com/');
            }
        }).catch(err => console.error('Error al abrir Discord', err)); 
    };    
    const openYouTube = () => {
        const youtubeUrl = 'youtube:';

        Linking.canOpenURL(youtubeUrl).then(supported => {
            if(supported){
                return Linking.openURL(youtubeUrl);
            } else {
                return Linking.openURL('https://youtube.com/');
            }}).catch(err => console.err('Error al abrir Youtube', err)); 
    };
    const openReddit = () => {
        const redditUrl = 'reddit:';

        Linking.canOpenURL(redditUrl).then(supported => {
            if(supported){
                return Linking.openURL(redditUrl);
            } else {
                return Linking.openURL('https://www.reddit.com/');
            }}).catch(err => console.err('Error al abrir Youtube', err)); 
    };
    const openWhatsapp = () => {
        const whatsappUrl = 'whatsapp:';

        Linking.canOpenURL(whatsappUrl).then(supported => {
            if(supported){
                return Linking.openURL(whatsappUrl);
            } else {
                return Linking.openURL('https://www.whatsapp.com/');
            }}).catch(err => console.err('Error al abrir Youtube', err)); 
    };
    const openstackoverflow = () => {
        const stackoverflowUrl = 'stackoverflow:';

        Linking.canOpenURL(stackoverflowUrl).then(supported => {
            if(supported){
                return Linking.openURL(stackoverflowUrl);
            } else {
                return Linking.openURL('https://stackoverflow.com/');
            }}).catch(err => console.err('Error al abrir Youtube', err)); 
    };

    const theme = useContext(themeContext)

    const [darkMode, setDarkMode] = useState(false)

    const { t } = useTranslation();

    return (
         <SafeAreaView style = {[styles.container, {backgroundColor:theme.background}]}>
            {/*BODY*/}
            <ScrollView style = {[styles.scroll, {backgroundColor:theme.background}]} contentContainerStyle={styles.scrollContent}>
                {/*
                ======================
                D I V I E R T E T E
                ======================*/}
                {/*BOTON TITULO*/}
                <TouchableOpacity style = {[styles.botonesTitulo, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]} onPress={redirectHaveFun}>
                    <Text style = {[styles.containerText, {color:theme.color}]}>{t('Diviértete')}</Text> 
                </TouchableOpacity>
                {/*FILA DE BOTONES CON ICONO*/}
                <View style = {[styles.divierte, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]} >
                    <TouchableOpacity style = {[styles.fondoIconGame, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Ionicons 
                            name="game-controller-outline" 
                            size={50} color= {theme.color} 
                            style = {[styles.game, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]} />
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoIconMusic, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Ionicons 
                            name="musical-notes-outline" 
                            size={50} color= {theme.color} 
                            style = {[styles.music, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoIconMovie, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <FontAwesome 
                            name="file-movie-o" 
                            size={50} color= {theme.color}  
                            style={[styles.movie, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}/>
                    </TouchableOpacity>
                </View>
                {/* nota: este conjunto de componentes de arriba puede reutilizarse tanto
                    en los siguientes elementos de boton-titulo con botones-icono, como
                    en los apartados de cada tematica de ocio, con la diferencia de que
                    en las vistas de ocio habra un scroll horizontal
                */}
                {/*
                ======================
                R E D E S
                ======================*/}
                <TouchableOpacity style = {[styles.botonesTitulo, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]} onPress={redirectSocial}>
                    <Text style = {[styles.containerText, {color:theme.color}]}>{t('Tus Redes')}</Text> 
                </TouchableOpacity>
                <View style = {[styles.divierte, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                    <TouchableOpacity style = {[styles.fondoIconInsta, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Entypo 
                            name="instagram" 
                            size={50} color= {theme.color}
                            style = {[styles.insta, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}
                            onPress={openInstagram}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoIconTwitter, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Entypo 
                            name="twitter" 
                            size={50} 
                            color= {theme.color}
                            style = {[styles.twitter, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}
                            onPress={openTwitter}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoIconFacebok, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Entypo 
                            name="facebook" 
                            size={50} 
                            color= {theme.color} 
                            style = {[styles.facebook, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}
                            onPress={openFacebook}/>
                    </TouchableOpacity>
                </View>
                {/*
                ======================
                FOROS
                ======================*/}
                <View style = {[styles.botonesTitulo, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                    <Text style = {[styles.containerText, {color:theme.color}]}>{t('Foros')}</Text> 
                </View>
                <View style = {[styles.divierte, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                    <TouchableOpacity style = {[styles.fondoIconReddit, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Ionicons 
                            name="logo-reddit" 
                            size={50} 
                            color= {theme.color}
                            style = {[styles.reddit, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}
                            onPress={openReddit}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoIconSlideshare, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Entypo 
                            name="slideshare" 
                            size={50} 
                            color= {theme.color}
                            style = {[styles.slide, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoIconStack, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <FontAwesome 
                            name="stack-overflow" 
                            size={50} color= {theme.color} 
                            style = {[styles.stack, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}
                            onPress={openstackoverflow}/>
                    </TouchableOpacity>
                </View>
                {/*
                ======================
                N O T I C I A S
                ======================*/}
                <View style = {[styles.botonesTitulo, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                    <Text style = {[styles.containerText, {color:theme.color}]}>{t('Noticias')}</Text> 
                </View>
                <View style = {[styles.divierte, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                    <TouchableOpacity style = {[styles.fondoNewsPaper, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>    
                        <FontAwesome 
                            name="newspaper-o" 
                            size={45} 
                            color= {theme.color} 
                            style = {[styles.newsPaper, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoDesignNews, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Ionicons 
                            name="logo-designernews" 
                            size={50} 
                            color= {theme.color}
                            style = {[styles.designNews, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoHacker, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <FontAwesome 
                            name="hacker-news" 
                            size={50} 
                            color= {theme.color}
                            style = {[styles.hackernews, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}/>
                    </TouchableOpacity>
                </View>
                {/*
                ======================
                F A V O R I T O S
                ======================*/}
                <TouchableOpacity style = {[styles.botonesTitulo, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                    <Text style = {[styles.containerText, {color:theme.color}]}>{t('Favoritos')}</Text> 
                </TouchableOpacity>
                <View style = {[styles.divierte, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                    <TouchableOpacity style = {[styles.fondoYouTube, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>    
                        <Entypo 
                            name="youtube"
                            size={50} 
                            color= {theme.color}
                            onPress={openYouTube}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoDiscord, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <FontAwesome6 
                            name="discord"
                            size={50} 
                            color= {theme.color}
                            onPress={openDiscord}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoWhats, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <FontAwesome 
                            name="whatsapp" 
                            size={50} 
                            color= {theme.color}
                            onPress={openWhatsapp} /> 
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
        flexDirection: "row",
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
