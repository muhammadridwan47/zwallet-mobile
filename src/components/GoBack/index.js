import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { IcArrowLeft } from '../../assets'
import { Gap } from '../../utils'

export default function GoBack({page,navigation,onPress,white}) {
    return (
        <>
            <Gap height={20}/>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.container(white)}>
                    <IcArrowLeft/>
                    <Text style={styles.title}>{page}</Text>
                </View>
            </TouchableOpacity>
        </>
    )
}


const styles = StyleSheet.create({
    container : (white) => ({
            flexDirection:'row',
            backgroundColor: white ? '#fff' :'rgb(250,252,255)'
    }),
    title:{
        fontSize:20,
        color:'#4D4B57',
        fontWeight:'bold',
        marginLeft:25
    }
 
})
