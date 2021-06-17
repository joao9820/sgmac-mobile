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
    label: string;
    options: Option[];
    value: string;
    error?: string;
    touched?: boolean;
    last?: boolean;
    onChange(value: string): void;
    onChangeState?(value: string): void;
}

const CustomPicker : React.FC<Props> = ({label, options, value, error, touched, onChange,  onChangeState,last = false}) => {

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
    <Text style={styles.label}>Função do usuário: </Text>
        <View style={[styles.picker, {borderColor}]}>
          <Picker 
          selectedValue={value}
          onValueChange={(value, index) => {onChange(String(value)); onChangeState && onChangeState(String(value))}}
          style={{
            height: '100%',
            color: '#6A6180'
          }}
          >
            <Picker.Item label="Selecione" value="" />
            {!!options.length && options.map((option) =><Picker.Item key={option.id} label={option.name} value={option.id} /> )}
          </Picker>
        </View>
        {hasError && (<Text style={styles.error}>{error}</Text>)}
    </View>)

}

export default CustomPicker;