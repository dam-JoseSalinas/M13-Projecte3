import React from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';

export default function Home(){
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1
    }
})
