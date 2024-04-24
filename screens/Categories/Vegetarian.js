import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/Config'; // Tarkista polku
import styles from './Categoriesstyles';

const VegeScreen = () => {
  const [veganRecipes, setVeganRecipes] = useState([]);

  useEffect(() => {
    const fetchVeganRecipes = async () => {
      try {
        const q = query(collection(db, "recipes"), where("tags", "array-contains", "Vegan"));
        const querySnapshot = await getDocs(q);
        const fetchedRecipes = [];
        querySnapshot.forEach((doc) => {
          fetchedRecipes.push({ ...doc.data(), id: doc.id });
        });
        setVeganRecipes(fetchedRecipes);
      } catch (error) {
        console.error("Error fetching vegan recipes:", error);
      }
    };

    fetchVeganRecipes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vegan Recipes</Text>
      <ScrollView>
        {veganRecipes.map((recipe) => (
          <View key={recipe.id} style={styles.recipeCard}>
            {recipe.recipeImage && <Image source={{ uri: recipe.recipeImage }} style={styles.image} />}
            <Text style={styles.recipeName}>{recipe.recipeName}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default VegeScreen;
