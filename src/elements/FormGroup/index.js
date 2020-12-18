import React from 'react'
import { useState} from 'react'
import { View,StyleSheet,TextInput, TouchableOpacity} from 'react-native'
import { IcEyeErossed, IcLock, IcMail, IcPerson,IcActiveLock,IcActiveMail,IcActivePerson,IcMailWrong,IcPasswordWrong,IcPersonWrong} from '../../assets/Icons'

export default function FormGroup({placeholder,Status,type,icon,secureTextEntry,showPassword,onChangeText,value,error}) {
    const [active,setActive] = useState(false)

    const Icon = () =>
    {
        if (icon === 'password') {
            return !error ? active === false ? <IcLock style={styles.icLeft}/> : <IcActiveLock style={styles.icLeft}/> : <IcPasswordWrong style={styles.icLeft}/>
        }
        if (icon === 'mail') {
            return !error ? active === false ? <IcMail style={styles.icLeft}/> : <IcActiveMail style={styles.icLeft}/> : <IcMailWrong style={styles.icLeft}/>
        }
        if (icon === 'username') {
            return !error ?  active === false ? <IcPerson style={styles.icLeft}/> : <IcActivePerson style={styles.icLeft}/> : <IcPersonWrong style={styles.icLeft}/>
        }
        return <IcMail style={styles.icLeft}/>
    }
    const uiInput = () => 
    {
            setActive(true)
    }
    return (
    <>
      <View style={styles.container}>
        <TextInput placeholder={placeholder} style={styles.input(error,active)} onFocus={uiInput} onChangeText={(e) => onChangeText(e)} value={value} secureTextEntry={secureTextEntry}/>
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
    input: (error,active) => ({
        borderBottomWidth:1.5,
        borderColor:error ? '#FF5B37' : active ?'#6379F4' :'rgba(169, 169, 169, 0.6)' ,
        paddingLeft:39,
        paddingRight:39,
        paddingBottom:11,
        fontSize:16,
        
    })
})
