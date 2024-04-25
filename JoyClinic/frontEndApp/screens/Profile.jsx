import {View, Text, Image, TouchableOpacity, useWindowDimensions, FlatList, TextInput } from "react-native";
import React, { useState, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";
  
const Profile = () => {    
  return (
    <SafeAreaView style={styles.container}>    
        <View style={styles.contender1}>
            <Ionicons 
                style={styles.profile}
                name="person-circle-outline" 
                size={70} 
                color="black" />
            <View style={styles.datos}>
                <Text style={styles.texts}>Anthony Sebatian Palenque Arias</Text>
                <Text style={styles.texts}>Desarrollador de aplicaciones</Text>
                <View style={styles.location}>
                    <View style={styles.divLocation}>
                        <Text style={styles.texts}>Spain-Barcelona</Text>
                    </View>
                    <Entypo
                        style={styles.locationIcon}
                        name="location-pin"
                        size={20}
                        color="black"/>
                </View>
            </View>
        </View>
        <View 
            style={styles.line}>
        </View>
        <View style={styles.contender2}>
            <TouchableOpacity style={styles.buttonEditProfile}>
                <Text style={styles.textButton}>
                    Editar Perfil
                </Text>
            </TouchableOpacity>    
            <TouchableOpacity style={styles.button}>
                <Text style={styles.textButton}>
                    Compartir Perfil
                </Text>
            </TouchableOpacity> 
        </View>
    </SafeAreaView>
    );
  };
export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contender1: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20, 
  },
  profile: {
    width: "30%",
  },
  datos: {
    flex: 1,
  },
  location: {
    flexDirection: "row",
    alignItems: "center", 
  },
  locationIcon: {
    marginRight: 5, 
  },
  divLocation: {
    //flex: 1,
  },
  texts: {
    fontWeight: '300',
  },
  line: {
    alignSelf: "center",
    backgroundColor: 'black',
    padding: 0.000000001,
    width: '95%',
    borderRadius: 100,
    borderWidth: 1,
  },
  contender2: {
    flexDirection: "row",
    justifyContent: "space-evenly", 
  },
  buttonEditProfile: {
    alignSelf: "flex-start",
    marginTop: 10, 
    backgroundColor: '#d3d3d3',
    padding: 10,
    width: '40%',
    borderRadius: 15,
    borderWidth: 1,
    alignItems: "center"
  },
  button: {
    alignSelf: "flex-start",
    marginTop: 10, 
    backgroundColor: '#d3d3d3',
    padding: 10,
    width: '40%',
    borderRadius: 15,
    borderWidth: 1,
    alignItems: "center"
  },
  textButton: {
    fontWeight: '300',
  },
});