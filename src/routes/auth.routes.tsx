import React from 'react';
import Login from '../pages/Login';

import {createStackNavigator} from '@react-navigation/stack';
import Home from '../pages/Home';
import Register from '../pages/Register';

const AuthStack = createStackNavigator();

const AuthRoutes: React.FC = () => (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="Register" component={Register} />
        
    </AuthStack.Navigator>
);

export default AuthRoutes;