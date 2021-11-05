import { AUTHENTICATE, AuthenticateAction, LOGOUT, LogoutAction } from '../actions/auth';

type AuthState = {
  token: string | null;
  userId: string | null;
};
type AuthActions = AuthenticateAction | LogoutAction;
const initialState: AuthState = {
  token: null,
  userId: null,
};

export default (state = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
