import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from './ShoppingListStyles';
import { useFocusEffect } from '@react-navigation/native';

const EditShoppingListScreen = ({ route, navigation }) => {
  const { shoppingList } = route.params;
  const [editedName, setEditedName] = useState(shoppingList.name);
  const [editedItems, setEditedItems] = useState(shoppingList.items.join('\n'));

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', async () => {
      try {
        const editedItemsArray = editedItems.split('\n').filter(item => item.trim() !== '');
        const updatedShoppingList = {
          ...shoppingList,
          name: editedName,
          items: editedItemsArray,
        };
        await updateShoppingList(updatedShoppingList);
      } catch (error) {
        console.error('Error saving changes:', error);
        Alert.alert('Error', 'Failed to save changes.');
      }
    });

    return unsubscribe;
  }, [navigation, editedName, editedItems, shoppingList]);

  useFocusEffect(
    React.useCallback(() => {
      setEditedName(shoppingList.name);
      setEditedItems(shoppingList.items.join('\n'));
    }, [shoppingList])
  );

  const updateShoppingList = async (updatedList) => {
    try {
      const existingShoppingLists = await AsyncStorage.getItem('savedShoppingLists');
      let updatedShoppingLists = [];
      if (existingShoppingLists) {
        updatedShoppingLists = JSON.parse(existingShoppingLists).map(list => {
          if (list.name === shoppingList.name) {
            return updatedList;
          }
          return list;
        });
      }
      await AsyncStorage.setItem('savedShoppingLists', JSON.stringify(updatedShoppingLists));
    } catch (error) {
      console.error('Error updating shopping list:', error);
      throw error;
    }
  };
  const addItem = () => {
    setItems([...items, '']);
  };

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
 
       // Temporary logging to verify data
       const savedShoppingLists = await AsyncStorage.getItem('savedShoppingLists');
       console.log('Saved shopping lists:', savedShoppingLists);
 
       Alert.alert('Success', 'Shopping list saved successfully.');
     } catch (error) {
       console.error('Error saving shopping list:', error);
       Alert.alert('Error', 'Failed to save shopping list.');
     }
   };
  return (
    <View style={style.shoppingListContainer}>
      <Text style={style.text}>Here you can edit your shopping list:</Text>
      <TextInput
        style={style.title1}
        value={editedName}
        onChangeText={setEditedName}
        placeholder="Shopping List Name"
      />
      <ScrollView>
      {editedItems.split('\n').map((item, index) => (
        <TextInput
          key={index}
          style={style.editList}
          value={item}
          onChangeText={(text) => {
            const items = editedItems.split('\n');
            items[index] = text;
            setEditedItems(items.join('\n'));
          }}
          placeholder={`Item ${index + 1}`}
        />
      ))}</ScrollView>
      <Button title="Add Item" onPress={addItem} />
      <Button title="Save Shopping List" onPress={saveShoppingList} />
    </View>
  );
};}

export default EditShoppingListScreen;
