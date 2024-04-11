// screens/shoppingList/ShoppingScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from '../../style/style';

const ShoppingScreen = ({ navigation }) => {
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

  useEffect(() => {
    fetchShoppingLists();
  }, []); // Fetch shopping lists when component mounts

  // Function to handle the press of the "Create new shopping list" button
  const handleCreateNewShoppingList = () => {
    navigation.navigate('Create Shopping List');
  };

  // Function to handle the navigation to the details screen for a shopping list
  const handleShoppingListPress = (shoppingList) => {
    navigation.navigate('Selected list', { shoppingList });
  };

  return (
    <View style={style.shoppingListContainer}>
      <TouchableOpacity onPress={handleCreateNewShoppingList}>
        <Text style={style.text}>Create new shopping list</Text>
      </TouchableOpacity>

      {/* Show existing shopping lists */}
      <Text style={style.title}>Previously Made Shopping Lists</Text>
      <FlatList
        data={shoppingLists}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleShoppingListPress(item)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default ShoppingScreen;
