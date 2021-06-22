import React, {createContext, useState, useContext, useEffect} from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as auth from '../services/auth';
import { Alert, ToastAndroid } from 'react-native';

interface User {
    email: string;
    nome: string;
    avatar?: string;
    id_usuario?: number;
}

interface AuthenticateUser {
    user: User;
    token: string;
    token_type: string;
    expires_in: number;
}

interface AuthContextData {
    signed: boolean;
    loading: boolean;
    loadingSignin: boolean;
    user: User | null; //Para evitar manutenções desnecessárias, é possível estabelecer um tipo objeto genérico
    signIn(email: string, password: string): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [loadingSignin, setLoadingSignin] = useState(false);

    useEffect(() => {

        async function loadStoragedData(){

            const user = await AsyncStorage.getItem("@SGMAC:user");
            const token = await AsyncStorage.getItem("@SGMAC:token");
            
            //console.log(user);

            if(user && token){
                
                //Todas as requisições conterão por padrão o token de autorização
                api.defaults.headers.authorization = `Bearer ${token}`;

                setUser(JSON.parse(user));
            }

            setLoading(false);
 
        }

        loadStoragedData();
 

    }, []);

    async function signIn(email: string, password: string) {

        //console.log("teste: ",email, password);

        if(!email || !password)
            return;
            
        setLoadingSignin(true);

        try{

            const response = await api.post<AuthenticateUser>('/signin', {email, password});

            const {user, token} = response.data;

            const userInfo = {
                email: user.email,
                nome: user.nome,
                avatar: user.avatar,
                id_usuario: user.id_usuario
            };

            //console.log(response.data);

            await AsyncStorage.setItem("@SGMAC:user", JSON.stringify(userInfo));
            await AsyncStorage.setItem("@SGMAC:token", token);

            api.defaults.headers.authorization = `Bearer ${token}`;

            setUser(userInfo);
   

        }catch(error){

            Alert.alert(
                'Login inválido',
                `${error.response.data?.error}`,
              );
            
        }finally{
            setLoadingSignin(false);
        }


    }

    function signOut() {

        api.post('/signout').then(() => {
            ToastAndroid.show("Deslogado com sucesso!", ToastAndroid.SHORT)

        }).finally(() => {
            AsyncStorage.clear().then(() => {
                setUser(null);
            });
        });
       
              
     

    }

    /*os dois pontos de exclamação, transforma nosso objeto em um booleano (!!)
    para pasar o valor para signed, poderia ser Boolean(user) também*/

    return (
    <AuthContext.Provider value={{signed: !!user, loading, loadingSignin, user, signIn, signOut }}>
        {children}
    </AuthContext.Provider>);
};

export function useAuth(){

    return useContext(AuthContext);

}