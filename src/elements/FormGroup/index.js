import React from 'react'
import { useState } from 'react'
import { View,StyleSheet,TextInput, TouchableOpacity} from 'react-native'
import { IcEyeErossed, IcLock, IcMail, IcPerson,IcActiveLock,IcActiveMail,IcActivePerson} from '../../assets/Icons'

export default function FormGroup({placeholder,Status,type,icon,secureTextEntry,tes,onChangeText,value}) {

    const [active,setActive] = useState('false')
    const [border,setBorder] = useState('rgba(169, 169, 169, 0.6)')

    const Icon = () =>
    {
        if (icon === 'password') {
            return active === 'false' ? <IcLock style={styles.icLeft}/> : <IcActiveLock style={styles.icLeft}/> 
        }
        if (icon === 'mail') {
            return active === 'false' ? <IcMail style={styles.icLeft}/> : <IcActiveMail style={styles.icLeft}/>
        }
        if (icon === 'username') {
            return active === 'false' ? <IcPerson style={styles.icLeft}/> : <IcActivePerson style={styles.icLeft}/>
        }
        return <IcMail style={styles.icLeft}/>
    }
    const uiInput = () => 
    {
        setBorder('#6379F4')
        setActive('true')
    }

    return (
    <>
        
      <View style={styles.container} onPress={() => onPress()}>
        <TextInput placeholder={placeholder} style={styles.input(border)} onFocus={uiInput} onChangeText={(e) => onChangeText(e)} value={value} secureTextEntry={secureTextEntry}/>
            <Icon />
        {
            icon === 'password' && <TouchableOpacity onPress={() => tes()}><View style={{backgroundColor:'red',width:'100%',position:'relative'}} ><IcEyeErossed style={styles.icRight}/></View></TouchableOpacity> 
        }
      </View>

    </>
    )
}

const styles = StyleSheet.create({
    container:{
        position:'relative'
    },
    icLeft:{
        position:'absolute',
        bottom:13
    },
    icRight:{
        position:'absolute',
        bottom:13,
        right:0,
    },
    input: (border) => ({
        borderBottomWidth:1.5,
        borderColor:border,
        paddingLeft:39,
        paddingRight:39,
        
        paddingBottom:11,
        fontSize:16
    })
})
