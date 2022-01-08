import { ActionReducerMap } from '@ngrx/store';
import { itemsReducer, ListState } from './items/items.reducer';

export interface AppState {
  list: ListState;
}

export const reducers: ActionReducerMap<AppState> = {
  list: itemsReducer
};

