import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import { EventRegister } from 'react-native-event-listeners';
import theme from './themes/theme';
import themeContext from './themes/themeContext';
import ProfileProvider from './screens/ProfileProvider';
import './config/i18n';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();
  
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
