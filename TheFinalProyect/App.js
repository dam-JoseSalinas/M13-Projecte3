import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';


const App = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('/Users/Sebastian/Documents/DAM/M12-13/Proyecto final/M13_Projecte2/Proyecto Final/TheFinalProyect/Logo/logoNegro.png')}
        style={styles.logo}
        resizeMode='contain'
      />
      {/*<Text style={styles.title}>JoyClinic</Text>*/}
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    paddingTop: 250,
  },

  title: {
    fontSize: 30,
    fontFamily: "System",
    color: "#fff",
  },

  logo: {
    width: 200,
    height: 200,
  },
});

export default App;
