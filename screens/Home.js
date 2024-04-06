import React, { useEffect, useState } from 'react';
import { Text, View, Pressable, Image, ScrollView } from 'react-native'
import { Container, Row, Col } from 'react-native-flex-grid';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../style/style';
import Header from './Header';


export default Home = (navigation, route) =>{
    return(
        <View>
            <Header />
            <Text style={styles.text} >Welcome to FlavorFriends!</Text>
            
            <Text style={styles.text1}> Here is some categories for you! </Text>
        </View>

        
    )
}
