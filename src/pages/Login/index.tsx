import React, { useState } from 'react';
import { View, Image, Text, ActivityIndicator, Dimensions} from 'react-native';
import { useAuth } from '../../contexts/auth';

import Button from '../../components/Button';

import * as Yup from 'yup';

import styles from './styles';
import {Formik} from 'formik';
import logo from '../../assets/images/logoSub.png';
import Input from '../../components/Input';
import { RectButton, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/core';

const height = Dimensions.get('window');

const Login : React.FC = () => {

   const {signIn, loadingSignin} = useAuth();

   //const [email, setEmail] = useState('');
   //const [password, setPassword] = useState('');
   const [rememberMe, setRememberMe] = useState(false);
   const [loading, setLoading] = useState(false);

   const navigation = useNavigation();

   const handleNavigateRegister = () => {
       navigation.navigate('Register');
   }

   const handleNavigateForgetPassword = () =>{
    navigation.navigate('ForgetPassword');
   }

   const validationSignIn =  Yup.object().shape({
    email: Yup.string()
      .required('E-mail obrigatório')
      .email('Digite um e-mail válido!'),
      senha: Yup.string().required('Senha obrigatória')
  });

    return (
        <View style={styles.main}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
            <View style={styles.containerImg}>
                <Image source={logo} style={styles.logotipo} />
             </View>
             <Formik 
             initialValues={{email: '', senha: ''}}
             validationSchema={validationSignIn}
                  onSubmit={values => signIn(values.email, values.senha)}>
                      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (<View style={styles.content}>
                <View style={styles.loginForm}>
                
                    <Input placeholder="E-mail" value={values.email} 
                    onChangeText={handleChange('email')}
                    hasError={!!touched.email && !!errors.email} error={errors.email}  returnKeyType="next" />

                    <Input placeholder="Senha" hasError={!!touched.senha && !!errors.senha} error={errors.senha} value={values.senha} onChangeText={handleChange('senha')} 
                    returnKeyType="send" pass />
                    
                    <Button title="Entrar" onPress={handleSubmit} loading={loadingSignin} />
                </View>
                <View style={styles.footerLogin}>
                    <View style={styles.options}>
                        <View style={styles.rememberMe}>
                            <CheckBox value={rememberMe} tintColors={{true: '#0E89FC', false: '#E6E6F0'}} onValueChange={(value) => setRememberMe(value)} />
                            <Text style={styles.rememberMeText}>Lembrar-me</Text>
                        </View>
                        <Text style={styles.forgetPass}>Esqueci minha senha</Text>
                    </View>

                    <View style={styles.register}>
                        <View>
                            <Text style={styles.registerText}>Você é um paciente?</Text>
                            <View style={{alignSelf: 'flex-start'}}>
                                <TouchableOpacity onPress={handleNavigateRegister}>
                                    <Text style={styles.registerLink}>Cadastre-se</Text>
                                </TouchableOpacity>
                            </View>
                        </View>        
                    </View>
                </View>
           </View>)}
           </Formik>
        </View>
        </ScrollView>
    </View>
    );

}

export default Login;