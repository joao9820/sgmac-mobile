import React, { useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Alert } from 'react-native';
import Button from '../../components/Button';
import Header from '../../components/Header';
import UserItem from '../../components/UserItem';

import styles from './styles';
import { useNavigation, useIsFocused, useFocusEffect } from '@react-navigation/native';
import { useEffect } from 'react';
import api from '../../services/api';
import { User } from '../../@types';

 const Users: React.FC = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [loadedUsers, setLoadedUsers] = useState(false);

    const navigation = useNavigation();

useEffect(() => {

    const focus = navigation.addListener('focus', () => {

        api.get<User[]>('/users').then((response) => {

            const {data} = response;
    
            setUsers(data);
    
        }).finally(() => {
            setLoadedUsers(true);
        })
      });

      navigation.addListener('blur', () => {
        setLoadedUsers(false);
      });

      return focus;

}, [navigation]);

const [funcao, setFuncao] = useState<string | number>('');

const {navigate} = useNavigation();

const handleDeleteUser = (user: User) => {

    Alert.alert(
        "Deletar usuário",
        `Deseja deletar o usuário ${user.nome} ?`,
        [
          {
            text: "Cancelar",
            style: "cancel"
          },
          { text: "Confirmar", onPress: () => {setLoadedUsers(false); api.delete(`/users/${user.id_usuario}`)
          .then((response) => {setUsers((state) => state.filter((us) => us.id_usuario !== user.id_usuario )); Alert.alert('Usuário apagado com sucesso!')})
          .catch((err) => Alert.alert("Não foi possível apagar o usuário", err.response.data?.error)).finally(() => setLoadedUsers(true))} }
        ]
      );
}

    return (
        <View style={styles.container}>
            <Header pageName="Usuários"/>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    
                <View style={styles.buttonRegister}>
                    <Button title="Cadastrar" onPress={() => navigate('Register')}  />
                </View>

                {!loadedUsers ? (<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#999"/>
                </View>) : (<>{users.map(user => <UserItem key={user.id_usuario} user={user} onDelete={(user) => handleDeleteUser(user)} />)}</>) }

                
            </ScrollView>
        </View>
    );
 }

 export default Users;