import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
    ActivityIndicator, Alert, Button, Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet,
    TouchableWithoutFeedback, View
} from 'react-native';
import { useDispatch } from 'react-redux';

import { StackNavigationOptions } from '@react-navigation/stack';

import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';
import { AuthScreenProps } from '../../types';

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
type InputIdentifier = "email" | "password";
type FormReducerAction = {
  type: typeof FORM_INPUT_UPDATE;
  value: string;
  isValid: boolean;
  input: InputIdentifier;
};
type FormState = {
  inputValues: {
    email: string;
    password: string;
  };
  inputValidities: {
    [key in InputIdentifier]: boolean;
  };
  formIsValid: boolean;
};
const formReducer = (
  state: FormState,
  action: FormReducerAction
): FormState => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities: { [key in InputIdentifier]: boolean } = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid =
        updatedFormIsValid && updatedValidities[key as InputIdentifier];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
    };
  }

  return state;
};

const AuthScreen: React.FC<AuthScreenProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>();
  const [isSignUp, setisSignUp] = useState(false);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const inputChangeHandler = useCallback(
    (
      inputIdentifier: InputIdentifier,
      inputValue: string,
      inputValidity: boolean
    ) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  const authHandler = async () => {
    if (!formState.formIsValid) {
      return;
    }

    let action;
    if (isSignUp) {
      action = authActions.signUp(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action as unknown as Promise<typeof action>);
      props.navigation.navigate("Shop");
    } catch (error) {
      setError((error as { message: string }).message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, ...styles.screen }}
      behavior="padding"
      keyboardVerticalOffset={-150}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
          <Card style={styles.authContainer}>
            <ScrollView>
              <Input
                id="email"
                label="E-Mail"
                keyboardType="email-address"
                required
                email
                autoCapitalize="none"
                errorText="Please enter a valid email address."
                onInputChange={inputChangeHandler as any}
                initialValue=""
              />
              <Input
                id="password"
                label="Password"
                keyboardType="default"
                secureTextEntry
                required
                minLength={6}
                autoCapitalize="none"
                errorText="Please enter a valid password."
                onInputChange={inputChangeHandler as any}
                initialValue=""
              />
              <View style={styles.buttonContainer}>
                {isLoading ? (
                  <ActivityIndicator size="small" color={Colors.primary} />
                ) : (
                  <Button
                    title={isSignUp ? "Sign Up" : "Login"}
                    color={Colors.primary}
                    onPress={authHandler}
                  />
                )}
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  title={`Switch to ${isSignUp ? "Login" : "Sign Up"}`}
                  color={Colors.accent}
                  onPress={() => {
                    setisSignUp((prevState) => !prevState);
                  }}
                />
              </View>
            </ScrollView>
          </Card>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export const screenOptions: StackNavigationOptions = {
  headerTitle: "Authenticate",
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {},
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
