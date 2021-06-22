import React, { useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import Button from '../../components/Button';
import Header from '../../components/Header';
import UserItem from '../../components/UserItem';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import api from '../../services/api';
import { User } from '../../@types';

 const Users: React.FC = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [loadedUsers, setLoadedUsers] = useState(false);

useEffect(() => {

    api.get<User[]>('/users').then((response) => {

        const {data} = response;

        setUsers(data);

    }).finally(() => {
        setLoadedUsers(true);
    })


}, []);

const [funcao, setFuncao] = useState<string | number>('');

const {navigate} = useNavigation();

function handleGoBack(){
    navigate('Register');
}

    return (
        <View style={styles.container}>
            <Header pageName="Usuários"/>
            <ScrollView>
                    
                <View style={styles.buttonRegister}>
                    <Button title="Cadastrar" onPress={() => navigate('Register')}  />
                </View>

                {!loadedUsers ? (<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#999"/>
                </View>) : (<>{users.map(user => <UserItem key={user.id_usuario} user={user} />)}</>) }

                
            </ScrollView>
        </View>
    );
 }

 export default Users;