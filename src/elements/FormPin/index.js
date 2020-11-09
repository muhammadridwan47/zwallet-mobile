import React from 'react'
import { View,TextInput,StyleSheet} from 'react-native'
import { IcLine } from '../../assets/Icons'

export default function Formpin({onChangeText,value}) {
    const [border,setBorder] = React.useState('rgba(169, 169, 169, 0.6)')
    const uiInput = () => 
    {
        setBorder('#6379F4')
    }
    return (
        <View style={styles.wrapper}>
            <TextInput keyboardType="number-pad" value={value} style={styles.input(border)} maxLength={1} onFocus={() => uiInput()} onChangeText={(e) => onChangeText(e) }/>
            <IcLine style={styles.line}/>
        </View>
    )
}


const styles = StyleSheet.create({
        wrapper:{
            position:'relative'
        },
        input:(border) => ({
            borderWidth:1,
            width:47,
            height:58,
            borderRadius:10,
            fontSize:24,
            fontWeight:'bold',
            textAlign:'center',
            color:'#3A3D42',
            borderColor:border,
            elevation:1
        }),
        line:{
            position:'absolute',
            bottom:10,
            left:9
        }
})