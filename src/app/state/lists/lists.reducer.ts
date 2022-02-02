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
    const lists = Utils.sortListItems([...state.lists, action.payload]);
    return { ...state, lists: lists }
  }),
  on(ListsActions.ItemAddedToList, (state, action) => {
    const lists = Utils.sortListItems(Utils.updateList(state.lists, action.payload));
    return { ...state, lists };
  }),
  on(ListsActions.setCurrentList, (state, action) => {
    return { ...state, iCurrentList: action.payload }
  }),
  on(ListsActions.Updated, (state, action) => {
    const lists = Utils.updateList(state.lists, action.payload);
    const sorted = Utils.sortListItems(lists)
    return { ...state, lists: sorted }
  }),
  on(ListsActions.Reset, () => initialState),
  on(ListsActions.ListDeleted, (state, action) => ({ ...state, lists: state.lists.filter(list => list.id !== action.payload.id) })),
  on(ListsActions.ListFetched, (state, action) => ({ ...state, listInvite: action.payload })),
);

export function listsReducer(state = initialState, action: Action): ListsState {
  return _listsReducer(state, action);
}
