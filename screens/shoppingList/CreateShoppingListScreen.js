// screens/shoppingList/CreateShoppingListScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, FlatList } from 'react-native';

const CreateShoppingListScreen = ({ navigation }) => {
  const [newItem, setNewItem] = useState('');
  const [shoppingList, setShoppingList] = useState([]);

  const addItem = () => {
    if (newItem.trim() !== '') {
      setShoppingList([...shoppingList, newItem]);
      setNewItem('');
    }
  };

  const saveShoppingList = () => {
    // Here you can save the shopping list to AsyncStorage or any other storage mechanism
    console.log('Shopping list saved:', shoppingList);
    // Navigate back to the previous screen
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <FlatList
        data={shoppingList}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        onChangeText={text => setNewItem(text)}
        value={newItem}
        placeholder="Enter item"
      />
      <Button title="Add Item" onPress={addItem} />
      <Button title="Save Shopping List" onPress={saveShoppingList} />
    </View>
  );
};

export default CreateShoppingListScreen;
