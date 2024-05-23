import React , {useState, useEffect}from 'react';
import Navigation from './Navigation';
import { EventRegister} from 'react-native-event-listeners'
import theme from './themes/theme';
import themeContext from './themes/themeContext';
 

/*Componenete principal y entrypoint que define navegacion y estructura*/
export default function App() {

  const [darkMode, setDarkMode] = useState(false)

  useEffect(() =>{
    const listener = EventRegister.addEventListener('ChangeTheme', (data) =>{
      setDarkMode(data); 
    })
  })
  return (<themeContext.Provider value = {darkMode === true? theme.dark : theme.light}>
    <Navigation/>
  </themeContext.Provider>);
}

