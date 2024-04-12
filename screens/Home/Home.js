import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, SafeAreaView, FlatList, Pressable } from 'react-native';
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

  const renderCategoryItem = ({ item, index }) => (
    <Pressable style={styles.categories}>
    
      <Text>{item}</Text>
    </Pressable>
  );

  const categories = ["Meat", "Vegan", "Fish", "Breads", "Cakes", "Burgers", "Pizza"];

  // Oletetaan, että kategoriaan liittyvät kuvat ovat samassa järjestyksessä kuin kategoriat
  /* const categoryImages = [
    require('./images/meat.jpg'),
    require('./images/vegan.jpg'),
    require('./images/fish.jpg'),
    require('./images/breads.jpg'),
    require('./images/cakes.jpg'),
    require('./images/burgers.jpg'),
    require('./images/pizza.jpg'),

     <Image source={categoryImages[index]} style={styles.categoryImage} />
  ]; */

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Header />
        <Text style={styles.text}>
          Welcome to FlavorFriends!
        </Text>

        <Text style={styles.text1}>
          Here are some categories for you!
        </Text>

        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />

        <Text style={styles.text1}>
          Just added recipes:
        </Text>

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
