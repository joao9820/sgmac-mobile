import React, {useState} from 'react';
import {TextInput, View, Image, TextInputProps, Text} from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import {cpfMask, decimalMask, telefoneMask} from '../../utils/mask';

import styles from './style';

import {Feather} from '@expo/vector-icons';
import { color } from 'react-native-reanimated';
import { useEffect } from 'react';
import { boolean } from 'yup/lib/locale';

interface Props extends TextInputProps {
    placeholder?: string;
    label ?: string;
    value?: string;
    hasError?: boolean;
    error?: string;
    onChangeText(text: string): void;
    last?: boolean;
    pass?: boolean;
    mask?: 'none' | 'cpf'| 'decimal' | 'telefone';
}



interface InputFocus {

    backgroundColor: string,
    borderWidth: number,
    borderColor: string,
    
}

const Input : React.FC<Props> = ({placeholder, value, last, pass, onChangeText, label, hasError, error ,mask = 'none', ...rest}) => {

    const [viewPass, setViewPass] = useState(false);
    const [focusStyle, setFocusStyle] = useState<InputFocus | null>({} as InputFocus);

    const activeColor = '#3182CE';
    const defaultColor = '#DFE1E6';
    const errorColor = '#E53E3E';

    const [active, setActive] = useState(false);
    const [borderColor, setBorderColor] = useState(defaultColor);

    useEffect(() => {
        if(hasError)
            setBorderColor(errorColor);
        else if(active)
            setBorderColor(activeColor);
        else
            setBorderColor(defaultColor);
    }, [hasError]);

    function handleViewPass(){
        setViewPass(state => !state);
    }

    function handleOnFocus(){
        //setFocusStyle(styles.inputFocus);
    }

    function handleCustomText(text: string){


        switch(mask){
            case 'cpf': onChangeText(cpfMask(text));
            break;
            case 'telefone': onChangeText(telefoneMask(text));
            break;
            case 'decimal': onChangeText(decimalMask(text));
            break;
            default: onChangeText(text);
        }

    }

    return (
        <View style={[styles.container, focusStyle ,{marginBottom: last ? 0 : styles.container.marginBottom }]} >
            {label && (<Text style={styles.label}>{label}</Text>)}
            <View>
            <TextInput secureTextEntry={!!pass && !viewPass} placeholder={placeholder} 
                style={[styles.input, {borderColor: borderColor}]}
                onFocus={() => {setActive(true); !hasError && setBorderColor(activeColor)}} 
                onBlur={() => {setActive(false); !hasError && setBorderColor(defaultColor)}}
                value={value} onChangeText={text => handleCustomText(text)} {...rest} />
                {pass && (<View style={styles.iconButton}><BorderlessButton style={styles.passButton} onPress={handleViewPass}><Feather name={viewPass ? 'eye-off' : 'eye'}
                color={borderColor} 
                size={22} /></BorderlessButton></View>)}
            </View>
            {hasError && !!error && (<Text style={styles.error}>{error}</Text>)}    
        </View>
    )
}

export default Input;