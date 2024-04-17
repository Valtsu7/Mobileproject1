import React from 'react';
import { Text, View, TextInput, Image, Pressable, ScrollView, SafeAreaView, } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Lisätty
import styles from '../../screens/Search/Searchstyles';



export default Search = () =>{
    return(

     <SafeAreaView>
      <ScrollView>
      <View style={styles.container}>
        <Pressable style={styles.searchContainer} >
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#888"
        />
        {/* Hakukuvake */}
        <MaterialIcons name="search" size={24} color="#888" />
      </Pressable>

      </View>


     <View style={styles.view} >

      <Text style={styles.text1}>
         Popular
       </Text>

       <Text style={styles.text}>
         Difficulty
       </Text>

       <Text style={styles.text}>
         Meal
       </Text>

       <Text style={styles.text}>
         Diet
       </Text>

       <Text style={styles.text}>
         Cooking style
       </Text>

       </View>


      </ScrollView>
      </SafeAreaView>
    )
}