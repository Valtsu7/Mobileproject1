import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from '../../style/style';

const ShoppingListDetailsScreen = ({ route, navigation }) => {
  const { shoppingList } = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const [shoppingListDetails, setShoppingListDetails] = useState([]);

  // Function to fetch the latest shopping list details
  const fetchShoppingListDetails = async () => {
    try {
      const updatedShoppingList = await AsyncStorage.getItem('savedShoppingLists');
      if (updatedShoppingList) {
        const parsedShoppingList = JSON.parse(updatedShoppingList).find(list => list.name === shoppingList.name);
        if (parsedShoppingList) {
          setShoppingListDetails(parsedShoppingList.items);
        }
      }
    } catch (error) {
      console.error('Error fetching shopping list details:', error);
    } finally {
      // Set refreshing state to false when fetching is completed
      setRefreshing(false);
    }
  };

  // Function to handle the refresh button press
  const handleRefresh = () => {
    setRefreshing(true);
    fetchShoppingListDetails();
  };

  useEffect(() => {
    fetchShoppingListDetails();
  }, []); // Fetch the initial shopping list details when the component mounts

  // Function to handle edit button press
  const handleEdit = () => {
    // Navigate to the edit screen passing the shopping list as a parameter
    navigation.navigate('Edit list', { shoppingList });
  };

  // Function to handle remove button press
  const handleRemove = async () => {
    try {
      // Fetch the saved shopping lists
      const savedShoppingLists = await AsyncStorage.getItem('savedShoppingLists');
      if (savedShoppingLists) {
        // Parse the saved shopping lists
        const parsedShoppingLists = JSON.parse(savedShoppingLists);
        // Filter out the current shopping list from the parsed shopping lists
        const updatedShoppingLists = parsedShoppingLists.filter(list => list.name !== shoppingList.name);
        // Save the updated shopping lists
        await AsyncStorage.setItem('savedShoppingLists', JSON.stringify(updatedShoppingLists));
        // Navigate back to the shopping list screen
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error removing shopping list:', error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={style.text}>{shoppingList.name}</Text>
      {shoppingListDetails.map((item, index) => (
        <Text key={index}>{item}</Text>
      ))}
      <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button title="Edit" onPress={handleEdit} />
        <Button title="Remove" onPress={() => Alert.alert('Confirmation', 'Are you sure you want to remove this shopping list?', [{text: 'Cancel', style: 'cancel'}, {text: 'Remove', onPress: handleRemove}])} />
        <Button title="Refresh" onPress={handleRefresh} disabled={refreshing} />
      </View>
    </View>
  );
};

export default ShoppingListDetailsScreen;

