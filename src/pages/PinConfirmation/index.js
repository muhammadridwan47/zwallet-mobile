import AsyncStorage from '@react-native-async-storage/async-storage'
import Axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { View, Text ,StyleSheet, ScrollView} from 'react-native'
import { useSelector,useDispatch } from 'react-redux';
import { GoBack } from '../../components'
import { ButtonAuth, FormPin } from '../../elements'
import { Gap, URI } from '../../utils'
import { showMessage} from "react-native-flash-message";
import { GetUsers } from '../../redux/actions/Users'
import API from '../../service'


export default function PinConfirmation({navigation }) {
    const Auth = useSelector((s)=> s.Auth)
    const [data,setData] = useState([])
    const auth = useSelector((s)=> s.Auth)
    const [pin1,setPin1] = useState('')
    const [pin2,setPin2] = useState('')
    const [pin3,setPin3] = useState('')
    const [pin4,setPin4] = useState('')
    const [pin5,setPin5] = useState('')
    const [pin6,setPin6] = useState('')
    const pin = pin1+pin2+pin3+pin4+pin5+pin6;
    const [active,setActive] = useState(false)
    const dispacth = useDispatch();

    useEffect(() => {
        AsyncStorage.getItem('dataTransfer').then(res => setData(JSON.parse(res)))
        pin.length == 6 ? setActive(true) : setActive(false)
    },[pin1,pin2,pin3,pin4,pin5,pin6,data])
    
    const onContinue = () => 
    {
        if (!pin1||!pin2||!pin3||!pin4||!pin5||!pin6) {
            showMessage({
                message: "Pin is required",
                type: "danger",
            });
            return false
        }

        let form = {
            receiver: parseInt(data.idReceiver),
            status :'Transfer',
            amountTransfer: parseInt(data.amount),
            note: data.notes,
            balanceLeft :parseInt(data.available),
            pin: parseInt(pin),
        }
        const headers = { headers: {'Authorization': `${auth.data.token.token}`}}
        Axios.post(`${URI}/transaction/`,form,headers)
        .then(res => {
           dispacth(GetUsers({token:Auth?.data?.token?.token}))
        //    console.log(res)
           setPin1('')
           setPin2('')
           setPin3('')
           setPin4('')
           setPin5('')
           setPin6('')
           API.FireBase(data.tokenFcm,data.name,data.amount)
           .then(res => {
                
           })
           .catch(err => {
               
           })
          navigation.navigate('TransferSuccess')

        })
        .catch(err => {
        //    console.log('error dari transfer',err)
           showMessage({
            message: "Pin invalid",
            type: "danger",
        });
        })
    }
    return (
        <>
        <View style={styles.container}>
            <ScrollView  showsVerticalScrollIndicator={false}>
                <View style={styles.wrapper}>
                    <Gap height={20}/>
                    <GoBack page="Enter Your PIN" onPress={() => navigation.navigate('FindReceiver') }/>
                    <Gap height={38}/>
                    <Text style={styles.title}>Enter your 6 digits PIN for confirmation to {'\n'} continue transferring money. </Text>
                    <Gap height={50}/>
                    <View style={styles.pin}>
                        <FormPin onChangeText={e => setPin1(e)} value={pin1}/>
                        <Gap width={10}/>
                        <FormPin onChangeText={e => setPin2(e)} value={pin2} />
                        <Gap width={10}/>
                        <FormPin onChangeText={e => setPin3(e)} value={pin3}/>
                        <Gap width={10}/>
                        <FormPin onChangeText={e => setPin4(e)} value={pin4}/>
                        <Gap width={10}/>
                        <FormPin onChangeText={e => setPin5(e)} value={pin5}/>
                        <Gap width={10}/>
                        <FormPin onChangeText={e => setPin6(e)} value={pin6}/>
                    </View>

                </View>
            </ScrollView>
            <View style={styles.wrapper}>
                <ButtonAuth title="Transfer Now" active={active} onPress={() => onContinue()}/>
                <Gap height={10}/>
            </View>
         
        </View>
        </>
    )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgb(250,252,255)',
        flex:1
    },
    wrapper:{
        padding:16,
        backgroundColor:'rgb(250,252,255)',
    },
    title:{
        fontSize:16,
         color:'#7A7886',
         lineHeight:27
    },
    pin:{
        flexDirection:'row',
        justifyContent:'space-evenly'
    }
})

