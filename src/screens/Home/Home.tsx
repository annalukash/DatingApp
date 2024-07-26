import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import {NavigationComponentProps} from 'react-native-navigation';

import UsersList from './components/UsersList';
import {store} from '../../app/store';

const Home = (props: NavigationComponentProps) => (
    <Provider store={store}>
        <SafeAreaView style={styles.root}>
            <UsersList componentId={props.componentId} />
        </SafeAreaView>
    </Provider>
);

const styles = StyleSheet.create({root: {flex: 1}});

export default Home;
