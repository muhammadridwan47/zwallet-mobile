import React from 'react'
import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { URIIMAGE } from '../../utils/URI'

export default function CardQuickAccess({fullName,number,onPress,img}) {
    return (
        <TouchableOpacity  style={styles.QuickAccess} onPress={() => onPress()}>
            <Image source={{uri:URIIMAGE+img}} style={{width:56,height:56,borderRadius:10}} />
            <Text style={styles.QuickAccessName} numberOfLines={1}>{fullName}</Text>
            <Text style={styles.QuickAccessNumber} numberOfLines={1}>{number}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    QuickAccess:{
        paddingHorizontal:20,
        paddingTop:20,
        paddingBottom:15,
        elevation:3,
        backgroundColor:'#fff',
        borderRadius:10,
        alignItems:'center',
        
    },
    QuickAccessName:{
        marginTop:10,
        fontSize:16,
        fontWeight:'bold',
        color:'#4D4B57',
        marginBottom:5,
        width:50,
        
        
    },
    QuickAccessNumber:{
        fontSize:13,
        color:'#7A7886',
        width:50,
        textAlign:'center'
    }
})