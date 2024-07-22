import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import FavoriteList from './srccode/FavoriteList';
import UserList from './srccode/UserList';

const App = () => {
  const [showFavorites, setShowFavorites] = React.useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowFavorites(!showFavorites)}
      >
        <Text style={styles.buttonText}>
          {showFavorites ? "Show All Users" : "Show Favorites"}
        </Text>
      </TouchableOpacity>
      {showFavorites ? <FavoriteList /> : <UserList />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    marginTop:20
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default App;
