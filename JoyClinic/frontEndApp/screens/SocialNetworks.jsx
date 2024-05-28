import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import themeContext from "../themes/themeContext";
import { useTranslation } from 'react-i18next';
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function SocialNetworks(){
    const theme = useContext(themeContext)
    const { t } = useTranslation();
    const [darkMode, setDarkMode] = useState(false)

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
            <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
                <View style={[styles.botonesTitulo, {backgroundColor: theme.background, borderColor: theme.lineColor}]}>
                    <Text style={[styles.containerText, {color: theme.color}]}>{t('Redes Sociales')}</Text> 
                </View>
                <View style={[styles.divierte, {backgroundColor: theme.background, borderColor: theme.lineColor}]}>
                    <TouchableOpacity style={[styles.fondoIcon, {backgroundColor: theme.background, borderColor: theme.lineColor}]}>
                        <Entypo 
                            name="instagram" 
                            size={50} 
                            color={theme.color} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.fondoIcon, {backgroundColor: theme.background, borderColor: theme.lineColor}]}>
                        <Entypo 
                            name="twitter" 
                            size={50} 
                            color={theme.color} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.fondoIcon, {backgroundColor: theme.background, borderColor: theme.lineColor}]}>
                        <Entypo 
                        name="facebook" 
                        size={50} 
                        color={theme.color} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.fondoIcon, {backgroundColor: theme.background, borderColor: theme.lineColor}]}>
                        <FontAwesome 
                        name="whatsapp" 
                        size={55} 
                        color={theme.color} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.fondoIcon, {backgroundColor: theme.background, borderColor: theme.lineColor}]}>
                        <FontAwesome 
                        name="telegram" 
                        size={50} 
                        color={theme.color} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.fondoIcon, {backgroundColor: theme.background, borderColor: theme.lineColor}]}>
                        <FontAwesome6 
                            name="discord"
                            size={50} 
                            color= {theme.color}
                            //onPress={openDiscord}
                            />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.fondoIcon, {backgroundColor: theme.background, borderColor: theme.lineColor}]}>
                        <Entypo 
                            name="youtube"
                            size={50} 
                            color= {theme.color}
                            //onPress={openYouTube}
                            />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.fondoIcon, {backgroundColor: theme.background, borderColor: theme.lineColor}]}>
                        <FontAwesome5 
                            name="tiktok" 
                            size={50} 
                            color={theme.color} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.fondoIcon, {backgroundColor: theme.background, borderColor: theme.lineColor}]}>
                        <AntDesign 
                            name="linkedin-square" 
                            size={50}
                            color={theme.color} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.fondoIcon, {backgroundColor: theme.background, borderColor: theme.lineColor}]}>
                        <FontAwesome5 
                            name="snapchat" 
                            size={50} 
                            color={theme.color}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.fondoIcon, {backgroundColor: theme.background, borderColor: theme.lineColor}]}>
                        <Entypo 
                            name="pinterest" 
                            size={50} 
                            color={theme.color} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.fondoIcon, {backgroundColor: theme.background, borderColor: theme.lineColor}]}>
                        <FontAwesome5 
                            name="twitch" 
                            size={50} 
                            color={theme.color}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.fondoIcon, {backgroundColor: theme.background, borderColor: theme.lineColor}]}>
                        <FontAwesome5 
                            name="kickstarter" 
                            size={50} 
                            color={theme.color} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.fondoIcon, {backgroundColor: theme.background, borderColor: theme.lineColor}]}>
                        <Entypo 
                            name="spotify" 
                            size={50} 
                            color={theme.color}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.fondoIcon, {backgroundColor: theme.background, borderColor: theme.lineColor}]}>
                        <AntDesign 
                            name="github" 
                            size={50} 
                            color={theme.color} />
                    </TouchableOpacity>
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
    scroll: {
        width: '100%',
    },
    scrollContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
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
        flexWrap: "wrap", 
        //justifyContent: "space-evenly", 
        backgroundColor: '#d3d3d3', 
        padding: 20, 
        borderRadius: 20, 
        marginTop: 20, 
        width: '80%',
        borderWidth: 1,
    },
    fondoIcon: {
        marginHorizontal: 4,
        marginVertical: 15,
        flexBasis: '30%',
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: "#fff",
        padding: 9,
        borderRadius: 25,
        borderWidth: 1,
        margin: '1%',
        alignItems: 'center',
    },
});
