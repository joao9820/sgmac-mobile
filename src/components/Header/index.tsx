import { useNavigation } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import { View, Image, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import styles from './styles';

import logo from '../../assets/images/logo.png';

import {Feather} from '@expo/vector-icons';
import { useAuth } from '../../contexts/auth';

interface Props {
    pageName: string;
    headerRight?: ReactNode; //Pode receber um componenete
    previewScreen?: string;
    authPage?: boolean;

}

const Header: React.FC<Props> = ({children, pageName, headerRight, previewScreen, authPage = false}) => {
    
    const { navigate } = useNavigation();

    const {signOut} = useAuth();

    function handleGoBack(){
        previewScreen &&
        navigate(previewScreen);
    }

    return (
        <View style={styles.container}>
            <View style={styles.topBar} >
  
                <Image source={logo} style={styles.logotipo} />
                {!authPage && (<BorderlessButton onPress={signOut}>
                    <Feather name="log-out" size={24} color="#FFFFFF"/>
                </BorderlessButton>)}
            </View>

           <View style={styles.header}>

               <View style={styles.page}>
                   {!!previewScreen && (<BorderlessButton style={styles.returnButton} onPress={handleGoBack}>
                        <Feather name="arrow-left" size={26} color="#FFFFFF" />
                    </BorderlessButton>)}
                    
                    <Text style={styles.title}>{pageName}</Text>
                </View>
                        {headerRight}
            </View>

            {children}
        </View>
    )
}

export default Header;