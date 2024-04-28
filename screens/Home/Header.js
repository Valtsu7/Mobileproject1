// import React from 'react';
// import { Text, View, TextInput, Image, Pressable } from 'react-native';
// import { MaterialIcons, AntDesign } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native'; // Lisätty
// import styles from '../../style/style';

// export default function Header() {
//   const navigation = useNavigation(); // Lisätty

//   const onPressSearch = () => {
//     navigation.navigate('Search'); // Navigoidaan Search.js-sivulle
//   };

//   const onPressProfile = () => {
//     navigation.navigate('Profile'); // Navigoidaan Profile.js-sivulle
//   };

//   return (
//     <View style={styles.header}>
//       {/* Background Image */}
//       <Image
//         source={require('../../assets/food2.jpg')}
//         style={styles.foodImage}
//       />
  
//       <View style={styles.logoContainer}>
//         {/* Logo */}
//         <Image
//           source={require('../../assets/flavorlogo2.png')}
//           style={styles.logo}
//         />
//       </View>
  
//       {/* Search Container */}
//       <Pressable style={styles.searchContainer} onPress={onPressSearch}>
//         {/* Search Icon */}
//         <MaterialIcons name="search" size={24} color="#888" />
//       </Pressable>
  
//       {/* Profile Container */}
//       <Pressable style={styles.profileContainer} onPress={onPressProfile}>
//         {/* White Circle Background */}
//         <View style={styles.profileBackground}></View>
//         {/* Profile Icon */}
//         <AntDesign name="user" size={31} color="black" />
//       </Pressable>
//     </View>
//   );
  
// }
import React, { useState } from 'react';
import { Text, View, TextInput, Image, Pressable } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../../style/style';

export default function Header() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const onPressProfile = () => {
    navigation.navigate('Profile');
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      navigation.navigate('Search', { searchQuery });
    }
  };

  return (
    <View style={styles.header}>
      {/* Background Image */}
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
  
      {/* Search Container */}
      <View style={styles.searchContainer}>
        {/* Search Input */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        {/* Search Icon */}
        <Pressable onPress={handleSearch}>
          <MaterialIcons name="search" size={24} color="#888" />
        </Pressable>
      </View>
  
      {/* Profile Container */}
      <Pressable style={styles.profileContainer} onPress={onPressProfile}>
        {/* White Circle Background */}
        <View style={styles.profileBackground}></View>
        {/* Profile Icon */}
        <AntDesign name="user" size={31} color="black" />
      </Pressable>
    </View>
  );
}
