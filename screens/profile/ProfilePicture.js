import React, { useState } from 'react';
import { View, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ProfilePicture = () => {
  const [profileImage, setProfileImage] = useState(null);

  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.uri);
    }
  };

  return (
    <View>
      {profileImage && (
        <Image source={{ uri: profileImage }} style={{ width: 200, height: 200, borderRadius: 100 }} />
      )}
      <Button title="Take a picture" onPress={takePicture} />
    </View>
  );
};

export default ProfilePicture;