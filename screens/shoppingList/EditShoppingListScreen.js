// screens/shoppingList/EditShoppingListScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from '../../style/style';


const EditShoppingListScreen = ({ route, navigation }) => {
  const { shoppingList } = route.params;
  const [editedName, setEditedName] = useState(shoppingList.name);
  const [editedItems, setEditedItems] = useState(shoppingList.items.join('\n'));

  console.log('editedName:', editedName);
  console.log('editedItems:', editedItems);

  const handleSaveChanges = async () => {
    try {
      // Split the edited items string into an array
      const editedItemsArray = editedItems.split('\n').filter(item => item.trim() !== '');
      // Update the shopping list with edited details
      const updatedShoppingList = {
        ...shoppingList,
        name: editedName,
        items: editedItemsArray,
      };
      // Save the updated shopping list in AsyncStorage
      await updateShoppingList(updatedShoppingList);
      // Navigate back to the previous screen
      navigation.goBack();
    } catch (error) {
      console.error('Error saving changes:', error);
      Alert.alert('Error', 'Failed to save changes.');
    }
  };

  const handleRemoveList = async () => {
    try {
      // Retrieve the existing shopping lists from AsyncStorage
      const existingShoppingLists = await AsyncStorage.getItem('savedShoppingLists');
      let updatedShoppingLists = [];
      if (existingShoppingLists) {
        updatedShoppingLists = JSON.parse(existingShoppingLists).filter(list => list.name !== shoppingList.name);
      }
      // Save the updated shopping lists back to AsyncStorage
      await AsyncStorage.setItem('savedShoppingLists', JSON.stringify(updatedShoppingLists));
      // Navigate back to the previous screen
      navigation.goBack();
    } catch (error) {
      console.error('Error removing shopping list:', error);
      Alert.alert('Error', 'Failed to remove shopping list.');
    }
  };

  const updateShoppingList = async (updatedList) => {
    try {
      // Retrieve the existing shopping lists from AsyncStorage
      const existingShoppingLists = await AsyncStorage.getItem('savedShoppingLists');
      let updatedShoppingLists = [];
      if (existingShoppingLists) {
        updatedShoppingLists = JSON.parse(existingShoppingLists).map(list => {
          // If the list name matches the edited list, replace it with the updated list
          if (list.name === shoppingList.name) {
            return updatedList;
          }
          return list;
        });
      }
      // Save the updated shopping lists back to AsyncStorage
      await AsyncStorage.setItem('savedShoppingLists', JSON.stringify(updatedShoppingLists));
    } catch (error) {
      console.error('Error updating shopping list:', error);
      throw error; // Propagate error for handling
    }
  };

  return (
    <View>
      <Text style={style.text}>Edit Shopping List</Text>
      <TextInput
        value={editedName}
        onChangeText={setEditedName}
        placeholder="Shopping List Name"
      />
      <TextInput
        value={editedItems}
        onChangeText={setEditedItems}
        placeholder="Enter items (one per line)"
        multiline
      />
      <Button title="Save Changes" onPress={handleSaveChanges} />
      <Button title="Remove List" onPress={handleRemoveList} color="red" />
    </View>
  );
};

export default EditShoppingListScreen;
