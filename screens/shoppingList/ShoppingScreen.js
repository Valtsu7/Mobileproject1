import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/Config';
import style from './ShoppingListStyles';

const ShoppingScreen = ({ navigation }) => {
  const [user, setUser] = useState(auth.currentUser); // Set initial user state to current user
  const [shoppingLists, setShoppingLists] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      handleRefresh(); // Automatically refresh shopping lists when user state changes
    }
  }, [user]);

  const fetchShoppingLists = async (userId) => {
    try {
      const savedShoppingLists = await AsyncStorage.getItem('savedShoppingLists');
      if (savedShoppingLists) {
        const allShoppingLists = JSON.parse(savedShoppingLists).reverse();
        const userShoppingLists = allShoppingLists.filter(list => list.userId === userId);
        setShoppingLists(userShoppingLists);
      }
    } catch (error) {
      console.error('Error fetching shopping lists:', error);
    }
  };

  const handleCreateNewShoppingList = () => {
    navigation.navigate('Create Shopping List');
  };

  const handleRefresh = async () => {
    try {
      if (user) {
        const savedShoppingLists = await AsyncStorage.getItem('savedShoppingLists');
        if (savedShoppingLists) {
          const allShoppingLists = JSON.parse(savedShoppingLists).reverse();
          const userShoppingLists = allShoppingLists.filter(list => list.userId === user.uid);
          setShoppingLists(userShoppingLists);
        }
      }
    } catch (error) {
      console.error('Error fetching shopping lists:', error);
    }
  };

  const handleShoppingListPress = (shoppingList) => {
    navigation.navigate('Selected list', { shoppingList });
  };

  return (
    <View style={style.shoppingListContainer}>
      {user ? (
        <>
          <TouchableOpacity onPress={handleCreateNewShoppingList}>
            <Text style={style.button}>Create new shopping list</Text>
          </TouchableOpacity>

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
