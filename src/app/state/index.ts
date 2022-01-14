import { ActionReducerMap } from '@ngrx/store';
import { listsReducer, ListsState } from './lists/lists.reducer';

export interface AppState {
  listState: ListsState;
}

export const reducers: ActionReducerMap<AppState> = {
  listState: listsReducer,
};

