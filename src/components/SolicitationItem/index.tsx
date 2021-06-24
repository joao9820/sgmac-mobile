import React from 'react';
import { View, Image, Text, ViewStyle } from 'react-native';

import {Feather} from '@expo/vector-icons';

import {Avatar} from 'react-native-elements';

import { BorderlessButton } from 'react-native-gesture-handler';

import styles from './styles';
import { Solicitation } from '../../@types';

interface Props {
    solicitation: Solicitation;
    viewSolicitation(solicitation: Solicitation): void;
}
 
const SolicitationItem: React.FC<Props> = ({solicitation, viewSolicitation}) => {

    function getBadgeStatusColor() {

        /* switch(solicitation.fk_status_id){
            case 1: return "#58AC2E"
            case 2: return "#FFCC00"
            case 3: return "#D12A2A"
            case 4: return "#A2A2A2";
            default: return 'gray';
        } */
    

    }

    return (
    <BorderlessButton onPress={() => viewSolicitation(solicitation)}>
    <View style={styles.container}>
        <View style={styles.headerSolicitation}>
            <Text style={styles.code}>{`Cód. ${solicitation.id_solicitacao}`}</Text>
            <View style={[styles.badgeStatus, {backgroundColor: solicitation.status.cor}]}>
                <Text style={styles.badgeText}>{solicitation.status.nome}</Text>
            </View>
        </View>
        <View style={styles.profile}>
            <View style={styles.info}>
                {/* <Image style={styles.avatar}
                source={{ uri:Solicitation.avatar }}/> */}

                <View>
                {solicitation.fk_status_id > 1 && solicitation.fk_status_id < 4  && (
                        
                        <View>
                            <Text style={styles.label}>Observação: </Text>
                            <Text style={styles.subject}>{solicitation.observacao}</Text>
                        </View>
                       
                    )}
                    <View style={styles.groupInfo}>
                        <Text style={styles.label}>Solicitante: </Text>
                        <Text style={styles.subject}>{solicitation.paciente.usuario?.nome}</Text>
                    </View>
                    <View style={styles.groupInfo}>
                        <Text style={styles.label}>Doença: </Text>
                        <Text style={styles.subject}>{solicitation.doenca.nome}</Text>
                    </View>
                    <View style={styles.groupInfo}>
                        <Text style={styles.label}>Solicitado em: </Text>
                        <Text style={styles.subject}>{solicitation.criado_em}</Text>
                    </View>
                    <View style={styles.groupInfo}>
                        <Text style={styles.label}>Autorizador: </Text>
                        <Text style={styles.subject}>{solicitation.fk_autorizador_id ? solicitation.autorizador.nome : 'Aguardando avaliação'}</Text>
                    </View>
                    {solicitation.fk_status_id === 1 && (
                        <>
                        <View style={styles.groupInfo}>
                            <Text style={styles.label}>Vigência: </Text>
                            <Text style={styles.subject}>{`De ${solicitation.data_inicio} até ${solicitation.data_fim}`}</Text>
                        </View>
                        </>
                    )}

                </View>
            </View>
        </View>
    </View>
    </BorderlessButton>);

}

export default SolicitationItem;