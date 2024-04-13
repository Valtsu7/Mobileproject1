// screens/shoppingList/ShoppingScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from './ShoppingListStyles';

const ShoppingScreen = ({ navigation }) => {
  const [shoppingLists, setShoppingLists] = useState([]);

  // Function to fetch shopping lists from AsyncStorage
  const fetchShoppingLists = async () => {
    try {
      const savedShoppingLists = await AsyncStorage.getItem('savedShoppingLists');
      if (savedShoppingLists) {
        setShoppingLists(JSON.parse(savedShoppingLists).reverse()); // Reverse the order
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

  const handleRefresh = () => {
    fetchShoppingLists();
  };

  // Function to handle the navigation to the details screen for a shopping list
  const handleShoppingListPress = (shoppingList) => {
    navigation.navigate('Selected list', { shoppingList });
  };

  return (
    <View style={style.shoppingListContainer}>
      <TouchableOpacity onPress={handleCreateNewShoppingList}>
        <Text style={style.button}>Create new shopping list</Text>
      </TouchableOpacity>

      {/* Show existing shopping lists */}
      
      <Text style={style.text}>Previously made shopping lists:</Text>
      <FlatList
  data={shoppingLists}
  renderItem={({ item }) => (
    <TouchableOpacity onPress={() => handleShoppingListPress(item)}>
      <View style={style.shoppingListItem}>
        <Text style={style.listName}>{item.name}</Text>
        <Text style={style.itemCount}>{item.items.length} items</Text>
      </View>
    </TouchableOpacity>
  )}
  keyExtractor={(item, index) => index.toString()}
/>
      <Button title="Refresh" onPress={handleRefresh} />
    </View>
  );
};

export default ShoppingScreen;
