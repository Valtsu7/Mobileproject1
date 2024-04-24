import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/Config'; // Tarkista polku
import styles from './Categoriesstyles';

const PastaScreen = () => {
  const [pastaRecipes, setPastaRecipes] = useState([]);

  useEffect(() => {
    const fetchPastaRecipes = async () => {
      try {
        // Oletetaan, että reseptien 'tags' sisältää tagit arrayna ja että 'Category' on yksi näistä tageista
        const q = query(collection(db, "recipes"), where("tags", "array-contains", "Pasta"));
        const querySnapshot = await getDocs(q);
        const fetchedRecipes = [];
        querySnapshot.forEach((doc) => {
          fetchedRecipes.push({ ...doc.data(), id: doc.id });
        });
        setPastaRecipes(fetchedRecipes);
      } catch (error) {
        console.error("Error fetching pasta recipes:", error);
      }
    };

    fetchPastaRecipes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pasta Recipes</Text>
      <ScrollView>
        {pastaRecipes.map((recipe) => (
          <View key={recipe.id} style={styles.recipeCard}>
            {recipe.recipeImage && <Image source={{ uri: recipe.recipeImage }} style={styles.image} />}
            <Text style={styles.recipeName}>{recipe.recipeName}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};



export default PastaScreen;
