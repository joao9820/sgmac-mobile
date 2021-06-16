import React from 'react';
import { ActivityIndicator, ButtonProps, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';


import styles from './styles';

interface Props extends ButtonProps {
    title: string;
    bg?: string;
    loading?: boolean;
    onPress(): void; 
}

const Button : React.FC<Props> = ({loading = false, onPress, title, bg, ...rest}) => {

    const defaultColor = '#3182CE';

    return (
            <RectButton style={[styles.button, loading && {shadowOpacity: 0.7}, {backgroundColor: bg || defaultColor}]} 
            onPress={onPress} enabled={!loading} {...rest}>
                <Text style={styles.text}>
                    {loading ? <ActivityIndicator size="large" color="#FFFFFF"/> : title}
                </Text>
            </RectButton>
        );
}

export default Button;