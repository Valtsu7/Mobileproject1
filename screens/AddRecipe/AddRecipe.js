import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import styles from './Addrecipestyles';

const AddRecipe = () => {
  const [recipeName, setRecipeName] = useState('');
  const [recipeDetails, setRecipeDetails] = useState('');
  const [recipeIngredients, setRecipeIngredients] = useState('');
  const [recipeInstructions, setRecipeInstructions] = useState('');
  const [recipeImage, setRecipeImage] = useState(null); // Lisätty reseptikuvan tila
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
      const newRecipe = { recipeName, recipeDetails, recipeIngredients, recipeInstructions };
      const updatedRecipes = [...recipes, newRecipe];

      await AsyncStorage.setItem('recipes', JSON.stringify(updatedRecipes));

      Alert.alert('Recipe saved!', null, [
        { text: 'OK' }
      ]);

      setRecipeName('');
      setRecipeDetails('');
      setRecipeIngredients('');
      setRecipeInstructions('');
      setRecipeImage(null); 
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


  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setRecipeImage(pickerResult.uri);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.text}>Add your own recipe</Text>
   
        <Pressable onPress={pickImage} style={styles.button}>
          <Text style={styles.buttonText}>Pick a Recipe Image</Text>
        </Pressable>

       <View style={styles.input1} >

        <TextInput
          style={styles.input}
          placeholder="Recipe Name"
          value={recipeName}
          onChangeText={setRecipeName}
        />

        <TextInput
          style={styles.input}
          placeholder="Recipe Details"
          value={recipeDetails}
          onChangeText={setRecipeDetails}
        />

        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Recipe Ingredients"
          multiline
          value={recipeIngredients}
          onChangeText={setRecipeIngredients}
        />

        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Recipe Instructions"
          multiline
          value={recipeInstructions}
          onChangeText={setRecipeInstructions}
        />
  
      </View>
       

      <Pressable onPress={saveRecipe} style={styles.button}>
          <Text style={styles.buttonText}>Save Recipe</Text>
        </Pressable>

        
        <Pressable onPress={clearAllRecipes} style={styles.button}>
          <Text >Clear All Recipes</Text>
        </Pressable>

        {recipeImage && <Image source={{ uri: recipeImage.localUri }} style={{ width: 200, height: 200 }} />}


        {recipes.map((recipe, index) => (
          <View key={index} >
            <Text>{recipe.recipeName}</Text>
            <Text>{recipe.recipeDetails}</Text>
            <Text>{recipe.recipeIngredients}</Text>
            <Text>{recipe.recipeInstructions}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default AddRecipe;
