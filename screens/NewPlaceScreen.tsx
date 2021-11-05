import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import ImagePicker from '../components/ImagePicker';
import Colors from '../constants/Colors';
import * as placesActions from '../store/places-action';
import { useAppDispatch } from '../store/store';

const NewPlaceScreen: NavigationStackScreenComponent = (props) => {
  const dispatch = useAppDispatch();
  const [selectedImage, setSelectedImage] = useState<string>();

  const [titleValue, setTitleValue] = useState("");
  const titleChangeHandler = (text: string) => {
    setTitleValue(text);
  };

  const imageTakenHandler = (imagePath: string) => {
    setSelectedImage(imagePath);
  };

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(titleValue, selectedImage as string));
    props.navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImagePicker onImageTaken={imageTakenHandler} />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: "Add Place",
};

export default NewPlaceScreen;

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});
