import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../style/style';

const AddRecipe = () => {
  const [recipeImage, setRecipeImage] = useState(null);
  const [recipeText, setRecipeText] = useState('');
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const savedRecipes = await AsyncStorage.getItem('recipes');
        if (savedRecipes) {
          const parsedRecipes = JSON.parse(savedRecipes);
          setRecipes(parsedRecipes);
        }
      } catch (error) {
        console.error('Error retrieving recipes: ', error);
      }
    };

    fetchRecipes();
  }, []);

  const saveRecipe = async () => {
    try {
      const newRecipe = { recipeImage, recipeText };
      const updatedRecipes = [...recipes, newRecipe];

      await AsyncStorage.setItem('recipes', JSON.stringify(updatedRecipes));

      Alert.alert('Recipe saved!', null, [
        { text: 'OK' }
      ]);

      setRecipeImage(null);
      setRecipeText('');
      setRecipes(updatedRecipes);
    } catch (error) {
      console.error('Error saving recipe: ', error);
    }
  };

  const clearAllRecipes = async () => {
    try {
      await AsyncStorage.removeItem('recipes');
      setRecipes([]);
      Alert.alert('All recipes cleared!', null, [
        { text: 'OK' }
      ]);
    } catch (error) {
      console.error('Error clearing recipes: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add your own recipe</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter recipe image URL"
        value={recipeImage}
        onChangeText={setRecipeImage}
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Enter recipe text"
        multiline
        value={recipeText}
        onChangeText={setRecipeText}
      />

      {recipeImage && (
        <Image
          source={{ uri: recipeImage }}
          style={{ width: 200, height: 200, marginBottom: 10 }}
        />
      )}

      <Button title="Save Recipe" onPress={saveRecipe} />

      <Button title="Clear All Recipes" onPress={clearAllRecipes} />

      <ScrollView>
        {recipes.map((recipe, index) => (
          <View key={index}>
            {recipe.recipeImage && (
              <Image
                source={{ uri: recipe.recipeImage }}
                style={{ width: 200, height: 200, marginBottom: 10 }}
              />
            )}
            <Text>{recipe.recipeText}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default AddRecipe;
