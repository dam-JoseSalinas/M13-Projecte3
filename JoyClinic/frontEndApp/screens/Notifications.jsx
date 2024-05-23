import React, { useState,useContext } from 'react';
import { View, Text } from 'react-native';
import { EventRegister} from 'react-native-event-listeners'
import themeContext from "../themes/themeContext";

export default function Notifications() {

  const theme = useContext(themeContext)

  const [darkMode, setDarkMode] = useState(false)

  return (
    <View style={{ flex: 1 ,backgroundColor:theme.background, justifyContent: 'center', alignItems: 'center' }}>
      <Text style = {[{color:theme.color}]}>New Screen 1</Text>
    </View>
  );
}

