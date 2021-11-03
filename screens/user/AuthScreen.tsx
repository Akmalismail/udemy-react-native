import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useReducer } from 'react';
import {
    Button, Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, TouchableWithoutFeedback, View
} from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useDispatch } from 'react-redux';

import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';

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

const AuthScreen: NavigationStackScreenComponent = () => {
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

  const signUpHandler = () => {
    dispatch(
      authActions.signUp(
        formState.inputValues.email,
        formState.inputValues.password
      )
    );
  };

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
                minLength={5}
                autoCapitalize="none"
                errorText="Please enter a valid password."
                onInputChange={inputChangeHandler as any}
                initialValue=""
              />
              <View style={styles.buttonContainer}>
                <Button
                  title="Login"
                  color={Colors.primary}
                  onPress={signUpHandler}
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  title="Switch to Sign Up"
                  color={Colors.accent}
                  onPress={() => {}}
                />
              </View>
            </ScrollView>
          </Card>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
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
