import React, {useCallback, useMemo} from 'react';
import {Image, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';

import UserHeartBlack from '../../../assets/heart_black.png';
import UserHeartRed from '../../../assets/heart_red.png';
import {toggleUserLike} from '../../../app/actions/users';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';

interface UserHeartProps {
    size: number;
    id: number;
    style?: ViewStyle;
}

const UserHeart = ({size, id, style}: UserHeartProps) => {
    const dispatch = useAppDispatch();
    const {likedUserIds} = useAppSelector(state => state.users);
    const isLiked: boolean = useMemo(() => likedUserIds.includes(id), [likedUserIds.length]);

    const handleLikeToggle = useCallback(
        (userId: number) => {
            dispatch(toggleUserLike(userId));
        },
        [dispatch],
    );

    return (
        <TouchableOpacity style={{width: size, height: size, ...style}} onPress={() => handleLikeToggle(id)}>
            <Image source={isLiked ? UserHeartRed : UserHeartBlack} style={styles.image} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
    },
});

export default UserHeart;
