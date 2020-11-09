import React from 'react'
import { View, Text,StyleSheet} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function LinkAuth({title,active,onPress}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title} </Text><TouchableOpacity onPress={() => onPress() }><Text style={styles.active}>{active}</Text></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'center'
    },
    title:{
        color:'rgba(58, 61, 66, 0.8)',
        fontSize:16
    },
    active:{
        fontSize:16,
        color:'#6379F4'
    },

})



