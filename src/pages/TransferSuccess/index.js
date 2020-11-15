import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState,useEffect } from 'react'
import { View, Text ,StyleSheet, ScrollView} from 'react-native'
import { IcSuccess } from '../../assets'
import { ButtonAuth, CardInformation, CardPerson } from '../../elements'
import { Gap } from '../../utils'


export default function TransferSuccess({navigation}) {
    const [data,setData] = useState([])
    useEffect(() => {
        AsyncStorage.getItem('dataTransfer').then(res => setData(JSON.parse(res)))
    }, [data])
    return (
        <>
        <View style={styles.container}>
            <ScrollView  showsVerticalScrollIndicator={false}>
                <View style={styles.wrapper}>
                    <Gap height={40}/>
                    <View style={{alignItems:'center'}}>
                        <IcSuccess/>
                        <Gap height={30}/>
                        <Text style={styles.informationTitle}>Transfer Success</Text>
                    </View>
                    <Gap height={40}/>
                    <Text style={styles.title}>Details</Text>
                    <Gap height={21}/>
                    <CardInformation title="Amount" content={'Rp'+data.amount}/>
                    <Gap height={20}/>
                    <CardInformation title="Balance Left" content={'Rp'+data.available}/>
                    <Gap height={20}/>
                    <CardInformation title="Date & Time" content={data.date}/>
                    <Gap height={20}/>
                    <CardInformation title="Notes" content={data.notes}/>
                    <Gap height={40}/>
                    <Text style={styles.title}>Transfer to</Text>
                    <Gap height={20}/>
                    <CardPerson phoneNumber={'+'+data.phone} name={data.name} img={data.photo}/>
                    <Gap height={10}/>
                </View>
            </ScrollView>
            <View style={styles.wrapper}>
                <ButtonAuth title="Back to Home" active onPress={() => navigation.navigate('Dashboard')}/>
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
        fontSize:18,
        fontWeight:'bold',
         color:'#514F5B'
    },
    informationTitle:{
        color:'#4D4B57',
        fontSize:22,
        fontWeight:'bold'
    }

    
})

