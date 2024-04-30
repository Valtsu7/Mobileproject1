import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, SafeAreaView, FlatList, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/Config'; // Tarkista tämä importti polkuun, jossa db-objekti sijaitsee
import styles from './Homestyles';
import Header from './Header';
import * as Font from 'expo-font';  // Tuo Font moduuli

const Home = ({ navigation, route }) => {
  const [recipes, setRecipes] = useState([]);
  const [quickRecipes, setQuickRecipes] = useState([]);
  const [appetizerRecipes, setAppetizerRecipes] = useState([]);
  const [dinnerRecipes, setDinnerRecipes] = useState([]);
  const [dessertsRecipes, setDessertsRecipes] = useState([]);
  const [challengingRecipes, setChallengingRecipes] = useState([]);

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {

    async function loadFonts() {
      await Font.loadAsync({
        'Raleway-Italic': require('../../assets/Raleway-Italic.ttf'),  // Osoita fonttitiedostoon
      });
      setFontsLoaded(true);
    }

    loadFonts();



    const fetchRecipes = async () => {
      try {
        const recipesSnapshot = await getDocs(collection(db, 'recipes'));
        const fetchedRecipes = recipesSnapshot.docs.map(doc => doc.data());
        setRecipes(fetchedRecipes);
        const filteredQuickRecipes = fetchedRecipes.filter(recipe => recipe.tags && recipe.tags.includes("Under 30 minutes"));
        setQuickRecipes(filteredQuickRecipes);
        const filteredAppetizerRecipes = fetchedRecipes.filter(recipe => recipe.tags && recipe.tags.includes("Appetizers"));
        setAppetizerRecipes(filteredAppetizerRecipes);
        const filteredDinnerRecipes = fetchedRecipes.filter(recipe => recipe.tags && recipe.tags.includes("Dinner"));
        setDinnerRecipes(filteredDinnerRecipes);
        const filteredDessertsRecipes = fetchedRecipes.filter(recipe => recipe.tags && recipe.tags.includes("Desserts"));
        setDessertsRecipes(filteredDessertsRecipes);
        const filteredChallengingRecipes = fetchedRecipes.filter(recipe => recipe.tags && recipe.tags.includes("Challenging"));
        setChallengingRecipes(filteredChallengingRecipes);
      } catch (error) {
        console.error('Error retrieving recipes: ', error);
      }
    };
    
    

    fetchRecipes();
  }, []);

  if (!fontsLoaded) {
    return <View><Text>Loading fonts...</Text></View>;  // Näyttää lataustekstin, kunnes fontit on ladattu
  }


  const navigateToCategory = (categoryName) => {
    navigation.navigate(categoryName);
  };

  const navigateToRecipe = (recipe) => {
    navigation.navigate('Recipe', { recipe });
  };

  const renderItem = ({ item }) => (
    <Pressable style={styles.recipeContainer} onPress={() => navigateToRecipe(item)}>
      <View>
        {item.recipeImage && <Image source={{ uri: item.recipeImage }} style={styles.image} />}
        <Text style={styles.recipeName}>{item.recipeName}</Text>
      </View>
    </Pressable>
  );



  const renderItem1 = ({ item }) => (
    <Pressable style={styles.recipeContainer1} onPress={() => navigateToRecipe(item)}>
      <View>
        {item.recipeImage && <Image source={{ uri: item.recipeImage }} style={styles.image1} />}
        <Text style={styles.recipeName1}>{item.recipeName}</Text>
      </View>
    </Pressable>
  );

  const renderItemappe = ({ item }) => (
    <Pressable style={styles.recipes1} onPress={() => navigateToRecipe(item)}>
      <View>
        {item.recipeImage && <Image source={{ uri: item.recipeImage }} style={styles.recipes1image} />}
        <Text style={styles.recipes1text}>{item.recipeName}</Text>
      </View>
    </Pressable>
  );

  const categories = ["Pasta", "Vegetarian", "Salad", "Fish", "Meat", "Burgers", "Pizza", "Grilled foods", "Soups", "Desserts", "Breads and Rolls", "Gluten-Free"];

  const categoryImages = [
    require('./images/pasta.jpg'),
    require('./images/vegetarian.jpg'),
    require('./images/salad.jpg'),
    require('./images/fish.jpg'),
    require('./images/steak.jpg'),
    require('./images/burger.jpg'),
    require('./images/pizza.jpg'),
    require('./images/grilledfoods.jpg'),
    require('./images/soup.jpg'),
    require('./images/desserts.jpg'),
    require('./images/bredsandrolls.jpg'),
    require('./images/muffins.jpg'),
  ];

  const renderCategoryItem = ({ item, index }) => (
    <Pressable style={styles.categories} onPress={() => navigateToCategory(item)}>
      <Image source={categoryImages[index]} style={styles.categoryImage} />
      <Text style={styles.text2}>{item}</Text>
    </Pressable>
  );


  



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
        
        <Text style={styles.text1}>
          Quick Recipes (Under 30 Minutes):
        </Text>
        <FlatList
          data={quickRecipes}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />



         <View style={styles.view}>

           <Text style={styles.text77}>3 Different courses</Text>

           <Text style={styles.text78}> In this section you can find the most tasteful recipes for appetizers, dinners and desserts all! </Text>

           <Image
              source={require('./images/Kolmeruokaa.jpg')}
              style={styles.food}
            />

         



        <Text style={styles.text88}>
          Appetizer Recipes:
        </Text>
        <FlatList

          
          data={appetizerRecipes}
          renderItem={renderItemappe}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />

        <Text style={styles.text8}>
          Dinner Recipes:
        </Text>
        <FlatList

          
          data={dinnerRecipes}
          renderItem={renderItemappe}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />

        <Text style={styles.text8}>
          Dessert Recipes:
        </Text>
        <FlatList

          
          data={dessertsRecipes}
          renderItem={renderItemappe}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />

     </View>  
      

     <Text style={styles.text9}>
     Are you chef material? Because here are some more challenging recipes:
        </Text>
        <FlatList
          data={challengingRecipes}
          renderItem={renderItem1}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      

      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
