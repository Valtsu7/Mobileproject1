// // Shoppinglist.js

// class ShoppingListItem {
//     constructor() {
//       this.items = [];
//     }
  
//     addItem(item) {
//       this.items.push(item);
//     }
  
//     removeItem(item) {
//       const index = this.items.indexOf(item);
//       if (index !== -1) {
//         this.items.splice(index, 1);
//       }
//     }
  
//     clear() {
//       this.items = [];
//     }
  
//     getItems() {
//       return this.items;
//     }
//   }
  
//   export default ShoppingListItem;
  // components/ShoppingListItem.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

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
