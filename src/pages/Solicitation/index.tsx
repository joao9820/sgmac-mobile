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

import {Doenca, Medicamento, User, SolicitacaoMedicamentos as MedicamentoSelected} from '../../@types';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import { Divider } from 'react-native-elements';
import Button from '../../components/Button';

interface DoencaSelect extends Doenca {
    id: string;
    name: string;
}

interface Pacient {
    usuario: User;
    id: string;
    name: string
}

interface MedicamentoSelect extends Medicamento {
    id: string;
    name: string
}

interface FormData {
    paciente: string,
    doenca: string,
    diagnostico: string,
    anamnese: string,
}

interface DataSolicitation {
    fk_medico_id?: number;
    fk_paciente_id: string;
    fk_doenca_id: string;
    medicamentos?: MedicamentoSelected[];
    diagnostico: string;
    anamnese: string;
}

const Solicitation : React.FC = () => {

    const [loadingRegister, setLoadingRegister] = useState(false);

    const [loadedPacientes, setLoadedPacientes] = useState(false);
    const [pacientes, setPacientes] = useState<Pacient[]>([]);

    const [loadedMedicamentos, setLoadedMedicamentos] = useState(false);
    const [medicamentos, setMedicamentos] = useState<MedicamentoSelect[]>([]);

    const [loadedDoencas, setLoadedDoencas] = useState(false);
    const [doencas, setDoencas] = useState<DoencaSelect[]>([]);

    const [cid10, setCid10] = useState('');

    const medicamentoItemDefault: MedicamentoSelected = {fk_medicamento_id: '', quantidade: '' ,mes1: true, 
        mes2: false,
        mes3: false,
        mes4: false,
        mes5: false,
        mes6: false,
    };

    const [medicamentoItem, setMedicamentoItem] = useState<MedicamentoSelected[]>([medicamentoItemDefault]);

    const {user} = useAuth();

    const initialValues = {
        paciente: '',
        doenca: '',
        diagnostico: '',
        anamnese: '',
    }

    const inputMedico = useRef<TextInput>(null);
    const inputPaciente = useRef<TextInput>(null);
    const inputDoenca = useRef<TextInput>(null);
    const inputDiagnostico = useRef<TextInput>(null);
    const inputAnamnese = useRef<TextInput>(null);

    const validationSolicitacao = {

        paciente: Yup.string().required('Necessário selecionar um paciente'),
        doenca: Yup.string().required('Necessario selecionar a doença do paciente'),
        diagnostico: Yup.string().required('Necessário informar o diagnostico do paciente'),
        anamnese: Yup.string().required('Necessário informar a anamnese da doença do paciente'),
        /* medicamentos: Yup.array(
            Yup.object().shape({
                fk_medicamento_id: Yup.string().required('Necessário selecionar o medicamento'),
                quantidade: Yup.string().required('Necessário informar a quantidade do medicamento'),
            }),
          ).required(), */
    }

    useEffect(() => {

        async function getMedicines(): Promise<void>{

            try{

                const response = await api.get<MedicamentoSelect[]>('/medicines');
                

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

        api.get<DoencaSelect[]>('/illnesses', {params: {
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

        setMedicamentoItem((state) => [...state, medicamentoItemDefault]);

    }

    function setMedicamentoItemValue(position: number, field: string, value: string | boolean){

        //field = week_day ou from ou to

        //Criamos um novo array com as alterações

        //console.log(medicamentoItem);

        const updatedMedicamentoItems = medicamentoItem.map((medicamentoItem, index) => {

            if(index === position){
                /*Sem colcheltes o field seria o nome da propriedade e nao utiizaria o param que a função recebe
                dessa forma o campo será sobrescrito com o valor que passamos após o spread operator*/
                return {...medicamentoItem, [field]: value}; //retorna o objeto da posição equivalente
            }

            //Sem alteração de valores se não for a mesma posição que se quer alterar
            return medicamentoItem;
        });

    
       setMedicamentoItem(updatedMedicamentoItems);

    }

    async function handleSubmit(data: FormData){
        
        setLoadingRegister(true);

        //console.log(user);

        try{

            const dataSolicitation: DataSolicitation = {
                fk_medico_id: user?.id_usuario,
                fk_paciente_id: data.paciente,
                fk_doenca_id: data.doenca,
                medicamentos: medicamentoItem,
                diagnostico: data.diagnostico,
                anamnese: data.anamnese,                
            }

            await api.post('/solicitations', dataSolicitation);

            Alert.alert(
                'Solicitação realizada com sucesso!',
                'Aguarde a resposta do autorizador. Boa sorte!',
            );

        }catch(err){

            throw err;


        }finally{
            setLoadingRegister(false);
        }


    }

    return (
        <View style={styles.container}>
            <Header pageName="Solicitações" previewScreen="Solicitations"/>
            <ScrollView>
                <View style={styles.form}>
                <Formik 
                initialValues={initialValues}
                validationSchema={Yup.object().shape(validationSolicitacao)}
                    onSubmit={(values, actions) => handleSubmit(values).then(() => {
                        actions.setSubmitting(false);
                        actions.resetForm();
                        setMedicamentoItem([medicamentoItemDefault]);
                    }).catch((err) => {
                        Alert.alert(
                        'Erro ao registrar a solicitação',
                        err.response.data?.error || 'Ocorreu um erro ao registrar a solicitação, tente novamente.',
                        );
                    })}>
                        {({handleChange, handleSubmit, values, errors, touched, setFieldValue}) => 
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
                            onChangeText={value => value ? handleFindDoenca(value) : setFieldValue('doenca', '')}
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

                            <Text style={styles.labelMedicamentos}>Medicamentos</Text>
                            <View style={styles.medicamentoSection}>
                                
                                {!!medicamentoItem.length && medicamentoItem.map((med, index) =>  (
                                
                                    <View style={styles.medicamentoContainer} key={index}>
                                        {index > 0 && <Divider orientation="horizontal" style={styles.divider} color='#FCFCFC' />}
                                        <CustomPicker  
                                            options={medicamentos} 
                                            onChange={(value) => setMedicamentoItemValue(index, 'fk_medicamento_id', value)}
                                            loading={!loadedMedicamentos}
                                            placeholder="Selecione o medicamento" 
                                            value={String(med.fk_medicamento_id)}  />

                                            <Input placeholder="Indique a quantidade" label="Quantidade"
                                                    value={med.quantidade}
                                                    onChangeText={value => setMedicamentoItemValue(index, 'quantidade', value)}
                                                    keyboardType="numeric" />
                                            <Text style={styles.label}>Meses</Text>
                                            <View style={styles.optionMes}>
                                                <View style={styles.mesItem}>
                                                    <CheckBox value={med.mes1} tintColors={{true: '#E6E6F0', false: '#E6E6F0'}} 
                                                    onValueChange={(value) => setMedicamentoItemValue(index, 'mes1', value)} disabled />
                                                    <Text>1</Text>
                                                </View>
                                                <View style={styles.mesItem}>
                                                    <CheckBox value={med.mes2} tintColors={{true: '#0E89FC', false: '#E6E6F0'}} 
                                                    onValueChange={(value) => setMedicamentoItemValue(index, 'mes2', value)} />
                                                    <Text>2</Text>
                                                </View>
                                                <View style={styles.mesItem}>
                                                    <CheckBox value={med.mes3} tintColors={{true: '#0E89FC', false: '#E6E6F0'}} 
                                                    onValueChange={(value) => setMedicamentoItemValue(index, 'mes3', value)} />
                                                    <Text>3</Text>
                                                </View>
                                                <View style={styles.mesItem}>
                                                    <CheckBox value={med.mes4} tintColors={{true: '#0E89FC', false: '#E6E6F0'}} 
                                                    onValueChange={(value) => setMedicamentoItemValue(index, 'mes4', value)} />
                                                    <Text>4</Text>
                                                </View>
                                                <View style={styles.mesItem}>
                                                    <CheckBox value={med.mes5} tintColors={{true: '#0E89FC', false: '#E6E6F0'}} 
                                                    onValueChange={(value) => setMedicamentoItemValue(index, 'mes5', value)} />
                                                    <Text>5</Text>
                                                </View>
                                                <View style={styles.mesItem}>
                                                    <CheckBox value={med.mes6} tintColors={{true: '#0E89FC', false: '#E6E6F0'}} 
                                                    onValueChange={(value) => setMedicamentoItemValue(index, 'mes6', value)} />
                                                    <Text>6</Text>
                                                </View>
                                            </View>
                                            {index === medicamentoItem.length - 1 && (<RectButton style={styles.buttonAdd} onPress={handleAddMedicamento}>
                                                <View style={styles.addMedicamento}>
                                                    <Text style={styles.addMedicamentoText}>Adicionar Medicamento</Text>
                                                        <Feather name="plus-circle" size={22} color="green" />  
                                                </View>
                                            </RectButton>)}
                                            
                                    </View>
                                
                                ))}
                            </View>
                            <Input placeholder="Informe o diagnóstico" label="Diagnóstico" 
                            value={values.diagnostico}
                            textArea
                            numberOfLines={4}
                            height={90}
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
                            textArea
                            numberOfLines={4}
                            height={90}
                            returnKeyType="next"
                            ref={inputAnamnese}
                            onChangeText={handleChange('anamnese')}
                            onSubmitEditing={() => handleSubmit()}
                            />

                            <Button title="Cadastrar" onPress={handleSubmit} loading={loadingRegister} />

                            </>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </View>
    );

}

export default Solicitation;