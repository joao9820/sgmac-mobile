import {StyleSheet} from 'react-native'; 

const styles = StyleSheet.create({

    container: {
        flex:1,
        width: '100%',
        padding: 16,
        backgroundColor: "#00305E",
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    logotipo:{
        width: '80%',
        height: '20%',
        resizeMode: 'contain',
    },
    loginForm: {
        width: '100%',
        justifyContent: 'center',
    },
    buttonLogin:{
        marginTop: 12,
        backgroundColor: '#0E89FC',
        width: '100%',
        height: 45,
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    disabledButtonLogin:{
        backgroundColor: '#A0AEC0'
    },
    textLogin: {
        color: '#FFFFFF',
    },
    register: {
        width: '100%'
    },
    registerText: {
        fontSize: 14,
        color: '#E6E6F0',
    },
    registerLink: {
        fontSize: 16,
        textDecorationLine: 'underline',
        color: '#0E89FC',
    },
    options: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 6,
    },
    rememberMe: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rememberMeText: {
        color: '#FFFFFF'
    },
    forgetPass: {
        fontSize: 14,
        color: '#0E89FC',
    }
});

export default styles;