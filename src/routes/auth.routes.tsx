import React from 'react';
import Login from '../pages/Login';

import {createStackNavigator} from '@react-navigation/stack';
import Home from '../pages/Home';
import Register from '../pages/Register';

export type ParamList = {
    Login: undefined;
    Register: {pacient: boolean};
}

const AuthStack = createStackNavigator<ParamList>();

const AuthRoutes: React.FC = () => (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="Register" component={Register} initialParams={{pacient: true}} />
        
    </AuthStack.Navigator>
);

export default AuthRoutes;