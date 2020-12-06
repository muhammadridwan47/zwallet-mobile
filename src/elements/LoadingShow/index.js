import React from 'react'
import {StyleSheet, Text, View, ActivityIndicator } from 'react-native'

export default function LoadingShow() {
    return (
        <View style={styles.wrapper}>
            <ActivityIndicator color={'white'} size="large"/>
            <Text style={styles.text}>Loading...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        position:'absolute',
        backgroundColor:'rgba(0,0,0,0.4)',
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        fontSize:18,
        color:'white',
        marginTop:16
    }
})
