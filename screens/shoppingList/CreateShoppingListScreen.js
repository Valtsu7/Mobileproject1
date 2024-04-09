// screens/shoppingList/CreateShoppingListScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from '../../style/style';


const CreateShoppingListScreen = () => {
  const [shoppingListName, setShoppingListName] = useState('');
  const [items, setItems] = useState(['']); // Initial state with one empty item

  const saveShoppingList = async () => {
    try {
      // Filter out empty items
      const filteredItems = items.filter(item => item.trim() !== '');

      // Create shopping list object
      const newShoppingList = {
        name: shoppingListName,
        items: filteredItems
      };

      // Fetch existing shopping lists from AsyncStorage
      const existingLists = await AsyncStorage.getItem('savedShoppingLists');
      const parsedLists = existingLists ? JSON.parse(existingLists) : [];

      // Add the new shopping list to the existing lists
      const updatedLists = [...parsedLists, newShoppingList];

      // Save the updated lists back to AsyncStorage
      await AsyncStorage.setItem('savedShoppingLists', JSON.stringify(updatedLists));

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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Create a New Shopping List</Text>
      <TextInput
        style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        onChangeText={text => setShoppingListName(text)}
        value={shoppingListName}
        placeholder="Enter shopping list name"
      />
      <ScrollView style={style.scrollView}>
        {items.map((item, index) => (
          <TextInput
            key={index}
            style={{ height: 40, width: 200, borderColor: 'gray', borderBottomWidth: 1, marginBottom: 10 }}
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
