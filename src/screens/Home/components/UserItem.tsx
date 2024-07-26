import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TUser} from '../../../app/API';
import {COMMON_STYLES} from '../../../styles';
import UserImage from '../../User/components/UserImage';
import UserDescription from '../../User/components/UserDescription';
import UserHeart from '../../User/components/UserHeart';

interface IProps {
    item: TUser;
    onRemove?: (id: number) => void;
    onNavigate: (user: TUser) => void;
}

export function UserItem(props: IProps) {
    const {item, onRemove, onNavigate} = props;
    const {avatar, name, id, age} = item;

    const handleRemove = useCallback(() => onRemove?.(item.id), [item, onRemove]);

    const renderRemoveButton = useCallback(
        () => (
            <TouchableOpacity onPress={handleRemove} style={styles.removeIconWrapper}>
                <Text style={styles.removeIcon}>x</Text>
            </TouchableOpacity>
        ),
        [handleRemove],
    );

    const renderBody = useCallback(() => {
        return (
            <View style={styles.body}>
                <UserImage avatar={avatar} />
                <UserHeart size={30} id={id} />
                <UserDescription id={id} name={name} age={age} />
                {renderRemoveButton()}
            </View>
        );
    }, [renderRemoveButton]);

    const renderContainer = useCallback(() => {
        return (
            <TouchableOpacity style={styles.container} onPress={() => onNavigate(item)}>
                {renderBody()}
            </TouchableOpacity>
        );
    }, [renderBody]);

    return <View style={styles.root}>{renderContainer()}</View>;
}

const styles = StyleSheet.create({
    root: {
        height: 150,
        width: '100%',
    },
    body: {
        ...COMMON_STYLES.pv_2,
        ...COMMON_STYLES.ph_1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        borderWidth: 1,
        borderRadius: 16,
    },
    container: {
        ...COMMON_STYLES.ph_1,
        ...COMMON_STYLES.pv_1,
        height: '100%',
        width: '100%',
    },
    removeIcon: {
        fontSize: 24,
    },
    removeIconWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
