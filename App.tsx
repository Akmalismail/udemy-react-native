import * as Notifications from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const triggerNotificationHandler = async () => {
    const permissionResult = await Notifications.requestPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required!",
        "Please enable notification permissions",
        [{ text: "Okay" }]
      );
      return;
    }

    Notifications.scheduleNotificationAsync({
      content: {
        title: "My first local notification",
        body: "This is the first local notification  we are sending!",
      },
      trigger: {
        seconds: 10,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Button
        title="Trigger Notification"
        onPress={triggerNotificationHandler}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
