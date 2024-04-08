// screens/shoppingList/EditShoppingListScreen.js
import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';

const EditShoppingListScreen = () => {
  const [editedItem, setEditedItem] = useState('');

  const saveItem = () => {
    // Add logic to save edited item
    console.log('Edited item:', editedItem);
    // Reset editedItem state
    setEditedItem('');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        onChangeText={text => setEditedItem(text)}
        value={editedItem}
        placeholder="Edit item"
      />
      <Button title="Save Item" onPress={saveItem} />
    </View>
  );
};

export default EditShoppingListScreen;
