import react from 'react'
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    container:{
        backgroundColor: '#FFF',
        borderRadius: 8,
        marginBottom: 16,
        marginHorizontal: 4,
        overflow: 'hidden'
    },
    profile:{
        borderWidth: 1,
        borderColor: '#3182CE',
        borderBottomEndRadius: 8,
        borderBottomStartRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    info: {
        flexDirection: 'row',
    },
    options: {
        flexDirection: 'row'
    },
    /* As imagens de endereços externos no react native não são exibidas 
    até serem definidas sua respectiva altura e largura */
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#eee'
    },

    profileInfo:{
        
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

    bio: {
        marginHorizontal: 24,
        fontSize: 14,
        lineHeight: 24,
        color: "#6a6180"
    },

    footer: {
        backgroundColor: '#fafafc',
        padding: 24,
        alignItems: 'center',
        marginTop: 24
    },

    price: {
        color: '#6a6180',
        fontSize: 14,
    },
    priceValue: {
        color: '#8257e5',
        fontSize: 16
    },

    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 16       
    },

    favoriteButton: {
        backgroundColor: '#8257e5',
        width: 56,
        height: 56,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8
    },

    favorited: {
      backgroundColor: '#e33d3d',  
    },

    contactButton: {
        backgroundColor: '#04d361',
        flex: 1,
        height: 56,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8
    },

    contactButtonText: {
        color: '#FFF',
        fontSize: 16,
        marginLeft: 16
    },
    headerSolicitation: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: '#3182CE',
    },
    code: {
        color: '#3182CE',
        fontSize: 18,
        fontWeight: '700',
        marginTop: 4,
        maxWidth: 180,
    },
    badgeStatus: {
        padding: 4,
        justifyContent: 'center',
        borderRadius: 6,
    },
    badgeText: {
        color: '#FFF',
        fontWeight: '600',
    },
    label: {
        fontSize: 14,
        fontWeight: '700',
        color: 'black',
    }

});

export default styles;