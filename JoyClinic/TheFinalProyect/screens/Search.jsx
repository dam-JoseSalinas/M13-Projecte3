import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function Search(){
    const [text, setText] = useState('')
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.search}>
                    <TextInput 
                        style={styles.textInput}
                        placeholder="Buscador"
                        onChangeText={newText => setText(newText)}
                        defaultValue={text}
                    />
                    <Ionicons 
                        style={styles.iconSearch}
                        name="search"
                        size={24}
                        color="black"/>
                </View>
                <View style={styles.apartado}>
                    <TouchableOpacity>
                        <View style={styles.div1}>
                            <MaterialCommunityIcons name="netflix" size={40} color="black" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.div2}>
                            <AntDesign name="amazon" size={40} color="black" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.div3}>
                            <Entypo name="spotify" size={40} color="black" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.apartado}>
                    <TouchableOpacity>
                        <View style={styles.div4}>  
                            <Entypo name="github" size={40} color="black" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.div5}>
                            <MaterialCommunityIcons name="google-maps" size={40} color="black" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.div6}>
                            <MaterialCommunityIcons name="google-drive" size={40} color="black" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.apartado}>
                <TouchableOpacity>
                    <View style={styles.div7}>  
                        <MaterialCommunityIcons name="google-downasaur" size={40} color="black" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.div8}>
                        <Fontisto name="applemusic" size={40} color="black" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.div9}>
                        <FontAwesome5 name="telegram" size={40} color="black" />
                    </View>
                </TouchableOpacity>
                </View>
                <View style={styles.apartado}>
                    <TouchableOpacity>
                        <View style={styles.div10}>  
                            <FontAwesome name="linkedin" size={40} color="black" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.div11}>
                            <FontAwesome5 name="cc-apple-pay" size={40} color="black" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.div12}>
                            <FontAwesome5 name="tiktok" size={40} color="black" />
                        </View>
                    </TouchableOpacity> 
                </View>
                <View style={styles.apartado}>
                    <TouchableOpacity>
                        <View style={styles.div13}>  
                            <MaterialCommunityIcons name="apple-icloud" size={40} color="black" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.div14}>
                            <MaterialCommunityIcons name="calculator" size={40} color="black" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.div15}>
                            <AntDesign name="google" size={40} color="black" />
                        </View>
                    </TouchableOpacity>
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
