import React from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';



export default function Home(){
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
                <View style={styles.content}>
                    <Text style={styles.containerText}>Diviértete</Text> 
                </View>
                <View style={styles.divierte}>
                    <View style={styles.fondoIconGame}>
                        <Ionicons name="game-controller-outline" size={50} color="black" style={styles.game} />
                    </View>
                    <View style={styles.fondoIconMusic}>
                        <Ionicons name="musical-notes-outline" size={50} color="black" style={styles.music}/>
                    </View>
                    <View style={styles.fondoIconMovie}>
                        <FontAwesome name="file-movie-o" size={50} color="black" style={styles.movie}/>
                    </View>
                </View>
                <View style={styles.content}>
                    <Text style={styles.containerText}>Tus Redes</Text> 
                </View>
                <View style={styles.divierte}>
                    <View style={styles.fondoIconInsta}>
                        <Entypo name="instagram" size={50} color="black" style={styles.insta}/>
                    </View>
                    <View style={styles.fondoIconTwitter}>
                        <Entypo name="twitter" size={50} color="black" style={styles.twitter}/>
                    </View>
                    <View style={styles.fondoIconFacebok}>
                        <Entypo name="facebook" size={50} color="black" style={styles.facebook}/>
                    </View>
                </View>
            
                <View style={styles.content}>
                    <Text style={styles.containerText}>Foros</Text> 
                </View>
                <View style={styles.divierte}>
                    <View style={styles.fondoIconReddit}>
                        <Ionicons name="logo-reddit" size={50} color="black" style={styles.reddit}/>
                    </View>
                    <View style={styles.fondoIconStack}>
                        <FontAwesome name="stack-overflow" size={50} color="black" style={styles.stack}/>
                    </View>
                </View>
                
                <View style={styles.content}>
                    <Text style={styles.containerText}>Noticias</Text> 
                </View>
                <View style={styles.divierte}>
                    
                </View>

                <View style={styles.content}>
                    <Text style={styles.containerText}>Favoritos</Text> 
                </View>
                <View style={styles.divierte}>
                    
                </View>
            </ScrollView>
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    scroll:{
        width: '100%',
    },
    scrollContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        backgroundColor: '#d3d3d3', 
        padding: 20, 
        borderRadius: 20, 
        marginTop: 20, 
        width: '80%',
    },
    containerText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "black"
    },
    divierte: {
        flexDirection: "row",
        //alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#d3d3d3', 
        padding: 50, 
        borderRadius: 20, 
        marginTop: 20, 
        width: '80%',
    },
    fondoIconMovie: {
        backgroundColor: "#fff",
        padding: 9,
        paddingHorizontal: 14,
        borderRadius: 25,
        marginLeft: "auto",
    },
    game:{
        
    },
    fondoIconMusic: {
        backgroundColor: "#fff",
        padding: 9,
        borderRadius: 25,
    },
    music: {
        
    },
    fondoIconGame: {
        backgroundColor: "#fff",
        padding: 9,
        borderRadius: 25,
        marginRight: "auto",
    },
    movie: {
        
    },
    fondoIconInsta: {
        backgroundColor: "#fff",
        padding: 9,
        borderRadius: 25,
        marginRight: "auto",
    },
    insta:{
     
    },
    fondoIconTwitter: {
        backgroundColor: "#fff",
        padding: 9,
        borderRadius: 25,
    },
    twitter: {
       
    },
    fondoIconFacebok: {
        backgroundColor: "#fff",
        padding: 9,
        borderRadius: 25,
        marginLeft: "auto",
    },
    facebook: {
    },
    fondoIconReddit: {
        backgroundColor: "#fff",
        padding: 9,
        borderRadius: 25,
        marginRight: "auto",
    },
    reddit:{
        
    },
    fondoIconStack: {
        backgroundColor: "#fff",
        padding: 9,
        borderRadius: 25,
        marginLeft: "auto",
    },
    stack: {
        
    },
})
