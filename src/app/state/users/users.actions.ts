import { User } from './../../core/models/user.interface';
import { createAction, props } from '@ngrx/store';

export const Register = createAction('[USERS] REGISTER', props<{ payload: User }>());
export const Login = createAction('[USERS] LOGIN', props<{ payload: User }>());
export const Logout = createAction('[USERS] LOGOUT');
export const UserLoggedIn = createAction('[USERS] USER LOGGEDIN', props<{ payload: User }>());
export const GetUserFromCache = createAction('[USERS] GET FROM CAHCE', props<{ payload: User }>());
