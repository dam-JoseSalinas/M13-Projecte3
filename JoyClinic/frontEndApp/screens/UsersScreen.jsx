import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import './config/i18n'; // Importa el archivo i18n.js

const UsersScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://192.168.19.129:8000/api/v1/registros/');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        throw new Error('Error fetching users data');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Hubo un problema al obtener los datos de usuarios.');
    }
  };

  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('Usuarios Registrados')}</Text>
      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Image
              source={{ uri: item.photo }}
              style={styles.profileImage}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.name} {item.surname}</Text>
              <Text style={styles.userEmail}>{item.email}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
});

export default UsersScreen;
