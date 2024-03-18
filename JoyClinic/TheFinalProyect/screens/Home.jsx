import React from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 

const Tab = createBottomTabNavigator(); 

export default function Home(){
    const navigation = useNavigation();

    const buttonHaveFun = () => {
        navigation.navigate('Funny');
    }
    const buttonSocial = () => {
        navigation.navigate('SocialNetworks');
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
                <TouchableOpacity style={styles.contentDiviertete} onPress={buttonHaveFun}>
                    <Text style={styles.containerText}>Diviértete</Text> 
                </TouchableOpacity>
                <View style={styles.divierte} >
                    <TouchableOpacity style={styles.fondoIconGame}>
                        <Ionicons name="game-controller-outline" size={50} color="black" style={styles.game} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fondoIconMusic}>
                        <Ionicons name="musical-notes-outline" size={50} color="black" style={styles.music}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fondoIconMovie}>
                        <FontAwesome name="file-movie-o" size={50} color="black" style={styles.movie}/>
                    </TouchableOpacity>
                </View>
                    <TouchableOpacity style={styles.contentRedes} onPress={buttonSocial}>
                        <Text style={styles.containerText}>Tus Redes</Text> 
                    </TouchableOpacity>
                <View style={styles.divierte}>
                    <TouchableOpacity style={styles.fondoIconInsta}>
                        <Entypo name="instagram" size={50} color="black" style={styles.insta}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fondoIconTwitter}>
                        <Entypo name="twitter" size={50} color="black" style={styles.twitter}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fondoIconFacebok}>
                        <Entypo name="facebook" size={50} color="black" style={styles.facebook}/>
                    </TouchableOpacity>
                </View>
            
                <TouchableOpacity style={styles.contentForos}>
                    <Text style={styles.containerText}>Foros</Text> 
                </TouchableOpacity>
                <View style={styles.divierte}>
                    <TouchableOpacity style={styles.fondoIconReddit}>
                        <Ionicons name="logo-reddit" size={50} color="black" style={styles.reddit}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fondoIconSlideshare}>
                        <Entypo name="slideshare" size={50} color="black" style={styles.slide}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fondoIconStack}>
                        <FontAwesome name="stack-overflow" size={50} color="black" style={styles.stack}/>
                    </TouchableOpacity>
                </View>
                
                <TouchableOpacity style={styles.contentNoticias}>
                    <Text style={styles.containerText}>Noticias</Text> 
                </TouchableOpacity>
                <View style={styles.divierte}>
                    <TouchableOpacity style={styles.fondoNewsPaper}>    
                        <FontAwesome name="newspaper-o" size={45} color="black" styles={styles.newsPaper}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fondoDesignNews}>
                        <Ionicons name="logo-designernews" size={50} color="black" styles={styles.designNews}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fondoHacker}>
                        <FontAwesome name="hacker-news" size={50} color="black" style={styles.hackerNews}/>
                    </TouchableOpacity>
                </View>
                    

                <TouchableOpacity style={styles.contentFavoritos}>
                    <Text style={styles.containerText}>Favoritos</Text> 
                </TouchableOpacity>
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
    contentDiviertete: {
        alignItems: 'center',
        backgroundColor: '#d3d3d3', 
        padding: 20, 
        borderRadius: 20, 
        marginTop: 20, 
        width: '80%',
        borderWidth: 1,
    },
    contentRedes: {
        alignItems: 'center',
        backgroundColor: '#d3d3d3', 
        padding: 20, 
        borderRadius: 20, 
        marginTop: 20, 
        width: '80%',
        borderWidth: 1,
    },
    contentForos: {
        alignItems: 'center',
        backgroundColor: '#d3d3d3', 
        padding: 20, 
        borderRadius: 20, 
        marginTop: 20, 
        width: '80%',
        borderWidth: 1,
    },
    contentNoticias: {
        alignItems: 'center',
        backgroundColor: '#d3d3d3', 
        padding: 20, 
        borderRadius: 20, 
        marginTop: 20, 
        width: '80%',
        borderWidth: 1,
    },
    contentFavoritos: {
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
    }
})
