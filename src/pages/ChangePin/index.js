import Axios from 'axios';
import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';
import { GoBack } from '../../components';
import { ButtonAuth, FormPin } from '../../elements';
import { Gap, URI } from '../../utils';

export default function ChangePin({navigation}) {
    const [pin1,setPin1] = useState('')
    const [pin2,setPin2] = useState('')
    const [pin3,setPin3] = useState('')
    const [pin4,setPin4] = useState('')
    const [pin5,setPin5] = useState('')
    const [pin6,setPin6] = useState('')
    const [oldPin,SetOldPin] = useState('')
    const [title,setTitle] = useState('Enter your current 6 digits Zwallet PIN below to continue to the next steps.')
    const Auth = useSelector((s)=> s.Auth)
    const [active,setActive] = useState(false)

    const onHandlePin = (e) =>
    {
        setPin6(e)
        e.length == 0 ? setActive(false) : setActive(true)
    }

    const handlePin = () =>
    {

        if (!pin1||!pin2||!pin3||!pin4||!pin5||!pin6) {
            alert("Pin is required!")
            return false   
        }else{
            const pin = pin1+pin2+pin3+pin4+pin5+pin6;


        
                if(oldPin.length == 0)
                {
                    SetOldPin(pin)
                    setPin1('')
                    setPin2('')
                    setPin3('')
                    setPin4('')
                    setPin5('')
                    setPin6('')
                    setTitle('Type your new 6 digits security PIN to use in Zwallet.')
                }else{
                    let save = {
                        pin :oldPin,
                        newPin:pin
                    }
                    const headers = { headers: {'Authorization': `${Auth.data.token.token}`}}   
                    Axios.patch(`${URI}/user/change_pin`,save,headers)
                    .then(res => {
                        console.log(res.data)
                        setPin1('')
                        setPin2('')
                        setPin3('')
                        setPin4('')
                        setPin5('')
                        setPin6('')
                        SetOldPin('')
                    })
                    .catch(err => {
                        setPin1('')
                        setPin2('')
                        setPin3('')
                        setPin4('')
                        setPin5('')
                        setPin6('')
                        SetOldPin('')   
                        console.log(err)
                    });

                }
           
        }

    }

    return (
    <>
        <View style={styles.container}>
            <Gap height={20} />
            <GoBack page="Change PIN" onPress={()=> navigation.goBack()}/>
            <Gap height={40}/>
            <Text style={styles.title}>{title}</Text>
            <Gap height={50}/>
            <View style={styles.pin}>
                <FormPin onChangeText={(e) => setPin1(e)} value={pin1}/>
                <Gap width={10}/>
                <FormPin onChangeText={(e) => setPin2(e)} value={pin2}/>
                <Gap width={10}/>
                <FormPin onChangeText={(e) => setPin3(e)} value={pin3}/>
                <Gap width={10}/>
                <FormPin onChangeText={(e) => setPin4(e)} value={pin4}/>
                <Gap width={10}/>
                <FormPin onChangeText={(e) => setPin5(e)} value={pin5}/>
                <Gap width={10}/>
                <FormPin onChangeText={(e) => onHandlePin(e)} value={pin6}/>
            </View>
        </View>
        <View style={styles.wrapper}>
            <ButtonAuth title="Continue" active={active} onPress={() => handlePin()}/>
            <Gap height={20}/>
        </View>
    </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      paddingHorizontal:16,
      backgroundColor:'rgb(250,252,255)'
    },
    wrapper: {
      paddingHorizontal:16,
      backgroundColor:'rgb(250,252,255)'
    },
    title:{
        lineHeight:27,
        fontSize:16,
        color:'#7A7886'
    },
    pin:{
        flexDirection:'row',
        justifyContent:'space-evenly'
    }
});