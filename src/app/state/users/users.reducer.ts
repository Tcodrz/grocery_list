import { Action, createReducer, on } from '@ngrx/store';
import { User } from './../../core/models/user.interface';
import * as UsersActions from './users.actions';

export interface UserState {
  user: User | null;
  bIsLoggedIn: boolean;
  bIsUser: boolean;
}

export const initialUserState: UserState = {
  user: null,
  bIsLoggedIn: false,
  bIsUser: false,
};

const _userReducer = createReducer(
  initialUserState,
  on(UsersActions.UserLoggedIn, (state, action) => ({
    ...state,
    user: action.payload,
    bIsLoggedIn: true
  })
  ),
  on(UsersActions.UserAuthenticated, (state, action) => ({
    ...state,
    user: action.payload,
    bIsLoggedIn: true,
    bIsUser: true
  })),
  on(UsersActions.Logout, (state) => ({ ...state, bIsLoggedIn: false })),
  on(UsersActions.UpdateUser, (state, action) => ({
    ...state,
    user: action.payload
  })
  ),
  on(UsersActions.Reset, () => initialUserState)
);

export function usersReducer(state = initialUserState, action: Action): UserState {
  return _userReducer(state, action);
}
