import React from 'react';
import { View, Text, FlatList } from 'react-native';

const Pasta = () => {
  // Dummy data for pasta recipes
  const pastaRecipes = [
    { id: 1, name: 'Spaghetti Carbonara' },
    { id: 2, name: 'Penne Arrabiata' },
    { id: 3, name: 'Fettuccine Alfredo' },
    // Add more pasta recipes as needed
  ];

  // Function to render each pasta recipe item
  const renderItem = ({ item }) => (
    <View>
      <Text>{item.name}</Text>
    </View>
  );

  return (
    <View>
      <FlatList
        data={pastaRecipes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Pasta;
