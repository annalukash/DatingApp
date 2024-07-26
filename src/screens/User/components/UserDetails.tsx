import React, {useEffect, useMemo} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {fetchUserItemThunk} from '../../../app/asyncActions/users';
import UserImage from './UserImage';
import UserDescription from './UserDescription';
import UserHeart from './UserHeart';
import {COMMON_STYLES} from '../../../styles';

interface IProps {
    userId: number;
}

const UserDetails = ({userId}: IProps) => {
    const dispatch = useAppDispatch();
    const {userStatus, user} = useAppSelector(state => state.users);
    const isLoading: boolean = useMemo(() => userStatus === 'loading', [userStatus]);

    useEffect(() => {
        dispatch(fetchUserItemThunk(userId));
    }, [userId, dispatch]);

    return isLoading ? (
        <View style={styles.center}>
            <ActivityIndicator size="large" />
        </View>
    ) : (
        <View style={styles.container}>
            <View>
                <UserImage avatar={user?.avatar} size={200} />
                <UserHeart size={50} id={userId} style={styles.heart} />
            </View>
            {user && <UserDescription id={user.id} name={user.name} age={user.age} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        ...COMMON_STYLES.mh_2,
        ...COMMON_STYLES.mt_3,
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heart: {
        position: 'absolute',
        bottom: -20,
        left: 10,
    },
});

export default UserDetails;
