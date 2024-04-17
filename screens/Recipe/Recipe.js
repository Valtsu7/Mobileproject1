import React from 'react';
import { Text, View, Image, Pressable, ScrollView, SafeAreaView, } from 'react-native';
import styles from './Recipestyles';

const Recipe = ({ route }) => {
  const { recipe } = route.params;

  return (


    <SafeAreaView>
     <ScrollView>
    <View style={styles.container}>
      {recipe.recipeImage && <Image source={{ uri: recipe.recipeImage }} style={styles.image} />}
      
      <Text style={styles.recipeName}>{recipe.recipeName}</Text>

      <Text style={styles.text2}>{recipe.recipeDetails}</Text>

      <Text style={styles.text1}> Ingredients</Text>

      <Text style={styles.text}> {recipe.recipeIngredients}</Text>

      <Text style={styles.text1}> Instructions</Text>

      <Text style={styles.text}> {recipe.recipeInstructions}</Text>
    </View>

    </ScrollView>
    </SafeAreaView>
  );
};


  


export default Recipe;
