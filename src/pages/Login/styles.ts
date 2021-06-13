import {StyleSheet} from 'react-native'; 

const styles = StyleSheet.create({

    main:{
        flex: 1,
        width: '100%',
        paddingVertical: 16,
        backgroundColor: "#00305E"
    },
    container: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 16,
    },
    containerImg: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 250,
    },
    logotipo:{
        width: '80%',
        height: 120,
        resizeMode: 'contain',
    },
    loginForm: {
        width: '100%'
    },
    content: {
        flex:1,
        width:'100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonLogin:{
        marginTop: 12,
        backgroundColor: '#3182CE',
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
    footerLogin:{
        width: '100%',
        marginTop: 24,
    },
    register: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 28,
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
        marginTop: 16,
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