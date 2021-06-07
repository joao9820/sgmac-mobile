import {StyleSheet} from 'react-native';

const styles  = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#00305E'        
    },

    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    returnButton: {
        marginRight: 24,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    page: {
        flex: 1,
        flexDirection: 'row', 
        alignItems: 'center',
        marginVertical: 20,
    },
    title: {
        color: '#FFF',
        fontSize: 24,
        lineHeight: 32,
        maxWidth: 250 
    },
    logotipo:{
        width: 70,
        height: 70,
        resizeMode: 'contain',
    },
});


export default styles;