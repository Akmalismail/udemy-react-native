import * as placesActions from "../store/places-action";

import { Button, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { ScrollView, TextInput } from "react-native-gesture-handler";

import Colors from "../constants/Colors";
import ImagePicker from "../components/ImagePicker";
import LocationPicker from "../components/LocationPicker";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { useAppDispatch } from "../store/store";

const NewPlaceScreen: NavigationStackScreenComponent = (props) => {
  const dispatch = useAppDispatch();
  const [selectedImage, setSelectedImage] = useState<string>();
  const [selectedLocation, setSelectedLocation] =
    useState<{ lat: number; lng: number }>();

  const [titleValue, setTitleValue] = useState("");
  const titleChangeHandler = (text: string) => {
    setTitleValue(text);
  };

  const imageTakenHandler = (imagePath: string) => {
    setSelectedImage(imagePath);
  };

  const locationPickedHandler = useCallback(
    (location: { lat: number; lng: number }) => {
      setSelectedLocation(location);
    },
    []
  );

  const savePlaceHandler = () => {
    dispatch(
      placesActions.addPlace({
        title: titleValue,
        image: selectedImage as string,
      })
    );
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
        <LocationPicker
          navigation={props.navigation}
          onLocationPicked={locationPickedHandler}
        />
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
