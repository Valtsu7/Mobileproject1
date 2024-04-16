import React from 'react';
import { Text, View, TextInput, Image, Pressable } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Lisätty
import styles from '../../style/style';

export default function Header() {
  const navigation = useNavigation(); // Lisätty

  const onPressSearch = () => {
    navigation.navigate('Search'); // Navigoidaan Search.js-sivulle
  };

  return (
    <View style={styles.header}>
      
      <Image
              source={require('../../assets/food2.jpg')}
              style={styles.foodImage}
            />

      <View style={styles.logoContainer}>
        {/* Logo */}
        <Image
          source={require('../../assets/flavorlogo2.png')}
          style={styles.logo}
        />
      </View>
      
      {/* Hakukenttä */}
      <Pressable style={styles.searchContainer} onPress={onPressSearch}>
       
        {/* Hakukuvake */}
        <MaterialIcons name="search" size={24} color="#888" />
      </Pressable>
      
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
