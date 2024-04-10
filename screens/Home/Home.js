import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, SafeAreaView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Homestyles';
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

  const renderItem = ({ item }) => (
    <View style={styles.recipeContainer}>
      {item.recipeImage && <Image source={{ uri: item.recipeImage }} style={styles.image} />}
      <Text style={styles.recipeName}>{item.recipeName}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Header />
        <Text style={styles.text}>
          Welcome to FlavorFriends!
        </Text>
        <Text style={styles.text1}>
          Just added recipes: 
        </Text>

        {/* FlatList reseptien esittämiseen */}
        <FlatList
          data={recipes}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
 
         
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
