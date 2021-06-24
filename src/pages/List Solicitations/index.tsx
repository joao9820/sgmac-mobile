import React, { useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import Button from '../../components/Button';
import Header from '../../components/Header';
import UserItem from '../../components/UserItem';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import api from '../../services/api';
import {Solicitation} from '../../@types';
import SolicitationItem from '../../components/SolicitationItem';
import { Divider, Overlay } from 'react-native-elements';
import CheckBox from '@react-native-community/checkbox';
import Input from '../../components/Input';
import { RectButton } from 'react-native-gesture-handler';
import { useAuth } from '../../contexts/auth';

 const ListSolicitations: React.FC = () => {

    const [solicitations, setSolicitations] = useState<Solicitation[]>([]);
    const [loadedSolicitations, setLoadedSolicitations] = useState(false);

    const navigation = useNavigation();
    const {user} = useAuth();

useEffect(() => {

    const focus = navigation.addListener('focus', () => {

        setLoadedSolicitations(false);

        api.get<Solicitation[]>('/solicitations').then((response) => {

            const {data} = response;
            
            setSolicitations(data);
    
        }).finally(() => {
            setLoadedSolicitations(true);
        })
    });

    navigation.addListener('blur', () => {
        setLoadedSolicitations(false);
    });

    return focus;

}, [navigation]);

const {navigate} = useNavigation();

const [visible, setVisible] = useState(false);
const [visibleMotive, setVisibleMotive] = useState(false);
const [motive, setMotive] = useState('');

const [solicitationInfo, setSolicitationInfo] = useState<Solicitation | null>(null);
const [status, setStatus] = useState<number | null>(null);

const handleToogleOverlay = (dados: Solicitation) => {

    setSolicitationInfo(dados);

    toggleOverlay();

}

const handleAuthorize = (status: number, checked ?: boolean) => {

    if(status > 1 && !checked){
        setStatus(status);
        toogleOverlayMotive();
    }else{
        handleSubmitAuthorize(status);
    }

}

const toogleOverlayMotive = () => {
    setVisibleMotive(!visibleMotive);
}

const toggleOverlay = () => {
    setVisible(!visible);
};

const handleSubmitAuthorize = (status: number) => {

    setLoadedSolicitations(false);

    //console.log(user);

    api.put<Solicitation>(`/solicitations/${solicitationInfo?.id_solicitacao}`, 
    {fk_autorizador_id: user?.id_usuario,
        fk_status_id: status,
        observacao: motive}).then((response) => {

        const {data} = response;

        if(visibleMotive)
            toogleOverlayMotive();

        toggleOverlay();

        setSolicitations((state) => state.map((solicitation) => {
            
            return solicitation.id_solicitacao === solicitationInfo?.id_solicitacao ?  {
                ...solicitation,
                fk_status_id: data.fk_status_id,
                fk_autorizador_id: data.fk_autorizador_id,
                observacao: data.observacao,
                data_inicio: data.data_inicio,
                data_fim: data.data_fim,
                status: {
                    ...data.status,
                },
                autorizador: {
                    ...data.autorizador
                }
            } : solicitation

        }));

        setSolicitationInfo(null);

        Alert.alert(
            'Solicitação respondida com sucesso',
            'A solicitação foi respondida, você foi atribuido autorizador e os dados foram atualizados',
          );

    }).catch((err) => {

        Alert.alert(
            'Erro ao responder a solicitação',
            err.response.data?.error,
          );

    }).finally(() => {
        setLoadedSolicitations(true);
    })
}

    return (
        <View style={styles.container}>
            <Header pageName="Solicitações"/>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    
                {user?.fk_funcao_id === 3 && (<View style={styles.buttonRegister}>
                    <Button title="Cadastrar" onPress={() => navigate('RegisterSolicitation')}  />
                </View>)}
                

                {!loadedSolicitations ? (<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#999"/>
                </View>) : (<>{solicitations.map(solicitation => <SolicitationItem key={solicitation.id_solicitacao} solicitation={solicitation} 
                viewSolicitation={(dados) => handleToogleOverlay(dados)} />)}</>) }
                
            </ScrollView>

            <Overlay overlayStyle={{height: 600, paddingBottom: 60 ,width: '100%', marginHorizontal: 20}} isVisible={visible} onBackdropPress={toggleOverlay}>
                <ScrollView>
                    <View style={styles.groupInfo}>
                        <Text style={styles.label}>Médico: </Text>
                        <Text style={styles.subject}>{solicitationInfo?.medico.usuario?.nome}</Text>
                    </View>
                    <View style={styles.groupInfo}>
                        <Text style={styles.label}>CPF: </Text>
                        <Text style={styles.subject}>{solicitationInfo?.medico.usuario?.cpf}</Text>
                    </View>
                    <View style={styles.groupInfo}>
                        <Text style={styles.label}>CNS: </Text>
                        <Text style={styles.subject}>{solicitationInfo?.medico.cns}</Text>
                    </View>
                    <View style={styles.groupInfo}>
                        <Text style={styles.label}>CNES: </Text>
                        <Text style={styles.subject}>{solicitationInfo?.medico.cnes}</Text>
                    </View>
                    <View style={styles.groupInfo}>
                        <Text style={styles.label}>Estabelecimento: </Text>
                        <Text style={styles.subject}>{solicitationInfo?.medico.estabelecimento}</Text>
                    </View>
                    <View style={styles.groupInfo}>
                        <Text style={styles.label}>Paciente: </Text>
                        <Text style={styles.subject}>{solicitationInfo?.paciente.usuario?.nome}</Text>
                    </View>
                    <View style={styles.groupInfo}>
                        <Text style={styles.label}>Mãe do paciente: </Text>
                        <Text style={styles.subject}>{solicitationInfo?.paciente.nome_da_mae}</Text>
                    </View>
                    <View style={styles.groupInfo}>
                        <Text style={styles.label}>CPF: </Text>
                        <Text style={styles.subject}>{solicitationInfo?.paciente.usuario?.cpf}</Text>
                    </View>
                    <View style={styles.groupInfo}>
                        <Text style={styles.label}>E-mail: </Text>
                        <Text style={styles.subject}>{solicitationInfo?.paciente.usuario?.email}</Text>
                    </View>
                    <View style={styles.groupInfo}>
                        <Text style={styles.label}>Telefone: </Text>
                        <Text style={styles.subject}>{solicitationInfo?.paciente.usuario?.telefone1}</Text>
                    </View>
                    <View style={styles.groupInfo}>
                        <Text style={styles.label}>Raça: </Text>
                        <Text style={styles.subject}>{solicitationInfo?.paciente.raca}</Text>
                    </View>
                    <View style={styles.groupInfo}>
                        <Text style={styles.label}>Peso: </Text>
                        <Text style={styles.subject}>{`${solicitationInfo?.paciente.peso} Kg`}</Text>
                    </View>
                    <View style={styles.groupInfo}>
                        <Text style={styles.label}>Altura: </Text>
                        <Text style={styles.subject}>{`${solicitationInfo?.paciente.tamanho} m`}</Text>
                    </View>
                    <View style={styles.groupInfo}>
                        <Text style={styles.label}>Doença: </Text>
                        <Text style={styles.subject}>{solicitationInfo?.doenca.nome}</Text>
                    </View>
                    {!!solicitationInfo?.medicamentos.length && solicitationInfo.medicamentos.map((med, idx) => {

                        return (
                            <View key={med.id_medicamento}>
                                {idx > 0 && <Divider orientation="horizontal" style={styles.divider} color='#FCFCFC' />}
                                <View>
                                    <Text style={styles.label}>Nome: </Text>
                                    <Text style={styles.subject}>{med.nome}</Text>
                                </View>
                                <View style={styles.groupInfo}>
                                    <Text style={styles.label}>Quantidade: </Text>
                                    <Text style={styles.subject}>{med.pivot?.quantidade}</Text>
                                </View>
                                <Text style={styles.labelGroup}>Meses</Text>
                                            <View style={styles.optionMes}>
                                                <View style={styles.mesItem}>
                                                    <CheckBox value={!!med.pivot?.mes1} tintColors={{true: '#E6E6F0', false: '#E6E6F0'}} 
                                                    disabled />
                                                    <Text>1</Text>
                                                </View>
                                                <View style={styles.mesItem}>
                                                    <CheckBox value={!!med.pivot?.mes2} tintColors={{true: '#E6E6F0', false: '#E6E6F0'}} 
                                                    disabled />
                                                    <Text>2</Text>
                                                </View>
                                                <View style={styles.mesItem}>
                                                    <CheckBox value={!!med.pivot?.mes3} tintColors={{true: '#E6E6F0', false: '#E6E6F0'}} 
                                                    disabled />
                                                    <Text>3</Text>
                                                </View>
                                                <View style={styles.mesItem}>
                                                    <CheckBox value={!!med.pivot?.mes4} tintColors={{true: '#E6E6F0', false: '#E6E6F0'}} 
                                                    disabled />
                                                    <Text>4</Text>
                                                </View>
                                                <View style={styles.mesItem}>
                                                    <CheckBox value={!!med.pivot?.mes5} tintColors={{true: '#E6E6F0', false: '#E6E6F0'}} 
                                                    disabled />
                                                    <Text>5</Text>
                                                </View>
                                                <View style={styles.mesItem}>
                                                    <CheckBox value={!!med.pivot?.mes6} tintColors={{true: '#E6E6F0', false: '#E6E6F0'}} 
                                                    disabled />
                                                    <Text>6</Text>
                                                </View>                                     
                                            </View>
                            </View>
                        )

                    }) }
                    <View>
                        <Text style={styles.label}>Diagnóstico: </Text>
                        <Text style={styles.subject}>{solicitationInfo?.diagnostico}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Anamnese: </Text>
                        <Text style={styles.subject}>{solicitationInfo?.anamnese}</Text>
                    </View>
                    </ScrollView>
                    {user?.fk_funcao_id === 2 && (<View style={styles.optionsAuthorize}>
                        <TouchableOpacity style={styles.touchableAuthorize}  onPress={() => handleAuthorize(1)}>
                            <View style={[styles.buttonAuthorize, {backgroundColor: "#58AC2E"}]}>
                                <Text style={styles.textButtonAuthorize}>Deferir</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touchableAuthorize}  onPress={() => handleAuthorize(2)}>
                            <View style={[styles.buttonAuthorize, {backgroundColor: "#FFCC00"}]}>
                                <Text style={styles.textButtonAuthorize}>Pendente</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touchableAuthorize}  onPress={() => handleAuthorize(3)}>
                            <View style={[styles.buttonAuthorize, {backgroundColor: "#D12A2A"}]}>
                                <Text style={styles.textButtonAuthorize}>Indeferir</Text>
                            </View>
                        </TouchableOpacity>
                    </View>)}
              
            </Overlay>
            <Overlay isVisible={visibleMotive} onBackdropPress={toogleOverlayMotive} overlayStyle={{width: '100%', height: 200, marginHorizontal: 20}}>
                    <Input placeholder="Explique o motivo"
                        onChangeText={(value) => setMotive(value)}
                        label="Motivo"
                        textArea
                        numberOfLines={4}
                        height={90}
                        multiline
                    />
                        <TouchableOpacity style={[styles.touchableAuthorize, {width: '100%'}]}  onPress={() => handleAuthorize(status || 3, true)}>
                            <View style={[styles.buttonAuthorize, {backgroundColor: '#3182CE', width: '100%'}]}>
                                <Text style={styles.textButtonAuthorize}>Enviar</Text>
                            </View>
                        </TouchableOpacity>
            </Overlay>
        </View>
    );
 }

 export default ListSolicitations;