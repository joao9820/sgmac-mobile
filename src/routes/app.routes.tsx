import React from 'react';
import Home from '../pages/Home';

import {createStackNavigator} from '@react-navigation/stack';

const AppStack = createStackNavigator();

const AppRoutes: React.FC = () => (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="Home" component={Home} />
    </AppStack.Navigator>
);

export default AppRoutes;