import { usersReducer, UserState } from './users/users.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { listsReducer, ListsState } from './lists/lists.reducer';

export interface AppState {
  listState: ListsState;
  userState: UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  listState: listsReducer,
  userState: usersReducer,
};

