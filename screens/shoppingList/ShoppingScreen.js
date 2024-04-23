import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from './ShoppingListStyles';
import { auth } from '../../firebase/Config';
import { onAuthStateChanged } from 'firebase/auth';

const ShoppingScreen = ({ navigation }) => {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        fetchShoppingLists(currentUser.uid);
      } else {
        setShoppingLists([]);
      }
    });

    return unsubscribe;
  }, []);

  const saveShoppingList = async (shoppingList) => {
    try {
      const existingShoppingLists = await AsyncStorage.getItem('savedShoppingLists');
      const parsedLists = existingShoppingLists ? JSON.parse(existingShoppingLists) : [];
      
      shoppingList.createdBy = auth.currentUser.uid;

      parsedLists.push(shoppingList);

      await AsyncStorage.setItem('savedShoppingLists', JSON.stringify(parsedLists));
    } catch (error) {
      console.error('Error saving shopping list:', error);
    }
  };

  const fetchShoppingLists = async (userId) => {
    try {
      const savedShoppingLists = await AsyncStorage.getItem('savedShoppingLists');
      if (savedShoppingLists) {
        const parsedLists = JSON.parse(savedShoppingLists);
        const filteredLists = parsedLists.filter(list => list.createdBy === userId);
        setShoppingLists(filteredLists.reverse());
      }
    } catch (error) {
      console.error('Error fetching shopping lists:', error);
    }
  };

  const handleCreateNewShoppingList = () => {
    if (!user) {
      alert('You must be logged in to create a new shopping list.');
      return;
    }
    navigation.navigate('Create Shopping List');
  };

  const handleRefresh = () => {
    if (user) {
      fetchShoppingLists(user.uid);
    }
  };

  const handleShoppingListPress = (shoppingList) => {
    navigation.navigate('Selected list', { shoppingList });
  };

  return (
    <View style={style.shoppingListContainer}>
      {user ? (
        <TouchableOpacity onPress={handleCreateNewShoppingList}>
          <Text style={style.button}>Create new shopping list</Text>
        </TouchableOpacity>
      ) : (
        <Text style={style.text}>You must be logged in to make shopping lists</Text>
      )}

      {user && (
        <>
          <Text style={style.text}>Your shopping lists:</Text>
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
      )}
    </View>
  );
};

export default ShoppingScreen;
