import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecipeDisplay = () => {
  const [recipeImage, setRecipeImage] = useState(null);
  const [recipeText, setRecipeText] = useState('');

  useEffect(() => {
    // Haetaan tallennettu reseptin kuva ja teksti
    const getRecipeData = async () => {
      try {
        const storedImage = await AsyncStorage.getItem('recipeImage');
        const storedText = await AsyncStorage.getItem('recipeText');
        setRecipeImage(storedImage);
        setRecipeText(storedText);
      } catch (error) {
        console.error('Error retrieving recipe data: ', error);
      }
    };

    getRecipeData();
  }, []);

  return (
    <View>
      {/* Näytetään tallennettu reseptin kuva */}
      {recipeImage && (
        <Image
          source={{ uri: recipeImage }}
          style={{ width: 200, height: 200 }}
        />
      )}

      {/* Näytetään tallennettu reseptin teksti */}
      <Text>{recipeText}</Text>
    </View>
  );
};

export default RecipeDisplay;
