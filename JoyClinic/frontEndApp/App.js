import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import { EventRegister } from 'react-native-event-listeners';
import theme from './themes/theme';
import themeContext from './themes/themeContext';
import ProfileProvider from './screens/ProfileProvider';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

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
