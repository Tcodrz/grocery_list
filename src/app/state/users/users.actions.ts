import { User } from './../../core/models/user.interface';
import { createAction, props } from '@ngrx/store';

export const Register = createAction('[USERS] REGISTER', props<{ payload: User }>());
export const Login = createAction('[USERS] LOGIN', props<{ payload: User }>());
export const Logout = createAction('[USERS] LOGOUT');
export const UserLoggedIn = createAction('[USERS] USER LOGGED IN', props<{ payload: User }>());
export const GetUserFromCache = createAction('[USERS] GET FROM CAHCE', props<{ payload: string }>());
export const GetUsersLists = createAction('[USERS] GET LISTS', props<{ payload: string }>());
export const UpdateUser = createAction('[USERS] UPDATE USER', props<{ payload: User }>());
export const Reset = createAction('[USERS] RESET');
export const AddPulicList = createAction('[USERS] ADD PUBLIC LIST', props<{ sListID: string, sUserID: string }>());
