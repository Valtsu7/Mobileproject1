import React, { useState } from 'react';
import { Text, View, TextInput, Image, Pressable, FlatList } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../../style/style';

const Header = ({ searchQuery, setSearchQuery, handleSearch, searchResults }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {/* Background Image */}
      <Image source={require('../../assets/food2.jpg')} style={styles.foodImage} />

      <View style={styles.logoContainer}>
        {/* Logo */}
        <Image source={require('../../assets/flavorlogo2.png')} style={styles.logo} />
      </View>

      {/* Search Container */}
      <View style={styles.searchContainer}>
        {/* Search Input */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          onSubmitEditing={handleSearch}
        />
        {/* Search Icon */}
        <Pressable onPress={handleSearch}>
          <MaterialIcons name="search" size={24} color="#888" />
        </Pressable>
      </View>

      {/* Profile Container */}
      <Pressable style={styles.profileContainer} onPress={() => navigation.navigate('Profile')}>
        {/* White Circle Background */}
        <View style={styles.profileBackground}></View>
        {/* Profile Icon */}
        <AntDesign name="user" size={31} color="black" />
      </Pressable>
    </View>
  );
};

export default Header;