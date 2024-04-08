// screens/shoppingList/ShoppingScreen.js
import React, { useState } from 'react';
import { View, Text, Button, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateShoppingListScreen from './CreateShoppingListScreen';
import BrowseShoppingListsScreen from './BrowseShoppingListsScreen';

const Stack = createStackNavigator();

const ShoppingScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text style={{ marginBottom: 20 }}>Do you want to create a new shopping list or browse old shopping lists?</Text>
            <Button title="Create New Shopping List" onPress={() => {
              navigation.navigate('CreateShoppingList');
              setModalVisible(false);
            }} />
            <Button title="Browse Old Shopping Lists" onPress={() => {
              navigation.navigate('BrowseShoppingList');
              setModalVisible(false);
            }} />
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={{ fontSize: 20, marginBottom: 20 }}>Start Shopping</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShoppingScreen;
