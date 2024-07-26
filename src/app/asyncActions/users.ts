import {ThunkAction} from 'redux-thunk';
import {AnyAction} from 'redux';
import {createAsyncAction} from 'typesafe-actions';

import {fetchUsers, TUsers, TUser, fetchUser} from '../API';
import {RootState} from '../store';

export const fetchUsersAsync = createAsyncAction('FETCH_USERS_REQUEST', 'FETCH_USERS_SUCCESS', 'FETCH_USERS_FAILURE')<
    undefined,
    {users: TUsers; length: number}
>();

export const fetchUserItemAsync = createAsyncAction(
    'FETCH_USER_ITEM_REQUEST',
    'FETCH_USER_ITEM_SUCCESS',
    'FETCH_USER_ITEM_FAILURE',
)<undefined, {user: TUser | null}>();

export const fetchUsersThunk = (): ThunkAction<void, RootState, unknown, AnyAction> => async dispatch => {
    const response = await fetchUsers();
    dispatch(fetchUsersAsync.success({users: response.data, length: response.length}));
};

export const fetchUserItemThunk = (userId: number): ThunkAction<void, RootState, unknown, AnyAction> =>
    async dispatch => {
        dispatch(fetchUserItemAsync.request());
        const response = await fetchUser(userId);
        dispatch(fetchUserItemAsync.success({user: response.data}));
    };
