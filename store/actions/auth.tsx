import AsyncStorage from '@react-native-async-storage/async-storage';

// sign up
export const signUp = (email: string, password: string) => {
  return async (dispatch: (action: AuthenticateAction) => void) => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyClZQBT6Eek3xcDN8IG8niywrZWVQnjDg0",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        const errorJson = await response.json();
        console.log("signUp", errorJson);
        const errorId = errorJson.error.message;
        let message = "Something went wrong!";

        if (errorId === "EMAIL_EXISTS") {
          message = "This email already exists!";
        }

        throw new Error(message);
      }

      const responseData = await response.json();

      dispatch(authenticate(responseData.localId, responseData.idToken));

      const expirationDate = new Date(
        new Date().getTime() + parseInt(responseData.expiresIn) * 1000
      );

      saveDataToStorage(
        responseData.idToken,
        responseData.localId,
        expirationDate
      );
    } catch (error) {
      throw error;
    }
  };
};

// login
export const login = (email: string, password: string) => {
  return async (dispatch: (action: AuthenticateAction) => void) => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyClZQBT6Eek3xcDN8IG8niywrZWVQnjDg0",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        const errorJson = await response.json();
        console.log("signUp", errorJson);
        const errorId = errorJson.error.message;
        let message = "Something went wrong!";

        if (errorId === "EMAIL_NOT_FOUND") {
          message = "This email could not be found!";
        } else if (errorId === "INVALID_PASSWORD") {
          message = "This password is not valid!";
        }

        throw new Error(message);
      }

      const responseData = await response.json();

      dispatch(authenticate(responseData.localId, responseData.idToken));

      const expirationDate = new Date(
        new Date().getTime() + parseInt(responseData.expiresIn) * 1000
      );

      saveDataToStorage(
        responseData.idToken,
        responseData.localId,
        expirationDate
      );
    } catch (error) {
      throw error;
    }
  };
};

const saveDataToStorage = (
  token: string,
  userId: string,
  expirationDate: Date
) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};

export const AUTHENTICATE = "AUTHENTICATE";
export type AuthenticateAction = {
  type: typeof AUTHENTICATE;
  userId: string;
  token: string;
};
export const authenticate = (
  userId: string,
  token: string
): AuthenticateAction => {
  return {
    type: AUTHENTICATE,
    userId: userId,
    token: token,
  };
};
