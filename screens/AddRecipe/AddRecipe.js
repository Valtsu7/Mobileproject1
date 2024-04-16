import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Alert, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import styles from './Addrecipestyles';
import { AntDesign } from '@expo/vector-icons';

import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/Config';


const AddRecipe = () => {
  const [recipeName, setRecipeName] = useState('');
  const [recipeDetails, setRecipeDetails] = useState('');
  const [recipeIngredients, setRecipeIngredients] = useState('');
  const [recipeInstructions, setRecipeInstructions] = useState('');
  const [recipeImage, setRecipeImage] = useState(null);
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
      const newRecipe = { recipeName, recipeDetails, recipeIngredients, recipeInstructions, recipeImage };
      
     // Lisää uusi resepti Firestore-tietokantaan
     console.log(newRecipe)
     await addDoc(collection(db, 'recipes'), newRecipe);

     Alert.alert('Recipe saved!', null, [{ text: 'OK' }]);

     setRecipeName('');
     setRecipeDetails('');
     setRecipeIngredients('');
     setRecipeInstructions('');
     setRecipeImage(null);
   } catch (error) {
     console.error('Error saving recipe: ', error);
   }
 };

  const clearAllRecipes = async () => {
    try {
      await AsyncStorage.removeItem('recipes');
      setRecipes([]);
      Alert.alert('All recipes cleared!', null, [{ text: 'OK' }]);
    } catch (error) {
      console.error('Error clearing recipes: ', error);
    }
  };

  const pickImage = async () => {
    console.log('Attempting to pick an image...');
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      console.log('Permission to access camera roll is required!');
      alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log('Picker result:', pickerResult);
    if (pickerResult.cancelled !== true) {
      console.log('Image picked successfully:', pickerResult.assets[0].uri);
      setRecipeImage(pickerResult.assets[0].uri);
    } else {
      console.log('Image picking cancelled');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.text}>Add your own recipe</Text>


      
       
        <Pressable onPress={pickImage} style={styles.button2} >
          <View>
           <Text style={styles.buttonText}>Pick Image</Text>
           <AntDesign name="pluscircle" size={40} color="green" style={styles.plus}/>
           </View>
        </Pressable>

        

        <View style={styles.input1}>

          <Text style={styles.text1}>What is the name of this recipe?</Text>
          <TextInput
            style={styles.input}
            placeholder="Recipe Name"
            value={recipeName}
            onChangeText={setRecipeName}
          />

          <Text style={styles.text1}>You can write short introduction about the recipe if you like:</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Recipe Details"
            multiline
            value={recipeDetails}
            onChangeText={setRecipeDetails}
          />

          <Text style={styles.text1}>Here you can write down the needed ingredients:</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Recipe Ingredients"
            multiline
            value={recipeIngredients}
            onChangeText={setRecipeIngredients}
          />
       
       <Text style={styles.text1}>Here you can write down the instructions:</Text>
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

        <Pressable onPress={clearAllRecipes} style={styles.button1}>
          <Text>Clear All Recipes</Text>
        </Pressable>

        {recipes.map((recipe, index) => (
          <View key={index}>
            {recipe.recipeImage && <Image source={{ uri: recipe.recipeImage }} style={{ width: 200, height: 200 }} />}
            <Text>{recipe.recipeName}</Text>
            <Text>{recipe.recipeDetails}</Text>
            <Text>{recipe.recipeIngredients}</Text>
            <Text>{recipe.recipeInstructions}</Text>
          </View>
        ))}

        {/* Show image only if there is a saved recipe */}
        {recipes.length > 0 && recipeImage && <Image source={{ uri: recipeImage }} style={{ width: 200, height: 200 }} />}
      </ScrollView>
    </View>
  );
};

export default AddRecipe;