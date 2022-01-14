import * as ListsActions from './lists.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { List } from './../../core/models/list.interface';
import * as Utils from '../utils';

export interface ListsState {
  lists: List[];
  iCurrentList: number;
}

export const initialState: ListsState = {
  lists: [],
  iCurrentList: 0
};

const _listsReducer = createReducer(
  initialState,
  on(ListsActions.Loaded, (state, action) => {
    return {
      lists: action.payload,
      iCurrentList: 0
    }
  }),
  on(ListsActions.ListAdded, (state, action) => {
    debugger;
    const lists = [...state.lists, action.payload];
    const index = lists.findIndex(list => list._id === action.payload._id);
    return {
      ...state,
      lists: lists,
      iCurrentList: index
    }
  }),
  on(ListsActions.Remove, (state, action) => {
    return {
      ...state,
      lists: state.lists.filter(list => list !== action.payload),
    }
  }),
  on(ListsActions.setCurrentList, (state, action) => {
    return {
      ...state,
      iCurrentList: action.payload
    }
  }),
  on(ListsActions.AddItemToList, (state, action) => {
    return { ...state };
  }),
  on(ListsActions.ItemsAddedToList, (state, action) => {
    return {
      ...state,
      lists: state.lists.map(list => list._id === action.payload._id ? action.payload : list)
    }
  }),
  on(ListsActions.RemoveItemsFromList, (state, action) => {
    const list = state.lists.find(l => l._id === action.payload.listID);
    Utils.removeItemsFromList(list.items, action.payload.items);
    return state;
  }),
  on(ListsActions.ItemsRemovedFromList, (state, action) => {
    return {
      ...state,
      lists: state.lists.map(list => list._id === action.payload._id ? action.payload : list)
    };
  })
);

export function listsReducer(state = initialState, action: Action): ListsState {
  return _listsReducer(state, action);
}
