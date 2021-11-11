import * as Notifications from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  useEffect(() => {
    Notifications.getPermissionsAsync()
      .then((status) => {
        if (!status.granted) {
          return Notifications.requestPermissionsAsync();
        }
        return status;
      })
      .then((status) => {
        if (status.granted) {
          return;
        }
      });
  }, []);

  const triggerNotificationHandler = async () => {
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
