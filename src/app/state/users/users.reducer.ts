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
  on(UsersActions.UserLoggedIn, (state, action) => {
    return {
      ...state,
      user: action.payload,
      bIsLoggedIn: true
    };
  }),
  on(UsersActions.GetUserFromCache, (state, action) => ({ ...state, user: action.payload, bIsUser: true })),
  on(UsersActions.Logout, (state) => ({ ...state, bIsLoggedIn: false })),
);

export function usersReducer(state = initialUserState, action: Action): UserState {
  return _userReducer(state, action);
}
