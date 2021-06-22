import React, { useEffect, useMemo } from 'react';
import { View, Text } from 'react-native';
import { onChange } from 'react-native-reanimated';
import styles from './styles';

import {Picker}  from '@react-native-community/picker';
import { useState } from 'react';

export interface Option {
  id: string;
  name: string;
}

interface Props {
    label?: string;
    options: Option[];
    placeholder?: string;
    enabled?: boolean;
    value: string;
    error?: string;
    touched?: boolean;
    last?: boolean;
    loading?: boolean;
    onChange(value: string): void;
    onChangeState?(value: string): void;
}

const CustomPicker : React.FC<Props> = ({label, options, value, enabled = true, error, touched, onChange, placeholder = 'Selecione',  
onChangeState, loading = false, last = false}) => {

    const defaultColor = '#DFE1E6';
    const errorColor = '#E53E3E';

    const [borderColor, setBorderColor] = useState(defaultColor);

    const hasError = useMemo(() => !!error && touched, [error, touched]);

    useEffect(() => {
      if(hasError)
          setBorderColor(errorColor);
      else
          setBorderColor(defaultColor);
  }, [hasError]);

    return (
    <View style={[styles.container, {marginBottom: last ? 0 : 16 }]}>
    {label && (<Text style={styles.label}>{label}</Text>)}
        <View style={[styles.picker, {borderColor}]}>
          <Picker 
          selectedValue={value}
          onValueChange={(value, index) => {onChange(String(value)); onChangeState && onChangeState(String(value))}}
          style={{
            height: '100%',
            color: '#6A6180'
          }}
          enabled={!loading && enabled}
          >
            <Picker.Item label={loading ? 'Carregando...' : placeholder} value="" />
            {!!options.length && options.map((option) =><Picker.Item key={option.id} label={option.name} value={option.id} /> )}
          </Picker>
        </View>
        {hasError && (<Text style={styles.error}>{error}</Text>)}
    </View>)

}

export default CustomPicker;