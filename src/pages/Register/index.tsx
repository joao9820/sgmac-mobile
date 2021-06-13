import React, { useRef, useState } from 'react';
import { View, Image, Text, ActivityIndicator, ToastAndroid, Alert} from 'react-native';
import { useAuth } from '../../contexts/auth';

//import {} from 'react-native-radio-buttons';

import styles from './styles';
import Button from '../../components/Button';

import * as Yup from 'yup';

import {Feather} from '@expo/vector-icons';

import logo from '../../assets/images/logoSub.png';
import Input from '../../components/Input';
import { RectButton, TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/core';
import Header from '../../components/Header';
import api from '../../services/api';
import getValidationErrors, { getValidationMessageErrors } from '../../utils/getValidationErrors';

const Login : React.FC = () => {

   const {signIn, loadingSignin} = useAuth();


   const [nome, setNome] = useState('');
   const [cpf, setCpf] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [peso, setPeso] = useState('');
   const [altura, setAltura] = useState('');
   const [nomeMae, setNomeMae] = useState('');
   const [telefone1, setTelefone1] = useState('');
   const [raca, setRaca] = useState('');
   const [loading, setLoading] = useState(false);
   const [formErrors, setFormErrors]  = useState<Array<string>>([]);

   const navigation = useNavigation();

   const handleNavigateRegister = () => {
       navigation.navigate('Home');
   }

   const errorsRef = useRef<View>(null);

   async function handleSubmit()  {

    
    setLoading(true);
    setFormErrors([]);

    try {
   
        const schema = Yup.object().shape({
          nome: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido!'),
            cpf: Yup.string().required('CPF obrigatório').min(14, 'O CPF deve possuir no mínimo 11 digitos'),
            telefone1: Yup.string().required('Telefone obrigatório'),
        password: Yup.string().required('Senha obrigatória'),
        password_confirmation: Yup.string().required('Necessário confirmar a senha'),
        peso: Yup.string().required('Necessário informar o peso'),
        altura: Yup.string().required('Necessário informar a altura'),
        nome_da_mae: Yup.string().required('Nome da mãe obrigatório'),
        raca: Yup.string().required('Informe sua raça'),
        });

        const pacient = {
            fk_funcao_id: 4,
            nome,
            cpf,
            telefone1,
            email,
            password,
            password_confirmation: confirmPassword,
            peso,
            altura,
            nome_da_mae: nomeMae,
            raca
        }

        await schema.validate(pacient, {
          abortEarly: false,
        });

        await api.post('/signon', pacient);

        Alert.alert(
          'Cadastro realizado sucesso!',
          'Você já pode fazer seu login no SGMAC!',
        );

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationMessageErrors(err);

          setFormErrors(errors);

          //errorsRef?.current?.focus();

          //console.log(errors);
          //formRef.current?.setErrors(errors);

          return;
        }

        //console.log(err.response.data);

        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao fazer o cadastro, tente novamente.',
        );
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

    return (
        <View style={styles.container}>

            <Header pageName="Cadastrar Paciente" previewScreen="Login" authPage/>
            <ScrollView contentContainerStyle={{}}>
                <View style={styles.form}>

                    {formErrors && (<View style={styles.containerError}>{formErrors.map((error, i) =>(<View style={{flexDirection: 'row'}} key={i} ><Feather name="alert-circle" size={16} color="#c53030" /><Text style={styles.textError}>
                        {error}</Text></View>))}</View>)}

                    <Input placeholder="Digite o seu nome" label="Nome" onChangeText={nome => setNome(nome)} />
                    <Input placeholder="Digite o seu CPF" label="CPF" value={cpf} onChangeText={cpf => setCpf(cpf)} mask="cpf" keyboardType="numeric" maxLength={14} />
                    <Input placeholder="Digite o seu Telefone" label="Telefone" value={telefone1} onChangeText={telefone => setTelefone1(telefone)} mask="telefone" keyboardType="numeric" maxLength={15} />
                    <Input placeholder="Digite o seu e-mail" label="E-mail" onChangeText={email => setEmail(email)}/>
                    <Input  placeholder="Digite a sua senha" label="Senha" onChangeText={password => setPassword(password)} pass />
                    <Input placeholder="Confirme a sua senha" label="Confirmar Senha" onChangeText={confirmPassword => setConfirmPassword(confirmPassword)} pass />
                    <Input placeholder="Informe o seu peso" label="Peso" value={peso} onChangeText={peso => setPeso(peso)} mask="decimal" keyboardType="numeric" maxLength={6} />
                    <Input placeholder="Informe a sua altura" label="Altura" value={altura} onChangeText={altura => setAltura(altura)} keyboardType="numeric" mask="decimal" maxLength={4} />
                    <Input placeholder="Digite o nome da sua mãe" label="Nome da mãe" onChangeText={nomeMae => setNomeMae(nomeMae)} />
                    <Input placeholder="Digite a sua raça" label="Raça" onChangeText={raca => setRaca(raca)}  />
                    
                    <Button title="Cadastrar" onPress={handleSubmit} loading={loading} />
        
                </View>
             </ScrollView>           
        </View>
    );

}

export default Login;