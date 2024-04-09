// screens/shoppingList/BrowseShoppingListsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from '../../style/style';

const BrowseShoppingListsScreen = ({ navigation }) => {
  const [shoppingLists, setShoppingLists] = useState([]);

  // Function to fetch shopping lists from AsyncStorage
  const fetchShoppingLists = async () => {
    try {
      const savedShoppingLists = await AsyncStorage.getItem('savedShoppingLists');
      if (savedShoppingLists) {
        setShoppingLists(JSON.parse(savedShoppingLists));
      }
    } catch (error) {
      console.error('Error fetching shopping lists:', error);
    }
  };

  // Fetch shopping lists when the component mounts
  useEffect(() => {
    fetchShoppingLists();
  }, []);

  // Function to refresh shopping lists
  const handleRefresh = () => {
    fetchShoppingLists();
  };

  return (
    <View style={style.shoppingListContainer}>
      <Text style={style.title}>Shopping Lists</Text>
      <FlatList
        data={shoppingLists}
        renderItem={({ item }) => (
          <Text onPress={() => navigation.navigate('Selected list', { shoppingList: item })}>
            {item.name}
          </Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button style={style.button} title="Refresh" onPress={handleRefresh} />
    </View>
  );
};

export default BrowseShoppingListsScreen;
