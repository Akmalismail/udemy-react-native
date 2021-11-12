import * as Notifications from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Button, StyleSheet, View } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    };
  },
});

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
        if (!status.granted) {
          throw new Error("Permission not granted");
        }
      })
      .then(() => {})
      .catch((_) => {
        return null;
      });
  }, []);

  useEffect(() => {
    const backgroundSubscription =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("addNotificationReceivedListener", notification);
      });

    const foregroundSubscription =
      Notifications.addNotificationResponseReceivedListener((notification) => {
        console.log("addNotificationResponseReceivedListener", notification);
      });

    return () => {
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    };
  }, []);

  const triggerNotificationHandler = async () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "My first local notification",
        body: "This is the first local notification  we are sending!",
        sound: true,
      },
      trigger: {
        seconds: 2,
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
