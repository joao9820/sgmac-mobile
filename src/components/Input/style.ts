import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 16,
    },
    input: {
        width: '100%',
        position: 'relative',
        height: 55,
        backgroundColor: '#F8F8FC',
        borderRadius: 5,
        color: '#6A6180',
        padding: 16,
    },
    inputFocus: {
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderColor: '#3182CE',
        borderRadius: 5,
    },
    iconButton: {
        position: 'absolute',
        height: '100%',
        zIndex: 2,
        right: 8,
        top: 0,
        justifyContent: 'center',
        alignItems: 'center', 
    },
    passIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    passButton: {
        backgroundColor: '#00305E',
        width: 40,
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    }
});

export default styles;