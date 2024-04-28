import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../../screens/Search/Searchstyles';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/Config';

const Search = ({ route }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipesSnapshot = await getDocs(collection(db, 'recipes'));
        const fetchedRecipes = recipesSnapshot.docs.map(doc => doc.data());
        setSearchResults(fetchedRecipes);
      } catch (error) {
        console.error('Error retrieving recipes: ', error);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    if (route.params && route.params.searchQuery) {
      setSearchQuery(route.params.searchQuery);
    }
  }, [route.params]);

  const filterRecipes = () => {
    if (!searchQuery.trim()) {
      return searchResults;
    }

    const filteredRecipes = searchResults.filter(recipe => {
      const recipeName = recipe.recipeName.toLowerCase();
      return recipeName.includes(searchQuery.toLowerCase());
    });

    return filteredRecipes;
  };

  const navigateToRecipe = (recipe) => {
    navigation.navigate('Recipe', { recipe });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <MaterialIcons name="search" size={24} color="#888" onPress={filterRecipes} />
        </View>

        <View style={styles.view}>
          {filterRecipes().map(recipe => (
            <Pressable key={recipe.id} style={styles.recipeContainer} onPress={() => navigateToRecipe(recipe)}>
              <View>
                {recipe.recipeImage && <Image source={{ uri: recipe.recipeImage }} style={styles.image} />}
                <Text style={styles.recipeName}>{recipe.recipeName}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;
