import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

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
    }
})
