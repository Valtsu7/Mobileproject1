import React from 'react';
import { Text, View, TextInput, Image } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import styles from '../style/style';

export default function Header() {
  return (
    <View style={styles.header}>
      
      <Image
              source={require('../assets/food2.jpg')}
              style={styles.foodImage}
            />

      <View style={styles.logoContainer}>
        {/* Logo */}
        <Image
          source={require('../assets/flavorlogo2.png')}
          style={styles.logo}
        />
      </View>
      
      {/* Hakukenttä */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#888"
        />
        {/* Hakukuvake */}
        <MaterialIcons name="search" size={24} color="#888" />
      </View>
      
       {/* Profiilikuva */}
       <View style={styles.profileContainer}>
        {/* Valkoinen pallo taustalle */}
        <View style={styles.profileBackground}></View>
        {/* Profiilikuvake */}
        <AntDesign name="user" size={31} color="black" />
      </View>
    </View>
  );
}
