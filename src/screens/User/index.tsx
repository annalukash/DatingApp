import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationComponentProps} from 'react-native-navigation';
import {store} from '../../app/store';
import {Provider} from 'react-redux';
import UserDetails from './components/UserDetails';

interface IProps extends NavigationComponentProps {
    userId: number;
}

const User = ({userId}: IProps) => {
    return (
        <Provider store={store}>
            <SafeAreaView style={styles.container}>
                <UserDetails userId={userId} />
            </SafeAreaView>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default User;
