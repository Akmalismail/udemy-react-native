import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native';

import Colors from '../constants/Colors';

const ImgPicker = () => {
  const [pickedImage, setPickedImage] = useState<string>();

  const verifyPermissions = async () => {
    const result = await ImagePicker.requestCameraPermissionsAsync();
    if (result.status !== ImagePicker.PermissionStatus.GRANTED) {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app",
        [{ text: "Okay" }]
      );
      return false;
    }

    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
      exif: true,
    });

    console.log(image);
    if (!image.cancelled) {
      setPickedImage(image.uri);
    }
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No image picked yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};

export default ImgPicker;

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
