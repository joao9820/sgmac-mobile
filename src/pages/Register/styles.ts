import {StyleSheet} from 'react-native'; 

const styles = StyleSheet.create({

    container: {
        flex:1,
        width: '100%',
        backgroundColor: '#CBD5E0', 
    },
    form: {
        flex:1,
        paddingVertical: 32,
        paddingHorizontal: 8,
        width: '100%',
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
    containerError: {
        marginBottom: 16,
    },
    textError: {
        color: "#c53030",
        marginBottom: 4,
        marginLeft: 4,
    }
});

export default styles;