
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import style from '../style/style';


const ShoppingListItem = ({ item, onRemove }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
      <Text>{item}</Text>
      <TouchableOpacity onPress={onRemove}>
        <Text>Remove</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShoppingListItem;
