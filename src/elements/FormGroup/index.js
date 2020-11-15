import React from 'react'
import { useState,useEffect } from 'react'
import { View,StyleSheet,TextInput, TouchableOpacity} from 'react-native'
import { IcEyeErossed, IcLock, IcMail, IcPerson,IcActiveLock,IcActiveMail,IcActivePerson,IcMailWrong,IcPasswordWrong,IcPersonWrong} from '../../assets/Icons'

export default function FormGroup({placeholder,Status,type,icon,secureTextEntry,showPassword,onChangeText,value,error=false}) {

    const [active,setActive] = useState('false')
    const [border,setBorder] = useState('rgba(169, 169, 169, 0.6)')      


    useEffect(() => {
        error === true && setBorder('#FF5B37')
    },[error])

    const Icon = () =>
    {
        if (icon === 'password') {
            return !error ? active === 'false' ? <IcLock style={styles.icLeft}/> : <IcActiveLock style={styles.icLeft}/> : <IcPasswordWrong style={styles.icLeft}/>
        }
        if (icon === 'mail') {
            return !error ? active === 'false' ? <IcMail style={styles.icLeft}/> : <IcActiveMail style={styles.icLeft}/> : <IcMailWrong style={styles.icLeft}/>
        }
        if (icon === 'username') {
            return !error ?  active === 'false' ? <IcPerson style={styles.icLeft}/> : <IcActivePerson style={styles.icLeft}/> : <IcPersonWrong style={styles.icLeft}/>
        }
        return <IcMail style={styles.icLeft}/>
    }
    const uiInput = () => 
    {
        if (error === false) {
            setBorder('#6379F4')
            setActive('true')
        }

    }

    return (
    <>
      <View style={styles.container}>
        <TextInput placeholder={placeholder} style={styles.input(border)} onFocus={uiInput} onChangeText={(e) => onChangeText(e)} value={value} secureTextEntry={secureTextEntry}/>
        <Icon />
        {
             icon === 'password' &&  <TouchableOpacity onPress={() => showPassword()} style={styles.icRight}><View><IcEyeErossed/></View></TouchableOpacity> 
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
        bottom:13,
    },
    icRight:{
        position:'absolute',
        bottom:12,
        right:0
        
    },
    input: (border) => ({
        borderBottomWidth:1.5,
        borderColor:border,
        paddingLeft:39,
        paddingRight:39,
        paddingBottom:11,
        fontSize:16,
        
    })
})
