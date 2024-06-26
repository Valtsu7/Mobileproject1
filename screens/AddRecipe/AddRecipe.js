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
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as Font from 'expo-font';  // Tuo Font moduuli




const AddRecipe = () => {
  const [user, setUser] = useState(null);
  const [recipeName, setRecipeName] = useState('');
  const [recipeDetails, setRecipeDetails] = useState('');
  const [recipeIngredients, setRecipeIngredients] = useState('');
  const [recipeInstructions, setRecipeInstructions] = useState('');
  const [recipeImage, setRecipeImage] = useState(null);
  const [showTags, setShowTags] = useState(false);
  const [tags, setTags] = useState({
    Difficulty: '',
    Meal: '',
    Diet: '',
    Category: ''
  });
  const storage = getStorage();

  const [fontsLoaded, setFontsLoaded] = useState(false);

  const tagOptions = {
    Difficulty: [
      "Easy", "Fewer ingredients", "Under 15 minutes", "Under 30 minutes", "Under 45 minutes", "Under 1 Hour", "Medium-difficult", "Challenging"
    ],
    Meal: [
      "Breakfast", "Desserts", "Drinks", "Lunch", "Sides", "Dinner", "Brunch", "Appetizers", "Baking"
    ],
    Diet: [
      "Vegan", "Fish", "Meat", "Dairy-Free", "Gluten-Free", "Pescetarian", "Dietary"
    ],
    Category: [
      "Pasta", "Rice", "Salad", "Burgers", "Pizza", "Grilled foods", "Soups", "Breads and Rolls", "Cakes"
    ]
  };

  useEffect(() => {

    async function loadFonts() {
      await Font.loadAsync({
        'Raleway-Italic': require('../../assets/Raleway-Italic.ttf'),  // Osoita fonttitiedostoon
      });
      setFontsLoaded(true);
    }

    loadFonts();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  if (!user) {
    return (
      <View style={styles.container1}>
        <Text style={styles.text2}>You must be logged in to add recipes.</Text>
      </View>
    );
  }

  const saveRecipe = async () => {
    if (!recipeImage) {
      Alert.alert('Error', 'Please pick an image for the recipe', [{ text: 'OK' }]);
      return;
    }

    try {
      const response = await fetch(recipeImage);
      const blob = await response.blob();

      const imageRef = ref(storage, `recipeImages/${recipeName}`);
      await uploadBytes(imageRef, blob);
      const imageUrl = await getDownloadURL(imageRef);

      const newRecipe = {
        recipeName,
        recipeDetails,
        recipeIngredients,
        recipeInstructions,
        recipeImage: imageUrl,
        tags: Object.values(tags).filter(tag => tag !== ''),
        createdBy: user.uid
      };

      await addDoc(collection(db, 'recipes'), newRecipe);

      Alert.alert('Recipe saved!', null, [{ text: 'OK' }]);
      setRecipeName('');
      setRecipeDetails('');
      setRecipeIngredients('');
      setRecipeInstructions('');
      setRecipeImage(null);
      setTags({ Difficulty: '', Meal: '', Diet: '', Category: '' });
    } catch (error) {
      console.error('Error saving recipe: ', error);
      Alert.alert('Error', 'Failed to save the recipe', [{ text: 'OK' }]);
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.cancelled && pickerResult.assets && pickerResult.assets.length > 0) {
      setRecipeImage(pickerResult.assets[0].uri);
    }
  };

  const handleTagSelection = (itemValue, categoryName) => {
    setTags(prevTags => ({
      ...prevTags,
      [categoryName]: itemValue
    }));
  };

  const toggleTagsVisibility = () => {
    setShowTags(!showTags);
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

          <Pressable onPress={toggleTagsVisibility} style={styles.button3}>
            <Text style={styles.buttonText}>Select tags</Text>
          </Pressable>

          {showTags && Object.keys(tagOptions).map((category) => (
            <View key={category} style={styles.input2}>
              <Text style={styles.text7}>{category}:</Text>
              <Picker
                selectedValue={tags[category]}
                onValueChange={(itemValue) => handleTagSelection(itemValue, category)}
                mode="dropdown"
                style={styles.picker}>
                <Picker.Item label={`Select ${category}`} value="" />
                {tagOptions[category].map((option, index) => (
                  <Picker.Item key={index} label={option} value={option} />
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
