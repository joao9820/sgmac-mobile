import React from 'react';
import { View, Image, Text } from 'react-native';

import {Feather} from '@expo/vector-icons';

import {Avatar} from 'react-native-elements';

import { BorderlessButton } from 'react-native-gesture-handler';

import styles from './styles';

interface Funcao {
    id_funcao: number;
    nome: string;
}

interface User {
    id_usuario: number;
    nome: string;
    avatar?: string;
    funcao: Funcao;
}

interface Props {
    user: User;
}


const UserItem: React.FC<Props> = ({user}) => {

    return (<View style={styles.container}>
        <View style={styles.profile}>
            <View style={styles.info}>
                <Avatar
                size="medium"
                icon={{name: 'user', color: '#eee' ,type: 'font-awesome'}}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
                />
                {/* <Image style={styles.avatar}
                source={{ uri:user.avatar }}/> */}

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{user.nome}</Text>
                    <Text style={styles.subject}>{user.funcao.nome}</Text>
                </View>
            </View>

            <View style={styles.options}>
                <BorderlessButton style={{marginRight: 8}}>
                        <Feather name="edit" size={22} color="black" />
                    </BorderlessButton>
                <BorderlessButton>
                    <Feather name="trash" size={22} color="black" />
                </BorderlessButton>
            </View>
        </View>
    </View>);

}

export default UserItem;