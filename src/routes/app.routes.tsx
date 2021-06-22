import React from 'react';
import Home from '../pages/Home';
import AppRoutesTabs from './AppRoutesTabs';
import Register from '../pages/Register';

import {createStackNavigator} from '@react-navigation/stack';
import Solicitation from '../pages/Solicitation';


const AppStack = createStackNavigator();

const AppRoutes: React.FC = () => (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
        
        {/* Encandeamento de Rotas */}
        <AppStack.Screen name="App" component={AppRoutesTabs} />
        <AppStack.Screen name="RegisterSolicitation" component={Solicitation} />
        <AppStack.Screen name="Register" component={Register} />
        <AppStack.Screen name="Home" component={Home} />
    </AppStack.Navigator>
);

export default AppRoutes;