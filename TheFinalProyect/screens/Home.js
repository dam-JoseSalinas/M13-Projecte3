import React from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';

export default function Home(){
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.containerText}>Diviertete</Text> 
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
        //backgroundColor: '#d3d3d3',
    },
    content: {
        alignItems: 'center',
        backgroundColor: '#d3d3d3', 
        padding: 25, 
        borderRadius: 20, 
        marginTop: 20, 
        width: '80%',
    },
    containerText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "black"
    }
})
