import {ActionType, createReducer} from 'typesafe-actions';
import {removeUser, toggleUserLike} from '../actions/users';
import {TUser, TUsers} from '../API';
import {fetchUsersAsync, fetchUserItemAsync} from '../asyncActions/users';

type TUsersState = {
    items: TUser[];
    itemsLength: number;
    status: string;
    user: TUser | null;
    userStatus: string;
    likedUserIds: number[];
};

const initialState: TUsersState = {
    items: [],
    itemsLength: 0,
    status: 'loading',
    user: null,
    userStatus: 'loading',
    likedUserIds: [],
};

export type TUsersActions = ActionType<
    | typeof removeUser
    | typeof toggleUserLike
    | typeof fetchUsersAsync.request
    | typeof fetchUsersAsync.success
    | typeof fetchUserItemAsync.success
    | typeof fetchUserItemAsync.request
>;

export const usersReducer = createReducer<TUsersState, TUsersActions>(initialState)
    .handleAction(removeUser, (state, action) => {
        const newItems: TUsers = state.items.filter(item => item.id !== action.payload);
        return {...state, items: newItems, itemsLength: newItems.length};
    })
    .handleAction(toggleUserLike, (state, action) => {
        const isLiked: boolean = state.likedUserIds.includes(action.payload);
        if (isLiked) {
            const filteredList: number[] = state.likedUserIds.filter(item => item !== action.payload);
            return {...state, likedUserIds: filteredList};
        } else {
            const newList: number[] = [...state.likedUserIds, action.payload];
            return {...state, likedUserIds: newList};
        }
    })
    .handleAction(fetchUsersAsync.request, state => ({...state, status: 'loading'}))
    .handleAction(fetchUsersAsync.success, (state, action) => ({
        ...state,
        status: 'idle',
        items: action.payload.users,
        itemsLength: action.payload.length,
    }))
    .handleAction(fetchUserItemAsync.request, state => ({...state, user: null, userStatus: 'loading'}))
    .handleAction(fetchUserItemAsync.success, (state, action) => {
        return {
            ...state,
            userStatus: 'success',
            user: action.payload.user,
        };
    });
