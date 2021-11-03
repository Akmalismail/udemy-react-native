import { LOGIN, LoginAction, SIGN_UP, SignUpAction } from '../actions/auth';

type AuthState = {
  token: string | null;
  userId: string | null;
};

const initialState: AuthState = {
  token: null,
  userId: null,
};

export default (
  state = initialState,
  action: LoginAction | SignUpAction
): AuthState => {
  switch (action.type) {
    case LOGIN:
      return {
        token: action.token,
        userId: action.userId,
      };
    case SIGN_UP:
      return {
        token: action.token,
        userId: action.userId,
      };
    default:
      return state;
  }
};
