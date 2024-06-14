import React, { useState, useEffect } from 'react';
import { useColorScheme } from 'nativewind';
import { StyleSheet } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import ProfileProvider from './hooks/ProfileProvider';
import Navigation from './Navigation';
import themeContext from './themes/themeContext';
import theme from './themes/theme';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const { colorScheme, toggleColorScheme } = useColorScheme();

  useEffect(() => {
    const listener = EventRegister.addEventListener('ChangeTheme', (data) => {
      setDarkMode(data);
    });
    return () => {
      EventRegister.removeEventListener(listener);
    };
  }, []);

  return (
    <ProfileProvider>
      <themeContext.Provider value={darkMode ? theme.dark : theme.light}>
        
        <Navigation />
      </themeContext.Provider>
    </ProfileProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
