import { usersReducer, UserState } from './users/users.reducer';
import { ActionReducerMap, createReducer, on, createAction, Action } from '@ngrx/store';
import { listsReducer, ListsState } from './lists/lists.reducer';

export interface AppState {
  app: IAppState;
  listState: ListsState;
  userState: UserState;
}
interface IAppState {
  loading: boolean;
}
const initialState: IAppState = { loading: false };
export const loading = createAction('[APP] LOADING');
export const loaded = createAction('[APP] LOADED');

const _appReducer = createReducer(
  initialState,
  on(loading, () => ({ loading: true })),
  on(loaded, () => ({ loading: false })),
);
function appReducer(state = initialState, action: Action): IAppState {
  return _appReducer(state, action);
}

export const reducers: ActionReducerMap<AppState> = {
  listState: listsReducer,
  userState: usersReducer,
  app: appReducer,
};

