import React, { useRef, useState } from 'react';
import { View, Image, Text, ActivityIndicator, ToastAndroid, Alert, TextInput} from 'react-native';
import { useAuth } from '../../contexts/auth';

import {Picker} from '@react-native-community/picker';

//import {} from 'react-native-radio-buttons';

import styles from './styles';
import Button from '../../components/Button';

import * as Yup from 'yup';

import {Feather} from '@expo/vector-icons';

//import logo from '../../assets/images/logoSub.png';
import Input from '../../components/Input';
import { RectButton, TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/core';
import Header from '../../components/Header';
import api from '../../services/api';
import {ParamList} from '../../routes/auth.routes';
import getValidationErrors, { getValidationMessageErrors } from '../../utils/getValidationErrors';
import { useEffect } from 'react';
import { RouteProp } from '@react-navigation/native';
import CustomPicker, {Option} from '../../components/CustomPicker';
import { Formik } from 'formik';
import { ObjectShape } from 'yup/lib/object';


type CustomRouteProp = RouteProp<ParamList, 'Register'>;

interface Props {
    route?: CustomRouteProp;
}

interface Funcao extends Option {
  id_funcao: number;
  nome: string;
}

export interface UserDefault {
  fk_funcao_id: number;
  nome: string;
  email: string;
  cpf: string;
  telefone1: string;
  password: string;
  password_confirmation: string;
}

interface FormData {
  fk_funcao_id?: number;
  funcao?: string;
  nome: string;
  email: string;
  cpf: string;
  telefone1: string;
  password: string;
  password_confirmation: string;

  peso: string;
  tamanho: string;
  nome_da_mae: string;
  raca: string;

  cns: string;
  cnes: string;
  estabelecimento: string;
}

const Register : React.FC<Props> = ({route}) => {

  const isPacient = route?.params?.pacient;

   const {signIn, loadingSignin} = useAuth();

   const [funcao, setFuncao] = useState<string | number>('');
   const [funcoes, setFuncoes] = useState<Funcao[]>([]);

   const [nome, setNome] = useState('');
   const [cpf, setCpf] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [peso, setPeso] = useState('');
   const [altura, setAltura] = useState('');
   const [nomeMae, setNomeMae] = useState('');
   const [telefone1, setTelefone1] = useState('');
   const [loading, setLoading] = useState(false);
   const [loadedFuncoes, setLoadedFuncoes] = useState(false);
   const [formErrors, setFormErrors]  = useState<Array<string>>([]);

   const navigation = useNavigation();

   const handleNavigateRegister = () => {
       navigation.navigate('Home');
   }

   const errorsRef = useRef<View>(null);

   const inputNome = useRef<TextInput>(null);
   const inputEmail = useRef<TextInput>(null);
   const inputCpf = useRef<TextInput>(null);
   const inputTelefone1 = useRef<TextInput>(null);
   const inputPassword = useRef<TextInput>(null);
   const inputPasswordConfirmation = useRef<TextInput>(null);
   const inputCns = useRef<TextInput>(null);
   const inputCnes = useRef<TextInput>(null);
   const inputEstabelecimento = useRef<TextInput>(null);
   const inputPeso = useRef<TextInput>(null);
   const inputTamanho = useRef<TextInput>(null);
   const inputNomeMae = useRef<TextInput>(null);
   const inputRaca = useRef<TextInput>(null);

   const racas = [
     {
       id: 'Branca',
       name: 'Branca'
     },
     {
       id: 'Preta',
       name: 'Preta'
     },
     {
       id: 'Parda',
       name: 'Parda'
     },
     {
       id: 'Amarela',
       name: 'Amarela'
     },
     {
       id: 'Indígena',
       name: 'Indígena'
     },
     {
       id: 'Sem Informacão',
       name: 'Sem Informação'
     }
   ];

   const initialvalues = {
     nome: '',
     email: '',
     cpf: '',
     telefone1: '',
     password: '',
     password_confirmation: '',
     cns: '',
     cnes: '',
     estabelecimento: '',
     peso: '',
     tamanho: '',
     nome_da_mae: '',
     raca: '',
   };

   const validationUser = {
      nome: Yup.string().required('Nome obrigatório'),
      email: Yup.string()
        .required('E-mail obrigatório')
        .email('Digite um e-mail válido!'),
      cpf: Yup.string().required('CPF obrigatório').min(14, 'O CPF deve possuir no mínimo 11 digitos'),
      telefone1: Yup.string().required('Telefone obrigatório'),
      password: Yup.string().required('Senha obrigatória'),
      password_confirmation: Yup.string().required('Necessário confirmar a senha'),
   }

   const validationDoctor = {
     cns: Yup.string().required('CNS obrigatório'),
     cnes: Yup.string().required('CNES obrigatório'),
     estabelecimento: Yup.string().required('Informe o nome do estabelecimento'),
   }

   const validationPacient = {
      peso: Yup.string().required('Necessário informar o peso'),
      tamanho: Yup.string().required('Necessário informar a altura'),
      nome_da_mae: Yup.string().required('Nome da mãe obrigatório'),
      raca: Yup.string().required('Informe sua raça/cor')
   }

   useEffect(() => {
    //Para acessar essa rota é necessário ter se autenticado, portanto no cadastro de paciente não buscamos as funções
     if(isPacient)
        return;

      setLoadedFuncoes(false);

    api.get<Funcao[]>('/responsibilities').then((response) => {

      setFuncoes(response.data.filter(funcao => funcao.id_funcao < 4).map((funcao) => {
        return {
          id_funcao: funcao.id_funcao,
          nome: funcao.nome,
          id: String(funcao.id_funcao),
          name: funcao.nome
        }
      }));
    }).finally(() => {
      setLoadedFuncoes(true);
    });
  }, []);

   async function handleSubmit(data: FormData)  {

    
    setLoading(true);
    //setFormErrors([]);

    try {

        const {nome, email, cpf, telefone1, password, password_confirmation} = data;

        const userDefault = {
          nome,
          email,
          cpf,
          telefone1,
          password,
          password_confirmation
        };

        let user = {};

        if(isPacient || (!!data?.funcao && Number(data?.funcao) === 4)){
          user = {
            ...userDefault,
            fk_funcao_id: 4,
            complemento: {
              peso: data.peso,
              tamanho: data.tamanho,
              nome_da_mae: data.nome_da_mae,
              raca: data.raca,
            }
          } 
        }else{

          if(funcao < 3 ){
            user = {...userDefault, fk_funcao_id: Number(data?.funcao)};

          }else{
            user = {
              ...userDefault,
              fk_funcao_id: Number(data?.funcao),
              complemento: {
                cns: data.cns,
                cnes: data.cnes,
                estabelecimento: data.estabelecimento
              }
            }
          }
        }

        //console.log(data.telefone1);

        await api.post('/signon', user);

        let msg = '';

        if(isPacient || (!!data?.funcao && Number(data?.funcao) === 4)){
          
          msg = 'Você já pode fazer seu login no SGMAC!';

          navigation.goBack();
        }else{
          msg =`O usuário ${data.nome} foi registrado no SGMAC`;
        }


        Alert.alert(
          'Cadastrado com sucesso!',
          msg,
        );
          
      } catch (err) {
        //console.log(err.response.data?.error);

        throw err;

      }finally{
          setLoading(false);
      }

     /*    api.post('/signon', pacient).then((response) => {

            navigation.navigate('Login');

            ToastAndroid.show('Cadastrado com sucesso, realize o login para acessar o sistema', ToastAndroid.LONG);

        }).catch((err) => {
            
            ToastAndroid.show('Cadastrado com sucesso, realize o login para acessar o sistema', ToastAndroid.LONG);

        }).finally(() => {
            setLoading(false);
        });
 */
   }

  
  function handleGetValidation(): ObjectShape {

    if(isPacient || (!!funcao && Number(funcao) === 4))
      return {...validationUser, ...validationPacient};

      const funcaoValidation = {funcao: Yup.string().required('Necessário escolher uma função')}

    if(funcao && Number(funcao) === 3)
      return {...validationUser, ...validationDoctor, ...funcaoValidation}
      
    return {...validationUser,  ...funcaoValidation};

  }

    return (
        <View style={styles.container}>

            <Header pageName={`Cadastrar ${isPacient ? ' Paciente' : 'Usuário'}`} previewScreen={isPacient ? 'Login' : 'Users'} authPage={isPacient}/>
            <ScrollView contentContainerStyle={{}}>
                <View style={styles.form}>
                <Formik 
             initialValues={{...initialvalues, funcao: ''}}
             validationSchema={ Yup.object().shape(handleGetValidation())}
                  onSubmit={(values, actions) => handleSubmit(values).then(() => {
                    actions.setSubmitting(false);
                    actions.resetForm();
                  }).catch((err) => {
                    Alert.alert(
                      'Erro no cadastro',
                      err.response.data?.error || 'Ocorreu um erro ao fazer o cadastro, tente novamente.',
                    );
                  })}>
                      {({handleChange, handleSubmit, values, errors, touched}) => 
                      (
                        <>

                        {/* {formErrors && (<View style={styles.containerError}>{formErrors.map((error, i) =>(<View style={{flexDirection: 'row'}} key={i} ><Feather name="alert-circle" size={16} color="#c53030" /><Text style={styles.textError}>
                              {error}</Text></View>))}</View>)} */}

                          {(!isPacient) && (
                          <CustomPicker label="Função do usuário" 
                          options={funcoes} 
                          touched={touched.funcao} 
                          error={errors.funcao} 
                          onChange={handleChange('funcao')}
                          onChangeState={(value) => setFuncao(value)}
                          loading={!loadedFuncoes} 
                          value={values.funcao}  />)}

      
                          <Input placeholder="Digite o seu nome" label="Nome" value={values.nome}
                          touched={touched.nome}
                          error={errors.nome}
                          returnKeyType="next"
                          ref={inputNome}
                          onChangeText={handleChange('nome')}
                          onSubmitEditing={() => inputCpf.current?.focus()}
                           />

                          <Input placeholder="Digite o seu CPF" label="CPF" value={values.cpf}
                          touched={touched.cpf}
                          error={errors.cpf}
                          returnKeyType="next"
                          ref={inputCpf}
                          onChangeText={handleChange('cpf')}
                          onSubmitEditing={() => inputTelefone1.current?.focus()}
                          mask="cpf"
                          keyboardType="numeric"
                          maxLength={14}
                           />

                          <Input placeholder="Digite o seu Telefone" 
                          label="Telefone" 
                          value={values.telefone1}
                          touched={touched.telefone1}
                          error={errors.telefone1}
                          returnKeyType="next"
                          ref={inputTelefone1}
                          onChangeText={handleChange('telefone1')} 
                          mask="telefone" 
                          keyboardType="numeric" 
                          maxLength={15}
                          onSubmitEditing={() => inputEmail.current?.focus()}  
                          />

                          <Input placeholder="Digite o seu e-mail" label="E-mail" value={values.email} useTrim
                          touched={touched.email} error={errors.email} returnKeyType="next" ref={inputEmail} onChangeText={handleChange('email')} 
                          onSubmitEditing={() => inputPassword.current?.focus()}/>

                          
                          <Input  placeholder="Digite a sua senha" label="Senha" value={values.password} 
                          touched={touched.password} error={errors.password} returnKeyType="next" ref={inputPassword}
                          onChangeText={handleChange('password')} onSubmitEditing={() => inputPasswordConfirmation.current?.focus()} pass />

                          {/* Avaliar condições para o onSubmitEditing */}

                          <Input placeholder="Confirme a sua senha" label="Confirmar Senha" value={values.password_confirmation} 
                          touched={touched.password_confirmation} error={errors.password_confirmation} returnKeyType="next" ref={inputPasswordConfirmation}
                          onChangeText={handleChange('password_confirmation')} onSubmitEditing={() => inputPeso.current?.focus()} pass />

                        {(isPacient || !!funcao && Number(funcao) === 4) && (
                          <>
                          <Input placeholder="Informe o seu peso" label="Peso" value={values.peso}
                            touched={touched.peso}
                            error={errors.peso}
                            returnKeyType="next"
                            ref={inputPeso}
                            onChangeText={handleChange('peso')} mask="decimal" keyboardType="numeric" maxLength={6} onSubmitEditing={() => inputTamanho.current?.focus()} />


                            <Input placeholder="Informe a sua altura" label="Altura" value={values.tamanho}
                            touched={touched.tamanho} error={errors.tamanho}
                            returnKeyType="next"
                            ref={inputTamanho} 
                            onChangeText={handleChange('tamanho')} 
                            keyboardType="numeric" 
                            mask="decimal" maxLength={4} onSubmitEditing={() => inputNomeMae.current?.focus()} />
                            
                            
                            <Input placeholder="Digite o nome da sua mãe" label="Nome da mãe" value={values.nome_da_mae}  
                            touched={touched.nome_da_mae}
                            error={errors.nome_da_mae}
                            ref={inputNomeMae}
                            onChangeText={handleChange('nome_da_mae')}
                            />

                            <CustomPicker label="Raça/Cor" 
                            options={racas} 
                            touched={touched.raca} 
                            error={errors.raca} 
                            onChange={handleChange('raca')} 
                            value={values.raca} />

                          </>)}

                          {!!funcao && Number(funcao) === 3 && (<><Input placeholder="Informe o número do seu CNS" label="CNS" value={values.cns} 
                          touched={touched.cns}
                          error={errors.cns}
                          ref={inputCns}
                          onChangeText={handleChange('cns')} 
                          keyboardType="numeric"
                          returnKeyType="next"
                          maxLength={6}
                          onSubmitEditing={() => inputCnes.current?.focus()}
                          />

                          <Input placeholder="Informe o seu CNES" label="CNES" value={values.cnes} 
                          touched={touched.cnes}
                          error={errors.cnes}
                          ref={inputCnes}
                          onChangeText={handleChange('cnes')} 
                          keyboardType="numeric"
                          returnKeyType="next"
                          maxLength={6}
                          onSubmitEditing={() => inputEstabelecimento.current?.focus()}
                          />

                          <Input placeholder="Informe o nome do seu Estabelecimento" label="Estabelecimento" value={values.estabelecimento} 
                          touched={touched.estabelecimento}
                          error={errors.estabelecimento}
                          ref={inputEstabelecimento}
                          onChangeText={handleChange('estabelecimento')} 
                          returnKeyType="done"
                          onSubmitEditing={() => handleSubmit()}
                          /></>)}
                          
                          <Button title="Cadastrar" onPress={handleSubmit} loading={loading} />
                        </>)}
              </Formik>
                                 
                 </View>
             </ScrollView>           
        </View>
    );

}

export default Register;