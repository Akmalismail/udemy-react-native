import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, View } from 'react-native';

import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';

const App = () => {
  const [courseGoals, setCourseGoals] = useState<
    Array<{ id: string; value: string }>
  >([]);
  console.log("RE-RENDERING COMPONENT");
  console.log(courseGoals);

  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = (goal: string) => {
    if (goal.length === 0) {
      return;
    }

    setCourseGoals((currentGoals) => [
      ...currentGoals,
      { id: Math.random().toString(), value: goal },
    ]);
    setIsAddMode(false);
  };

  const removeGoalHandler = (goalId: string) => {
    console.log("TO BE DELETED", goalId);
    console.log(courseGoals);

    setCourseGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    });
  };

  const cancelAddGoalHandler = () => {
    setIsAddMode(false);
  };

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
      <GoalInput
        visible={isAddMode}
        onAddGoal={addGoalHandler}
        onCancel={cancelAddGoalHandler}
      />
      <FlatList
        keyExtractor={(item) => item.id}
        data={courseGoals}
        renderItem={(itemData) => (
          <GoalItem
            id={itemData.item.id}
            title={itemData.item.value}
            onDelete={removeGoalHandler}
          />
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
});
