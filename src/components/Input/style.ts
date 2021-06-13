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
        borderWidth: 2,
        padding: 16,
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
        width: 40,
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    },
    label: {
        marginBottom: 4,
        fontSize: 15,
        fontWeight: '600',
        color: '#00305E'  
    },
    error: {
        marginTop: 4,
        color: '#E53E3E',
        fontSize: 13,
    }
});

export default styles;