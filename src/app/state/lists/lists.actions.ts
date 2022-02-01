import { createAction, props } from '@ngrx/store';
import { Item } from '../../core/models/item.interface';
import { List } from './../../core/models/list.interface';
export const Add = createAction('[LISTS] ADD', props<{ payload: { list: List, sUserID: string } }>());
export const AddItemToList = createAction('[LISTS] ADD ITEM', props<{ payload: { list: List; item: Item } }>());
export const DeleteList = createAction('[LISTS] DELETE LIST', props<{ payload: List }>());
export const FetchList = createAction('[LIST] FETCH', props<{ sListID: string }>());
export const ItemAddedToList = createAction('[LISTS] ITEM ADDED', props<{ payload: List }>());
export const ListAdded = createAction('[LISTS] LIST ADDED', props<{ payload: List }>());
export const ListFetched = createAction('[LIST] FETCHED', props<{ payload: List }>());
export const Load = createAction('[LISTS] LOAD', props<{ sUserID: string }>());
export const Loaded = createAction('[LISTS] LOADED', props<{ payload: List[] }>());
export const Reset = createAction('[LISTS] RESET');
export const setCurrentList = createAction('[LISTS] SET CURRENT', props<{ payload: number }>());
export const Update = createAction('[LISTS] UPDATE', props<{ payload: List }>());
export const Updated = createAction('[LISTS] UPDATED', props<{ payload: List }>());
