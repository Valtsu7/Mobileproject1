import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

const EmptyScreen = () => {
  useEffect(() => {
    console.log("PastaScreen loaded."); // Tilapäinen console.log-lausunto
  }, []);

  return (
    <View>
      <Text>Empty</Text>
    </View>
  );
};

export default EmptyScreen;