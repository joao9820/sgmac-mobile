import React from 'react';
import { Button, View } from 'react-native';
import { useAuth } from '../../contexts/auth';

const Login : React.FC = () => {

   const {signIn} = useAuth();

    return (
        <View>
            <Button title='Logar' onPress={() => signIn()}/>
        </View>
    );

}

export default Login;