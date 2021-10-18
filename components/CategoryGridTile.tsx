import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

type CategoryGridTileProps = {
  title: string;
  color: string;
  onSelect: () => void;
};

const CategoryGridTile: React.FC<CategoryGridTileProps> = (props) => {
  return (
    <View style={styles.gridItem}>
      <Pressable
        android_ripple={{
          borderless: true,
        }}
        style={({ pressed }) => [
          {
            ...styles.button,
            ...{
              opacity: Platform.OS === "ios" && pressed ? 0.5 : 1.0,
              backgroundColor: props.color,
            },
          },
        ]}
        onPress={props.onSelect}
      >
        <Text style={styles.titleStyle} numberOfLines={2}>
          {props.title}
        </Text>
      </Pressable>
    </View>
  );
};

export default CategoryGridTile;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 10,
  },
  button: {
    flex: 1,
    height: 150,
    borderRadius: 10,
    padding: 15,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  titleStyle: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "right",
  },
});
