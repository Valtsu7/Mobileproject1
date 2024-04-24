import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, Image, ScrollView } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/Config'; // Tarkista, että polku on oikea
import { useNavigation } from '@react-navigation/native';
import styles from './Categoriesstyles';

const CategoryScreen = ({ category }) => {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const q = query(collection(db, "recipes"), where("tags", "array-contains", category));
        const querySnapshot = await getDocs(q);
        const fetchedRecipes = [];
        querySnapshot.forEach((doc) => {
          fetchedRecipes.push({ ...doc.data(), id: doc.id });
        });
        setRecipes(fetchedRecipes);
      } catch (error) {
        console.error(`Error fetching recipes for category ${category}:`, error);
      }
    };

    fetchRecipes();
  }, [category]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category} Recipes</Text>
      <ScrollView>
        {recipes.map((recipe) => (
          <TouchableOpacity key={recipe.id} style={styles.recipeCard} onPress={() => navigation.navigate('Recipe', { recipe })}>
            {recipe.recipeImage && <Image source={{ uri: recipe.recipeImage }} style={styles.image} />}
            <Text style={styles.recipeName}>{recipe.recipeName}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryScreen;
