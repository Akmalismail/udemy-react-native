import AsyncStorage from '@react-native-async-storage/async-storage';

export const SET_DID_TRY_AL = "SET_DID_TRY_AL";
export type SetDidTryALAction = {
  type: typeof SET_DID_TRY_AL;
};
export const setDidTryAL = (): SetDidTryALAction => {
  return {
    type: SET_DID_TRY_AL,
  };
};

// sign up
export const signUp = (email: string, password: string) => {
  return async (
    dispatch: (action: ReturnType<typeof authenticate>) => void
  ) => {
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

      dispatch(
        authenticate(
          responseData.localId,
          responseData.idToken,
          parseInt(responseData.expiresIn) * 1000
        )
      );

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
  return async (
    dispatch: (action: ReturnType<typeof authenticate>) => void
  ) => {
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

      dispatch(
        authenticate(
          responseData.localId,
          responseData.idToken,
          parseInt(responseData.expiresIn) * 1000
        )
      );

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

export const AUTHENTICATE = "AUTHENTICATE";
export type AuthenticateAction = {
  type: typeof AUTHENTICATE;
  userId: string;
  token: string;
};
export const authenticate = (
  userId: string,
  token: string,
  expiryTime: number
) => {
  return async (
    dispatch: (
      action: AuthenticateAction | ReturnType<typeof setLogoutTimer>
    ) => void
  ) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      token: token,
    });
  };
};

export const LOGOUT = "LOGOUT";
export type LogoutAction = {
  type: typeof LOGOUT;
};
export const logout = (): LogoutAction => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return {
    type: LOGOUT,
  };
};

let timer: NodeJS.Timeout;
const setLogoutTimer = (expirationTime: number) => {
  return async (dispatch: (action: LogoutAction) => void) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};
const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
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
