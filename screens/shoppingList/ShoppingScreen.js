
// import React, { useState } from 'react';
// import { View, Text, Button, TextInput, FlatList, TouchableOpacity } from 'react-native';
// import ShoppingListItem from '../../components/ShoppingListItem';

// const ShoppingScreen = () => {
//   const [newItem, setNewItem] = useState('');
//   const [shoppingList, setShoppingList] = useState([]);
  
//   const addItem = () => {
//     if (newItem.trim() !== '') {
//       setShoppingList([...shoppingList, newItem]);
//       setNewItem('');
//     }
//   };

//   const removeItem = (item) => {
//     setShoppingList(shoppingList.filter((listItem) => listItem !== item));
//   };

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <FlatList
//         data={shoppingList}
//         renderItem={({ item }) => (
//           <ShoppingListItem
//             item={item}
//             onRemove={() => removeItem(item)}
//           />
//         )}
//         keyExtractor={(item, index) => index.toString()}
//       />
//       <TextInput
//         style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
//         onChangeText={text => setNewItem(text)}
//         value={newItem}
//         placeholder="Enter item"
//       />
//       <Button title="Add Item" onPress={addItem} />
//     </View>
//   );
// };

// export default ShoppingScreen;
// screens/shoppingList/ShoppingScreen.js
// screens/shoppingList/ShoppingScreen.js
import React, { useState } from 'react';
import { View, Text, Button, Modal, TouchableOpacity } from 'react-native';
import CreateShoppingListScreen from './CreateShoppingListScreen';

const ShoppingScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

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
              navigation.navigate('CreateShoppingList'); // Navigate to create new shopping list screen
              setModalVisible(false);
            }} />
            <Button title="Browse Old Shopping Lists" onPress={() => {
              // Navigate to browse old shopping lists screen
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
