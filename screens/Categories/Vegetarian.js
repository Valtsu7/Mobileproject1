// VegeScreen.js
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

const VegeScreen = () => {
  useEffect(() => {
    console.log("VegeScreen loaded."); // Tilapäinen console.log-lausunto
  }, []);

  return (
    <View>
      <Text>Vegetarian Screen</Text>
    </View>
  );
};

export default VegeScreen;
