import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface GoalItemProps {
  id: string;
  title: string;
  onDelete: (id: string) => void;
}

const GoalItem = (props: GoalItemProps) => {
  return (
    <Pressable
      style={({ pressed }) => [{ opacity: pressed ? 0.2 : 1 }]}
      onPress={props.onDelete.bind(this, props.id)}
      android_ripple={{
        color: "#fff",
      }}
    >
      <View style={styles.listItem}>
        <Text>{props.title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#ccc",
    borderColor: "black",
    borderWidth: 1,
  },
});

export default GoalItem;
