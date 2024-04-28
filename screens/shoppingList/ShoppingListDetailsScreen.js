// ShoppingListDetailsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, TouchableOpacity, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from './ShoppingListStyles';
import CustomCheckbox from './CustomCheckbox'

const ShoppingListDetailsScreen = ({ route, navigation }) => {
  const { shoppingList } = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);

  // Function to fetch the latest shopping list details
  const fetchShoppingListDetails = async () => {
    try {
      const updatedShoppingList = await AsyncStorage.getItem('savedShoppingLists');
      if (updatedShoppingList) {
        const parsedShoppingList = JSON.parse(updatedShoppingList).find(list => list.name === shoppingList.name);
        if (parsedShoppingList) {
          setCheckedItems(Array(parsedShoppingList.items.length).fill(false)); // Initialize checked items array
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

  // Function to handle checkbox press
  const handleCheckboxPress = (index) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setCheckedItems(updatedCheckedItems);
  };

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
    <View style={style.shoppingListContainer}>
      <View style={style.logoContainer}>
        {/* Logo */}
        <Image
          source={require('../../assets/flavorlogo2.png')}
          style={style.logo}
        />
       </View>
      <Text style={style.title}>{shoppingList.name}</Text>
      <ScrollView>
      {shoppingList.items.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => handleCheckboxPress(index)}>
          <View style={style.itemContainer}>
            <CustomCheckbox checked={checkedItems[index]} onPress={() => handleCheckboxPress(index)} />
            <Text style={style.item}>{item}</Text>
          </View>
        </TouchableOpacity>
      ))}
      </ScrollView>
      <View style={style.buttonContainer}>
        <Button title="Edit" onPress={handleEdit} />
        <Button title="Remove" onPress={() => Alert.alert('Confirmation', 'Are you sure you want to remove this shopping list?', [{text: 'Cancel', style: 'cancel'}, {text: 'Remove', onPress: handleRemove}])} />
        <Button title="Refresh" onPress={handleRefresh} disabled={refreshing} />
      </View>
      
    </View>
  );
};



export default ShoppingListDetailsScreen;

