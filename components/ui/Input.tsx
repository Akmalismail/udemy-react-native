import React, { useReducer } from 'react';
import { StyleSheet, Text, TextInputProps, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

type InputProps = TextInputProps & {
  label: string;
  errorText: string;
  initialValue?: string;
  initiallyValid: boolean;
  required: boolean;
  email: boolean;
  min: number;
  max: number;
  minLength: number;
};

const INPUT_CHANGE = "INPUT_CHANGE";
type InputState = {
  value: string;
  isValid: boolean;
  touched: boolean;
};
type InputAction = {
  type: typeof INPUT_CHANGE;
  value: string;
  isValid: boolean;
};
const inputReducer = (state: InputState, action: InputAction): InputState => {
  switch (action.type) {
    case INPUT_CHANGE:
    default:
      return state;
  }
};

const Input = (props: InputProps) => {
  const [state, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initiallyValid,
    touched: false,
  });

  const textChangeHandler = (text: string) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={state.value}
        onChangeText={textChangeHandler}
      />
      {!state.isValid && <Text>{props.errorText}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});
