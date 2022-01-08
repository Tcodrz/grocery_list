import { Action, createReducer, on } from '@ngrx/store';
import { Item } from '../../core/models/item.interface';
import { Add, Remove } from './items.actions';

export interface ListState {
  items: Item[];
}

export const initialState: ListState = {
  items: []
};

const _itemsReducer = createReducer(
  initialState,
  on(Add, (state, action) => {
  return {
    items: [...state.items, action.payload]
  };
  }),
  on(Remove, (state, action) => {
    return {
      items: state.items.filter(item => item !== action.payload)
    };
  }),
);

export function itemsReducer(state = initialState, action: Action): ListState {
  return _itemsReducer(state, action);
}
