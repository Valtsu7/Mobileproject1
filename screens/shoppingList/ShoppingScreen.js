import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShoppingList from '../../components/Shoppinglist'; // Adjust the import path as needed

const ShoppingScreen = () => {
  const [item, setItem] = useState('');
  const [shoppingList, setShoppingList] = useState(new ShoppingList());

  const addItemToShoppingList = () => {
    if (item.trim() !== '') {
      shoppingList.addItem(item);
      setItem('');
      // No need to spread the shoppingList here
      setShoppingList(shoppingList); // Update state
    }
  };

  const removeItemFromShoppingList = (item) => {
    shoppingList.removeItem(item);
    setShoppingList(shoppingList); // Update state
  };
  const saveShoppingList = async () => {
    try {
      // Save the shopping list data to AsyncStorage
      await AsyncStorage.setItem('shoppingList', JSON.stringify(shoppingList.getItems()));
      Alert.alert('Shopping List Saved', 'Your shopping list has been saved.');
    } catch (error) {
      console.error('Error saving shopping list:', error);
      Alert.alert('Error', 'Failed to save shopping list.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Here you can create new shopping lists to simplify your cooking experience!</Text>
      <FlatList
        data={shoppingList.items} // Access the items directly
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>{item}</Text>
            <Button title="Remove" onPress={() => removeItemFromShoppingList(item)} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        style={{marginBottom: 100, height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setItem(text)}
        value={item}
        placeholder="Enter item"
      />
      <Button title="Add Item" onPress={addItemToShoppingList} />
      <Button title="Save" onPress={saveShoppingList} /> 
    </View>
  );
};

export default ShoppingScreen;
