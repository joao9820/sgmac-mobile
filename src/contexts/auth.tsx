import React, {createContext, useState, useContext, useEffect} from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as auth from '../services/auth';

interface User {
    email: string;
    name: string;
}

interface AuthContextData {
    signed: boolean;
    loading: boolean;
    user: User | null; //Para evitar manutenções desnecessárias, é possível estabelecer um tipo objeto genérico
    signIn(): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadStoragedData(){

            const user = await AsyncStorage.getItem("@SGMAC:user");
            const token = await AsyncStorage.getItem("@SGMAC:token");
    
            if(user && token){

                setUser(JSON.parse(user));
                //Todas as requisições conterão por padrão o token de autorização
                api.defaults.headers.authorization = `Bearer ${token}`;
            }

            setLoading(false);
 
        }

        loadStoragedData();
 

    }, []);

    async function signIn() {

        //Chamada a rota api para realizar login
        const {token, user} = await auth.signIn();

        setUser(user);

        await AsyncStorage.setItem("@SGMAC:user", JSON.stringify(user));
        await AsyncStorage.setItem("@SGMAC:token", token);

        api.defaults.headers.authorization = `Bearer ${token}`;

    }

    function signOut() {

      AsyncStorage.clear().then(() => {
        setUser(null);
      });
       
    }

    /*os dois pontos de exclamação, transforma nosso objeto em um booleano (!!)
    para pasar o valor para signed, poderia ser Boolean(user) também*/

    return (
    <AuthContext.Provider value={{signed: !!user, loading, user, signIn, signOut }}>
        {children}
    </AuthContext.Provider>);
};

export function useAuth(){

    return useContext(AuthContext);

}