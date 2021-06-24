import {StyleSheet} from 'react-native';

const styles  = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CBD5E0',       
    },
    buttonRegister: {
        flexDirection: 'row',
        marginLeft: 'auto',
        width: 160,
        marginVertical: 8,
        marginRight: 8,
    },
    selectPicker: {
        height: 80,
    },
    groupInfo: {
        marginTop: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    subject:{
        color: '#6a6180',
        fontSize: 14,
    },
    label: {
        fontSize: 14,
        fontWeight: '700',
        color: 'black',
    },
    optionMes: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    mesItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    labelGroup: {
        marginBottom: 4,
        fontSize: 15,
        fontWeight: '600',
        color: '#00305E'  
    },
    labelMedicamentos: {
        marginBottom: 4,
        fontSize: 16,
        fontWeight: '700',
        color: '#00305E',
        textAlign: 'center'
    },
    medicamentoSection: {
        borderWidth:1,
        padding: 8,
        borderColor: '#FCFCFC',
        borderRadius: 5,
        marginBottom: 16,
    },
    divider: {
        marginBottom: 10,
        borderColor: '#FCFCFC',
    },
    optionsAuthorize: {
        marginTop: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
    },
    touchableAuthorize:{
        height: 45,
        width: 'auto'
    },
    buttonAuthorize:{
        width: 110,
        height: 45,
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButtonAuthorize: {
        color: '#FFFFFF',
    }
});

export default styles;