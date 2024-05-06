import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { es } from 'date-fns/locale/es'; // Importar el idioma español de date-fns
import { format, addMonths, subMonths } from 'date-fns'; // Importar la función de formato de date-fns

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay(); // 0 (Sunday) - 6 (Saturday)
    const days = [];

    // Add empty placeholders for the days before the start of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }

    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedDate);

    return (
      <View style={styles.gridContainer}>
        {daysInMonth.map((date, index) => {
          if (date === null) {
            return <View key={index} style={styles.dateButton} />;
          } else {
            const isSelected = date.toDateString() === selectedDate.toDateString();
            return (
              <TouchableOpacity
                key={index}
                style={[styles.dateButton, isSelected && styles.selectedDateButton]}
                onPress={() => handleDatePress(date)}>
                <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>
                  {format(date, 'd', { locale: es })} {/* Formatear la fecha en castellano */}
                </Text>
              </TouchableOpacity>
            );
          }
        })}
      </View>
    );
  };

  const handleDatePress = (date) => {
    setSelectedDate(date);
  };

  const goToPreviousMonth = () => {
    setSelectedDate((prevDate) => subMonths(prevDate, 1));
  };

  const goToNextMonth = () => {
    setSelectedDate((prevDate) => addMonths(prevDate, 1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goToPreviousMonth} style={styles.navigationButton}>
          <Text style={styles.navigationButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{format(selectedDate, 'MMMM yyyy', { locale: es })}</Text>
        <TouchableOpacity onPress={goToNextMonth} style={styles.navigationButton}>
          <Text style={styles.navigationButtonText}>{'>'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.calendarContainer}>
        {/* Renderizar el calendario */}
        {renderCalendar()}
      </View>
      <Text style={styles.selectedDate}>
        Fecha seleccionada: {format(selectedDate, 'PPP', { locale: es })} {/* Formatear la fecha seleccionada en castellano */}
      </Text>
      {/* Aquí podrías agregar la lógica para mostrar las tareas correspondientes a la fecha seleccionada */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', // Alinear hacia arriba
    paddingHorizontal: 20,
    paddingTop: 20, // Espacio arriba del calendario
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  navigationButton: {
    borderRadius: 25,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  navigationButtonText: {
    fontSize: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  calendarContainer: {
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  dateButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 2,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
  },
  selectedDateButton: {
    backgroundColor: '#3399ff',
  },
  dateText: {
    fontSize: 20,
  },
  selectedDateText: {
    color: '#ffffff',
  },
  selectedDate: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Calendar;
