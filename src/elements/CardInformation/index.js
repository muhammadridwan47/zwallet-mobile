import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { IcTrash} from '../../assets'

export default function CardInformation({title,content,manage,phone}) {
    return (
        <View style={styles.cardInformation}>
            <Text style={styles.informationTitle}>{title}</Text>
            <Text style={styles.content}>{content}</Text>
            { manage && <TouchableOpacity style={styles.manage} onPress={() => manage()}><Text style={{color:'#6379F4'}} >Manage</Text></TouchableOpacity>}
            { phone && <TouchableOpacity style={styles.phone} onPress={() => phone()}><IcTrash  /></TouchableOpacity>}
            
         </View>
    )
}


const styles = StyleSheet.create({
    cardInformation:{
        padding:15,
        backgroundColor:'#fff',
        borderRadius:10,
        elevation:2
    },
    informationTitle:{
        marginBottom:10,
        fontSize:16,
        color:'#7A7886'
    },
    content:{
        color:'#514F5B',
        fontSize:22,
        fontWeight:'bold'
    },
    manage:{
        
        fontSize:14,
        position:'absolute',
        right:15,
        bottom:31
    },
    phone:{
        color:'#6379F4',
        fontSize:14,
        position:'absolute',
        right:15,
        bottom:30
    }
})

