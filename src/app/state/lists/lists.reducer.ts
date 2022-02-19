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
    return { ...state, lists: Utils.sortItemsInit(action.payload) };
  }),
  on(ListsActions.ListCreated, (state, action) => {
    const lists = Utils.sortItemsInit([...state.lists, action.payload]);
    return { ...state, lists: lists }
  }),
  on(ListsActions.ItemAdded, (state, action) => {
    const lists = Utils.sortItemsInit(Utils.updateList(state.lists, action.payload));
    return { ...state, lists };
  }),
  on(ListsActions.setCurrentList, (state, action) => {
    return { ...state, iCurrentList: action.payload }
  }),
  on(ListsActions.Updated, (state, action) => {
    const lists = Utils.updateList(state.lists, action.payload);
    const sorted = Utils.sortItemsInit(lists)
    return { ...state, lists: sorted }
  }),
  on(ListsActions.Reset, () => initialState),
  on(ListsActions.ListDeleted, (state, action) => ({ ...state, lists: state.lists.filter(list => list.id !== action.payload.id) })),
  on(ListsActions.ListFetched, (state, action) => ({ ...state, listInvite: action.payload })),
  on(ListsActions.UserRemovedFromList, (state, action) => ({ ...state, lists: state.lists.filter(list => list.id !== action.payload.id) })),
  on(ListsActions.ListClear, (state, action) => ({ ...state, lists: Utils.updateList(state.lists, action.payload) })),
  on(ListsActions.SortItems, (state, action) => {
    const { listID, sortOption } = action.payload;
    return {
      ...state,
      lists: Utils.sortItems(state.lists, listID, sortOption)
    }
  })
);

export function listsReducer(state = initialState, action: Action): ListsState {
  return _listsReducer(state, action);
}
