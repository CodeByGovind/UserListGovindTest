import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchData();
    loadFavorites();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://reqres.in/api/users?page=2');
      const data = await response.json();
      setUsers(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadFavorites = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('favorites');
      if (jsonValue != null) {
        setFavorites(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleFavorite = async (user) => {
    let updatedFavorites = [];
    if (favorites.some(fav => fav.id === user.id)) {
      updatedFavorites = favorites.filter(fav => fav.id !== user.id);
    } else {
      updatedFavorites = [...favorites, user];
    }
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.Text}>{item.first_name} {item.last_name}</Text>
        <Text style={styles.Text1}>{item.email}</Text>
      </View>
      <TouchableOpacity onPress={() => toggleFavorite(item)}>
        <Text style={styles.favorite}>
          {favorites.some(fav => fav.id === item.id) ? '★' : '☆'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f0f0f0',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  Text: {
    fontSize: 19,
    fontWeight: '500',
    color: '#333',
  },
  Text1: {
    fontSize: 17,
    fontWeight: '500',
    color: '#666',
  },
  favorite: {
    fontSize: 24,
    fontWeight: '700',
    color: 'gold',
  },
});

export default UserList;
