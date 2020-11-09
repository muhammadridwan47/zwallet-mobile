import React from 'react'
import { View, Text, StyleSheet,TouchableOpacity} from 'react-native'

export default function ButtonAuth({title,active,onPress}) {
    return (
        <TouchableOpacity onPress={() => onPress()}>
            <View style={styles.button(active)}>
                <Text style={styles.btnTitle(active)}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    button: (active) => ({
        backgroundColor: active ? '#6379F4' : '#DADADA',
        paddingVertical:16,
        borderRadius:12,
        shadowOpacity:0.05,
        elevation:0.05,
        shadowColor:'rgba(100, 87, 87, 0.05)'
    }),
    btnTitle: (active) => ({
        textAlign:'center',
        fontSize:18,
        fontWeight:'bold',
        color: active ? '#fff' : '#88888F'
    })
})