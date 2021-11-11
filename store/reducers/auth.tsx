import {
    AUTHENTICATE, AuthenticateAction, LOGOUT, LogoutAction, SET_DID_TRY_AL, SetDidTryALAction
} from '../actions/auth';

type AuthState = {
  token: string | null;
  userId: string | null;
  didTryAutoLogin: boolean;
};
type AuthActions = AuthenticateAction | LogoutAction | SetDidTryALAction;
const initialState: AuthState = {
  token: null,
  userId: null,
  didTryAutoLogin: false,
};

export default (state = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        didTryAutoLogin: true,
      };
    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
