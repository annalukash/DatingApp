import React from 'react';
import {Text, View} from 'react-native';
import {COMMON_STYLES} from '../../../styles';

interface UserDescriptionProps {
    id: number;
    name: string;
    age: number;
}

const UserDescription = ({id, name, age}: UserDescriptionProps) => {
    return (
        <View style={COMMON_STYLES.ml_2}>
            <Text>id: {id}</Text>
            <Text>Name: {name}</Text>
            <Text>Age: {age}</Text>
        </View>
    );
};

export default UserDescription;
