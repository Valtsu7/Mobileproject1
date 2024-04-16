import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

const PastaScreen = () => {
  useEffect(() => {
    console.log("PastaScreen loaded."); // Tilapäinen console.log-lausunto
  }, []);

  return (
    <View>
      <Text>Pasta Screen</Text>
    </View>
  );
};

export default PastaScreen;