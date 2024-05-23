import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import React, { useState,useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { EventRegister} from 'react-native-event-listeners'
import themeContext from "../themes/themeContext";

export default function Search(){
    const [text, setText] = useState('')

    const theme = useContext(themeContext)

    const [darkMode, setDarkMode] = useState(false)

    return (
        <ScrollView>
            <SafeAreaView style = {[styles.container, {backgroundColor:theme.background}]}>
                <View style = {[styles.content, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                    <View style = {[styles.search, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <TextInput 
                            style={styles.textInput}
                            placeholder="Buscador"
                            onChangeText={newText => setText(newText)}
                            defaultValue={text}
                            placeholderTextColor={theme.color}
                        />
                        <Ionicons 
                            style={styles.iconSearch}
                            name="search"
                            size={24}
                            color={theme.color}/>
                    </View>
                    <View style = {[styles.apartado, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <TouchableOpacity>
                            <View style = {[styles.div1, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                                <MaterialCommunityIcons 
                                    name="netflix" 
                                    size={40} 
                                    color={theme.color} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style = {[styles.div2, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                                <AntDesign 
                                    name="amazon" 
                                    size={40} 
                                    color={theme.color} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style = {[styles.div3, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                                <Entypo 
                                    name="spotify" 
                                    size={40} 
                                    color={theme.color} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style = {[styles.apartado, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <TouchableOpacity>
                            <View style = {[styles.div4, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>  
                                <Entypo 
                                    name="github" 
                                    size={40} 
                                    color= {theme.color} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style = {[styles.div5, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                                <MaterialCommunityIcons 
                                    name="google-maps" 
                                    size={40} 
                                    color={theme.color} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style = {[styles.div6, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                                <MaterialCommunityIcons 
                                    name="google-drive" 
                                    size={40} 
                                    color={theme.color} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style = {[styles.apartado, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                    <TouchableOpacity>
                        <View style = {[styles.div7, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>  
                            <MaterialCommunityIcons 
                                name="google-downasaur" 
                                size={40} 
                                color={theme.color} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style = {[styles.div8, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                            <Fontisto 
                                name="applemusic" 
                                size={40} 
                                color={theme.color} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style = {[styles.div9, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                            <FontAwesome5 
                                name="telegram" 
                                size={40} 
                                color={theme.color} />
                        </View>
                    </TouchableOpacity>
                    </View>
                    <View style = {[styles.apartado, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <TouchableOpacity>
                            <View style = {[styles.div10, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>  
                                <FontAwesome 
                                    name="linkedin" 
                                    size={40} 
                                    color={theme.color} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style = {[styles.div11, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                                <FontAwesome5 
                                    name="cc-apple-pay" 
                                    size={40} 
                                    color={theme.color} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style = {[styles.div12, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                                <FontAwesome5 
                                    name="tiktok" 
                                    size={40} 
                                    color={theme.color} />
                            </View>
                        </TouchableOpacity> 
                    </View>
                    <View style = {[styles.apartado, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <TouchableOpacity>
                            <View style = {[styles.div13, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>  
                                <MaterialCommunityIcons 
                                    name="apple-icloud" 
                                    size={40} 
                                    color={theme.color} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style = {[styles.div14, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                                <MaterialCommunityIcons 
                                    name="calculator" 
                                    size={40} 
                                    color={theme.color} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style = {[styles.div15, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                                <AntDesign 
                                    name="google" 
                                    size={40} 
                                    color={theme.color} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </SafeAreaView>
        </ScrollView>
        
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
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: '#d3d3d3',
        padding: 6,
        borderRadius: 20,
        width: '90%',
        borderWidth: 1,
    },
    textInput: {
        flex: 1,
        alignItems: 'center',
        padding: 0,
    },
    iconSearch: {
        marginLeft: "auto",
    },
    apartado: {
        top: 20,
        flexDirection: 'row',
        justifyContent: "space-evenly", 
    },
    div1: {
        alignItems: 'center',
        backgroundColor: '#d3d3d3', 
        padding: 25, 
        paddingHorizontal: 40, 
        borderRadius: 20, 
        marginTop: 20, 
        width: '100%',
        borderWidth: 1,
    },
    div2: {
        alignItems: 'center',
        backgroundColor: '#d3d3d3', 
        padding: 25, 
        paddingHorizontal: 40, 
        borderRadius: 20, 
        marginTop: 20, 
        width: '100%',
        borderWidth: 1,
    },
    div3: {
        alignItems: 'center',
        backgroundColor: '#d3d3d3', 
        padding: 25, 
        paddingHorizontal: 40, 
        borderRadius: 20, 
        marginTop: 20, 
        width: '100%',
        borderWidth: 1,
    },
    div4: {
        alignItems: 'center',
        backgroundColor: '#d3d3d3', 
        padding: 25,
        paddingHorizontal: 40, 
        borderRadius: 20, 
        marginTop: 20, 
        width: '100%',
        borderWidth: 1,
    },
    div5: {
        alignItems: 'center',
        backgroundColor: '#d3d3d3', 
        padding: 25, 
        paddingHorizontal: 40, 
        borderRadius: 20, 
        marginTop: 20, 
        width: '100%',
        borderWidth: 1,
    },
    div6: {
        alignItems: 'center',
        backgroundColor: '#d3d3d3', 
        padding: 25, 
        paddingHorizontal: 40, 
        borderRadius: 20, 
        marginTop: 20, 
        width: '100%',
        borderWidth: 1,
    },
    div7: {
        alignItems: 'center',
        backgroundColor: '#d3d3d3', 
        padding: 25, 
        paddingHorizontal: 40, 
        borderRadius: 20, 
        marginTop: 20, 
        width: '100%',
        borderWidth: 1,
    },
    div8: {
        alignItems: 'center',
        backgroundColor: '#d3d3d3', 
        padding: 25, 
        paddingHorizontal: 40, 
        borderRadius: 20, 
        marginTop: 20, 
        width: '100%',
        borderWidth: 1,
    },
    div9: {
        alignItems: 'center',
        backgroundColor: '#d3d3d3', 
        padding: 25, 
        paddingHorizontal: 40, 
        borderRadius: 20, 
        marginTop: 20, 
        width: '100%',
        borderWidth: 1,
    },
    div10: {
        alignItems: 'center',
        backgroundColor: '#d3d3d3', 
        padding: 25, 
        paddingHorizontal: 40, 
        borderRadius: 20, 
        marginTop: 20, 
        width: '100%',
        borderWidth: 1,
    },
    div11: {
        alignItems: 'center',
        backgroundColor: '#d3d3d3', 
        padding: 25, 
        paddingHorizontal: 40, 
        borderRadius: 20, 
        marginTop: 20, 
        width: '100%',
        borderWidth: 1,
    },
    div12: {
        alignItems: 'center',
        backgroundColor: '#d3d3d3', 
        padding: 25, 
        paddingHorizontal: 40, 
        borderRadius: 20, 
        marginTop: 20, 
        width: '100%',
        borderWidth: 1,
    },
    div13: {
        alignItems: 'center',
        backgroundColor: '#d3d3d3', 
        padding: 25, 
        paddingHorizontal: 40, 
        borderRadius: 20, 
        marginTop: 20, 
        width: '100%',
        borderWidth: 1,
    },
    div14: {
        alignItems: 'center',
        backgroundColor: '#d3d3d3', 
        padding: 25, 
        paddingHorizontal: 40, 
        borderRadius: 20, 
        marginTop: 20, 
        width: '100%',
        borderWidth: 1,
    },
    div15: {
        alignItems: 'center',
        backgroundColor: '#d3d3d3', 
        padding: 25, 
        paddingHorizontal: 40, 
        borderRadius: 20, 
        marginTop: 20, 
        width: '100%',
        borderWidth: 1,
    },
})
