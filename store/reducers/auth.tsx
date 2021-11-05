import { AUTHENTICATE, AuthenticateAction } from '../actions/auth';

type AuthState = {
  token: string | null;
  userId: string | null;
};
type AuthActions = AuthenticateAction;
const initialState: AuthState = {
  token: null,
  userId: null,
};

export default (
  state = initialState,
  action: AuthenticateAction
): AuthState => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
      };
    default:
      return state;
  }
};
