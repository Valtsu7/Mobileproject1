import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from 'firebase/auth'; // Import onAuthStateChanged
import { auth } from '../../firebase/Config'; // Import the auth instance from Config.js
import style from './ShoppingListStyles';

const ShoppingScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [shoppingLists, setShoppingLists] = useState([]);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //     if (currentUser) {
  //       fetchShoppingLists(currentUser.uid);
  //     } else {
  //       setShoppingLists([]);
  //     }
  //   });
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        handleRefresh(); // Automatically refresh shopping lists when component mounts
      } else {
        setShoppingLists([]);
      }
    });

    return unsubscribe;
  }, []);

  // Function to fetch shopping lists from AsyncStorage
const fetchShoppingLists = async (userId) => {
  try {
    const savedShoppingLists = await AsyncStorage.getItem('savedShoppingLists');
    if (savedShoppingLists) {
      const allShoppingLists = JSON.parse(savedShoppingLists).reverse(); // Reverse the order
      const userShoppingLists = allShoppingLists.filter(list => list.userId === userId);
      setShoppingLists(userShoppingLists);
    }
  } catch (error) {
    console.error('Error fetching shopping lists:', error);
  }
};


  // Function to handle the press of the "Create new shopping list" button
  const handleCreateNewShoppingList = () => {
    navigation.navigate('Create Shopping List');
  };

  // const handleRefresh = async () => {
  //   fetchShoppingLists(user.uid); // Fetch shopping lists again
  // };
  const handleRefresh = async () => {
    try {
      const savedShoppingLists = await AsyncStorage.getItem('savedShoppingLists');
      if (savedShoppingLists) {
        const allShoppingLists = JSON.parse(savedShoppingLists).reverse();
        const userShoppingLists = allShoppingLists.filter(list => list.userId === user.uid);
        setShoppingLists(userShoppingLists);
      }
    } catch (error) {
      console.error('Error fetching shopping lists:', error);
    }
  };

  // Function to handle the navigation to the details screen for a shopping list
  const handleShoppingListPress = (shoppingList) => {
    navigation.navigate('Selected list', { shoppingList });
  };

  return (
    <View style={style.shoppingListContainer}>
      { user ? (
        <>
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
        </>
      ) : (
        <Text style={style.text}>Please log in to view your shopping lists.</Text>
      )}
    </View>
  );
};

export default ShoppingScreen;