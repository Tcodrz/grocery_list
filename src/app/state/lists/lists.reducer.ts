import * as ListsActions from './lists.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { List } from './../../core/models/list.interface';
import * as Utils from '../utils';

export interface ListsState {
  lists: List[];
  iCurrentList: number;
  listInvite: List | null;
}

export const initialState: ListsState = {
  lists: [],
  iCurrentList: -1,
  listInvite: null
};

const _listsReducer = createReducer(
  initialState,
  on(ListsActions.Loaded, (state, action) => {
    return { ...state, lists: Utils.sortListItems(action.payload) };
  }),
  on(ListsActions.ListAdded, (state, action) => {
    const lists = [...state.lists, action.payload];
    return { ...state, lists: Utils.sortListItems(lists) }
  }),
  on(ListsActions.Remove, (state, action) => {
    return { ...state, lists: state.lists.filter(list => list !== action.payload) }
  }),
  on(ListsActions.setCurrentList, (state, action) => {
    return { ...state, iCurrentList: action.payload }
  }),
  on(ListsActions.ItemsAddedToList, (state, action) => {
    const lists = Utils.updateList(state.lists, action.payload);
    const sorted = Utils.sortListItems(lists)
    return { ...state, lists: sorted }
  }),
  on(ListsActions.ItemsRemovedFromList, (state, action) => {
    const lists = Utils.updateList(state.lists, action.payload);
    const sorted = Utils.sortListItems(lists);
    return { ...state, lists: sorted };
  }),
  on(ListsActions.Reset, () => initialState),
  on(ListsActions.ItemsUnChecked, (state, action) => {
    return { ...state, lists: Utils.updateList(state.lists, action.payload) };
  }),
  on(ListsActions.ItemsChecked, (state, action) => {
    return { ...state, lists: Utils.sortListItems(Utils.updateList(state.lists, action.payload)) }
  }),
  on(ListsActions.DeleteList, (state, action) => ({ ...state, lists: state.lists.filter(list => list._id !== action.payload._id) })),
  on(ListsActions.ItemUpdated, (state, action) => {
    return { ...state, lists: Utils.updateList(state.lists, action.payload) }
  }),
  on(ListsActions.ListFetched, (state, action) => ({ ...state, listInvite: action.payload })),
);

export function listsReducer(state = initialState, action: Action): ListsState {
  return _listsReducer(state, action);
}
