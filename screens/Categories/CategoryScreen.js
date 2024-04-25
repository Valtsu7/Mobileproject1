import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/Config';
import { useNavigation } from '@react-navigation/native';
import styles from './Categoriesstyles';

const CategoryScreen = ({ category }) => {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const q = query(collection(db, "recipes"), where("tags", "array-contains", category));
      const querySnapshot = await getDocs(q);
      const fetchedRecipes = [];
      querySnapshot.forEach((doc) => {
        fetchedRecipes.push({ ...doc.data(), id: doc.id });
      });
      setRecipes(fetchedRecipes);
    };

    fetchRecipes();
  }, [category]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category} Recipes</Text>
      <FlatList
        data={recipes}
        numColumns={2} 
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.recipeCard} onPress={() => navigation.navigate('Recipe', { recipe: item })}>
            {item.recipeImage && <Image source={{ uri: item.recipeImage }} style={styles.image} />}
            <Text style={styles.recipeName}>{item.recipeName}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default CategoryScreen;
