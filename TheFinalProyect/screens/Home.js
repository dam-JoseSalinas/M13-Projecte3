import React from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';

export default function Home(){
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text>Home</Text>
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
        justifyContent: 'center',
        alignItems: 'center'
    },
})
