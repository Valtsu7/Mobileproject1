// screens/shoppingList/ShoppingScreen.js
import React, { useState } from 'react';
import { View, Text, Button, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateShoppingListScreen from './CreateShoppingListScreen';
import BrowseShoppingListsScreen from './BrowseShoppingListsScreen';
import style from '../../style/style';

const Stack = createStackNavigator();

const ShoppingScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text style={style.text}>Do you want to create a new or browse old shopping lists?</Text>
            <Button title="Create New" onPress={() => {
              navigation.navigate('Create Shopping List');
              setModalVisible(false);
            }} />
            <Button title="Browse Shopping Lists" onPress={() => {
              navigation.navigate('Saved lists');
              setModalVisible(false);
            }} />
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={style.text}>Let's make shopping easier!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShoppingScreen;
