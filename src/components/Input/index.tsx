import React, {useState} from 'react';
import {TextInput, View, Image, TextInputProps} from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import styles from './style';

import {Feather} from '@expo/vector-icons';

interface Props extends TextInputProps {
    placeholder?: string;
    value?: string;
    onChangeText(text: string): void;
    last?: boolean;
    pass?: boolean;
}

interface InputFocus {

    backgroundColor: string,
    borderWidth: number,
    borderColor: string,
    
}

const Input : React.FC<Props> = ({placeholder, value, last, pass, onChangeText, ...rest}) => {

    const [viewPass, setViewPass] = useState(false);
    const [focusStyle, setFocusStyle] = useState<InputFocus | null>({} as InputFocus);

    function handleViewPass(){
        setViewPass(state => !state);
    }

    function handleOnFocus(){
        setFocusStyle(styles.inputFocus);
    }

    return (
        <View style={[styles.container, focusStyle ,{marginBottom: last ? 0 : styles.container.marginBottom }]} >
            <TextInput secureTextEntry={!!pass && !viewPass} placeholder={placeholder} 
                style={styles.input} 
                value={value} onChangeText={text => onChangeText(text)} {...rest} />
                {pass && (<View style={styles.iconButton}><BorderlessButton style={styles.passButton} onPress={handleViewPass}><Feather name={viewPass ? 'eye-off' : 'eye' } 
                color="#6A6180" size={22} /></BorderlessButton></View>)}
                 
        </View>
    )
}

export default Input;