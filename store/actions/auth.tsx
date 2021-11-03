export const SIGN_UP = "SIGN_UP";
export const LOGIN = "LOGIN";

export type SignUpAction = {
  type: typeof SIGN_UP;
  token: string;
  userId: string;
};
export type LoginAction = {
  type: typeof LOGIN;
  token: string;
  userId: string;
};

export const signUp = (email: string, password: string) => {
  return async (dispatch: (action: SignUpAction) => void) => {
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

      dispatch({
        type: SIGN_UP,
        token: responseData.idToken,
        userId: responseData.localId,
      });
    } catch (error) {
      throw error;
    }
  };
};
export const login = (email: string, password: string) => {
  return async (dispatch: (action: LoginAction) => void) => {
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

      dispatch({
        type: LOGIN,
        token: responseData.idToken,
        userId: responseData.localId,
      });
    } catch (error) {
      throw error;
    }
  };
};
