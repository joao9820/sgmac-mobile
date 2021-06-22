import React, { useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import Button from '../../components/Button';
import Header from '../../components/Header';
import UserItem from '../../components/UserItem';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import api from '../../services/api';
import {Solicitation} from '../../@types';
import SolicitationItem from '../../components/SolicitationItem';

 const ListSolicitations: React.FC = () => {

    const [solicitations, setSolicitations] = useState<Solicitation[]>([]);
    const [loadedSolicitations, setLoadedSolicitations] = useState(false);

useEffect(() => {

    api.get<Solicitation[]>('/solicitations').then((response) => {

        const {data} = response;

        setSolicitations(data);

    }).finally(() => {
        setLoadedSolicitations(true);
    })


}, []);

const {navigate} = useNavigation();

    return (
        <View style={styles.container}>
            <Header pageName="Solicitações"/>
            <ScrollView>
                    
                <View style={styles.buttonRegister}>
                    <Button title="Cadastrar" onPress={() => navigate('RegisterSolicitation')}  />
                </View>

                {!loadedSolicitations ? (<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#999"/>
                </View>) : (<>{solicitations.map(solicitation => <SolicitationItem key={solicitation.id_solicitacao} solicitation={solicitation} />)}</>) }

                
            </ScrollView>
        </View>
    );
 }

 export default ListSolicitations;