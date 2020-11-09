import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default function LinkHistory({onPress}) {
    return (
        <View style={styles.history}>
            <Text style={styles.historyTitle}>Transaction History</Text>
            <TouchableOpacity onPress={onPress}>
              <Text style={styles.historySeeAll}>See all</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    history:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    historyTitle:{
        color:'#514F5B',
        fontWeight:'bold',
        fontSize:18
    },
    historySeeAll:{
        color:'#6379F4',
        fontWeight:'600',
        fontSize:14
    }
})