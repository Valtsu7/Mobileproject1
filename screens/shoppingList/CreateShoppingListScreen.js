// screens/shoppingList/CreateShoppingListScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from '../../style/style';

const CreateShoppingListScreen = ({ navigation }) => {
  const [shoppingListName, setShoppingListName] = useState('');
  const [items, setItems] = useState(['']); // Initial state with one empty item

  // Function to update shopping lists state in ShoppingScreen after saving
  const updateShoppingListsState = async (newShoppingList) => {
    try {
      const savedShoppingLists = await AsyncStorage.getItem('savedShoppingLists');
      if (savedShoppingLists) {
        const parsedLists = JSON.parse(savedShoppingLists);
        const updatedLists = [...parsedLists, newShoppingList];
        await AsyncStorage.setItem('savedShoppingLists', JSON.stringify(updatedLists));
      } else {
        await AsyncStorage.setItem('savedShoppingLists', JSON.stringify([newShoppingList]));
      }
    } catch (error) {
      console.error('Error updating shopping lists state:', error);
    }
  };

  const saveShoppingList = async () => {
    try {
      // Filter out empty items
      const filteredItems = items.filter(item => item.trim() !== '');

      // Create shopping list object
      const newShoppingList = {
        name: shoppingListName,
        items: filteredItems
      };

      // Save the new shopping list
      await AsyncStorage.setItem('savedShoppingLists', JSON.stringify([newShoppingList]));

      // Update shopping lists state in ShoppingScreen
      updateShoppingListsState(newShoppingList);

      Alert.alert('Success', 'Shopping list saved successfully.');
    } catch (error) {
      console.error('Error saving shopping list:', error);
      Alert.alert('Error', 'Failed to save shopping list.');
    }
  };

  const addItem = () => {
    setItems([...items, '']);
  };

  const updateItem = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index] = value;
    setItems(updatedItems);
  };

  return (
    <View style={style.shoppingListContainer}>
      <Text style={style.title}>Create a New Shopping List</Text>
      <TextInput
        style={style.input}
        onChangeText={text => setShoppingListName(text)}
        value={shoppingListName}
        placeholder="Enter shopping list name"
      />
      <ScrollView style={style.scrollView}>
        {items.map((item, index) => (
          <TextInput
            key={index}
            style={style.inputItem}
            onChangeText={text => updateItem(index, text)}
            value={item}
            placeholder={`Item ${index + 1}`}
          />
        ))}
      </ScrollView>
      <Button title="Add Item" onPress={addItem} />
      <Button title="Save Shopping List" onPress={saveShoppingList} />
    </View>
  );
};

export default CreateShoppingListScreen;
