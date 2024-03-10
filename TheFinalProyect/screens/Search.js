import React from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';

export default function Search(){
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Search</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1
    }
})
