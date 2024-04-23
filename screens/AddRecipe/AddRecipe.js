import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Alert, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import styles from './Addrecipestyles';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { auth } from '../../firebase/Config';
import { onAuthStateChanged } from 'firebase/auth';

import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/Config';

const AddRecipe = () => {
  const [user, setUser] = useState(null);
  const [recipeName, setRecipeName] = useState('');
  const [recipeDetails, setRecipeDetails] = useState('');
  const [recipeIngredients, setRecipeIngredients] = useState('');
  const [recipeInstructions, setRecipeInstructions] = useState('');
  const [recipeImage, setRecipeImage] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [selectedTags, setSelectedTags] = useState(['', '', '', '']);
  const [availableTags, setAvailableTags] = useState([
    'Desserts', 'Main dishes', 'Easy', 'Under 30 minutes', 'Under 45 minutes', 'Pasta', 'Pizza'
  ]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const savedRecipes = await AsyncStorage.getItem('recipes');
        if (savedRecipes) {
          const parsedRecipes = JSON.parse(savedRecipes);
          setRecipes(parsedRecipes);
        }
      } catch (error) {
        console.error('Error loading recipes: ', error);
      }
    };

    fetchRecipes();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>You must be logged in to add recipes.</Text>
      </View>
    );
  }

  const saveRecipe = async () => {
    try {
      const newRecipe = {
        recipeName,
        recipeDetails,
        recipeIngredients,
        recipeInstructions,
        recipeImage,
        tags: selectedTags.filter(tag => tag !== ''),  // Filter out empty strings
        createdBy: user.uid
      };
  
      await addDoc(collection(db, 'recipes'), newRecipe);
  
      Alert.alert('Recipe saved!', null, [{ text: 'OK' }]);
  
      setRecipeName('');
      setRecipeDetails('');
      setRecipeIngredients('');
      setRecipeInstructions('');
      setRecipeImage(null);
      setSelectedTags(['', '', '', '']);
    } catch (error) {
      console.error('Error saving recipe: ', error);
      Alert.alert('Error', 'Failed to save the recipe', [{ text: 'OK' }]);
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access the photo gallery is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.cancelled) {
      setRecipeImage(pickerResult.assets[0].uri);
    }
  };

  const handleTagSelection = (itemValue, itemIndex) => {
    const newSelectedTags = [...selectedTags];
    if (newSelectedTags.includes(itemValue)) {
      Alert.alert('Error', 'This tag has already been selected!', [{ text: 'OK' }]);
      return;
    }
    newSelectedTags[itemIndex] = itemValue;
    setSelectedTags(newSelectedTags);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.text}>Add your own recipe</Text>

        <Pressable onPress={pickImage} style={styles.button2}>
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

          <Text style={styles.text1}>You can write a short introduction about the recipe if you like:</Text>
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

          <Text style={styles.text1}>Select tags:</Text>
          {selectedTags.map((tag, index) => (
            <View key={index} style={styles.pickerContainer}>
              <Picker
                selectedValue={tag}
                onValueChange={(itemValue, itemIndex) => handleTagSelection(itemValue, index)}
                mode="dropdown"
                style={styles.picker}
              >
                {!tag && <Picker.Item label="Select a tag" value="" />}
                {availableTags.map((availableTag, i) => (
                  <Picker.Item key={i} label={availableTag} value={availableTag} />
                ))}
              </Picker>
            </View>
          ))}
        </View>

        <Pressable onPress={saveRecipe} style={styles.button}>
          <Text style={styles.buttonText}>Save Recipe</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default AddRecipe;
