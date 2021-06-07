import React from 'react';
import { Button, Text ,View } from 'react-native';
import Header from '../../components/Header';
import styles from './styles';
import { useAuth } from '../../contexts/auth';

const Home : React.FC = () => {

    const {user} = useAuth();

    return (
        <View style={styles.container}>
            <Header pageName="Página inicial"/>
            <Text>{user?.nome}</Text>
        </View>
    );

}

export default Home;