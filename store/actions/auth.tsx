export const SIGN_UP = "SIGN_UP";
export const LOGIN = "LOGIN";

export type SignUpAction = {
  type: typeof SIGN_UP;
};
export type LoginAction = {
  type: typeof LOGIN;
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
        throw new Error("Something went wrong");
      }

      const responseData = await response.json();
      console.log("Response", responseData);

      dispatch({
        type: SIGN_UP,
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
        throw new Error("Something went wrong");
      }

      const responseData = await response.json();
      console.log("Response", responseData);

      dispatch({
        type: LOGIN,
      });
    } catch (error) {
      throw error;
    }
  };
};
