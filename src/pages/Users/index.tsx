import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Button from '../../components/Button';
import Header from '../../components/Header';
import UserItem from '../../components/UserItem';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';

 const Users: React.FC = () => {

    const users = [{
        id_usuario: 1,
        nome: 'João Victor',
        funcao: {
          id_funcao: 1,
          nome: 'Administrador',
        }
        },
        {
            id_usuario: 2,
            nome: 'João Victor',
            funcao: {
              id_funcao: 1,
              nome: 'Administrador',
            },
    }, 
    {
        id_usuario: 3,
        nome: 'João Victor',
        funcao: {
          id_funcao: 1,
          nome: 'Administrador',
        },
    },
    {
        id_usuario: 4,
        nome: 'João Victor',
        funcao: {
          id_funcao: 1,
          nome: 'Administrador',
        },
    }
];

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
                    <Button title="Cadastrar" onPress={() => console.log('teste')}  />
                </View>

                {users.map(user => <UserItem key={user.id_usuario} user={user} />)}
            </ScrollView>
        </View>
    );
 }

 export default Users;