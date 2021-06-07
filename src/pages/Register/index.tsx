import React, { useState } from 'react';
import { Button, View, Image, Text, ActivityIndicator} from 'react-native';
import { useAuth } from '../../contexts/auth';

import styles from './styles';

import logo from '../../assets/images/logoSub.png';
import Input from '../../components/Input';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/core';
import Header from '../../components/Header';

const Login : React.FC = () => {

   const {signIn, loadingSignin} = useAuth();

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [rememberMe, setRememberMe] = useState(false);
   const [loading, setLoading] = useState(false);

   const navigation = useNavigation();

   const handleNavigateRegister = () => {
       navigation.navigate('Home');
   }

    return (
        <View style={styles.container}>

            <Header pageName="Cadastrar Paciente" previewScreen="Login" authPage/>

             <View style={styles.loginForm}>
             
                <Input placeholder="E-mail" onChangeText={email => setEmail(email)}/>
                <Input placeholder="Senha"onChangeText={senha => setPassword(senha)} pass />
                
                <RectButton style={[styles.buttonLogin, loadingSignin && {shadowOpacity: 0.7}]}  onPress={() => signIn(email, password)} enabled={!loadingSignin}>
                    <Text style={styles.textLogin}>{loadingSignin ? <ActivityIndicator size="large" color="#FFFFFF"/> : 'Entrar'}</Text>
                </RectButton>
             </View>

            <View style={styles.options}>
                <View style={styles.rememberMe}>
                    <CheckBox value={rememberMe} tintColors={{true: '#0E89FC', false: '#E6E6F0'}} onValueChange={(value) => setRememberMe(value)} />
                    <Text style={styles.rememberMeText}>Lembrar-me</Text>
                </View>
                <Text style={styles.forgetPass}>Esqueci minha senha</Text>
            </View>

             <View style={styles.register}>
                <Text style={styles.registerText}>Você é um paciente?</Text>
                <TouchableOpacity onPress={handleNavigateRegister}>
                    <Text style={styles.registerLink}>Cadastre-se</Text>
                </TouchableOpacity>        
            </View>
           
        </View>
    );

}

export default Login;