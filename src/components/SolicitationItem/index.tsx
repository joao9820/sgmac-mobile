import React from 'react';
import { View, Image, Text } from 'react-native';

import {Feather} from '@expo/vector-icons';

import {Avatar} from 'react-native-elements';

import { BorderlessButton } from 'react-native-gesture-handler';

import styles from './styles';
import { Solicitation } from '../../@types';

interface Props {
    solicitation: Solicitation;
}

const SolicitationItem: React.FC<Props> = ({solicitation}) => {

    return (<View style={styles.container}>
        <View style={styles.profile}>
            <View style={styles.info}>
                {/* <Image style={styles.avatar}
                source={{ uri:Solicitation.avatar }}/> */}

                <View style={styles.profileInfo}>
                    <View style={styles.headerSolicitation}>
                        <Text style={styles.name}>{solicitation.id_solicitacao}</Text>
                        <Text style={[styles.subject, {backgroundColor: solicitation.status.cor}]}>{solicitation.status.nome}</Text>
                    </View>
                    <Text style={styles.subject}>{solicitation.criado_em}</Text>
                    <Text style={styles.subject}>{solicitation.criado_em}</Text>
                    <Text style={styles.subject}>{solicitation.criado_em}</Text>
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

export default SolicitationItem;