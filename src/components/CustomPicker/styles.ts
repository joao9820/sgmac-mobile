import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    label: {
        marginBottom: 4,
        fontSize: 15,
        fontWeight: '600',
        color: '#00305E'  
    },
    picker: {
        width: '100%',
        height: 55,
        backgroundColor: '#F8F8FC',
        borderRadius: 5,
        borderWidth: 2,
    },
    error: {
        marginTop: 4,
        color: '#E53E3E',
        fontSize: 13,
    }
});

export default styles;