const theme = {
    light: {
        theme: '#FFFFFF', // Color de fondo en modo claro
        color: '#333333', // Color de texto principal en modo claro
        background: '#DEDEDE', // Color de fondo en modo claro
        lineColor: '#333333', // Color de líneas y bordes en modo claro
        calendarTodayTextColor: '#00adf5', // Color del texto para la fecha de hoy en modo claro
        logo: require('../assets/images/Logo/logoBlanco.png'), // Logo en modo claro
        input: '#fffafa',
    },
    dark: {
        theme: '#000', // Color de fondo en modo oscuro
        color: '#FFFFFF', // Color de texto principal en modo oscuro
        background: '#2c2c2c', // Color de fondo en modo oscuro
        lineColor: '#4D4D4D', // Color de líneas y bordes en modo oscuro
        calendarTodayTextColor: '#1E90FF', // Color del texto para la fecha de hoy en modo oscuro
        logo: require('../assets/images/Logo/logoNegro.png'), // Logo en modo oscuro
        input: '#000000',
    }
}

export default theme;
