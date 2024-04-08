import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../style/style';
import Header from './Header';

const Home = ({ navigation, route }) => {
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Header />
        <Text style={styles.text}>
          Welcome to FlavorFriends!
        </Text>
        <Text style={styles.text1}>
          Here are your saved recipes:
        </Text>
        
        {/* Näytetään tallennetut reseptit */}
        {recipes.map((recipe, index) => (
          <View key={index}>
            {recipe.recipeImage && (
              <Image source={{ uri: recipe.recipeImage }} style={{ width: 200, height: 200 }} />
            )}
            <Text>{recipe.recipeText}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
