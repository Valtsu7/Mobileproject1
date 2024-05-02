import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/Config';
import styles from '../../screens/Search/Searchstyles';

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
      handleSearch(route.params.searchQuery);
    }
  }, [route.params]);

  const handleSearch = (query) => {
    const filteredRecipes = searchResults.filter(recipe =>
      recipe.recipeName.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredRecipes);
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
          <MaterialIcons name="search" size={24} color="#888" onPress={() => handleSearch(searchQuery)} />
        </View>

        <View style={styles.searchResultsContainer}>
          {/* Render search results here */}
          {searchResults.map((recipe, index) => (
            <Pressable key={index} onPress={() => navigation.navigate('Recipe', { recipe })}>
              <View>
                <Text>{recipe.recipeName}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;
