import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Alert, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import styles from './Addrecipestyles';
import { AntDesign } from '@expo/vector-icons';

import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/Config';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AddRecipe = () => {
  const [recipeName, setRecipeName] = useState('');
  const [recipeDetails, setRecipeDetails] = useState('');
  const [recipeIngredients, setRecipeIngredients] = useState('');
  const [recipeInstructions, setRecipeInstructions] = useState('');
  const [recipeImage, setRecipeImage] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const storage = getStorage();

  useEffect(() => {
    // Fetch recipes from AsyncStorage on component mount
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
    if (!pickerResult.canceled) {
      console.log('Image picked successfully:', pickerResult.assets[0].uri);
      setRecipeImage(pickerResult.assets[0].uri);
    } else {
      console.log('Image picking cancelled');
    }
  };

  const saveRecipe = async () => {
    try {
      if (!recipeImage) {
        Alert.alert('Error', 'Please pick an image for the recipe', [{ text: 'OK' }]);
        return;
      }
  
      // Convert the image URI to blob
      const response = await fetch(recipeImage);
      const blob = await response.blob();
  
      // Upload image blob to Firebase Storage
      const imageRef = ref(storage, `recipeImages/${recipeName}`);
      await uploadBytes(imageRef, blob);
  
      // Get the download URL for the uploaded image
      const imageUrl = await getDownloadURL(imageRef);
  
      // Log the image URI
      console.log('Image URI:', imageUrl);
  
      // Create new recipe object with image URL
      const newRecipe = {
        recipeName,
        recipeDetails,
        recipeIngredients,
        recipeInstructions,
        recipeImage: imageUrl,
      };
  
      // Add new recipe to Firestore
      await addDoc(collection(db, 'recipes'), newRecipe);
  
      Alert.alert('Recipe saved!', null, [{ text: 'OK' }]);
  
      // Clear input fields after saving
      setRecipeName('');
      setRecipeDetails('');
      setRecipeIngredients('');
      setRecipeInstructions('');
      setRecipeImage(null);
    } catch (error) {
      console.error('Error saving recipe: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.text}>Add your own recipe</Text>

        <Pressable onPress={pickImage} style={styles.button2}>
          <View>
            <Text style={styles.buttonText}>Pick Image</Text>
            <AntDesign name="pluscircle" size={40} color="green" style={styles.plus} />
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

        {/* Show image only if there is a saved recipe */}
        {recipes.length > 0 && recipeImage && (
          <Image source={{ uri: recipeImage }} style={{ width: 200, height: 200 }} />
        )}
      </ScrollView>
    </View>
  );
};

export default AddRecipe;
