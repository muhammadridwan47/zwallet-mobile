import React, { useState } from 'react'
import { View, Text ,StyleSheet, TextInput, ScrollView} from 'react-native'
import { GoBack } from '../../components'
import { ButtonAuth, CardPerson } from '../../elements'
import { Gap } from '../../utils'
import { IcPencil } from '../../assets'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function AmountInput({navigation}) {
    const dataTransfer = useSelector((s)=> s.TransferById)
    const User = useSelector((s)=> s.Users)
    const [data,setData] = useState([])
    const [profile,setProfile] = useState([])
    const [available,setAvailable] = useState()
    const [amount,setAmount] = useState()
    const [notes,setNotes] = useState()

    useEffect(() => {
        User?.data?.data[0] && setProfile(User?.data?.data[0])
        dataTransfer?.data && setData(dataTransfer?.data)
    },[dataTransfer,profile])
    
     const countAvailable = (price) =>
    {
        setAmount(price)
        setAvailable(profile?.balance - parseInt(price))
        
    }

   const onContinue = () =>
    {
        // alert('data')
        let arrbulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
        let menit = new Date().getMinutes();
        let jam = new Date().getHours();
        let Tahun = new Date().getFullYear();
        let Tanggal = new Date().getDate();
        let bulan = new Date().getMonth();
        let time = `${arrbulan[bulan]} ${Tanggal}, ${Tahun} - ${jam}.${menit}`;


        
            const form = {
                name :data.fullName,
                phone:data.phoneNumber,
                notes: notes,
                available:available,
                amount:amount,
                idReceiver:data.id,
                photo:data.img,
                date:time
            }   
            AsyncStorage.setItem('dataTransfer',JSON.stringify(form))
        navigation.navigate('Confirmation')
    }



    return (
        <>
        <View style={styles.container}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <Gap height={20}/>
                <GoBack page="Transfer" onPress={() => navigation.goBack()}/> 
                <Gap height={45}/>
                <CardPerson phoneNumber={'+'+data.phoneNumber} name={data.fullName}  img={data.img}/>
                <Gap height={25}/>
                <Text style={styles.available}>Rp{available ? available : profile?.balance} Available</Text>
                <TextInput keyboardType={'numeric'} placeholder="0.00" style={styles.currency} onChangeText={(e) => countAvailable(e) }/>
                <View >
                    <TextInput  placeholder="Add some notes" onChangeText={e => setNotes(e)} style={styles.note}/>
                    <IcPencil style={styles.icon}/>
                </View>
            </ScrollView>
            <Gap height={20}/>
            <ButtonAuth title="Continue" active onPress={() => onContinue()}/>
            <Gap height={10}/>
        </View>
        </>
    )
}


const styles = StyleSheet.create({
    container:{
        paddingHorizontal:16,
        backgroundColor:'rgb(250,252,255)',
        flex:1
    },
    available:{
        fontWeight:'bold',
        fontSize:16,
        color:'#7C7895',
        textAlign:'center'
    },
    currency:{
        fontSize:42,
        color:'#B5BDCC',
        fontWeight:'bold',
        textAlign:'center',
        borderWidth:0,
        marginTop:27
    },
    note:{
        fontSize:16,
        color:'#B5BDCC',
        borderBottomWidth:1.5,
        marginTop:60,
        borderColor:'rgba(169, 169, 169, 0.6)',
        paddingLeft:36,
        paddingBottom:11
    },
    icon:{
        position:'absolute',
        bottom:14
    }
    
})

