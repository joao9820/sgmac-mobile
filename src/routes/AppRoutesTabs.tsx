import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Users from '../pages/Users';
import Register from '../pages/Register';

import {Ionicons} from '@expo/vector-icons';
import Solicitation from '../pages/Solicitation';
import { useAuth } from '../contexts/auth';
import ListSolicitations from '../pages/List Solicitations';

const CustomNav = createBottomTabNavigator();

function AppRoutesTabs(){

    const {user} = useAuth();

    const activeColor = '#00305E';

    return (<CustomNav.Navigator
        tabBarOptions={{
            style: {
                elevation: 0, /* Equivalente a box shaddw */
                shadowOpacity: 0,
                height: 64,
            },
            tabStyle: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            },
            iconStyle: {
                flex: 0,
                width: 20,
                height: 20
            },
            labelStyle: {
                fontSize: 13,
                marginLeft: 8,
            },
            inactiveBackgroundColor: '#fafafc',
            activeBackgroundColor: '#ebebf5',
            inactiveTintColor: '#c1bccc',
            activeTintColor: '#32264d',
            keyboardHidesTabBar: true,
        }
    }
    >
        {/* <CustomNav.Screen  name="TeacherList" component={TeacherList} initialParams={{handleDisplayNavTabs: (display: boolean) => displayNavTabs(display)}} options={{
            tabBarLabel: 'Proffys',
            tabBarIcon: ({color, size, focused}) => {
                return (
                    <Ionicons name="ios-easel" size={size} color={focused ? '#8257e5' : color}/>
                );
            }
        }} />
 */}
 

        <CustomNav.Screen  name="Solicitations" component={ListSolicitations} options={{
            tabBarLabel: 'Solicitações',
            tabBarIcon: ({color, size, focused}) => {
                return (
                    <Ionicons name="ios-clipboard-sharp" size={size} color={focused ? activeColor : color}/>
                );
            }
        }} />

        {!!user && user.fk_funcao_id === 1 && ( <CustomNav.Screen name="Users" component={Users} options={{
            tabBarLabel: 'Usuários',
            tabBarIcon: ({color, size, focused}) => {
                return (
                    <Ionicons name="ios-people" size={size} color={focused ? activeColor : color}/>
                );
            }
        }}  />)}
 
        

        <CustomNav.Screen name="Perfil" component={Register} options={{
            tabBarLabel: 'Perfil',
            tabBarIcon: ({color, size, focused}) => {
                return (
                    <Ionicons name="ios-settings" size={size} color={focused ? activeColor : color}/>
                );
            }
        }}  />

    </CustomNav.Navigator>
)


}

export default AppRoutesTabs;