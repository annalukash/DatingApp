/**
 * @format
 */

import {Navigation} from 'react-native-navigation';
import Home from './src/screens/Home';
import User from './src/screens/User';

Navigation.registerComponent('Home', () => Home);
Navigation.registerComponent('User', () => User);

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [{component: {name: 'User'}}, {component: {name: 'Home'}}],
            },
        },
    });
});
