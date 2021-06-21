import { Formik } from 'formik';
import React, {useState, useEffect, useRef} from 'react';
import { Alert, ScrollView, TextInput, View, Text } from 'react-native';
import Header from '../../components/Header';
import api from '../../services/api';

import * as Yup from 'yup';

import {Feather} from '@expo/vector-icons';

import styles from './styles';
import { useAuth } from '../../contexts/auth';
import CustomPicker from '../../components/CustomPicker';
import Input from '../../components/Input';

import {User} from '../../@types';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';

interface Doenca {
    id_doenca: number;
    cid_10: string;
    nome: string;
    id: string;
    name: string;
}

interface Pacient {
    usuario: User;
    id: string;
    name: string
}

interface Medicamento {
    id_medicamento: number;
    nome: string;
    id: string;
    name: string
}

interface FormData {
    medico: string,
    paciente: string,
    doenca: string,
    diagnostico: string,
    anamnese: string,
    medicamentos: Array<{
        fk_medicamento_id: string,
        quantidade: string,
    }>,
}

const Solicitation : React.FC = () => {

    const [loadedPacientes, setLoadedPacientes] = useState(false);
    const [pacientes, setPacientes] = useState<Pacient[]>([]);

    const [loadedMedicamentos, setLoadedMedicamentos] = useState(false);
    const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);

    const [medicamento, setMedicamento] = useState('');

    const [loadedDoencas, setLoadedDoencas] = useState(false);
    const [doencas, setDoencas] = useState<Doenca[]>([]);

    const [cid10, setCid10] = useState('');

    const [medicamentoItem, setMedicamentoItem] = useState([{medicamento: '', meses: []}]);

    const {user} = useAuth();

    const initialValues = {
        medico: '',
        paciente: '',
        doenca: '',
        diagnostico: '',
        anamnese: '',
        medicamentos: [],
    }

    const inputMedico = useRef<TextInput>(null);
    const inputPaciente = useRef<TextInput>(null);
    const inputDoenca = useRef<TextInput>(null);
    const inputDiagnostico = useRef<TextInput>(null);
    const inputAnamnese = useRef<TextInput>(null);

    const validationSolicitacao = {

        medico: Yup.string().required(''),
        paciente: Yup.string().required('Necessário selecionar um paciente'),
        doenca: Yup.string().required('Necessario selecionar a doença do paciente'),
        diagnostico: Yup.string().required('Necessário informar o diagnostico do paciente'),
        anamnese: Yup.string().required('Necessário informar a anamnese da doença do paciente'),
        medicamentos: Yup.array(
            Yup.object().shape({
                fk_medicamento_id: Yup.string().required('Necessário selecionar o medicamento'),
                quantidade: Yup.string().required('Necessário informar a quantidade do medicamento'),
            }),
          ).required(),
    }

    useEffect(() => {

        async function getMedicines(): Promise<void>{

            try{

                const response = await api.get<Medicamento[]>('/medicines');
                

                const {data} = response;
        
                setMedicamentos(data.map((medicamento) => {
        
                    const {id_medicamento, nome} = medicamento;
        
                    return {
                        id_medicamento,
                        nome,
                        id: String(id_medicamento),
                        name: nome,
                    }
                }));
          

            }
            finally{
                setLoadedMedicamentos(true);
            }

        }

        async function getPacients(): Promise<void>{

            try{
                const response = await api.get<Pacient[]>('/pacients');
                

                const {data} = response;
        
                setPacientes(data.map((paciente) => {
        
                    const {usuario} = paciente;
        
                    return {
                        usuario,
                        id: String(usuario.id_usuario),
                        name: usuario.nome, 
                    };
                }));

            }finally{
                setLoadedPacientes(true);
            }

        }

        getPacients();
        getMedicines();

    }, []);

    const handleFindDoenca = (search: string): void => {

        setCid10(search);
        setLoadedDoencas(false);

        api.get<Doenca[]>('/illnesses', {params: {
            search
        }}).then((response) => {

            const {data} = response;
  
            setDoencas(data.map((doenca) => {
  
              const {id_doenca,cid_10,nome} = doenca;
  
                return {
                    id_doenca,
                    cid_10,
                    nome,
                    id: String(id_doenca),
                    name: nome,
                }
            }));
  
          }).finally(() => {
              setLoadedDoencas(true);
          });

    }

    function handleAddMedicamento(){

        setMedicamentoItem((state) => [...state, {medicamento: '', meses: []}]);

    }

    async function handleSubmit(data: FormData){
        console.log('solicitação submetida');
    }

    return (
        <View style={styles.container}>
            <Header pageName="Solicitações"/>
            <ScrollView>
                <View style={styles.form}>
                <Formik 
                initialValues={initialValues}
                validationSchema={Yup.object().shape(validationSolicitacao)}
                    onSubmit={(values, actions) => handleSubmit(values).then(() => {
                        actions.setSubmitting(false);
                        actions.resetForm();
                    }).catch((err) => {
                        Alert.alert(
                        'Erro ao registrar a solicitação',
                        err.response.data?.error || 'Ocorreu um erro ao registrar a solicitação, tente novamente.',
                        );
                    })}>
                        {({handleChange, handleSubmit, values, errors, touched}) => 
                        (
                            <>

                            
                            <CustomPicker label="Pacientes" 
                            options={pacientes} 
                            touched={touched.paciente} 
                            error={errors.paciente} 
                            onChange={handleChange('paciente')}
                            loading={!loadedPacientes} 
                            value={values.paciente}  />

                            <Input placeholder="CID-10 da doença" label="CID-10"
                            onChangeText={value => handleFindDoenca(value)}
                            maxLength={4}
                            />

                            <CustomPicker label="Doenças" 
                            options={doencas} 
                            touched={touched.doenca} 
                            error={errors.doenca} 
                            onChange={handleChange('doenca')}
                            loading={!loadedDoencas && !!cid10}
                            placeholder={!cid10 ? 'Informe o CID-10 no campo anterior' : 'Selecione'}
                            enabled={!!cid10} 
                            value={values.doenca}  />

                            {!!medicamentoItem.length && medicamentoItem.map((med, index) =>  (
                              
                                <View style={styles.medicamentoContainer} key={index}>
                                     <CustomPicker label="Medicamentos" 
                                        options={medicamentos} 
                                        onChange={(value) => setMedicamento(value)}
                                        loading={!loadedMedicamentos} 
                                        value={medicamento}  />
                                        <View style={styles.optionMes}>
                                            <CheckBox value={true} tintColors={{true: '#0E89FC', false: '#E6E6F0'}} onValueChange={(value) => console.log('teste')} />
                                            <Text>1</Text>
                                        </View>
                                         <RectButton style={styles.buttonAdd} onPress={handleAddMedicamento}>
                                            <View style={styles.addMedicamento}>
                                                <Text style={styles.addMedicamentoText}>Adicionar Medicamento</Text>
                                                    <Feather name="plus-circle" size={22} color="green" />  
                                            </View>
                                        </RectButton>
                                </View>
                            
                            ))}

                            <Input placeholder="Informe o diagnóstico" label="Diagnóstico" 
                            value={values.diagnostico}
                            touched={touched.diagnostico}
                            error={errors.diagnostico}
                            returnKeyType="next"
                            ref={inputDiagnostico}
                            onChangeText={handleChange('diagnostico')}
                            onSubmitEditing={() => inputAnamnese.current?.focus()}
                            />
                            
                            <Input placeholder="Informe a anamnese" label="Anamnese" 
                            value={values.anamnese}
                            touched={touched.anamnese}
                            error={errors.anamnese}
                            returnKeyType="next"
                            ref={inputAnamnese}
                            onChangeText={handleChange('anamnese')}
                            onSubmitEditing={() => inputAnamnese.current?.focus()}
                            />

                            </>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </View>
    );

}

export default Solicitation;