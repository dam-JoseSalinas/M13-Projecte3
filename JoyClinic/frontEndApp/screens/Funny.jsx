import React from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

export default function Funny(){
    const openSpotify = () => {
        const spotifyUrl = 'spotify:';
    
        Linking.canOpenURL(spotifyUrl).then(supported => {
            if (supported) {
                return Linking.openURL(spotifyUrl);
            } else {
                return Linking.openURL('https://spotify.com/');
            }}).catch(err => console.error('Error al abrir Spotify:', err));
    };
    const openAppleMusic = () => {
        const AppleMusicUrl = 'music.apple:';
    
        Linking.canOpenURL(AppleMusicUrl).then(supported => {
            if (supported) {
                return Linking.openURL(AppleMusicUrl);
            } else {
                return Linking.openURL('https://music.apple.com/');
            }}).catch(err => console.error('Error al abrir Apple Music:', err));
    };
    const openAmazon = () => {
        const amazonUrl = 'music.amazon:';
    
        Linking.canOpenURL(amazonUrl).then(supported => {
            if (supported) {
                return Linking.openURL(amazonUrl);
            } else {
                return Linking.openURL('https://music.amazon.es/');
            }}).catch(err => console.error('Error al abrir Amazon Music:', err));
    };
    const openYoutubeMusic = () => {
        const youtubeUrl = 'music.youtube:';
    
        Linking.canOpenURL(youtubeUrl).then(supported => {
            if (supported) {
                return Linking.openURL(youtubeUrl);
            } else {
                return Linking.openURL('https://music.youtube.com/');
            }}).catch(err => console.error('Error al abrir Youtube Music:', err));
    };
    const openNetflix= () => {
        const netflixUrl = 'netflix:';
    
        Linking.canOpenURL(netflixUrl).then(supported => {
            if (supported) {
                return Linking.openURL(netflixUrl);
            } else {
                return Linking.openURL('https://netflix.com/');
            }}).catch(err => console.error('Error al abrir Netflix:', err));
    };
    const openAmazonPrime= () => {
        const amazonPrime = 'primevideo:';
    
        Linking.canOpenURL(amazonPrime).then(supported => {
            if (supported) {
                return Linking.openURL(amazonPrime);
            } else {
                return Linking.openURL('https://primevideo.com/');
            }}).catch(err => console.error('Error al abrir Amazon Prime Video:', err));
    };
    const openFriv= () => {
        const friv = 'friv:';
    
        Linking.canOpenURL(friv).then(supported => {
            if (supported) {
                return Linking.openURL(friv);
            } else {
                return Linking.openURL('https://www.friv.com/');
            }}).catch(err => console.error('Error al abrir Friv:', err));
    };
    const openInfinity= () => {
        const infinity = 'infinityCraft:';
    
        Linking.canOpenURL(infinity).then(supported => {
            if (supported) {
                return Linking.openURL(infinity);
            } else {
                return Linking.openURL('https://neal.fun/infinite-craft/');
            }}).catch(err => console.error('Error al abrir Infinity Craft:', err));
    };
    const openTetris= () => {
        const tetris = 'tetris:';
    
        Linking.canOpenURL(tetris).then(supported => {
            if (supported) {
                return Linking.openURL(tetris);
            } else {
                return Linking.openURL('https://tetris.com/play-tetris');
            }}).catch(err => console.error('Error al abrir Tetris:', err));
    };
    return (
        <SafeAreaView style={styles.container}>
            {/*BODY*/}
            <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
                {/*
                ======================
                VIDEOJUEGOS
                ======================*/}
                {/*BOTON TITULO*/}
                <View style={styles.botonesTitulo}>
                    <Text style={styles.containerText}>Videojuegos</Text> 
                </View>
                {/*FILA DE BOTONES CON ICONO*/}
                <View style={styles.divierte} >
                    <TouchableOpacity style={styles.fondoIconGame}>
                        <Ionicons 
                            name="game-controller-outline" 
                            size={50} color="black" 
                            style={styles.game}
                            onPress={openFriv} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fondoIconMusic}>
                        <MaterialIcons 
                            name="games" 
                            size={50} 
                            color="black"
                            onPress={openInfinity} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fondoIconMovie}>
                        <MaterialCommunityIcons 
                            name="nintendo-game-boy" 
                            size={50} 
                            color="black"
                            onPress={openTetris}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fondoIconGame}>
                        <FontAwesome5 
                            name="gamepad" 
                            size={42} 
                            color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fondoIconMusic}>
                        <Ionicons 
                            name="game-controller-outline" 
                            size={50} color="black" 
                            style={styles.game} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fondoIconMovie}>
                        <Ionicons 
                            name="game-controller-outline" 
                            size={50} color="black" 
                            style={styles.game} />
                    </TouchableOpacity>
                </View>
                {/* nota: este conjunto de componentes de arriba puede reutilizarse tanto
                    en los siguientes elementos de boton-titulo con botones-icono, como
                    en los apartados de cada tematica de ocio, con la diferencia de que
                    en las vistas de ocio habra un scroll horizontal
                */}
                {/*
                ======================
                MÚSICA
                ======================*/}
                <View style={styles.botonesTitulo}>
                    <Text style={styles.containerText}>Música</Text> 
                </View>
                <View style={styles.divierte} >
                    <TouchableOpacity style={styles.fondoIconMusic}>
                        <Ionicons 
                            name="musical-notes-outline" 
                            size={50} color="black" 
                            style={styles.music}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fondoIconMusic}>
                        <Entypo 
                            name="spotify" 
                            size={50} 
                            color="black" 
                            onPress={openSpotify}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fondoIconMovie}>
                        <Fontisto 
                            name="applemusic" 
                            size={50} 
                            color="black" 
                            onPress={openAppleMusic}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fondoIconGame}>
                        <MaterialCommunityIcons 
                            name="shopping-music" 
                            size={50} 
                            color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fondoIconMusic}>
                        <AntDesign 
                            name="amazon" 
                            size={50} 
                            color="black"
                            onPress={openAmazon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fondoIconMovie}>
                        <Entypo 
                            name="youtube" 
                            size={50} 
                            color="black" 
                            onPress={openYoutubeMusic}/>
                    </TouchableOpacity>
                </View>
                {/*
                ======================
                SERIES  Y PELÍCULAS
                ======================*/}
                <View style={styles.botonesTitulo}>
                    <Text style={styles.containerText}>Plataformas de Streaming</Text> 
                </View>
                <View style={styles.divierte}>
                    <TouchableOpacity style={styles.fondoIconMovie}>
                        <MaterialCommunityIcons 
                            name="netflix" 
                            size={50} 
                            color="black" 
                            onPress={openNetflix}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fondoIconMovie}>
                        <FontAwesome6 
                            name="cc-amazon-pay" 
                            size={50} 
                            color="black" 
                            onPress={openAmazonPrime}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fondoIconMovie}>
                        <FontAwesome 
                            name="file-movie-o" 
                            size={50} color="black" 
                            style={styles.movie}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fondoIconMovie}>
                        <FontAwesome 
                            name="file-movie-o" 
                            size={50} color="black" 
                            style={styles.movie}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fondoIconMovie}>
                        <FontAwesome 
                            name="file-movie-o" 
                            size={50} color="black" 
                            style={styles.movie}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fondoIconMovie}>
                        <FontAwesome 
                            name="file-movie-o" 
                            size={50} color="black" 
                            style={styles.movie}/>
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

