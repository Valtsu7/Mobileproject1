import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Pressable, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './Searchstyles'; // Import your styles here

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState('');
  const [showCategories, setShowCategories] = useState(true); // Track whether to show categories or search results

  // Define tag options
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

  // Function to handle search
  const handleSearch = () => {
    setShowCategories(false); // Hide categories when search is performed
    // Perform search here
  };

  // Function to expand category
  const expandCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? '' : category);
  };

  // Function to render subcategories
  const renderSubcategories = (category) => {
    return (
      <FlatList
        data={tagOptions[category]}
        renderItem={({ item }) => (
          <Pressable onPress={() => console.log(item)}>
            <Text style={styles.tagOption}>{item}</Text>
          </Pressable>
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    );
  };

  // Function to render search results
  const renderSearchResults = () => {
    // Simulated search results, replace with actual data
    const searchResults = []; // Replace this with the actual search results
    return (
      <FlatList
        data={searchResults}
        renderItem={({ item }) => (
          <Pressable onPress={() => console.log(item)}>
            <Text>{item.recipeName}</Text> {/* Replace this with the actual recipe name */}
          </Pressable>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* Search bar */}
        <Pressable style={styles.searchContainer} onPress={handleSearch}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {/* Search icon */}
          <MaterialIcons name="search" size={24} color="#888" />
        </Pressable>
      </View>
      {/* Render categories only if showCategories is true */}
      {showCategories && (
        <FlatList
          data={Object.keys(tagOptions)}
          renderItem={({ item }) => (
            <View>
              <Pressable onPress={() => expandCategory(item)}>
                <Text style={styles.categoryTitle}>{item}</Text>
              </Pressable>
              {/* Render subcategories if the category is expanded */}
              {expandedCategory === item && renderSubcategories(item)}
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
      {/* Show search results if showCategories is false */}
      {!showCategories && renderSearchResults()}
    </SafeAreaView>
  );
};

export default Search;
