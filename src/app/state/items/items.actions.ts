import { Item } from '../../core/models/item.interface';
import { createAction, props } from "@ngrx/store";

export const Add = createAction('[ITEMS] ADD', props<{payload: Item}>());
export const Remove = createAction('[ITEMS] REMOVE', props<{payload: Item}>());
